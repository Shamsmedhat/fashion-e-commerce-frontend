"use client";

import { useEffect, useState } from "react";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

import TopBar from "./components/top-bar";
import MainHeader from "./components/main-header";
import MobileHeader from "./components/mobile-header";

// Type
type HeaderProps = {
  mainCategories: Category[];
  bagLength: number;
};

export function Header({ mainCategories, bagLength }: HeaderProps) {
  // Navigations
  const pathname = usePathname();
  const isBagPage = pathname === "/bag" || pathname.startsWith("/bag");

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isBagPage ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <MainHeader
        mainCategories={mainCategories}
        toggleMenu={toggleMenu}
        isScrolled={isScrolled}
        closeMenu={closeMenu}
        bagLength={bagLength}
        isMenuOpen={isMenuOpen}
      />

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MobileHeader mainCategories={mainCategories} closeMenu={closeMenu} bagLength={bagLength} />
      )}
    </header>
  );
}
