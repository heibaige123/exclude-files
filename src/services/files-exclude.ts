import * as vscode from 'vscode';

/**
 * 为单个工作区写入 files.exclude。
 * 返回本次实际新增的条目数量。
 */
export async function updateWorkspaceFilesExclude(
	folder: vscode.WorkspaceFolder,
	relativePaths: Set<string>
): Promise<number> {
	/** 当前工作区作用域下的 files 配置访问器。 */
	const config = vscode.workspace.getConfiguration('files', folder.uri);
	/** 当前 files.exclude 映射（可能为 boolean 或条件对象）。 */
	const currentExclude = config.get<Record<string, boolean | { when?: string }>>('exclude') ?? {};
	/** 用于暂存变更的可变副本。 */
	const nextExclude = { ...currentExclude };
	/** 值从非 true 变为 true 的有效新增数量。 */
	let newlyAddedCount = 0;

	for (const relativePath of relativePaths) {
		/** 已经是 true 的条目直接跳过。 */
		if (nextExclude[relativePath] === true) {
			continue;
		}

		nextExclude[relativePath] = true;
		newlyAddedCount += 1;
	}

	if (newlyAddedCount > 0) {
		await config.update('exclude', nextExclude, vscode.ConfigurationTarget.WorkspaceFolder);
	}

	return newlyAddedCount;
}
