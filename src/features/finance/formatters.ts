export function formatCurrency(amountCents: number, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    currency: currencyCode,
    style: "currency",
  }).format(amountCents / 100);
}

export function formatTransactionDate(createdAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  }).format(new Date(createdAt));
}
