import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const escapeCmd = vscode.commands.registerCommand('json-escape-unescape.escape', () => {
        return processText((text) => {
            return JSON.stringify(text).slice(1, -1);
        });
    });

    const unescapeCmd = vscode.commands.registerCommand('json-escape-unescape.unescape', () => {
        return processText((text) => {
            try {
                const cleanText = text.replace(/^"|"$/g, '');

                return JSON.parse(`"${cleanText}"`);
            } catch (e) {
                vscode.window.showErrorMessage('Failed to unescape: Invalid JSON string');

                return text;
            }
        });
    });

    context.subscriptions.push(escapeCmd, unescapeCmd);
}

function processText(transform: (text: string) => string): Thenable<boolean> | void {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    return editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const text = editor.document.getText(selection);

            if (text) {
                editBuilder.replace(selection, transform(text));
            }
        });
    });
}

export function deactivate() { }
