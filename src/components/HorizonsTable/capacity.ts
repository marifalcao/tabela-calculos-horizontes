export function getAverageUtilization(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getCapacityState(value: number): 'error' | 'positive' | 'zero' {
  if (value === 0) return 'zero';
  return value > 90 ? 'error' : 'positive';
}

export function getCapacityLabel(value: number): string {
  if (value === 0) return 'Sem utilização';
  return getCapacityState(value) === 'error' ? 'Inadequada' : 'Adequada';
}
