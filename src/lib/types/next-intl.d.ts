import { routing } from "@/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Formats: {
      number: {
        digit: Intl.NumberFormatOptions;
        currency: Intl.NumberFormatOptions;
        currencyInteger: Intl.NumberFormatOptions;
      };
    };
  }
}
