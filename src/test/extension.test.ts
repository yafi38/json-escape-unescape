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
		assert.strictEqual(
			updatedText,
			`SELECT *\\nFROM \\"TABLE_A\\"\\nWHERE COLUMN_A = 'ABC';`,
		);
	});

	test('escape command handles multiple selections independently', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: 'SELECT "COLUMN_A"\nFROM "TABLE B"',
		});

		const editor = await vscode.window.showTextDocument(document);

		const firstLineText = document.lineAt(0).text;
		const firstStartCol = firstLineText.indexOf('"COLUMN_A"');
		const firstEndCol = firstStartCol + '"COLUMN_A"'.length;

		const secondLineText = document.lineAt(1).text;
		const secondStartCol = secondLineText.indexOf('"TABLE B"');
		const secondEndCol = secondStartCol + '"TABLE B"'.length;

		const firstSelection = new vscode.Selection(0, firstStartCol, 0, firstEndCol);
		const secondSelection = new vscode.Selection(1, secondStartCol, 1, secondEndCol);
		editor.selections = [firstSelection, secondSelection];

		await vscode.commands.executeCommand('json-escape-unescape.escape');

		const updatedText = document.getText();
		assert.strictEqual(
			updatedText,
			`SELECT \\"COLUMN_A\\"\nFROM \\"TABLE B\\"`,
		);
	});
});
