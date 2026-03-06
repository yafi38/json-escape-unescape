import * as assert from 'assert';
import * as vscode from 'vscode';

suite('JSON Unescape Tests', () => {
	test('unescape command unescapes characters in selected text', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: 'SELECT *\\nFROM \\"TABLE_A\\"\\nWHERE COLUMN_A = \'ABC\';',
		});

		const editor = await vscode.window.showTextDocument(document);

		const firstLine = document.lineAt(0);
		const lastLine = document.lineAt(document.lineCount - 1);
		editor.selection = new vscode.Selection(
			firstLine.range.start,
			lastLine.range.end,
		);

		await vscode.commands.executeCommand('json-escape-unescape.unescape');

		const updatedText = document.getText();

		assert.strictEqual(
			updatedText,
			`SELECT *\nFROM "TABLE_A"\nWHERE COLUMN_A = 'ABC';`,
		);
	});

	test('unescape command unescapes whole document when there is no selection', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: 'SELECT *\\nFROM \\"TABLE_A\\"\\nWHERE COLUMN_A = \'ABC\';',
		});

		const editor = await vscode.window.showTextDocument(document);
		editor.selection = new vscode.Selection(0, 0, 0, 0);

		await vscode.commands.executeCommand('json-escape-unescape.unescape');

		const updatedText = document.getText();

		assert.strictEqual(
			updatedText,
			`SELECT *\nFROM "TABLE_A"\nWHERE COLUMN_A = 'ABC';`,
		);
	});

	test('unescape command unescapes string with trailing quotes', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: 'SELECT *\\nFROM \\"TABLE_A\\"',
		});

		const editor = await vscode.window.showTextDocument(document);
		editor.selection = new vscode.Selection(0, 0, 0, 0);

		await vscode.commands.executeCommand('json-escape-unescape.unescape');

		const updatedText = document.getText();

		assert.strictEqual(
			updatedText,
			`SELECT *\nFROM "TABLE_A"`,
		);
	});

	test('unescape command unescapes string with missing braces', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: '"file_path": \"C:\\\\Program Files\\\\App\"',
		});

		const editor = await vscode.window.showTextDocument(document);
		editor.selection = new vscode.Selection(0, 0, 0, 0);

		await vscode.commands.executeCommand('json-escape-unescape.unescape');

		const updatedText = document.getText();

		assert.strictEqual(
			updatedText,
			`"file_path": "C:\\Program Files\\App"`,
		);
	});

	test('unescape command unescapes invalid JSON with unicode characters', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: '[ \"Item 1\", \"Item 2\\u00A9\", ]',
		});

		const editor = await vscode.window.showTextDocument(document);
		editor.selection = new vscode.Selection(0, 0, 0, 0);

		await vscode.commands.executeCommand('json-escape-unescape.unescape');

		const updatedText = document.getText();

		assert.strictEqual(
			updatedText,
			`[ "Item 1", "Item 2©", ]`,
		);
	});
});