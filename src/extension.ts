import * as vscode from 'vscode';
import { escape } from './escape';
import { unescape } from './unescape';

export function activate(context: vscode.ExtensionContext) {

    const escapeCmd = vscode.commands.registerCommand('json-escape-unescape.escape', () => {
        return processText(escape);
    });

    const unescapeCmd = vscode.commands.registerCommand('json-escape-unescape.unescape', () => {
        return processText(unescape);
    });

    context.subscriptions.push(escapeCmd, unescapeCmd);
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
