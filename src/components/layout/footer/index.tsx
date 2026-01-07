import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

const footerLinks = {
  column1: [
    { label: "Link One", href: "#" },
    { label: "Link Two", href: "#" },
    { label: "Link Three", href: "#" },
    { label: "Link Four", href: "#" },
  ],
  column2: [
    { label: "Link One", href: "#" },
    { label: "Link Two", href: "#" },
    { label: "Link Three", href: "#" },
    { label: "Link Four", href: "#" },
  ],
  column3: [
    { label: "Link One", href: "#" },
    { label: "Link Two", href: "#" },
    { label: "Link Three", href: "#" },
    { label: "Link Four", href: "#" },
    { label: "Link Five", href: "#" },
  ],
};

export function Footer() {
  // Translation
  const t = useTranslations();

  return (
    <footer className="w-full bg-gray-800 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Logo and Contact */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Logo</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p>USA, California</p>
              <p>8800 023 4567</p>
              <p>email@example.com</p>
            </div>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:text-gray-300")}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:text-gray-300")}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:text-gray-300")}>
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:text-gray-300")}>
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Right Columns - Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerLinks.column1.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerLinks.column2.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerLinks.column3.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
