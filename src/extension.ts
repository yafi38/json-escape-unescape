import * as vscode from 'vscode';
import { escape } from './escape';
import { unescape } from './unescape';
import { processText } from './processText';

export function activate(context: vscode.ExtensionContext) {

    const escapeCmd = vscode.commands.registerCommand('json-escape-unescape.escape', () => {
        return processText(escape);
    });

    const unescapeCmd = vscode.commands.registerCommand('json-escape-unescape.unescape', () => {
        return processText(unescape);
    });

    context.subscriptions.push(escapeCmd, unescapeCmd);
}

export function deactivate() { }
