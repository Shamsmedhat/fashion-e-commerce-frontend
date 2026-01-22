import { useRouter } from "@/i18n/routing";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { registerAction } from "../_actions/register.action";
import catchError from "@/lib/utils/catch-error";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useRegister() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistrationFields) => {
      const [data, err] = await catchError(registerAction(fields));

      if (err) {
        throw err;
      }

      return data;
    },
    onSuccess: () => {
      toast.success(t("registration-success-msg"));
      router.push(`/auth/login?${searchParams.toString()}`);
    },
  });

  return { isPending, error, register: mutate };
}
