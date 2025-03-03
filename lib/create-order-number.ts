
export function createOrderNumber(): string {
    return Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
}
