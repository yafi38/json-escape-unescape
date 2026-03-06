# JSON Escape / Unescape

A lightweight and fast developer tool for Cursor and VS Code that lets you easily escape and unescape JSON strings directly within your editor. 

## Features

Quickly format your JSON data without leaving your IDE or relying on external web tools.

* **Escape JSON:** Converts raw JSON or standard text into a properly escaped string format (using `JSON.stringify` under the hood, but **without** the surrounding quotes), ready to be embedded within other JSON payloads or code.
* **Unescape JSON:** Takes an escaped JSON string and cleanly parses it back into readable, raw JSON format.

## Usage

1. Highlight the text or JSON string you want to modify in your editor.
   - If you don’t highlight anything (empty selection), the command will apply to the entire document.
2. Open the Command Palette (`Ctrl+Shift+P` on Linux/Windows, `Cmd+Shift+P` on macOS).
3. Search for and execute one of the following commands:

| Command | Action |
| :--- | :--- |
| **JSON: Escape String** | Wraps the selection in quotes and escapes internal characters. |
| **JSON: Unescape String** | Removes surrounding quotes and parses the escaped string back to normal. |

## Installation (Local)

To install this extension manually into Cursor:

1. Package the extension using `vsce package`.
2. Open Cursor.
3. Go to the Extensions sidebar.
4. Click the `...` menu at the top right of the sidebar.
5. Select **Install from VSIX...** and choose the generated `.vsix` file.

Alternatively, via the terminal:
`cursor --install-extension json-escape-unescape-0.0.1.vsix`

## Known Issues

* None currently.

## Release Notes

### 0.0.3
* Add forgiving regex fallback for invalid JSON strings

### 0.0.2
* Add whole document escape/unescape when there is no selection.

### 0.0.1
* Initial release.
* Added core escape and unescape functionality.
