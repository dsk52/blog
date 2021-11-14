export function datetimeToDate(date: string): string {
  const d = new Date(date);

  return `${d.getFullYear()}.${d.getMonth()}.${d.getDay()}`;
}
