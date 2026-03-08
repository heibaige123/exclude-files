import * as vscode from 'vscode';
import {
	MSG_ADDED_COUNT,
	MSG_NOT_IN_WORKSPACE,
	MSG_NO_SELECTION,
	MSG_NO_VALID_ITEMS,
} from '../constants';
import { updateWorkspaceFilesExclude } from '../services/files-exclude';
import { getUniqueRelativePaths } from '../services/relative-paths';
import { resolveCandidates } from '../services/selection';
import { groupUrisByWorkspace } from '../services/workspace-grouping';
import { t } from '../utils/i18n';

/**
 * 主流程：将资源管理器中选中的文件/文件夹写入 files.exclude。
 */
export async function addSelectedResourcesToFilesExclude(
	resource: vscode.Uri | undefined,
	selectedResources: vscode.Uri[] | undefined
): Promise<void> {
	/** 从命令参数中解析出的最终候选资源集合。 */
	const candidates = resolveCandidates(resource, selectedResources);

	if (candidates.length === 0) {
		void vscode.window.showWarningMessage(t(MSG_NO_SELECTION));
		return;
	}

	/** 按工作区分组，兼容多根工作区场景。 */
	const groupedByWorkspace = groupUrisByWorkspace(candidates);

	if (groupedByWorkspace.size === 0) {
		void vscode.window.showWarningMessage(t(MSG_NOT_IN_WORKSPACE));
		return;
	}

	/** 实际新增到 files.exclude 的条目数量。 */
	let addedCount = 0;

	for (const group of groupedByWorkspace.values()) {
		/** 当前工作区内去重且标准化后的相对路径集合。 */
		const relativePaths = getUniqueRelativePaths(group.folder, group.uris);
		if (relativePaths.size === 0) {
			continue;
		}

		/** 仅写入有效变更，并累计新增数量。 */
		addedCount += await updateWorkspaceFilesExclude(group.folder, relativePaths);
	}

	if (addedCount === 0) {
		void vscode.window.showWarningMessage(t(MSG_NO_VALID_ITEMS));
		return;
	}

	void vscode.window.showInformationMessage(t(MSG_ADDED_COUNT, String(addedCount)));
}
