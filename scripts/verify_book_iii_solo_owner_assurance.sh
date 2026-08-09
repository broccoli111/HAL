#!/usr/bin/env sh

# Read-only verification for the Book III Solo-Owner Assurance working amendment.
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_root"

chapter_root='Documents/Book III/chapters'
combined='Documents/Book III/deliverables/HAL_BOOK_III_ENGINEERING_STANDARDS.md'

test "$(rg -l -F '### 11.1 Solo-Owner Assurance Profile' "$chapter_root" | wc -l | tr -d ' ')" -eq 1
test "$(rg -l -F 'Book III Chapter 8 §11.1 permits it' "$chapter_root" | wc -l | tr -d ' ')" -eq 8
test "$(rg -l -F 'Owner-authorized working amendment; recertification pending' "$chapter_root" | wc -l | tr -d ' ')" -eq 9
rg -q -F 'where §11.1 permits it' "$chapter_root/08_REVIEW_ASSURANCE_AND_TECHNICAL_DEBT.md"
rg -q -F 'Independent reviewer for high-risk milestones and production release' "$chapter_root/08_REVIEW_ASSURANCE_AND_TECHNICAL_DEBT.md"
rg -q -F '**Version:** 1.1' "$combined"
rg -q -F '**Status:** Owner-authorized working amendment; recertification pending' "$combined"
rg -q -F '| 1.1 | 2026-08-09 | Owner-authorized working amendment; recertification pending' "$combined"
rg -q -F 'Solo-Owner Assurance Profile' "$combined"
rg -q -F "AMENDMENT_DATE = '2026-08-09'" 'Documents/Book III/scripts/build_book_iii.py'
rg -q -F 'Owner-authorized working amendment; recertification pending' 'Documents/Book III/scripts/build_book_iii.py'
test -f 'Documents/Book III/templates/SOLO_OWNER_ASSURANCE_TEMPLATE.md'
test -f 'Documents/Book III/reviews/BOOK_III_SOLO_OWNER_ASSURANCE_TECHNICAL_REVIEW_2026-08-09.md'

PYTHONPYCACHEPREFIX=/private/tmp/hal-pycache python3 -m py_compile 'Documents/Book III/scripts/build_book_iii.py'
PYTHONPYCACHEPREFIX=/private/tmp/hal-pycache sh scripts/run_runtime_boundary_checks.sh
git diff --check

printf '%s\n' 'PASS: Book III Solo-Owner Assurance working-amendment verification completed.'
