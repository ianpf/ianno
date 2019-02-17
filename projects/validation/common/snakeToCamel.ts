export function snakeToCamel(str: string) {
    return str.replace(/(\-\w)/g, (char: string) => char[1].toUpperCase());
}
