import { readFileSync } from "node:fs";
import path from "node:path";

import type { ProviderSummaryResult } from "./types.js";
import { M3_PROVIDER_ID, M3_PROVIDER_VERSION } from "./types.js";

export class LocalSyntheticCorpusInspector {
  private invocationCount = 0;

  public inspect(input: {
    fixtureRoot: string;
    files: readonly string[];
    fixtureManifestHash: string;
  }): ProviderSummaryResult {
    this.invocationCount += 1;
    const fixtureRoot = path.resolve(input.fixtureRoot);
    const files = [...input.files].sort((a, b) => a.localeCompare(b));
    const titles: string[] = [];
    let totalParagraphs = 0;
    let totalParagraphCharacters = 0;

    for (const filePath of files) {
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(fixtureRoot + path.sep)) {
        throw new Error("Provider boundary violation: file is outside approved fixture root.");
      }
      const parsed = JSON.parse(readFileSync(resolved, "utf8")) as {
        title?: string;
        paragraphs?: unknown;
      };
      titles.push((parsed.title ?? path.basename(filePath)).toString());
      const paragraphs = Array.isArray(parsed.paragraphs)
        ? parsed.paragraphs.filter((value): value is string => typeof value === "string")
        : [];
      totalParagraphs += paragraphs.length;
      totalParagraphCharacters += paragraphs.reduce(
        (count, paragraph) => count + paragraph.length,
        0
      );
    }

    return Object.freeze({
      providerId: M3_PROVIDER_ID,
      providerVersion: M3_PROVIDER_VERSION,
      fixtureManifestHash: input.fixtureManifestHash,
      consumedFiles: Object.freeze(files.map((filePath) => path.relative(fixtureRoot, filePath))),
      itemCount: files.length,
      summary: Object.freeze({
        totalItems: files.length,
        titles: Object.freeze(titles),
        totalParagraphs,
        totalParagraphCharacters
      })
    });
  }

  public getInvocationCount(): number {
    return this.invocationCount;
  }
}
