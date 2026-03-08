import * as vscode from 'vscode';

/**
 * 本地化字符串辅助函数。
 */
export function t(key: string, ...args: string[]): string {
	/** 按顺序透传占位符参数给本地化格式化器。 */
	return vscode.l10n.t(key, ...args);
}
