import * as vscode from 'vscode';
import { addSelectedResourcesToFilesExclude } from './commands/add-to-files-exclude';
import { COMMAND_ID } from './constants';

/**
 * 激活扩展并注册命令处理器。
 */
export function activate(context: vscode.ExtensionContext): void {
	/** 可释放的命令注册对象，绑定扩展生命周期。 */
	const disposable = vscode.commands.registerCommand(
		COMMAND_ID,
		async (resource: vscode.Uri, selectedResources?: vscode.Uri[]) => {
			await addSelectedResourcesToFilesExclude(resource, selectedResources);
		}
	);

	/** 扩展卸载时自动清理命令注册。 */
	context.subscriptions.push(disposable);
}
/**
 * 扩展停用入口。
 */
export function deactivate(): void {
	/** 当前没有需要清理的资源。 */
}
