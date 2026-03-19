import { Facebook, Instagram } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Footer() {
  // Translation
  const t = useTranslations();

  return (
    <footer className="w-full bg-gray-800 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Logo and Contact */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={"/assets/images/logo.svg"} alt="soliel store" width={140} height={140} />
            </Link>
            <div className="space-y-2 text-gray-300">
              <p>{t("egy-cairo")}</p>
              <p>01111803604</p>
              <p>shamsmedhat1@gmail.com</p>
            </div>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "text-white hover:text-gray-300",
                )}
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">{t("facebook")}</span>
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "text-white hover:text-gray-300",
                )}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">{t("instagram")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
