export function getDateRange() {
  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10);

  return {
    from: thirtyDaysAgo,
    to: today
  };
}