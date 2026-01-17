import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToBagAction,
  updateBagItemAction,
  removeBagItemAction,
  clearBagAction,
} from "@/lib/actions/bag.actions";

// Get item variants
interface UseProductOptions {
  productId: string | undefined;
  enabled?: boolean;
}

export function useProductsVariants({ productId, enabled = true }: UseProductOptions) {
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
    // 5 min cache
    staleTime: 5 * 60 * 1000,
  });
}

// Add item to bag
export function useAddToBag() {
  return useMutation({
    mutationFn: async (data: AddToBagRequest): Promise<BagResponse> => {
      const result = await addToBagAction(data);

      if ("code" in result) {
        throw new Error(result.message || "Failed to add item to bag");
      }

      return result;
    },
  });
}

// Update bag item
export function useUpdateBagItem() {
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateBagItemRequest }) => {
      const result = await updateBagItemAction(itemId, data);

      if ("code" in result) {
        throw new Error(result.message || "Failed to update bag item");
      }

      return result;
    },
  });
}

// Remove item from bag
export function useRemoveBagItem() {
  return useMutation({
    mutationFn: async (itemId: string): Promise<BagResponse> => {
      const result = await removeBagItemAction(itemId);

      if ("code" in result) {
        throw new Error(result.message || "Failed to remove bag item");
      }

      return result;
    },
  });
}

// Clear all bag items
export function useClearBag() {
  return useMutation({
    mutationFn: async (): Promise<BagResponse> => {
      const result = await clearBagAction();

      if ("code" in result) {
        throw new Error(result.message || "Failed to clear bag");
      }

      return result;
    },
  });
}
