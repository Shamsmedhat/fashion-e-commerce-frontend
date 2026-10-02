"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Rendered inside the locale layout, so a failed page keeps the header, footer and language.
// Production builds replace server error messages with a generic one, so none is shown here.
export default function LocaleError({ reset }: LocaleErrorProps) {
  // Translation
  const t = useTranslations();

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Headline */}
      <h1 role="alert" className="text-3xl font-bold text-gray-900">
        {t("something-went-wrong")}
      </h1>

      {/* Action */}
      <Button variant="secondary" onClick={reset}>
        {t("try-again")}
      </Button>
    </main>
  );
}
