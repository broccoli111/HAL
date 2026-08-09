import { lstatSync, statSync } from "node:fs";
import path from "node:path";

export function requireNonEmptyPath(input: string, label: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error(`${label} is required and cannot be empty.`);
  }
  return path.resolve(trimmed);
}

export function assertContainedPath(root: string, candidate: string, label: string): void {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);
  const relative = path.relative(resolvedRoot, resolvedCandidate);
  if (relative === "") {
    return;
  }
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes declared root.`);
  }
}

export function toPosixRelativePath(root: string, absolutePath: string): string {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(absolutePath);
  assertContainedPath(resolvedRoot, resolved, "Relative path source");
  const relative = path.relative(resolvedRoot, resolved).split(path.sep).join(path.posix.sep);
  if (!relative || relative === "." || relative.startsWith("/") || relative.includes("..")) {
    throw new Error("Invalid relative path derived from source.");
  }
  return relative;
}

export function assertUniqueDeclaredRoots(input: {
  sourceStateDirectory?: string;
  backupRoot?: string;
  snapshotRoot?: string;
  restoreRoot?: string;
  operationStateDirectory: string;
}): void {
  const paths = [
    ...(input.sourceStateDirectory ? [path.resolve(input.sourceStateDirectory)] : []),
    ...(input.backupRoot ? [path.resolve(input.backupRoot)] : []),
    ...(input.snapshotRoot ? [path.resolve(input.snapshotRoot)] : []),
    ...(input.restoreRoot ? [path.resolve(input.restoreRoot)] : []),
    path.resolve(input.operationStateDirectory)
  ];
  const unique = new Set(paths);
  if (unique.size !== paths.length) {
    throw new Error(
      "backupRoot, restoreRoot, and operationStateDirectory must be separate explicit roots."
    );
  }
}

export function assertDeclaredRootDirectory(rootPath: string, label: string): string {
  const resolved = requireNonEmptyPath(rootPath, label);
  const lstat = lstatSync(resolved, { throwIfNoEntry: false });
  if (!lstat) {
    throw new Error(`${label} must exist and be an explicit directory.`);
  }
  if (lstat.isSymbolicLink()) {
    throw new Error(`${label} must not be a symlink.`);
  }
  const stat = statSync(resolved);
  if (!stat.isDirectory()) {
    throw new Error(`${label} must be a directory.`);
  }
  return resolved;
}

export function assertNoSymlinkAtPath(pathToCheck: string, label: string): void {
  const resolved = path.resolve(pathToCheck);
  const lstat = lstatSync(resolved, { throwIfNoEntry: false });
  if (!lstat) {
    return;
  }
  if (lstat.isSymbolicLink()) {
    throw new Error(`${label} must not be a symlink.`);
  }
}

export function assertNoSymlinkSegmentsUnderRoot(
  rootPath: string,
  candidatePath: string,
  label: string
): void {
  const resolvedRoot = path.resolve(rootPath);
  const resolvedCandidate = path.resolve(candidatePath);
  assertContainedPath(resolvedRoot, resolvedCandidate, label);
  const relative = path.relative(resolvedRoot, resolvedCandidate);
  if (!relative || relative === ".") {
    return;
  }
  const segments = relative.split(path.sep);
  let cursor = resolvedRoot;
  for (const segment of segments) {
    cursor = path.resolve(cursor, segment);
    const lstat = lstatSync(cursor, { throwIfNoEntry: false });
    if (!lstat) {
      continue;
    }
    if (lstat.isSymbolicLink()) {
      throw new Error(`${label} contains symlinked segment.`);
    }
  }
}
