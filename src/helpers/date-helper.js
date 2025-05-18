export function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
