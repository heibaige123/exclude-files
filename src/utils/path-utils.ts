/**
 * 将路径分隔符统一为正斜杠。
 */
export function toPosixPath(value: string): string {
	/** files.exclude 的 key 统一使用 POSIX 分隔符。 */
	return value.replace(/\\/g, '/');
}
