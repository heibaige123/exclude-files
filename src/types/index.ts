import * as vscode from 'vscode';

/** 按工作区分组后的资源数据结构。 */
export type WorkspaceUriGroup = {
	folder: vscode.WorkspaceFolder;
	uris: vscode.Uri[];
};
