import type { CurrencyCode } from "../preferences/preferencesSlice";

export function formatCurrency(amountCents: number, currencyCode: CurrencyCode) {
  if (currencyCode === "LKR") {
    return `Rs ${new Intl.NumberFormat("en-LK", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amountCents / 100)}`;
  }

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
