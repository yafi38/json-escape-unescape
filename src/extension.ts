import * as vscode from 'vscode';
import { escape } from './escape';

export function activate(context: vscode.ExtensionContext) {

    const escapeCmd = vscode.commands.registerCommand('json-escape-unescape.escape', () => {
        return processText(escape);
    });

    const unescapeCmd = vscode.commands.registerCommand('json-escape-unescape.unescape', () => {
        return processText((text) => {
            try {
                const cleanText = text.replace(/^"|"$/g, '');

                return JSON.parse(`"${cleanText}"`);
            } catch (e) {
                return forgivingUnescape(text);
            }
        });
    });

    context.subscriptions.push(escapeCmd, unescapeCmd);
}

function forgivingUnescape(text: string): string {
    const escapeMap: { [key: string]: string } = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        'b': '\b',
        'f': '\f',
        'n': '\n',
        'r': '\r',
        't': '\t'
    };

    const regex = /\\(?:u([0-9a-fA-F]{4})|(["\\/bfnrt]))/g;

    return text.replace(regex, (match, hexCode, standardChar) => {
        if (hexCode) {
            return String.fromCharCode(parseInt(hexCode, 16));
        } else if (standardChar) {
            return escapeMap[standardChar];
        }
        return match;
    });
}

function processText(transform: (text: string) => string): Thenable<boolean> | void {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    return editor.edit(editBuilder => {
        const selections = getSelections(editor);

        selections.forEach(selection => {
            const text = editor.document.getText(selection);

            if (text) {
                editBuilder.replace(selection, transform(text));
            }
        });
    });
}

function getSelections(editor: vscode.TextEditor): vscode.Selection[] {
    const nonEmptySelections = editor.selections.filter(s => !s.isEmpty);

    if (nonEmptySelections.length > 0) {
        return nonEmptySelections;
    }

    const fullDocumentSelection = new vscode.Selection(
        0,
        0,
        editor.document.lineCount - 1,
        editor.document.lineAt(editor.document.lineCount - 1).range.end.character,
    );

    return [fullDocumentSelection];
}

export function deactivate() { }
