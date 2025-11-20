export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateId = () => Math.random().toString(36).substring(2, 9);