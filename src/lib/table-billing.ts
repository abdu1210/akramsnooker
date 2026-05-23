export type ClubTable = {
  id: string;
  label: string;
  ratePerHour: number;
};

export const CLUB_TABLES: ClubTable[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `snooker-${i + 1}`,
    label: `Snooker Table ${i + 1}`,
    ratePerHour: 40,
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `pool-${i + 1}`,
    label: `Pool Table ${i + 1}`,
    ratePerHour: 30,
  })),
];

export type TableRowBilling = {
  startTime: string;
  endTime: string;
  extraAmount: string;
  total: number | null;
};

export function createEmptyRow(): TableRowBilling {
  return { startTime: "", endTime: "", extraAmount: "", total: null };
}

function timeToMinutes(time: string): number | null {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

/** Hours played between two HH:mm values (supports sessions past midnight). */
export function hoursBetween(startTime: string, endTime: string): number | null {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  if (start === null || end === null) return null;
  let endAdjusted = end;
  if (endAdjusted <= start) endAdjusted += 24 * 60;
  return (endAdjusted - start) / 60;
}

export function calculateTableTotal(
  hours: number,
  ratePerHour: number,
  extraAmount: number,
): number {
  const playCharge = hours * ratePerHour;
  return Math.round((playCharge + extraAmount) * 100) / 100;
}

export function closeTableRow(
  row: TableRowBilling,
  ratePerHour: number,
): { total: number } | { error: string } {
  const hours = hoursBetween(row.startTime, row.endTime);
  if (hours === null || hours <= 0) {
    return { error: "Enter a valid start and end time." };
  }
  const extra = row.extraAmount === "" ? 0 : Number(row.extraAmount);
  if (Number.isNaN(extra) || extra < 0) {
    return { error: "Extra amount must be a valid number (0 or more)." };
  }
  return { total: calculateTableTotal(hours, ratePerHour, extra) };
}
