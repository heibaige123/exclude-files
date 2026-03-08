# Exclude Files

[中文](./README.md) | [English](./README.en.md)

Right-click files or folders in Explorer and add them to the current workspace `files.exclude` with one action.

## Features

- Explorer context menu command: `Exclude: Add To files.exclude`
- Supports single and multi-selection (both files and folders)
- Automatically handles workspace scope (including multi-root workspaces)
- Writes selected targets to `files.exclude` with value `true`
- Built-in English and Chinese UI text, auto-adapts to VS Code display language

## Usage

1. In VS Code Explorer, select one or more files/folders.
2. Right-click and choose `Exclude: Add To files.exclude`.
3. The extension updates `.vscode/settings.json` for the current workspace:

```jsonc
{
  "files.exclude": {
    "path/to/target": true
  }
}
```

## Installation

### Option 1: Run in Development Host

- Press `F5` in this extension project
- Test directly in the new `Extension Development Host` window

### Option 2: Install Local VSIX

```bash
pnpm run vsix:package
pnpm run vsix:install
```

Or do both in one command:

```bash
pnpm run vsix:reinstall
```

## Local Development

```bash
pnpm install
pnpm run watch
```

Useful commands:

- `pnpm run check-types`: TypeScript type checking
- `pnpm run lint`: Lint source code
- `pnpm run package`: Production build
- `pnpm run vsix:package`: Build VSIX package

## Scripts Quick Reference

- `pnpm run watch`: dev mode (`tsc` + `esbuild` watch)
- `pnpm run compile`: one-shot build (type check + lint + bundle)
- `pnpm run vsix:package`: generate `exclude-files-<version>.vsix`
- `pnpm run vsix:install`: install current VSIX into local VS Code
- `pnpm run vsix:reinstall`: package then install (best for iteration)

## FAQ

### 1. Why is the context command not visible?

- Make sure you right-click a file/folder in Explorer (not editor blank area).
- The command is shown only for local filesystem resources (`resourceScheme == file`).
- In the dev host, try `Developer: Reload Window` after first load.

### 2. Why is `files.exclude` not updated?

- Ensure selected targets are inside the current workspace folder.
- In multi-root workspaces, the extension updates the corresponding root `.vscode/settings.json`.
- If an entry is already `true`, it will be skipped.

### 3. VSIX packaging failed. What should I check?

- Run: `pnpm install`
- Then run: `pnpm run vsix:package`
- Inspect the first `vsce` error line in terminal output.

## Local Release Flow

1. Update `version` in `package.json`
2. Package VSIX: `pnpm run vsix:package`
3. Install locally: `pnpm run vsix:install`
4. Verify context command and i18n in Extension Development Host

## Roadmap

- Support removing selected items from `files.exclude`
- Support batch management via command palette
- Optional write support for `search.exclude`

## i18n

- Manifest strings: `package.nls.json`, `package.nls.zh-cn.json`
- Runtime strings: `l10n/bundle.l10n.json`, `l10n/bundle.l10n.zh-cn.json`

VS Code automatically picks the matching language by display locale.

## Known Limitations

- Currently supports Explorer resources with `resourceScheme == file` only.
- Current behavior writes `files.exclude = true` directly and does not create conditional objects such as `{ "when": ... }`.

## License

[MIT](./LICENSE)
