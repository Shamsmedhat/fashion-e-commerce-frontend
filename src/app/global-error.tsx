"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Translations
  const t = useTranslations();

  return (
    <html>
      <body>
        <main className="flex flex-col gap-8 min-h-screen items-center justify-center">
          {/* Headline */}
          <h1 className="text-red-500 font-bold text-5xl">{t("something-went-wrong")}</h1>

          {/* Description */}
          <p role="alert">{error.message}</p>

          {/* Action */}
          <Button variant="secondary" onClick={reset}>
            {t("try-again")}
          </Button>
        </main>
      </body>
    </html>
  );
}
