import { HorizonRow, HorizonsData } from './types';
import { formatCostRate } from './formatters';

export function buildRows(data: HorizonsData): HorizonRow[] {
  const costs = data.revenue.map(value => Math.round(value * data.costRate * 100) / 100);
  const income = data.revenue.map((value, index) => value - costs[index]);
  const totalCharges = data.years.map((year, index) =>
    data.operations.reduce((sum, operation) => sum + operation.charges[index], 0)
  );
  const totalPrincipal = data.years.map((year, index) =>
    data.operations.reduce((sum, operation) => sum + operation.principal[index], 0)
  );
  const operationRows = (field: 'charges' | 'principal'): HorizonRow[] =>
    data.operations.map(operation => ({
      id: field + '-' + operation.code,
      label: operation.code,
      description: operation.description,
      kind: 'operation',
      values: operation[field],
    }));

  return [
    {
      id: 'revenue', label: 'Faturamento', kind: 'normal', values: data.revenue,
      description: 'Faturamento retornado da consulta ou informado pelo analista, acrescido de aportes.',
    },
    {
      id: 'costs', label: 'Custos', kind: 'normal', values: costs,
      description: 'Parâmetro de porte e atividade (' + formatCostRate(data.costRate) + ') aplicado sobre a receita.',
    },
    {
      id: 'income', label: 'Rédito', kind: 'normal', values: income,
      description: 'Receitas – Custos.',
    },
    { id: 'charges-section', label: 'Encargos por operação', kind: 'section', values: [] },
    ...operationRows('charges'),
    { id: 'charges-total', label: 'Total de encargos', kind: 'total', values: totalCharges },
    {
      id: 'net-income', label: 'Lucro líquido', kind: 'result',
      description: 'Rédito – Total de encargos.',
      values: income.map((value, index) => value - totalCharges[index]),
    },
    { id: 'principal-section', label: 'Principal por operação', kind: 'section', values: [] },
    ...operationRows('principal'),
    { id: 'principal-total', label: 'Total do principal', kind: 'total', values: totalPrincipal },
    {
      id: 'capacity', label: '% utilização da capacidade', kind: 'capacity',
      description: 'Total do principal + Lucro líquido', values: data.utilization,
    },
  ];
}
