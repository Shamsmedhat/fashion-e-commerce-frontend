"use client";

import { useSession } from "next-auth/react";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAddToBag } from "@/hooks/bag/use-bag";

// Type
type AddToBagButtonProps = {
  productId: string;
  variantSku: string;
  disabled?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showIcon?: boolean;
  children?: React.ReactNode;
};

export default function AddToBagButton({
  productId,
  variantSku,
  disabled = false,
  className,
  size = "default",
  variant = "default",
  showIcon = true,
  children,
}: AddToBagButtonProps) {
  // Translations
  const t = useTranslations();

  // States
  const { data: session } = useSession();

  // Hooks
  const { mutate: addToBag, isPending } = useAddToBag();
  const router = useRouter();

  // Functions
  async function handleAddToBag(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/auth/login?callbackUrl=" + encodeURIComponent(window.location.pathname));
      return;
    }

    addToBag(
      {
        productId,
        variantSku,
        quantity: 1,
      },
      {
        onSuccess: (data) => {
          const productName = data.data.bag.items.at(-1)?.productName;
          toast.success(`${productName} ${t("added-to-bag")}!`);
        },
        onError: () => {
          toast.error(t("some-thing-went-wrong"));
        },
      },
    );
  }

  return (
    <Button
      onClick={handleAddToBag}
      disabled={disabled || isPending}
      size={size}
      variant={variant}
      className={cn(className)}
      type="button"
      aria-label={!children ? t("add-to-bag") : undefined}
    >
      {showIcon && <ShoppingBag className="w-5 h-5" aria-hidden="true" />}
      {isPending ? (
        <span className="flex space-x-2 justify-center items-center" role="status" aria-live="polite">
          <span>{t("adding")}</span>
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
