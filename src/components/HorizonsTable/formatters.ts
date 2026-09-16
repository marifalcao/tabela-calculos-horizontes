const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentageFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const rateFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number): string => value === 0 ? '—' : currencyFormatter.format(value);
export const formatPercentage = (value: number): string => percentageFormatter.format(value) + '%';
export const formatCostRate = (value: number): string => rateFormatter.format(value);
