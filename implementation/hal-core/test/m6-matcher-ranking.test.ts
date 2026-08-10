import { describe, expect, test } from "vitest";

import { matchCorpus } from "../src/m6/matcher.js";
import type { M6CorpusDocument } from "../src/m6/types.js";

function documentWithSections(
  id: string,
  sections: readonly (readonly string[])[]
): M6CorpusDocument {
  return {
    id,
    title: id,
    tags: [],
    paragraphs: sections.map((tokens) => tokens.join(" ")),
    normalizedTitle: id,
    normalizedTags: [],
    titleTokens: [id],
    tagTokens: [],
    sections: sections.map((tokens, index) => ({
      sectionId: `paragraph:${index}`,
      index,
      originalParagraph: tokens.join(" "),
      normalizedParagraph: tokens.join(" "),
      tokens
    }))
  };
}

describe("M6 matcher ranking", () => {
  test("ranks by the bounded rendered evidence window instead of weak matches across a long document", () => {
    const scattered = documentWithSections(
      "a.scattered",
      Array.from({ length: 10 }, () => ["hal"])
    );
    const focused = documentWithSections("z.focused", [["hal", "authority", "over"]]);

    const result = matchCorpus(["hal", "authority", "over"], [scattered, focused]);

    expect(result.noMatch).toBe(false);
    expect(result.selectedDocumentIds[0]).toBe("z.focused");
    expect(result.selectedSectionIds).toContain("z.focused#paragraph:0");
  });

  test("renders one bounded section when only a selected document title matches", () => {
    const titled: M6CorpusDocument = {
      ...documentWithSections("owner.local_folder.colors", [["Red", "Orange"]]),
      title: "owner-approved local folder colors.md",
      titleTokens: ["owner", "approved", "local", "folder", "colors", "md"]
    };

    const result = matchCorpus(["colors"], [titled]);

    expect(result.noMatch).toBe(false);
    expect(result.selectedDocumentIds).toEqual(["owner.local_folder.colors"]);
    expect(result.selectedSectionIds).toEqual(["owner.local_folder.colors#paragraph:0"]);
  });
});
