export function camelToSnake(str: string) {
    return str.replace(/([A-Z])/g, (char: string) => '_' + char.toLowerCase());
}
