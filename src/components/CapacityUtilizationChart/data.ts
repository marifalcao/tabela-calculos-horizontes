import { HorizonsData } from '../HorizonsTable/types';
import { buildRows } from '../HorizonsTable/rows';
import { getAverageUtilization } from '../HorizonsTable/capacity';

export const GROUPS = [
  { id: 'renegotiation', label: 'Operações em renegociação' },
  { id: 'outsideRenegotiation', label: 'Operações fora de renegociação' },
  { id: 'scr', label: 'Operações SCR' },
] as const;
export type OperationGroup = typeof GROUPS[number]['id'];
export type OperationGroups = Record<string, OperationGroup>;
export type GroupDetail = { principal: number | null; percentage: number | null; operations: Array<{ code: string; principal: number | null }> };
export type AnnualUtilization = {
  year: number; paymentCapacity: number | null; totalPrincipal: number | null;
  groups: Record<OperationGroup, GroupDetail>; total: number | null; difference: number | null;
};
export type ChartData = { years: AnnualUtilization[]; average: number | null };
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

export function prepareChartData(data: HorizonsData, classification: OperationGroups): ChartData {
  if (new Set(data.years).size !== data.years.length || !data.years.every(finite)) throw new Error('Os anos devem ser únicos e válidos.');
  const codes = data.operations.map(operation => operation.code);
  if (new Set(codes).size !== codes.length) throw new Error('Há operações duplicadas. Revise os dados para evitar dupla contagem.');
  if (codes.some(code => !GROUPS.some(group => group.id === classification[code]))) throw new Error('Classifique cada operação em exatamente um dos três grupos.');
  const rows = buildRows(data);
  const capacities = rows.find(row => row.id === 'payment-capacity')!.values;
  const totals = rows.find(row => row.id === 'principal-total')!.values;
  const utilization = rows.find(row => row.id === 'capacity')!.values;
  const years: AnnualUtilization[] = data.years.map((year, index) => {
    const completeBase = finite(data.revenue[index]) && finite(data.costRate) && finite(data.contributions[index])
      && data.operations.every(operation => operation.charges.every(charge => finite(charge.values[index])));
    const paymentCapacity = completeBase && finite(capacities[index]) ? capacities[index] : null;
    const groups = {} as AnnualUtilization['groups'];
    GROUPS.forEach(group => {
      const operations = data.operations.filter(operation => classification[operation.code] === group.id).map(operation => ({ code: operation.code, principal: finite(operation.principal[index]) && operation.principal[index] >= 0 ? operation.principal[index] : null }));
      const sum = operations.every(operation => operation.principal !== null) ? operations.reduce((total, operation) => total + operation.principal!, 0) : null;
      const principal = finite(sum) ? sum : null;
      // Preserve the table's existing rule for non-positive capacity; never divide by zero.
      const contribution = principal !== null && paymentCapacity !== null ? paymentCapacity > 0 ? principal / paymentCapacity * 100 : 0 : null;
      groups[group.id] = { principal, percentage: finite(contribution) ? contribution : null, operations };
    });
    const completePrincipal = GROUPS.every(group => groups[group.id].principal !== null);
    const totalPrincipal = completePrincipal && finite(totals[index]) ? totals[index] : null;
    const total = totalPrincipal !== null && paymentCapacity !== null && finite(utilization[index]) ? utilization[index] : null;
    return { year, paymentCapacity, totalPrincipal, groups, total, difference: null };
  }).sort((a, b) => a.year - b.year);
  const average = years.every(year => year.total !== null) ? getAverageUtilization(years.map(year => year.total!)) : null;
  return { average, years: years.map(year => ({ ...year, difference: year.total !== null && average !== null ? year.total - average : null })) };
}

const decimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const moneyText = (value: number | null) => value === null ? 'Indisponível' : currency.format(value);
export const percentageText = (value: number | null) => value === null ? 'Indisponível' : decimal.format(value) + '%';
export const differenceText = (value: number | null) => {
  if (value === null) return 'Indisponível';
  const rounded = Math.round(value * 100) / 100;
  return (rounded > 0 ? '+' : '') + decimal.format(rounded === 0 ? 0 : rounded) + ' p.p.';
};
