import * as vscode from 'vscode';
import { WorkspaceUriGroup } from '../types';

/**
 * 按所属工作区文件夹对 URI 进行分组。
 */
export function groupUrisByWorkspace(uris: vscode.Uri[]): Map<string, WorkspaceUriGroup> {
	/** 以工作区 URI 字符串为键，保证分组稳定。 */
	const groupedByWorkspace = new Map<string, WorkspaceUriGroup>();

	for (const uri of uris) {
		/** 解析当前资源所属的工作区。 */
		const folder = vscode.workspace.getWorkspaceFolder(uri);
		if (!folder) {
			continue;
		}

		/** 当前工作区的分组键。 */
		const workspaceKey = folder.uri.toString();
		/** 已存在的分组对象（如果有）。 */
		const existingGroup = groupedByWorkspace.get(workspaceKey);

		if (existingGroup) {
			existingGroup.uris.push(uri);
			continue;
		}

		groupedByWorkspace.set(workspaceKey, { folder, uris: [uri] });
	}

	return groupedByWorkspace;
}
