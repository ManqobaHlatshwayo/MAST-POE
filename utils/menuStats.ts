import type { MenuItem } from "../App";

export function averagePriceByCourse(items: MenuItem[]): Record<string, number> {
  const totals: Record<string, { sum: number; count: number }> = {};
  for (const item of items) {
    const course = item.course;
    if (!totals[course]) totals[course] = { sum: 0, count: 0 };
    totals[course].sum += item.price;
    totals[course].count++;
  }
  const averages: Record<string, number> = {};
  for (const course in totals) {
    const { sum, count } = totals[course];
    averages[course] = Number((sum / count).toFixed(2));
  }
  return averages;
}
