import { LoginFields } from "@/lib/schemes/auth.schema";
import { AppError } from "@/lib/utils/app-errors";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {
  // Translations
  const t = useTranslations();

  // Navigation
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ emailOrPhone, password }: LoginFields) => {
      let phone;
      let email;
      if (emailOrPhone.startsWith("01")) {
        phone = emailOrPhone;
      } else {
        email = emailOrPhone;
      }

      const response = await signIn("credentials", {
        ...(phone !== undefined ? { phone } : { email }),
        password,
        redirect: false,
        callbackUrl: decodeURIComponent(searchParams.get("callbackUrl") || "/"),
      });

      if (!response?.ok || response.error) {
        throw new AppError(
          response?.error ?? "Authentication failed",
          response?.status ?? 401,
          "authentication",
        );
      }

      return response;
    },
    onSuccess: (data) => {
      toast.success(t("login-success-msg"));

      window.location.href = data?.url || "/";
    },
  });

  return { isPending, error, login: mutate };
}
