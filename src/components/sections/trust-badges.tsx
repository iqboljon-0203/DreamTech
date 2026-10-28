"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FileText, ShieldCheck, BadgeDollarSign, Lock } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/ui/premium";
import { DotField } from "@/components/ui/dot-field";

const badges = [
  { icon: FileText, key: "contract" },
  { icon: ShieldCheck, key: "guarantee" },
  { icon: BadgeDollarSign, key: "transparent" },
  { icon: Lock, key: "security" },
];

export function TrustBadgesSection() {
  const t = useTranslations("TrustBadges");

  return (
    <section className="grid lg:grid-cols-2">
      {/* Visual half */}
      <div className="tone-dark relative min-h-[320px] lg:min-h-[720px] overflow-hidden">
        <DotField spacing={10} />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent" />
        <div className="absolute left-5 md:left-10 bottom-8 md:bottom-12 right-5 grid grid-cols-2 gap-6 max-w-md">
          {["contract", "guarantee"].map((key) => (
            <p key={key} className="eyebrow text-foreground/70">{t(`badges.${key}.title`)}</p>
          ))}
        </div>
      </div>

      {/* Content half */}
      <div className="tone-light dotted px-5 md:px-12 lg:px-16 py-20 md:py-28">
        <Reveal>
          <Eyebrow className="mb-6">Dream Tech</Eyebrow>
          <h2 className="display text-4xl sm:text-5xl mb-6">{t("title")}</h2>
          <p className="lead text-muted-foreground max-w-lg mb-14">{t("description")}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {badges.map(({ icon: Icon, key }, i) => (
            <Reveal key={key} delay={i * 0.07}>
              <Icon className="w-9 h-9 mb-6" strokeWidth={1} />
              <h3 className="font-mono text-[17px] font-medium mb-3">{t(`badges.${key}.title`)}</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                {t(`badges.${key}.desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
