import * as assert from 'assert';
import * as vscode from 'vscode';

suite('JSON Escape / Unescape Extension', () => {
	test('escape command escapes quotes and newlines in selected text', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: 'SELECT *\nFROM "TABLE_A"\nWHERE COLUMN_A = \'ABC\';',
		});

		const editor = await vscode.window.showTextDocument(document);

		const firstLine = document.lineAt(0);
		const lastLine = document.lineAt(document.lineCount - 1);
		editor.selection = new vscode.Selection(
			firstLine.range.start,
			lastLine.range.end,
		);

		await vscode.commands.executeCommand('json-escape-unescape.escape');

		const updatedText = document.getText();
		assert.strictEqual(updatedText, 'SELECT *\\nFROM \\"TABLE_A\\"\\nWHERE COLUMN_A = \'ABC\';');
	});
});
