"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useSessionExpired } from "@/hooks/auth/use-session-expired";
import { useRouter } from "@/i18n/navigation";
import {
  createCardCheckoutSessionAction,
  createCashOrderAction,
} from "@/lib/actions/checkout.action";
import { addAddressAction } from "@/lib/actions/user.action";
import { unwrapActionResult } from "@/lib/utils/action-result";
import { AppError } from "@/lib/utils/app-errors";

// Shows why a checkout step failed: the API's own message for a rejected request
// (e.g. an item went out of stock), a generic one for anything unexpected.
function useCheckoutErrorHandler() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { handleSessionExpired } = useSessionExpired();

  return (error: unknown) => {
    if (handleSessionExpired(error)) return;

    const isRejectedRequest = error instanceof AppError && error.statusCode < 500;
    toast.error(isRejectedRequest ? error.message : t("something-went-wrong"));
  };
}

export function useCardCheckout() {
  // Hooks
  const onError = useCheckoutErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (
      urls: CreateCardCheckoutSessionRequest,
    ): Promise<CreateCardCheckoutSessionResponse> => {
      return unwrapActionResult(await createCardCheckoutSessionAction(urls));
    },
    onSuccess: (response) => {
      window.location.href = response.data.checkoutUrl;
    },
    onError,
  });
}

export function useCashCheckout() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Hooks
  const onError = useCheckoutErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (): Promise<CreateCashOrderResponse> => {
      return unwrapActionResult(await createCashOrderAction());
    },
    onSuccess: () => {
      toast.success(t("cash-order-success"));
      router.refresh();
    },
    onError,
  });
}

export function useAddAddress() {
  // Navigation
  const router = useRouter();

  // Hooks
  const onError = useCheckoutErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (address: AddAddressRequest): Promise<MeResponse> => {
      return unwrapActionResult(await addAddressAction(address));
    },
    onSuccess: () => {
      // The checkout page reads the saved addresses on the server.
      router.refresh();
    },
    onError,
  });
}
