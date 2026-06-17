"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { createCardCheckoutSessionAction, createCashOrderAction } from "@/lib/actions/checkout.action";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AppError } from "@/lib/utils/app-errors";

export function useCardCheckout() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Mutation
  return useMutation({
    mutationFn: async ({
      successUrl,
      cancelUrl,
    }: CreateCardCheckoutSessionRequest): Promise<CreateCardCheckoutSessionResponse> => {
      return createCardCheckoutSessionAction({ successUrl, cancelUrl });
    },
    onSuccess: (response) => {
      const checkoutUrl = response.data.checkoutUrl;
      window.location.href = checkoutUrl;
    },
    onError: (error: unknown) => {
      if (error instanceof AppError && error.isAuthentication) {
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error(t("something-went-wrong"));
    },
  });
}

export function useCashCheckout() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Mutation
  return useMutation({
    mutationFn: async (): Promise<CreateCashOrderResponse> => {
      return createCashOrderAction();
    },
    onSuccess: () => {
      toast.success(t("cash-order-success"));
      router.refresh();
    },
    onError: (error: unknown) => {
      if (error instanceof AppError && error.isAuthentication) {
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error(t("something-went-wrong"));
    },
  });
}
