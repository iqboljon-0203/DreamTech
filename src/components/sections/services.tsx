"use client";
import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Code2, Smartphone, Palette, TrendingUp, Bot, ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/ui/premium";

export function ServicesSection() {
  const t = useTranslations("Services");

  const services = [
    { key: "webDev", icon: Code2 },
    { key: "mobileApps", icon: Smartphone },
    { key: "uiUx", icon: Palette },
    { key: "bots", icon: Bot },
    { key: "seo", icon: TrendingUp },
  ];

  return (
    <section id="services" className="tone-dark relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Statement */}
        <Reveal className="grid lg:grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="lg:col-span-3">
            <Eyebrow>{t("title")}</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <p className="display text-3xl sm:text-4xl lg:text-[46px] leading-[1.12]">
              {t("description")}
            </p>
          </div>
        </Reveal>

        {/* Service grid with hairline dividers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-border">
          {services.map(({ key, icon: Icon }, i) => (
            <Reveal key={key} delay={i * 0.06} className="border-b border-border sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0">
              <Link
                href="#contact"
                className="group flex flex-col h-full sm:min-h-[300px] p-6 lg:p-7 hover:bg-foreground/[0.03] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <Icon className="w-9 h-9 mb-6 sm:mb-8 mt-8 sm:mt-16 text-foreground" strokeWidth={1} />
                <h3 className="font-mono text-[17px] font-medium mb-3">{t(`${key}.title`)}</h3>
                <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
