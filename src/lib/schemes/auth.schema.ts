import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  // Translation
  const t = useTranslations();

  return z
    .object({
      name: z
        .string({ required_error: t("name-required") || "Name is required" })
        .min(1, t("name-required") || "Name is required"),
      email: z.string({ required_error: t("email-required") }).email({
        message: t("email-invalid"),
      }),
      phone: z.string({ required_error: t("phone-required") }).min(1, t("phone-required")),
      password: z.string({ required_error: t("password-required") }).min(8, {
        message: t("password-min", { min: 8 }),
      }),
      passwordConfirm: z.string({
        required_error: t("confirm-password-required") || "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("password-mismatch"),
      path: ["passwordConfirm"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    emailOrPhone: z
      .string({
        required_error: t("email-phone-required") || "Email or phone is required",
      })
      .min(1, t("email-phone-required") || "Email or phone is required"),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
