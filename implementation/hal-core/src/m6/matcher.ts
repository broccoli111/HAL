import type {
  M6CorpusDocument,
  M6MatchOutcome,
  M6SelectedDocument,
  M6SelectedSection
} from "./types.js";

type ScoredDocument = Readonly<{
  document: M6CorpusDocument;
  titleMatches: number;
  tagMatches: number;
  paragraphMatches: number;
  documentScore: number;
  sections: readonly M6SelectedSection[];
}>;

function compareByCodeUnitAscending(left: string, right: string): number {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

function countIntersection(tokens: readonly string[], compareSet: ReadonlySet<string>): number {
  let count = 0;
  for (const token of tokens) {
    if (compareSet.has(token)) {
      count += 1;
    }
  }
  return count;
}

export function matchCorpus(
  questionTokens: readonly string[],
  documents: readonly M6CorpusDocument[]
): M6MatchOutcome {
  if (questionTokens.length === 0) {
    return Object.freeze({
      noMatch: true,
      selectedDocuments: Object.freeze([]),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([])
    });
  }

  const scored: ScoredDocument[] = [];

  for (const document of documents) {
    const titleMatches = countIntersection(questionTokens, new Set(document.titleTokens));
    const tagMatches = countIntersection(questionTokens, new Set(document.tagTokens));
    const sectionScores = document.sections.map((section) =>
      countIntersection(questionTokens, new Set(section.tokens))
    );
    const paragraphMatches = sectionScores.reduce((sum, score) => sum + score, 0);
    // Rendering is bounded to the two highest-scoring sections. Rank by that
    // same bounded evidence window so a long document cannot outrank a more
    // directly relevant document merely by repeating a weak lexical match.
    const renderedSectionMatchScore = [...sectionScores]
      .sort((left, right) => right - left)
      .slice(0, 2)
      .reduce((sum, score) => sum + score, 0);
    // A source-derived topic index is a bounded retrieval aid, not an
    // authority source. Prefer its direct heading match over diffuse matches
    // in a large source body while retaining lexical-only behavior.
    const topicIndexBoost = document.tags.includes("topic-index")
      ? renderedSectionMatchScore * 2
      : 0;
    const documentScore =
      titleMatches * 5 + tagMatches * 3 + renderedSectionMatchScore + topicIndexBoost;
    const sections = document.sections
      .map((section, index) =>
        Object.freeze({
          documentId: document.id,
          sectionId: section.sectionId,
          sectionIndex: section.index,
          sectionScore: sectionScores[index] ?? 0,
          paragraph: section.originalParagraph
        } satisfies M6SelectedSection)
      )
      .filter((section) => section.sectionScore >= 1)
      .sort((left, right) => {
        if (right.sectionScore !== left.sectionScore) {
          return right.sectionScore - left.sectionScore;
        }
        return left.sectionIndex - right.sectionIndex;
      })
      .slice(0, 2);

    if (documentScore >= 2) {
      scored.push(
        Object.freeze({
          document,
          titleMatches,
          tagMatches,
          paragraphMatches,
          documentScore,
          sections: Object.freeze(sections)
        })
      );
    }
  }

  if (scored.length === 0) {
    return Object.freeze({
      noMatch: true,
      selectedDocuments: Object.freeze([]),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([])
    });
  }

  const selectedDocuments = scored
    .sort((left, right) => {
      if (right.documentScore !== left.documentScore) {
        return right.documentScore - left.documentScore;
      }
      if (right.titleMatches !== left.titleMatches) {
        return right.titleMatches - left.titleMatches;
      }
      return compareByCodeUnitAscending(left.document.id, right.document.id);
    })
    .slice(0, 3)
    .map((entry) =>
      Object.freeze({
        documentId: entry.document.id,
        documentScore: entry.documentScore,
        titleMatches: entry.titleMatches,
        tags: entry.document.tags,
        selectedSections: entry.sections
      } satisfies M6SelectedDocument)
    );

  const selectedSectionIds = selectedDocuments.flatMap((document) =>
    document.selectedSections.map((section) => `${section.documentId}#${section.sectionId}`)
  );

  const selectedDocumentIds = selectedDocuments.map((document) => document.documentId);

  return Object.freeze({
    noMatch: false,
    selectedDocuments: Object.freeze(selectedDocuments),
    selectedDocumentIds: Object.freeze(selectedDocumentIds),
    selectedSectionIds: Object.freeze(selectedSectionIds)
  });
}
