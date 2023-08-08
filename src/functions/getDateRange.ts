export function getDateRange(): { from: string, to: string } {
  const currentDate = new Date();
  const from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split("T")[0];
  const to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split("T")[0];

  return { from, to };
}