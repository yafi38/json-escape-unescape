export function escape(text: string): string {
    return JSON.stringify(text).slice(1, -1);
}
