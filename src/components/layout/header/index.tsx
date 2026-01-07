"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { SwitchLocale } from "./components/switch-locale";
import { signOut, useSession } from "next-auth/react";

const navigationLinks = [
  { label: "Women", href: "/categories/women" },
  { label: "Men", href: "/categories/men" },
  { label: "Kids", href: "/categories/kids" },
  { label: "Classic", href: "/categories/classic" },
  { label: "Sport", href: "/categories/sport" },
  { label: "Sale", href: "/sale" },
];

export function Header() {
  // Translation
  const t = useTranslations();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hooks
  const { data: session } = useSession();

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container flex items-center justify-between">
          <span>Your text here</span>
          <div className="flex items-center gap-4">
            <span>Your text here</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gray-100">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="font-black text-3xl">Z</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
                <span className="sr-only">Compare</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </div>

            {/* Locale switcher */}
            <SwitchLocale />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col gap-2">
              <Button variant="ghost" className="justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="ghost" className="justify-start">
                <Search className="w-4 h-4 mr-2" />
                Compare
              </Button>
              {session ? (
                <>
                  <div className="text-sm py-2">{t("hello-user", { user: session.user.firstName })}</div>
                  <Button variant="ghost" className="justify-start" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <Link href="/auth/login" className="block py-2 text-sm font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                  {t("login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
