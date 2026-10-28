"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Zap, Shield, HeadphonesIcon, Rocket, Code2, Clock } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/ui/premium";

export function FeaturesSection() {
  const t = useTranslations("Features");

  const stats = [
    { label: t("stats.projects"), value: "55+" },
    { label: t("stats.satisfaction"), value: "99%" },
    { label: t("stats.support"), value: "24/7" },
    { label: t("stats.exp"), value: "5+" },
  ];

  const features = [
    { icon: Zap, key: "lightning" },
    { icon: Shield, key: "security" },
    { icon: HeadphonesIcon, key: "support" },
    { icon: Rocket, key: "rapid" },
    { icon: Code2, key: "clean" },
    { icon: Clock, key: "delivery" },
  ];

  return (
    <section id="features" className="tone-dark relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Intro */}
        <Reveal className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-3">
            <Eyebrow>{t("tag")}</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-6">{t("title")}</h2>
            <p className="lead text-muted-foreground max-w-2xl">{t("description")}</p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border mb-24 md:mb-32">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="pt-8 pb-10 pr-6 border-b lg:border-b-0 border-border [&:not(:first-child)]:lg:pl-8 lg:border-r lg:last:border-r-0"
            >
              <div className="display text-6xl md:text-7xl lg:text-[96px] mb-4">{stat.value}</div>
              <div className="eyebrow text-muted-foreground">{stat.label}</div>
            </Reveal>
          ))}
        </div>

        {/* Reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {features.map(({ icon: Icon, key }, i) => (
            <Reveal key={key} delay={(i % 3) * 0.06} className="bg-background p-7 md:p-9 min-h-[240px] flex flex-col">
              <Icon className="w-8 h-8 mb-10 text-foreground" strokeWidth={1} />
              <h3 className="font-mono text-[17px] font-medium mb-3">{t(`cards.${key}.title`)}</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                {t(`cards.${key}.desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
