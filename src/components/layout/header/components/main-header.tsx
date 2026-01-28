"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils/tailwind-merge";
import { ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";

import { SwitchLocale } from "./switch-locale";
import { Button } from "@/components/ui/button";

// Type
type MainHeaderProps = {
  mainCategories: Category[];
  toggleMenu: () => void;
  closeMenu: () => void;
  isScrolled: boolean;
  isMenuOpen: boolean;
  bagLength: number;
};

export default function MainHeader({
  mainCategories,
  toggleMenu,
  closeMenu,
  isScrolled,
  isMenuOpen,
  bagLength,
}: MainHeaderProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Hooks
  const { data: session } = useSession();

  function translateCategoryName(category: string) {
    switch (category) {
      case "women":
        return "نساء";
      case "men":
        return "رجال";
      case "children":
        return "اطفال";
      default:
        return category;
    }
  }

  return (
    <div className={cn(isScrolled ? "bg-white" : "bg-transparent", "transition-all duration-300")}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image src={"/assets/images/logo.svg"} alt="soliel store" width={80} height={80} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {mainCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/${c._id}`}
                className={cn(
                  locale === "ar" ? "text-md font-bold" : "text-sm font-semibold",
                  "capitalize text-gray-700 hover:text-gray-900 transition-all bg-[linear-gradient(to_right,currentColor_0%,currentColor_100%)] bg-[length:0%_1px] bg-no-repeat bg-bottom hover:bg-[length:100%_1px] duration-300",
                )}
              >
                {locale === "ar" ? translateCategoryName(c.slug) : c.slug}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon">
              <Link href="/bag" className="flex relative">
                <ShoppingBag className="w-5 h-5 hover:text-gray-800 transition-all" />
                {bagLength > 0 && (
                  <span className="absolute bottom-3 left-3 flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] leading-none font-medium text-white">
                      {bagLength}
                    </span>
                  </span>
                )}

                <span className="sr-only">bag</span>
              </Link>
            </Button>
          </div>

          {/* Locale switcher */}
          <div className="hidden md:block">
            <SwitchLocale />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <div className="text-sm py-2">{t("hello-user", { user: session.user.name })}</div>
                <Button variant="ghost" className="justify-start" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("logout")}
                </Button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {t("login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
