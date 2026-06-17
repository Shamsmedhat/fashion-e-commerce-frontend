import { useTranslations } from "next-intl";

export const serviceHighlights = (t: ReturnType<typeof useTranslations>): string[] => {
  return [
    t("complimentary-shipping"),
    t("complimentary-exchanges-and-returns"),
    t("secure-payments"),
    t("signature-packaging"),
  ];
};
