export interface HorizonCharge {
  name: string;
  values: number[];
}

export interface HorizonOperation {
  code: string;
  description: string;
  charges: HorizonCharge[];
  principal: number[];
}

/** Annual arrays follow the same order as years. Values are in reais, not cents. */
export interface HorizonsData {
  years: number[];
  revenue: number[];
  costRate: number;
  contributions: number[];
  operations: HorizonOperation[];
}

export interface HorizonsTableProps {
  data: HorizonsData;
}

export interface HorizonRow {
  id: string;
  label: string;
  description?: string;
  kind: 'normal' | 'operation' | 'chargeGroup' | 'charge' | 'chargeSubtotal' | 'section' | 'total' | 'result' | 'capacity';
  values: number[];
}
