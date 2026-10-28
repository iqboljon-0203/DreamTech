"use client";
import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Instagram, Send } from "lucide-react";
import { ArrowButton, Eyebrow, Reveal } from "@/components/ui/premium";
import { DotField } from "@/components/ui/dot-field";

const socialLinks = [
  { icon: Send, href: "https://t.me/dream_tech_manager", label: "Telegram" },
  { icon: Instagram, href: "https://instagram.com/dream_tech_uz", label: "Instagram" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tServices = useTranslations("Services");
  const tNav = useTranslations("Navigation");

  const columns = [
    {
      title: t("colServices"),
      links: [
        { label: tServices("webDev.title"), href: "#services" },
        { label: tServices("mobileApps.title"), href: "#services" },
        { label: tServices("uiUx.title"), href: "#services" },
        { label: tServices("seo.title"), href: "#services" },
      ],
    },
    {
      title: t("colNav"),
      links: [
        { label: tNav("portfolio"), href: "#portfolio" },
        { label: tNav("about"), href: "#features" },
        { label: tNav("pricing"), href: "#pricing" },
        { label: t("links.faq"), href: "#faq" },
      ],
    },
    {
      title: t("colContact"),
      links: [
        { label: "Telegram", href: "https://t.me/dream_tech_manager", external: true },
        { label: "+998 50 772 31 08", href: "tel:+998507723108" },
        { label: "companydreamtech@gmail.com", href: "mailto:companydreamtech@gmail.com" },
      ],
    },
  ];

  return (
    <footer className="tone-dark relative">
      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <DotField spacing={11} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <Reveal className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-28 md:py-40">
          <Eyebrow className="mb-6">{tNav("contact")}</Eyebrow>
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl mb-6 max-w-3xl">
            {t("ctaTitlePart1")} <span className="text-foreground/55">{t("ctaTitlePart2")}</span>
          </h2>
          <p className="lead text-foreground/70 max-w-xl mb-10">{t("ctaDesc")}</p>
          <div className="flex flex-wrap gap-3">
            <ArrowButton href="https://t.me/dream_tech_manager" external>
              {t("ctaBtn")}
            </ArrowButton>
            <ArrowButton href="mailto:companydreamtech@gmail.com" variant="outline">
              companydreamtech@gmail.com
            </ArrowButton>
          </div>
        </Reveal>
      </section>

      {/* Links */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 md:pt-20 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
          <div className="col-span-2 lg:col-span-5">
            <p className="font-light text-muted-foreground max-w-sm mb-6">{t("brandDesc")}</p>
            <p className="eyebrow text-muted-foreground max-w-sm leading-relaxed">
              Andijon shahri, Bobur shoh ko‘chasi, &ldquo;Digital City&rdquo; binosi
            </p>
            <div className="flex gap-2 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col, i) => (
            <div key={col.title} className={i === 2 ? "col-span-2 lg:col-span-3" : "lg:col-span-2"}>
              <h3 className="eyebrow text-muted-foreground mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...("external" in link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-light hover:opacity-60 transition-opacity break-all sm:break-normal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div
          aria-hidden
          className="display font-medium uppercase leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-[clamp(3rem,14.2vw,13rem)] select-none text-foreground/95 -mb-[0.06em]"
        >
          DreamTech
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 py-6 border-t border-border eyebrow text-muted-foreground">
          <p>© {new Date().getFullYear()} Dream Tech</p>
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
