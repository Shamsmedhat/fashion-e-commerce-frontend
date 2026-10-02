import type * as NextIntl from "next-intl";
import { z } from "zod";

type AuthTranslator = ReturnType<typeof NextIntl.useTranslations>;

// Kept in sync with the user model in the API.
const EGYPTIAN_MOBILE = /^(?:\+20|0)?1[0125][0-9]{8}$/;
const STRONG_PASSWORD = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

type RegisterSchemaOptions = {
  requireCheckoutAddress?: boolean;
};

export const registerSchema = (t: AuthTranslator, options?: RegisterSchemaOptions) => {
  const requireAddr = Boolean(options?.requireCheckoutAddress);

  return z
    .object({
      // Same rules as the API, so a rejected sign-up is caught before it is sent.
      name: z
        .string({ required_error: t("name-required") })
        .trim()
        .min(1, t("name-required"))
        .min(3, t("name-length"))
        .max(20, t("name-length")),
      email: z.string({ required_error: t("email-required") }).email({
        message: t("email-invalid"),
      }),
      phone: z
        .string({ required_error: t("phone-required") })
        .trim()
        .min(1, t("phone-required"))
        .regex(EGYPTIAN_MOBILE, t("phone-invalid")),
      password: z
        .string({ required_error: t("password-required") })
        .min(1, t("password-required"))
        .regex(STRONG_PASSWORD, t("password-rule")),
      passwordConfirm: z.string({
        required_error: t("confirm-password-required") || "Password confirmation is required",
      }),
      deliveryLabel: z.string().trim().optional(),
      deliveryCity: requireAddr
        ? z.string().trim().min(1, t("city-required"))
        : z.string().trim().optional(),
      deliveryStreet: requireAddr
        ? z.string().trim().min(1, t("street-required"))
        : z.string().trim().optional(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("password-mismatch"),
      path: ["passwordConfirm"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof registerSchema>>;

export const loginSchema = (t: AuthTranslator) => {
  return z.object({
    emailOrPhone: z
      .string({
        required_error: t("email-phone-required") || "Email or phone is required",
      })
      .min(1, t("email-phone-required") || "Email or phone is required"),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
};

export type LoginFields = z.infer<ReturnType<typeof loginSchema>>;
