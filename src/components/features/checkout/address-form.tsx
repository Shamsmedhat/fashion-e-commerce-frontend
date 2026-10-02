"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddAddress } from "@/hooks/checkout/use-checkout";
import { type AddressFields, addressSchema } from "@/lib/schemes/address.schema";

// Shown at checkout when the shopper has no saved address yet: an order cannot be placed
// without one, and this is the only place it can be added.
export function AddressForm() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate: addAddress, isPending } = useAddAddress();

  // Form
  const form = useForm<AddressFields>({
    resolver: zodResolver(addressSchema(t)),
    defaultValues: {
      label: "",
      city: "",
      street: "",
    },
  });

  // Functions
  function onSubmit(values: AddressFields): void {
    addAddress({
      city: values.city,
      street: values.street,
      ...(values.label ? { label: values.label } : {}),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border border-gray-300 p-4">
        <div className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
            {t("checkout-delivery-heading")}
          </h2>
          <p className="text-xs text-gray-600">{t("checkout-delivery-description")}</p>
        </div>

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="capitalize">{t("city-label")}</FormLabel>

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
          name="street"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="capitalize">{t("street-label")}</FormLabel>

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

        {/* Label */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="capitalize">{t("address-label-field")}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input placeholder={t("address-label-placeholder")} {...field} />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-none h-11 text-sm font-bold uppercase tracking-wide"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {t("saving")}
            </span>
          ) : (
            t("save-address")
          )}
        </Button>
      </form>
    </Form>
  );
}
