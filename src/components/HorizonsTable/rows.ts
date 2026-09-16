import { HorizonRow, HorizonsData, HorizonOperation } from "./types";

export function sumOperationCharges(
  operation: HorizonOperation,
  years: number[],
): number[] {
  return years.map((year, index) =>
    operation.charges.reduce((sum, charge) => sum + charge.values[index], 0),
  );
}

export function buildRows(data: HorizonsData): HorizonRow[] {
  const costs = data.revenue.map(
    (value) => Math.round(value * data.costRate * 100) / 100,
  );
  const income = data.revenue.map((value, index) => value - costs[index]);
  const subtotals = data.operations.map((operation) =>
    sumOperationCharges(operation, data.years),
  );
  const totalCharges = data.years.map((year, index) =>
    subtotals.reduce((sum, values) => sum + values[index], 0),
  );
  const netIncome = income.map((value, index) => value - totalCharges[index]);
  const paymentCapacity = netIncome.map(
    (value, index) => value + data.contributions[index],
  );
  const chargeRows = data.operations.reduce<HorizonRow[]>(
    (rows, operation, operationIndex) => {
      rows.push({
        id: "charges-" + operation.code,
        label: operation.code,
        description: operation.description,
        kind: "chargeGroup",
        values: [],
      });
      rows.push(
        ...operation.charges.map(
          (charge, index): HorizonRow => ({
            id: "charge-" + operation.code + "-" + index,
            label: charge.name,
            kind: "charge",
            values: charge.values,
          }),
        ),
      );
      rows.push({
        id: "charges-subtotal-" + operation.code,
        label: "Total da operação",
        kind: "chargeSubtotal",
        values: subtotals[operationIndex],
      });
      return rows;
    },
    [],
  );
  const totalPrincipal = data.years.map((year, index) =>
    data.operations.reduce(
      (sum, operation) => sum + operation.principal[index],
      0,
    ),
  );
  const utilization = data.years.map((year, index) =>
    paymentCapacity[index] > 0
      ? (totalPrincipal[index] / paymentCapacity[index]) * 100
      : 0,
  );
  const principalRows: HorizonRow[] = data.operations.map((operation) => ({
    id: "principal-" + operation.code,
    label: operation.code,
    description: operation.description,
    kind: "operation",
    values: operation.principal,
  }));

  return [
    {
      id: "revenue",
      label: "Receitas",
      kind: "normal",
      values: data.revenue,
      description: "Faturamento informado ou consultado.",
    },
    {
      id: "costs",
      label: "Custos",
      kind: "normal",
      values: costs,
      description: "Custos estimados com base no parâmetro de porte e atividade.",
    },
    {
      id: "income",
      label: "Rédito",
      kind: "normal",
      values: income,
      description: "Receitas menos custos.",
    },
    {
      id: "charges-section",
      label: "Encargos por operação",
      kind: "section",
      values: [],
    },
    ...chargeRows,
    {
      id: "charges-total",
      label: "Total de encargos",
      kind: "total",
      values: totalCharges,
    },
    {
      id: "net-income",
      label: "Lucro líquido",
      kind: "result",
      description: "Rédito menos o total de encargos.",
      values: netIncome,
    },
    {
      id: "contributions",
      label: "Aportes",
      kind: "normal",
      description: "Recursos adicionais considerados no período.",
      values: data.contributions,
    },
    {
      id: "payment-capacity",
      label: "Capacidade de pagamento",
      kind: "result",
      description: "Lucro líquido mais aportes.",
      values: paymentCapacity,
    },
    {
      id: "principal-section",
      label: "Principal por operação",
      kind: "section",
      values: [],
    },
    ...principalRows,
    {
      id: "principal-total",
      label: "Total do principal",
      kind: "total",
      values: totalPrincipal,
    },
    {
      id: "capacity",
      label: "% de utilização da capacidade",
      kind: "capacity",
      description: "Total do principal dividido pela capacidade de pagamento.",
      values: utilization,
    },
  ];
}
