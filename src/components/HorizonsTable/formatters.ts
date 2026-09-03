const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const rateFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number): string => currencyFormatter.format(value);
export const formatPercentage = (value: number): string => percentageFormatter.format(value) + '%';
export const formatCostRate = (value: number): string => rateFormatter.format(value);
