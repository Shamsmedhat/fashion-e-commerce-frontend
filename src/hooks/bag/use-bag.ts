import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";

import {
  addToBagAction,
  clearBagAction,
  removeBagItemAction,
  updateBagItemAction,
} from "@/lib/actions/bag.action";
import { STALE_TIME_PRODUCT_VARIANTS_MS } from "@/lib/constants/data-cache.constant";

interface UseProductOptions {
  productId: string | undefined;
  enabled?: boolean;
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

  // Mutation
  return useMutation({
    mutationFn: async (data: AddToBagRequest): Promise<BagResponse> => {
      return addToBagAction(data);
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}

// Update bag item
export function useUpdateBagItem() {
  // Router
  const router = useRouter();

  // Mutation
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateBagItemRequest }) => {
      return updateBagItemAction(itemId, data);
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}

// Remove bag item
export function useRemoveBagItem() {
  // Router
  const router = useRouter();

  // Mutation
  return useMutation({
    mutationFn: async (itemId: string): Promise<BagResponse> => {
      return removeBagItemAction(itemId);
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}

// Clear bag
export function useClearBag() {
  // Router
  const router = useRouter();

  // Mutation
  return useMutation({
    mutationFn: async (): Promise<BagResponse> => {
      return clearBagAction();
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}
