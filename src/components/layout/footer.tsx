"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/brand-logo";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight
} from "lucide-react";
import { GlowingButton } from "@/components/aceternity/moving-border";

import { Send } from "lucide-react";

const socialLinks = [
  { icon: Send, href: "https://t.me/dream_tech_manager", label: "Telegram", target: "_blank" },
  { icon: Instagram, href: "https://instagram.com/dream_tech_uz", label: "Instagram", target: "_blank" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tServices = useTranslations("Services");
  const tNav = useTranslations("Navigation");
  
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerLinks = {
    services: [
      { label: tServices("webDev.title"), href: "#services" },
      { label: tServices("mobileApps.title"), href: "#services" },
      { label: tServices("uiUx.title"), href: "#services" },
      { label: tServices("seo.title"), href: "#services" },
    ],
    contact: [
      { label: t("links.faq"), href: "#faq" },
      { label: "Telegram", href: "https://t.me/dream_tech_manager", target: "_blank" },
      { label: "+998 50 772 31 08", href: "tel:+998507723108" },
      { label: "companydreamtech@gmail.com", href: "mailto:companydreamtech@gmail.com" },
    ],
    navigation: [
      { label: tNav("about"), href: "#about" },
      { label: tNav("portfolio"), href: "#portfolio" },
      { label: tServices("title"), href: "#services" },
      { label: tNav("contact"), href: "#contact" },
    ],
  };

  return (
    <footer className="relative border-t border-white/5 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-deep-purple/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <div className="py-16 md:py-24 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("ctaTitlePart1")}{" "}
              <span className="gradient-text">{t("ctaTitlePart2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://t.me/dream_tech_manager" target="_blank" rel="noopener noreferrer">
                <GlowingButton className="px-8 py-4 text-base">
                  {t("ctaBtn")}
                  <ArrowUpRight className="ml-2 w-4 h-4 inline" />
                </GlowingButton>
              </a>
              <a
                href="mailto:companydreamtech@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
              >
                <Mail className="mr-2 w-4 h-4" />
                companydreamtech@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BrandLogo className="w-8 h-8" />
              <span className="text-lg font-bold text-foreground">
                Dream<span className="text-muted-foreground">Tech</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              {t("brandDesc")}
            </p>
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Andijon shahri, Bobur shoh ko‘chasi, "Digital City" binosi.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+998 50 772 31 08</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("colServices")}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("colContact")}</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.target}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("colNav")}</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dream Tech. {t("rights")}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.target}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
