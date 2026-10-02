import type * as NextIntl from "next-intl";
import { z } from "zod";

type Translator = ReturnType<typeof NextIntl.useTranslations>;

export const addressSchema = (t: Translator) => {
  return z.object({
    label: z.string().trim().max(45).optional(),
    city: z.string().trim().min(1, t("city-required")),
    street: z.string().trim().min(1, t("street-required")),
  });
};

export type AddressFields = z.infer<ReturnType<typeof addressSchema>>;
