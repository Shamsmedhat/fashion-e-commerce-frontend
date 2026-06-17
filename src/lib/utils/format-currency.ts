import { useFormatter } from "next-intl";
import { getFormatter } from "next-intl/server";

export function useFormatCurrency(): {
  formatCurrency: (amount: number) => string;
  formatCurrencyPrecise: (amount: number) => string;
} {
  // Hooks
  const format = useFormatter();

  // Functions
  function formatCurrency(amount: number): string {
    return format.number(amount, "currencyInteger");
  }

  function formatCurrencyPrecise(amount: number): string {
    return format.number(amount, "currency");
  }

  return { formatCurrency, formatCurrencyPrecise };
}

export async function getFormatCurrency() {
  const format = await getFormatter();

  function formatCurrency(amount: number): string {
    return format.number(amount, "currencyInteger");
  }

  function formatCurrencyPrecise(amount: number): string {
    return format.number(amount, "currency");
  }

  return { formatCurrency, formatCurrencyPrecise };
}
