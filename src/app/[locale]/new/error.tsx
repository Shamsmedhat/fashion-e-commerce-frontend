"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type NewArrivalsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NewArrivalsError({ error, reset }: NewArrivalsErrorProps): JSX.Element {
  // Translations
  const t = useTranslations();

  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center bg-white">
      {/* Message */}
      <h1 className="text-red-500 font-bold text-2xl uppercase text-center">
        {t("new-arrivals-error-message")}
      </h1>

      <p className="text-muted-foreground text-center">{error.message}</p>

      {/* Retry */}
      <Button variant="secondary" onClick={reset} className="uppercase">
        {t("new-arrivals-retry")}
      </Button>
    </main>
  );
}
