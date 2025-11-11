// utils/menuStats.ts

import type { MenuItem } from "../App";

/**
 * Groups menu items by course.
 * Uses a `for` loop as required by POE criteria.
 */
export function groupByCourse(items: MenuItem[]) {
  const grouped: { [course: string]: MenuItem[] } = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!grouped[item.course]) {
      grouped[item.course] = [];
    }
    grouped[item.course].push(item);
  }

  return grouped;
}

/**
 * Counts total menu items.
 * Uses a `while` loop as required.
 */
export function countItems(items: MenuItem[]) {
  let count = 0;
  let index = 0;

  while (index < items.length) {
    count++;
    index++;
  }

  return count;
}

/**
 * Calculates average price per course.
 * Uses `for...in` loop as required.
 */
export function calculateAverages(grouped: { [course: string]: MenuItem[] }) {
  const averages: { [course: string]: number } = {};

  for (const course in grouped) {
    const dishes = grouped[course];
    let total = 0;

    for (let i = 0; i < dishes.length; i++) {
      total += dishes[i].price;
    }

    averages[course] = total / dishes.length;
  }

  return averages;
}
