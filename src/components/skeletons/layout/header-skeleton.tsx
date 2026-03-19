"use client";

import { SwitchLocale } from "@/components/layout/header/components/switch-locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { LogOut, Menu, ShoppingBag, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export function HeaderSkeleton() {
  // Translations
  const t = useTranslations();

  // Hooks
  const { data: session } = useSession();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-gray-800 py-2">
        <div className="container flex gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-28 bg-white/30" />
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Image src={"/assets/images/logo.svg"} alt="soliel store" width={80} height={80} />

          {/* Categories */}
          <div className="hidden md:flex gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Right */}
        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon">
              <Link href="/bag" className="flex relative">
                <ShoppingBag className="w-5 h-5 hover:text-gray-800 transition-all" />

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
    </header>
  );
}
