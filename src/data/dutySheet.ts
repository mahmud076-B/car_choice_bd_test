export type DutyRow = {
  id: string;
  brand: string;
  model: string;
  chassis: string;
  year: number;
  cc: number;
  dutyBdt: number;
};

/**
 * Starting duty sheet. These figures are showroom samples, not an NBR
 * assessment. Staff replace them from Admin → Duty sheet.
 */
export function lookupDuty(
  rows: DutyRow[],
  query: {
    brand: string;
    model: string;
    chassis: string;
    year: string;
    cc: string;
  }
): DutyRow | null {
  return (
    rows.find(
      (row) =>
        row.brand === query.brand &&
        row.model === query.model &&
        row.chassis === query.chassis &&
        String(row.year) === query.year &&
        String(row.cc) === query.cc
    ) ?? null
  );
}

export const DEFAULT_DUTY_SHEET: DutyRow[] = [
  { id: "d-harrier-24", brand: "Toyota", model: "Harrier", chassis: "AXUH80", year: 2024, cc: 2000, dutyBdt: 3250000 },
  { id: "d-harrier-22", brand: "Toyota", model: "Harrier", chassis: "AXUH80", year: 2022, cc: 2000, dutyBdt: 2850000 },
  { id: "d-harrier-20", brand: "Toyota", model: "Harrier", chassis: "ZSU60", year: 2020, cc: 2000, dutyBdt: 2450000 },
  { id: "d-harrier-18", brand: "Toyota", model: "Harrier", chassis: "ZSU60", year: 2018, cc: 2000, dutyBdt: 1980000 },
  { id: "d-prado-23", brand: "Toyota", model: "Land Cruiser Prado", chassis: "GDJ150", year: 2023, cc: 2800, dutyBdt: 6200000 },
  { id: "d-prado-21", brand: "Toyota", model: "Land Cruiser Prado", chassis: "GDJ150", year: 2021, cc: 2800, dutyBdt: 5400000 },
  { id: "d-premio-21", brand: "Toyota", model: "Premio", chassis: "NZT260", year: 2021, cc: 1500, dutyBdt: 1450000 },
  { id: "d-premio-19", brand: "Toyota", model: "Premio", chassis: "NZT260", year: 2019, cc: 1800, dutyBdt: 1680000 },
  { id: "d-cross-23", brand: "Toyota", model: "Corolla Cross", chassis: "ZVG11", year: 2023, cc: 1800, dutyBdt: 2100000 },
  { id: "d-noah-22", brand: "Toyota", model: "Noah", chassis: "ZWR90", year: 2022, cc: 1800, dutyBdt: 2350000 },
  { id: "d-vezel-22", brand: "Honda", model: "Vezel", chassis: "RV5", year: 2022, cc: 1500, dutyBdt: 1650000 },
  { id: "d-vezel-19", brand: "Honda", model: "Vezel", chassis: "RU3", year: 2019, cc: 1500, dutyBdt: 1280000 },
  { id: "d-xtrail-23", brand: "Nissan", model: "X-Trail", chassis: "T33", year: 2023, cc: 1500, dutyBdt: 2200000 },
];
