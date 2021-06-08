export const noDuplicate = (left: string[], right: string[]): string[][] => [
    ...new Set<string[]>([...left, ...right] as Iterable<string[]>),
];
