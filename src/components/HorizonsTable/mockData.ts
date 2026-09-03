import { HorizonsData } from './types';

export const mockData: HorizonsData = {
  years: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // Constant revenue is a demonstration assumption, not a growth projection.
  revenue: [1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400],
  costRate: 0.62,
  operations: [
    {
      code: '004815-2',
      description: 'Capital de giro',
      charges: [20240, 10120, 0, 0, 0, 0, 0, 0, 0, 0],
      principal: [40000, 40000, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: '004829-7',
      description: 'Conta garantida',
      charges: [13095, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      principal: [45000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: '004901-3',
      description: 'Cheque especial PJ',
      charges: [11960, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      principal: [20000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: '004930-8',
      description: 'Financiamento de veículo',
      charges: [12852, 8568, 4284, 0, 0, 0, 0, 0, 0, 0],
      principal: [22667, 22667, 22666, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  utilization: [24.7, 10.9, 3.7, 0, 0, 0, 0, 0, 0, 0],
};
