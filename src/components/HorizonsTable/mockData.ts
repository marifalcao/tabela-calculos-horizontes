import { HorizonsData } from "./types";

export const mockData: HorizonsData = {
  years: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // Constant revenue is a demonstration assumption, not a growth projection.
  revenue: [
    1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400, 1514400,
    1514400, 1514400,
  ],
  costRate: 0.62,
  contributions: [50000, 25000, 10000, 0, 0, 0, 0, 0, 0, 0],
  operations: [
    {
      code: "004815-2",
      description: "Em renegociação",
      charges: [
        { name: "Comissão", values: [12000, 6000, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "Seguro", values: [8240, 4120, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
      principal: [40000, 40000, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: "004829-7",
      description: "Em renegociação",
      charges: [
        { name: "Comissão", values: [13095, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
      principal: [45000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: "004901-3",
      description: "Fora de renegociação",
      charges: [
        { name: "Comissão", values: [11960, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
      principal: [20000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      code: "004930-8",
      description: "SCR",
      charges: [
        { name: "Comissão", values: [12852, 8568, 4284, 0, 0, 0, 0, 0, 0, 0] },
      ],
      principal: [22667, 22667, 22666, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};
