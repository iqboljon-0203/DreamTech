"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { BrandLogo } from "@/components/brand-logo";
import { ArrowButton } from "@/components/ui/premium";
import { cn } from "@/lib/utils";

const TELEGRAM_URL = "https://t.me/dream_tech_manager";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#features", label: t("about") },
    { href: "#pricing", label: t("pricing") },
    { href: "#contact", label: t("contact") },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Difference blend keeps the white header legible over both ink and paper sections */}
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <nav className="mx-auto max-w-[1440px] px-5 md:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Dream Tech">
            <BrandLogo className="w-7 h-7" priority />
            <span className="text-lg font-medium tracking-[0.18em] uppercase">DreamTech</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <LanguageSwitcher className="hidden sm:flex" />
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center h-10 px-4 border border-white/40 hover:border-white text-sm transition-colors"
            >
              {t("startProject")}
            </a>
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span className={cn("block w-6 h-px bg-white transition-transform", isMenuOpen && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("block w-6 h-px bg-white transition-transform", isMenuOpen && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="tone-dark dotted fixed inset-0 z-40 lg:hidden flex flex-col px-5 pt-28 pb-10"
          >
            <div className="flex flex-col border-t border-border">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline justify-between py-5 border-b border-border"
                  >
                    <span className="display text-3xl">{link.label}</span>
                    <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-4">
              <ArrowButton href={TELEGRAM_URL} external>
                {t("startProject")}
              </ArrowButton>
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
