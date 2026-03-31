export function formatDateRange(startDate: string, endDate: string) {
  return `${startDate} - ${endDate}`;
}

export function formatCreatedAtDate(value: string) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
  }).format(new Date(value));
}
