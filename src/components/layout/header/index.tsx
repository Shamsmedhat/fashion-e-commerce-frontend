"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Link, usePathname } from "@/i18n/routing";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils/tailwind-merge";
import AutoScroll from "embla-carousel-auto-scroll";

import { SwitchLocale } from "./components/switch-locale";

export function Header({
  mainCategories,
  bagLength,
}: {
  mainCategories: Category[];
  bagLength: number;
}) {
  // Translation
  const t = useTranslations();
  const pathname = usePathname();
  const isBagPage = pathname === "/bag" || pathname.startsWith("/bag");

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hooks
  const { data: session } = useSession();
  const autoScroll = useRef(
    AutoScroll({
      speed: 0.75,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );
  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Variables
  const announcements = [
    { text: t("new-collection-soon"), emoji: "🎉" },
    { text: t("free-shipping"), emoji: "🚚" },
    { text: t("special-offers"), emoji: "💥" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isBagPage ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* Top Bar */}
      <Carousel
        className="bg-gray-800 text-white text-sm py-2"
        plugins={[autoScroll.current]}
        opts={{
          loop: true,
          dragFree: false,
          watchDrag: false,
          containScroll: false,
        }}
      >
        <CarouselContent className="-ml-8">
          {/* Repeat the announcements array many times */}
          {Array.from({ length: 5 }).flatMap((_, groupIndex) =>
            announcements.map((ann, index) => (
              <CarouselItem
                key={`${groupIndex}-${index}`}
                className="w-1/3 basis-auto italic text-white/80"
              >
                <span className="uppercase whitespace-nowrap  me-2">{ann.text}</span>
                <span className="uppercase whitespace-nowrap">{ann.emoji}</span>
              </CarouselItem>
            )),
          )}
        </CarouselContent>
      </Carousel>

      {/* Main Header */}
      <div
        className={cn(isScrolled ? "bg-white" : "bg-transparent", "transition-all duration-300")}
      >
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
                  className="text-sm capitalize font-medium text-gray-700 hover:text-gray-900 transition-all bg-[linear-gradient(to_right,currentColor_0%,currentColor_100%)] bg-[length:0%_1px] bg-no-repeat bg-bottom hover:bg-[length:100%_1px] duration-300"
                >
                  {c.slug}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="container py-4 flex flex-col space-y-4">
            {/* Categories */}
            <div className="flex flex-col space-y-3">
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
      )}
    </header>
  );
}
