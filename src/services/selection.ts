import * as vscode from 'vscode';

/**
 * 解析命令参数，得到最终的 URI 列表。
 * 当存在多选时，优先使用多选结果。
 */
export function resolveCandidates(
	resource: vscode.Uri | undefined,
	selectedResources: vscode.Uri[] | undefined
): vscode.Uri[] {
	/** 资源管理器是否提供了多选资源。 */
	const hasMultiSelection = Boolean(selectedResources && selectedResources.length > 0);

	if (hasMultiSelection) {
		/** 返回右键多选上下文里的资源列表。 */
		return selectedResources as vscode.Uri[];
	}

	/** 单选场景回退：仅返回当前右键资源。 */
	return resource ? [resource] : [];
}
