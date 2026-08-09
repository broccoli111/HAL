import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const governingDocsDir = path.resolve(projectRoot, "../../docs/governing documents");
const outputPath = path.resolve(projectRoot, "docs/SOURCE_CONTROL_MANIFEST.md");

const canonicalBookOrder = [
  "HAL_BOOK_1_CONSTITUTION.md",
  "HAL_BOOK_2_ARCHITECTURE_SPECIFICATION.md",
  "HAL_BOOK_3_ENGINEERING_STANDARDS.md",
  "HAL_BOOK_4_COMPONENT_SPECIFICATIONS.md",
  "HAL_BOOK_5_OPERATIONS_MANUAL.md",
  "HAL_BOOK_6_SECURITY_PRIVACY_AND_TRUST_MANUAL.md",
  "HAL_BOOK_7_GOVERNANCE_AND_STEWARDSHIP_MANUAL.md",
  "HAL_BOOK_8_VERIFICATION_AND_CERTIFICATION_MANUAL.md",
  "HAL_BOOK_9_INTERFACE_AND_PROTOCOL_REFERENCE.md",
  "HAL_BOOK_10_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.md"
];

function getRepositoryBaseline() {
  try {
    const commit = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: path.resolve(projectRoot, "../.."),
      encoding: "utf8"
    }).trim();
    const branch = execFileSync("git", ["branch", "--show-current"], {
      cwd: path.resolve(projectRoot, "../.."),
      encoding: "utf8"
    }).trim();
    return `${commit} on branch ${branch || "detached"}`;
  } catch {
    return "not-yet-versioned (no repository commit available)";
  }
}

const entries = [];
for (const filename of canonicalBookOrder) {
  const absolutePath = path.join(governingDocsDir, filename);
  const content = await fs.readFile(absolutePath);
  const sha = createHash("sha256").update(content).digest("hex");
  entries.push({
    filename,
    relativePath: `../../docs/governing documents/${filename}`,
    sha
  });
}

const reviewDate = new Date().toISOString().slice(0, 10);
const baseline = getRepositoryBaseline();

const lines = [
  "# Source Control Manifest",
  "",
  "## Authority statement",
  "",
  "Book I is supreme. Lower-order artifacts (including this manifest, implementation code, and local process controls) cannot create, transfer, or expand authority.",
  "",
  "## Reviewed sources",
  "",
  "Reference path requested by M0: `../../docs/governing-docs/books-1-10/`.",
  "",
  "Repository path used in this workspace: `../../docs/governing documents/`.",
  "",
  "| Book | Source path | SHA-256 |",
  "| --- | --- | --- |",
  ...entries.map(
    (entry, index) => `| Book ${index + 1} | \`${entry.relativePath}\` | \`${entry.sha}\` |`
  ),
  "",
  "## Review metadata",
  "",
  `- Review date: ${reviewDate}`,
  `- Repository baseline: ${baseline}`,
  `- Implementation root: \`implementation/hal-core\``,
  `- Runtime baseline: Node.js LTS (>=20) and npm lockfile-managed dependencies`
];

await fs.writeFile(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote manifest to ${outputPath}`);
