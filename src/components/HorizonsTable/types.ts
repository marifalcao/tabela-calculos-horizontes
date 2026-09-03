export interface HorizonOperation {
  code: string;
  description: string;
  charges: number[];
  principal: number[];
}

/** Annual arrays follow the same order as years. Values are in reais, not cents. */
export interface HorizonsData {
  years: number[];
  revenue: number[];
  costRate: number;
  operations: HorizonOperation[];
  /** Percentages supplied by the caller; no capacity formula is assumed here. */
  utilization: number[];
}

export interface HorizonsTableProps {
  data: HorizonsData;
}

export interface HorizonRow {
  id: string;
  label: string;
  description?: string;
  kind: 'normal' | 'operation' | 'section' | 'total' | 'result' | 'capacity';
  values: number[];
}
