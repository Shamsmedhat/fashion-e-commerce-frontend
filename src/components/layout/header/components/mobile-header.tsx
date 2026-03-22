"use client";

import { Link } from "@/i18n/routing";
import { LogOut, ShoppingBag } from "lucide-react";
import React from "react";
import { SwitchLocale } from "./switch-locale";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

// Type
type MobileHeaderProps = {
  mainCategories: Category[];
  closeMenu: () => void;
  bagLength: number;
};

export default function MobileHeader({ mainCategories, closeMenu, bagLength }: MobileHeaderProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { data: session } = useSession();

  return (
    <div className="md:hidden bg-white border-t shadow-lg">
      <nav className="container py-4 flex flex-col space-y-4">
        {/* Categories */}
        <div className="flex flex-col space-y-3">
          <Link
            href="/new"
            className="text-base capitalize font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            onClick={closeMenu}
          >
            {t("new-arrivals")}
          </Link>
          {mainCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/${c._id}`}
              className="text-base capitalize font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={closeMenu}
            >
              {c.slug}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Shopping Bag */}
        <Link
          href="/bag"
          className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={closeMenu}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {bagLength > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium text-white">
                {bagLength}
              </span>
            )}
          </div>
          <span className="text-base font-medium">{t("bag")}</span>
        </Link>

        {/* Divider */}
        <div className="border-t" />

        {/* Locale Switcher */}
        <div className="py-2">
          <SwitchLocale />
        </div>

        {/* Auth */}
        {session ? (
          <div className="flex flex-col space-y-3">
            <div className="text-sm text-gray-600">
              {t("hello-user", { user: session.user.name })}
            </div>
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={() => {
                signOut();
                closeMenu();
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("logout")}
            </Button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            {t("login")}
          </Link>
        )}
      </nav>
    </div>
  );
}
