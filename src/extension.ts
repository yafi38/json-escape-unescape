import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let escapeCmd = vscode.commands.registerCommand('json-escape-unescape.escape', () => {
        processText((text) => {
            return JSON.stringify(text).slice(1, -1);
        });
    });

    let unescapeCmd = vscode.commands.registerCommand('json-escape-unescape.unescape', () => {
        processText((text) => {
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

function processText(transform: (text: string) => string) {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const text = editor.document.getText(selection);

            if (text) {
                editBuilder.replace(selection, transform(text));
            }
        });
    });
}

export function deactivate() { }
