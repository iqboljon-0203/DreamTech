"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  LayoutTemplate,
  AppWindow,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowButton, SectionHeader } from "@/components/ui/premium";
import { useTranslations } from "next-intl";

export function CalculatorSection() {
  const t = useTranslations("Calculator");

  const projectTypes = [
    {
      id: "landing",
      name: t("types.landing.name"),
      description: t("types.landing.desc"),
      icon: LayoutTemplate,
      basePrice: 150,
      maxPrice: 600,
    },
    {
      id: "website",
      name: t("types.website.name"),
      description: t("types.website.desc"),
      icon: Globe,
      basePrice: 350,
      maxPrice: 1200,
    },
    {
      id: "ecommerce",
      name: t("types.ecommerce.name"),
      description: t("types.ecommerce.desc"),
      icon: ShoppingCart,
      basePrice: 550,
      maxPrice: 3000,
    },
    {
      id: "webapp",
      name: t("types.webapp.name"),
      description: t("types.webapp.desc"),
      icon: AppWindow,
      basePrice: 750,
      maxPrice: 5000,
    },
    {
      id: "mobile",
      name: t("types.mobile.name"),
      description: t("types.mobile.desc"),
      icon: Smartphone,
      basePrice: 600,
      maxPrice: 5000,
    },
    {
      id: "design",
      name: t("types.design.name"),
      description: t("types.design.desc"),
      icon: Palette,
      basePrice: 200,
      maxPrice: 1000,
    },
  ];

  const featuresList = [
    { id: "auth", name: t("features.auth"), multiplier: 0.15 },
    { id: "payments", name: t("features.payments"), multiplier: 0.20 },
    { id: "admin", name: t("features.admin"), multiplier: 0.25 },
    { id: "api", name: t("features.api"), multiplier: 0.15 },
    { id: "analytics", name: t("features.analytics"), multiplier: 0.10 },
    { id: "seo", name: t("features.seo"), multiplier: 0.10 },
    { id: "multilang", name: t("features.multilang"), multiplier: 0.15 },
    { id: "responsive", name: t("features.responsive"), multiplier: 0.05, included: true },
  ];

  const timelineOptions = [
    { id: "standard", name: t("timelines.standard"), multiplier: 1.0 },
    { id: "fast", name: t("timelines.fast"), multiplier: 1.3 },
    { id: "urgent", name: t("timelines.urgent"), multiplier: 1.6 },
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["responsive"]);
  const [selectedTimeline, setSelectedTimeline] = useState("standard");
  const [step, setStep] = useState(1);

  const selectedProject = projectTypes.find(p => p.id === selectedType);
  const selectedTimelineOption = timelineOptions.find(t => t.id === selectedTimeline);
  const timelineMultiplier = selectedTimelineOption?.multiplier || 1;

  const priceRange = (() => {
    if (!selectedProject) return { min: 0, max: 0 };

    let featureMultiplier = 1;
    selectedFeatures.forEach(featureId => {
      const feature = featuresList.find(f => f.id === featureId);
      if (feature && !feature.included) {
        featureMultiplier += feature.multiplier;
      }
    });

    const minPrice = Math.round(selectedProject.basePrice * featureMultiplier * timelineMultiplier);
    const maxPrice = Math.round(selectedProject.maxPrice * featureMultiplier * timelineMultiplier);

    return { min: minPrice, max: maxPrice };
  })();

  const toggleFeature = (featureId: string) => {
    const feature = featuresList.find(f => f.id === featureId);
    if (feature?.included) return;

    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const steps = [t("step1"), t("step2"), t("step3")];
  const canOpenStep = (s: number) => s === 1 || selectedType !== null;

  const stepMotion = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.3 },
  };

  return (
    <section id="calculator" className="tone-dark relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow={t("tag")}
          title={<>{t("title1")} <span className="text-foreground/55">{t("title2")}</span></>}
          description={t("description")}
        />

        {/* Step tabs */}
        <div className="grid grid-cols-3 border border-border mb-10">
          {steps.map((label, i) => {
            const s = i + 1;
            return (
              <button
                key={s}
                onClick={() => canOpenStep(s) && setStep(s)}
                disabled={!canOpenStep(s)}
                className={cn(
                  "flex items-center justify-center md:justify-start gap-3 h-14 px-4 md:px-6 text-left transition-colors border-r border-border last:border-r-0",
                  step === s
                    ? "bg-foreground text-background"
                    : "text-muted-foreground enabled:hover:text-foreground"
                )}
              >
                <span className="eyebrow">{step > s ? <Check className="w-3.5 h-3.5" /> : `0${s}`}</span>
                <span className="hidden md:inline text-sm truncate">{label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...stepMotion}>
              <h3 className="md:hidden display text-2xl mb-6">{t("step1")}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const active = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        setStep(2);
                      }}
                      className={cn(
                        "p-7 text-left flex flex-col min-h-[220px] transition-colors",
                        active ? "bg-foreground text-background" : "bg-background hover:bg-card"
                      )}
                    >
                      <Icon className="w-8 h-8 mb-auto" strokeWidth={1} />
                      <h4 className="font-mono text-[17px] font-medium mt-10 mb-2">{type.name}</h4>
                      <p className={cn("text-sm font-light mb-4", active ? "text-background/70" : "text-muted-foreground")}>
                        {type.description}
                      </p>
                      <p className="eyebrow">
                        {t("from")} {formatPrice(type.basePrice)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...stepMotion}>
              <h3 className="md:hidden display text-2xl mb-6">{t("step2")}</h3>
              <div className="grid sm:grid-cols-2 sm:gap-x-12 border-t border-border">
                {featuresList.map((feature) => {
                  const checked = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      disabled={feature.included}
                      className="flex items-center gap-4 py-5 border-b border-border text-left disabled:cursor-default"
                    >
                      <span
                        className={cn(
                          "w-5 h-5 shrink-0 flex items-center justify-center border transition-colors",
                          checked ? "bg-foreground border-foreground text-background" : "border-foreground/30"
                        )}
                      >
                        {checked && <Check className="w-3.5 h-3.5" />}
                      </span>
                      <span className="flex-1">
                        {feature.name}
                        {feature.included && (
                          <span className="ml-2 eyebrow text-muted-foreground">({t("included")})</span>
                        )}
                      </span>
                      {!feature.included && (
                        <span className="eyebrow text-muted-foreground">+{Math.round(feature.multiplier * 100)}%</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-10">
                <ArrowButton variant="outline" onClick={() => setStep(1)} className="[&_svg]:rotate-180">
                  {t("back")}
                </ArrowButton>
                <ArrowButton onClick={() => setStep(3)}>{t("continue")}</ArrowButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...stepMotion} className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <h3 className="md:hidden display text-2xl mb-6">{t("step3")}</h3>
                <div className="border-t border-border">
                  {timelineOptions.map((timeline) => {
                    const active = selectedTimeline === timeline.id;
                    return (
                      <button
                        key={timeline.id}
                        onClick={() => setSelectedTimeline(timeline.id)}
                        className="w-full flex items-center justify-between gap-4 py-5 border-b border-border text-left"
                      >
                        <span className="flex items-center gap-4">
                          <span className={cn("w-4 h-4 border flex items-center justify-center", active ? "border-foreground" : "border-foreground/30")}>
                            {active && <span className="w-2 h-2 bg-foreground" />}
                          </span>
                          <span className={active ? "text-foreground" : "text-muted-foreground"}>{timeline.name}</span>
                        </span>
                        {timeline.multiplier > 1 && (
                          <span className="eyebrow text-muted-foreground text-right">
                            +{Math.round((timeline.multiplier - 1) * 100)}% {t("rushFee")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <ArrowButton variant="outline" onClick={() => setStep(2)} className="mt-10 [&_svg]:rotate-180">
                  {t("back")}
                </ArrowButton>
              </div>

              <div className="tone-light p-8 md:p-10 flex flex-col">
                <p className="eyebrow text-muted-foreground mb-6">{t("estPrice")}</p>
                <div className="display text-5xl md:text-6xl mb-4">
                  {formatPrice(priceRange.min)}
                  <span className="text-foreground/40"> — </span>
                  {formatPrice(priceRange.max)}
                </div>
                <p className="font-mono text-[13px] text-muted-foreground mb-10">
                  {selectedProject?.name} · {selectedTimelineOption?.name}
                </p>
                <ArrowButton
                  href={`https://t.me/dream_tech_manager?text=${encodeURIComponent(
                    `Assalomu alaykum, men loyiha narxini hisoblagan edim:\n\n` +
                    `Loyiha: ${selectedProject?.name}\n` +
                    `Funksiyalar: ${selectedFeatures.length} ta\n` +
                    `Tahminiy narx: ${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}\n\n` +
                    `Batafsil gaplashsak bo'ladimi?`
                  )}`}
                  external
                  className="self-start"
                >
                  {t("getQuote")}
                </ArrowButton>
                <p className="text-xs font-light text-muted-foreground mt-auto pt-8">{t("disclaimer")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
