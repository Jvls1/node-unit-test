import { setYear, parseISO } from 'date-fns'

/**
 *
 * @param date "2023-12-26"
 * @returns "2024-12-26"
 */
export function getFutureDate (date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}
