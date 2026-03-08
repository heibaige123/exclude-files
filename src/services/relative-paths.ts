import * as path from 'node:path';
import * as vscode from 'vscode';
import { toPosixPath } from '../utils/path-utils';

/**
 * 将选中 URI 转换为工作区内去重的 POSIX 相对路径。
 */
export function getUniqueRelativePaths(folder: vscode.WorkspaceFolder, uris: vscode.Uri[]): Set<string> {
	/** 去重集合，避免重复写入与重复计数。 */
	const relativePaths = new Set<string>();

	for (const uri of uris) {
		/** 从工作区根目录到选中资源的相对路径。 */
		const relativePath = toPosixPath(path.relative(folder.uri.fsPath, uri.fsPath));
		if (!relativePath) {
			continue;
		}

		relativePaths.add(relativePath);
	}

	return relativePaths;
}
