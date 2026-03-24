import {
  addToBagAction,
  clearBagAction,
  removeBagItemAction,
  updateBagItemAction,
} from "@/lib/actions/bag.action";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    staleTime: 5 * 60 * 1000,
  });
}

// Add bag item
export function useAddToBag() {
  return useMutation({
    mutationFn: async (data: AddToBagRequest): Promise<BagResponse> => {
      return addToBagAction(data);
    },
  });
}

// Update bag item
export function useUpdateBagItem() {
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateBagItemRequest }) => {
      return updateBagItemAction(itemId, data);
    },
  });
}

// Remove bag item
export function useRemoveBagItem() {
  return useMutation({
    mutationFn: async (itemId: string): Promise<BagResponse> => {
      return removeBagItemAction(itemId);
    },
  });
}

// Clear bag
export function useClearBag() {
  return useMutation({
    mutationFn: async (): Promise<BagResponse> => {
      return clearBagAction();
    },
  });
}
