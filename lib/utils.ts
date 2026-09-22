export function formatName(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizeCpf(value: string): string {
  return value.replace(/\D/g, '');
}

export function isFilled(value?: string | null): boolean {
  return typeof value === 'string' ? value.trim().length > 0 : false;
}
