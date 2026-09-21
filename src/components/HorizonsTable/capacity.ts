export function getAverageUtilization(
  values: number[],
  include: boolean[] = values.map(() => true),
): number | null {
  const included = values.filter((_, index) => include[index]);
  if (included.length === 0) return null;
  return included.reduce((sum, value) => sum + value, 0) / included.length;
}

export function getCapacityState(value: number): 'error' | 'positive' | 'zero' {
  if (value === 0) return 'zero';
  return value > 90 ? 'error' : 'positive';
}

export function getCapacityLabel(value: number): string {
  if (value === 0) return 'Sem utilização';
  return getCapacityState(value) === 'error' ? 'Inadequada' : 'Adequada';
}
