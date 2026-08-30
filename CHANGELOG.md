# Change Log

## [Unreleased]

- Fix unescape removing a lone leading or trailing quote; only a matching pair of surrounding quotes is stripped now.
- Add keywords, author, and issue/homepage links to the manifest.
- Rewrite the README: install from Open VSX, corrected command descriptions, accurate known issues.
- Exclude `.github` and `*.vsix` from the published package.
- Add a CI workflow that runs lint and tests on pull requests.
- Harden the publish workflow: least-privilege permissions, pinned CLI versions, and a tag/version check.

## [0.0.4] - 2026-03-26

- Fix changelog.
- Refactor Code.
- Add icon.

## [0.0.3] - 2026-03-06

- Add forgiving regex fallback for invalid JSON strings

## [0.0.2] - 2026-03-05

- Add whole document escape/unescape when there is no selection.

## [0.0.1] - 2026-03-04

- Initial release.
- Added core escape and unescape functionality.
