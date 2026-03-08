# Exclude Files

[中文](./README.md) | [English](./README.en.md)

在资源管理器中右键选择文件或文件夹，一键把它们写入当前工作区的 `files.exclude`。

## 功能

- 资源管理器右键菜单命令：`Exclude: Add To files.exclude`
- 支持单选和多选（文件、文件夹都支持）
- 自动按工作区处理（兼容多根工作区）
- 仅将目标项写入 `files.exclude`，值为 `true`
- 内置中英文文案，默认英文，按 VS Code 语言自动适配

## 使用方式

1. 在 VS Code 资源管理器中选择一个或多个文件/文件夹。
2. 右键点击，选择 `Exclude: Add To files.exclude`。
3. 扩展会更新当前项目（对应工作区）的 `.vscode/settings.json`：

```jsonc
{
	"files.exclude": {
		"path/to/target": true
	}
}
```

## 安装

### 方式一：开发调试

- 在扩展项目中按 `F5`
- 新开的 `Extension Development Host` 窗口中可直接测试

### 方式二：本地 VSIX 安装

```bash
pnpm run vsix:package
pnpm run vsix:install
```

或一步完成：

```bash
pnpm run vsix:reinstall
```

## 本地开发

```bash
pnpm install
pnpm run watch
```

常用命令：

- `pnpm run check-types`：TypeScript 类型检查
- `pnpm run lint`：代码检查
- `pnpm run package`：生产构建
- `pnpm run vsix:package`：打包 VSIX

## 脚本速查

- `pnpm run watch`：开发模式（并行监听 tsc + esbuild）
- `pnpm run compile`：一次性构建（类型检查 + lint + 打包）
- `pnpm run vsix:package`：生成 `exclude-files-<version>.vsix`
- `pnpm run vsix:install`：安装当前版本 VSIX 到本机 VS Code
- `pnpm run vsix:reinstall`：重新打包并安装（本地迭代最常用）

## 常见问题

### 1. 右键菜单里看不到命令

- 请确认是在资源管理器的文件/文件夹上右键（不是编辑器空白区）。
- 请确认资源是本地文件系统（`resourceScheme == file`）。
- 开发调试窗口中首次加载扩展后，尝试 `Developer: Reload Window`。

### 2. 点击后没有写入 `files.exclude`

- 请确认目标位于当前工作区目录内。
- 多根工作区时，会写入对应根目录的 `.vscode/settings.json`。
- 若原值已经是 `true`，会跳过重复写入。

### 3. VSIX 打包失败

- 先执行：`pnpm install`
- 再执行：`pnpm run vsix:package`
- 若仍失败，优先查看终端里 `vsce` 的第一条报错信息。

## 发布流程（本地）

1. 修改版本号：`package.json` 的 `version`
2. 生成包：`pnpm run vsix:package`
3. 本机验证：`pnpm run vsix:install`
4. 在扩展开发宿主窗口验证右键功能与多语言文案

## 后续计划

- 支持一键从 `files.exclude` 移除选中项
- 支持命令面板批量管理 exclude 条目
- 支持可选写入 `search.exclude`

## 多语言（i18n）

- 扩展清单文案：`package.nls.json`、`package.nls.zh-cn.json`
- 运行时文案：`l10n/bundle.l10n.json`、`l10n/bundle.l10n.zh-cn.json`

VS Code 会根据当前显示语言自动选择对应文案。

## 已知限制

- 当前仅支持 `resourceScheme == file` 的资源管理器项。
- 当前行为是直接写入 `files.exclude = true`，不含复杂条件（如 `{ "when": ... }`）。

## License

[MIT](./LICENSE)
