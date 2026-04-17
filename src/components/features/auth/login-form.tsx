"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFields, loginSchema as createLoginSchema } from "@/lib/schemes/auth.schema";
import { PasswordInput } from "@/components/shared/password-input";
import SubmitFeedback from "@/components/shared/submit-feedback";
import { Link } from "@/i18n/navigation";
import useLogin from "@/hooks/auth/use-login";
import { Skeleton } from "@/components/ui/skeleton";

function FormSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

function LoginFormContent() {
  // Translation
  const t = useTranslations();

  // Hooks
  const loginSchema = createLoginSchema(t);
  const { isPending, error, login } = useLogin();

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<LoginFields> = (values) => {
    login(values);
  };

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl">{t("login")}</CardTitle>

        {/* Description */}
        <CardDescription>{t("login-description")}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email or Phone */}
            <FormField
              control={form.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("email-phone-label") || "Email or Phone"}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("email-phone-placeholder")}
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("password-label")}</FormLabel>

                  {/* Field */}
                  <FormControl className="relative">
                    <PasswordInput
                      {...field}
                      autoComplete="current-password"
                      placeholder="•••••••••••"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Feedback */}
            <div role="alert" aria-live="assertive">
              <SubmitFeedback>{error?.message}</SubmitFeedback>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
            >
              {t("login")}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t.rich("dont-have-account", {
            button: (v) => (
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/auth/register">{v}</Link>
              </Button>
            ),
          })}
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <LoginFormContent />
    </Suspense>
  );
}
