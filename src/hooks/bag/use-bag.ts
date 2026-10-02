import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useSessionExpired } from "@/hooks/auth/use-session-expired";
import { useRouter } from "@/i18n/navigation";
import {
  addToBagAction,
  clearBagAction,
  removeBagItemAction,
  updateBagItemAction,
} from "@/lib/actions/bag.action";
import { STALE_TIME_PRODUCT_VARIANTS_MS } from "@/lib/constants/data-cache.constant";
import { unwrapActionResult } from "@/lib/utils/action-result";
import { AppError } from "@/lib/utils/app-errors";

interface UseProductOptions {
  productId: string | undefined;
  enabled?: boolean;
}

// Shows why a bag change failed: the API's own message for a rejected request
// (e.g. not enough stock), a generic one for anything unexpected.
function useBagErrorHandler() {
  // Translations
  const t = useTranslations();

  // Hooks
  const { handleSessionExpired } = useSessionExpired();

  return (error: unknown) => {
    if (handleSessionExpired(error)) return;

    const isRejectedRequest = error instanceof AppError && error.statusCode < 500;
    toast.error(isRejectedRequest ? error.message : t("some-thing-went-wrong"));
  };
}

// Get product variants
export function useProductVariants({ productId, enabled = true }: UseProductOptions) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      return response.json();
    },
    enabled: enabled && !!productId,
    staleTime: STALE_TIME_PRODUCT_VARIANTS_MS,
  });
}

// Add bag item
export function useAddToBag() {
  // Router
  const router = useRouter();

  // Hooks
  const onError = useBagErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (data: AddToBagRequest): Promise<BagResponse> => {
      return unwrapActionResult(await addToBagAction(data));
    },
    onSuccess: () => {
      router.refresh();
    },
    onError,
  });
}

// Update bag item
export function useUpdateBagItem() {
  // Router
  const router = useRouter();

  // Hooks
  const onError = useBagErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateBagItemRequest }) => {
      return unwrapActionResult(await updateBagItemAction(itemId, data));
    },
    onSuccess: () => {
      router.refresh();
    },
    onError,
  });
}

// Remove bag item
export function useRemoveBagItem() {
  // Router
  const router = useRouter();

  // Hooks
  const onError = useBagErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (itemId: string): Promise<BagResponse> => {
      return unwrapActionResult(await removeBagItemAction(itemId));
    },
    onSuccess: () => {
      router.refresh();
    },
    onError,
  });
}

// Clear bag
export function useClearBag() {
  // Router
  const router = useRouter();

  // Hooks
  const onError = useBagErrorHandler();

  // Mutation
  return useMutation({
    mutationFn: async (): Promise<BagResponse> => {
      return unwrapActionResult(await clearBagAction());
    },
    onSuccess: () => {
      router.refresh();
    },
    onError,
  });
}
