"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Locale, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

export function SwitchLocale({ className }: { className?: string }) {
  // Translations
  const locale = useLocale();

  // Navigations
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ];

  // Get the other language (toggle)
  const otherLanguage = languages.find((lang) => lang.code !== locale);

  // Functions
  const toggleLocale = () => {
    if (otherLanguage) {
      router.push(`${pathname}?${searchParams.toString()}`, {
        locale: otherLanguage.code as Locale,
      });
    }
  };

  return (
    <Button
      variant="link"
      size="sm"
      className={cn("gap-1 px-2", className)}
      onClick={toggleLocale}
      type="button"
      aria-label={`Switch language to ${otherLanguage?.name ?? "other language"}`}
    >
      {/* Name */}
      <span className="hidden sm:inline-block">{otherLanguage?.name}</span>

      {/* Icon */}
      <Globe className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
