import { useTranslations } from "next-intl";
import RegisterForm from "./_components/register-form";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <main className="min-h-screen flex items-center justify-center flex-col my-4">
      {/* Heading */}
      <h1 className="font-bold text-5xl mt-4 mb-7">{t("newcomer-welcome")}</h1>

      {/* Form */}
      <RegisterForm />
    </main>
  );
}
