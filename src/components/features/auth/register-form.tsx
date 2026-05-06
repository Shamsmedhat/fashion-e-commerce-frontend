"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PasswordInput } from "@/components/shared/password-input";
import SubmitFeedback from "@/components/shared/submit-feedback";
import useRegister from "@/hooks/auth/use-register";
import { Link } from "@/i18n/navigation";
import {
  RegistrationFields,
  registerSchema as createRegisterSchema,
} from "@/lib/schemes/auth.schema";
import { callbackUrlIncludesCheckout } from "@/lib/utils/checkout-callback.util";

function FormSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

function RegisterFormContent() {
  // Translation
  const t = useTranslations();

  // Navigation
  const searchParams = useSearchParams();
  const redirectQuery = searchParams.toString();

  // Variables
  const requireCheckoutAddress = callbackUrlIncludesCheckout(searchParams.get("callbackUrl"));

  // Hooks
  const registerSchema = createRegisterSchema(t, {
    requireCheckoutAddress,
  });
  const { isPending, error, register } = useRegister();

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      deliveryLabel: "",
      deliveryCity: "",
      deliveryStreet: "",
    },
  });

  // Functions
  function onSubmit(values: RegistrationFields) {
    register(values);
  }

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl">{t("create-an-account")}</CardTitle>

        {/* Description */}
        <CardDescription>{t("register-description")}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("name-label") || "Name"}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("name-placeholder") || "Enter your full name"}
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("email-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("email-placeholder")}
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("phone-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("phone-placeholder")}
                      {...field}
                      autoComplete="tel-national"
                    />
                  </FormControl>

                  {/* Description */}
                  <FormDescription>{t("phone-description")}</FormDescription>

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
                    <PasswordInput {...field} autoComplete="new-password" />
                  </FormControl>

                  {/* Description */}
                  <FormDescription>{t("password-min", { min: 8 })}</FormDescription>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password */}
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("confirm-password-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <PasswordInput {...field} autoComplete="new-password" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery address */}
            <div className="space-y-4 border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">{t("delivery-address-heading")}</p>
              <p className="text-xs text-muted-foreground">
                {requireCheckoutAddress
                  ? t("checkout-delivery-description")
                  : t("delivery-address-optional-hint")}
              </p>

              {/* Delivery label */}
              <FormField
                control={form.control}
                name="deliveryLabel"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("address-label-field")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        placeholder={t("address-label-placeholder")}
                        autoComplete="shipping address-line2"
                        {...field}
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="deliveryCity"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("city-label")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        placeholder={t("city-placeholder")}
                        autoComplete="address-level2"
                        {...field}
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Street */}
              <FormField
                control={form.control}
                name="deliveryStreet"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("street-label")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        placeholder={t("street-placeholder")}
                        autoComplete="street-address"
                        {...field}
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              {t("register")}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t.rich("already-have-account", {
            button: (v) => (
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href={redirectQuery ? `/auth/login?${redirectQuery}` : "/auth/login"}>{v}</Link>
              </Button>
            ),
          })}
        </p>
      </CardFooter>
    </Card>
  );
}

export default function RegisterForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <RegisterFormContent />
    </Suspense>
  );
}
