# JSON Escape / Unescape

[![Open VSX Version](https://img.shields.io/open-vsx/v/yafi38/json-escape-unescape)](https://open-vsx.org/extension/yafi38/json-escape-unescape)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/yafi38/json-escape-unescape)](https://open-vsx.org/extension/yafi38/json-escape-unescape)

A lightweight, fast tool for VS Code and compatible editors (Cursor, VSCodium, Windsurf) that escapes and unescapes JSON strings without leaving your editor.

## Features

* **Escape String:** Turns raw text or JSON into an escaped JSON string body — the result of `JSON.stringify`, but **without** the surrounding quotes — ready to paste inside another JSON payload or a string literal.
* **Unescape String:** Turns an escaped JSON string back into its raw text. Partial or slightly malformed input is handled on a best-effort basis.

## Usage

1. Select the text you want to convert.
   * With nothing selected, the command runs on the whole document.
   * Multiple selections are each processed independently.
2. Open the Command Palette — `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
3. Run one of:

| Command | Action |
| :--- | :--- |
| **JSON: Escape String** | Escapes `"`, `\`, newlines, tabs, and other control characters. Does not add surrounding quotes. |
| **JSON: Unescape String** | Strips a wrapping pair of `"` if present, then resolves `\n`, `\t`, `\uXXXX`, and other escape sequences. |

### Example

Escaping `say "hello"\nbye` produces `say \"hello\"\nbye`.
Unescaping it gives the original text back.

## Installation

Install **JSON Escape / Unescape** from your editor's Extensions view, or from the [Open VSX Registry](https://open-vsx.org/extension/yafi38/json-escape-unescape).

<details>
<summary>Install from a <code>.vsix</code> file</summary>

1. Build the package: `npx vsce package`
2. In the Extensions view, open the `...` menu and choose **Install from VSIX...**, or run:
   `code --install-extension json-escape-unescape-<version>.vsix`

</details>

## Known Issues

* **Unescape** resolves escape sequences wherever it finds them. Running it on text that is not an escaped string — a Windows path such as `C:\temp\new`, a regex, and so on — will turn `\t`, `\n`, and similar into control characters. Undo (`Ctrl+Z`) reverts it.
