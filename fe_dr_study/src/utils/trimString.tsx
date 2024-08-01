export function trimString(input: string, length: number) {
    const maxLength = length;
    if (input.length <= maxLength) {
        return input;
    }
    return input.slice(0, maxLength) + '...';
}
