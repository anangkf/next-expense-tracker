export function formatCurrency({
  value,
  currency,
  locale = "id-ID",
  decimal = 2,
}: {
  value: string | number;
  currency: string;
  locale?: string;
  decimal?: number;
}) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: decimal,
  });
  return formatter.format(Number(value));
}
