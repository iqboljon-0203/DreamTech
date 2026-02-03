"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Palette,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingButton } from "@/components/aceternity/moving-border";
import { useTranslations } from "next-intl";

export function CalculatorSection() {
  const t = useTranslations("Calculator");

  const projectTypes = [
    {
      id: "landing",
      name: t("types.landing.name"),
      description: t("types.landing.desc"),
      icon: Globe,
      basePrice: 99,
      maxPrice: 400,
    },
    {
      id: "website",
      name: t("types.website.name"),
      description: t("types.website.desc"),
      icon: Globe,
      basePrice: 249,
      maxPrice: 800,
    },
    {
      id: "ecommerce",
      name: t("types.ecommerce.name"),
      description: t("types.ecommerce.desc"),
      icon: ShoppingCart,
      basePrice: 499,
      maxPrice: 2000,
    },
    {
      id: "webapp",
      name: t("types.webapp.name"),
      description: t("types.webapp.desc"),
      icon: Globe,
      basePrice: 699,
      maxPrice: 3000,
    },
    {
      id: "mobile",
      name: t("types.mobile.name"),
      description: t("types.mobile.desc"),
      icon: Smartphone,
      basePrice: 899,
      maxPrice: 5000,
    },
    {
      id: "design",
      name: t("types.design.name"),
      description: t("types.design.desc"),
      icon: Palette,
      basePrice: 149,
      maxPrice: 500,
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
  const timelineMultiplier = timelineOptions.find(t => t.id === selectedTimeline)?.multiplier || 1;

  const priceRange = useMemo(() => {
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
  }, [selectedProject, selectedFeatures, timelineMultiplier, featuresList]);

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

  return (
    <section id="calculator" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-deep-purple/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-6">
            <Calculator className="w-4 h-4" />
            {t("tag")}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title1")} <span className="gradient-text">{t("title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <button
                    onClick={() => s < step && setStep(s)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      step >= s 
                        ? "bg-gradient-to-r from-electric-blue to-deep-purple text-white" 
                        : "bg-white/5 text-muted-foreground border border-white/10"
                    )}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </button>
                  {s < 3 && (
                    <div className={cn(
                      "w-12 h-0.5 transition-colors",
                      step > s ? "bg-gradient-to-r from-electric-blue to-deep-purple" : "bg-white/10"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-center mb-6">
                  {t("step1")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setStep(2);
                        }}
                        className={cn(
                          "p-6 rounded-xl text-left transition-all duration-300",
                          "bg-card border hover:border-electric-blue/50",
                          selectedType === type.id 
                            ? "border-electric-blue bg-electric-blue/5" 
                            : "border-border hover:bg-white/5"
                        )}
                      >
                        <Icon className="w-8 h-8 text-electric-blue mb-3" />
                        <h4 className="font-semibold text-white mb-1">{type.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <p className="text-sm font-medium text-electric-blue">
                          {t("from")} {formatPrice(type.basePrice)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-center mb-6">
                  {t("step2")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {featuresList.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      disabled={feature.included}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3",
                        "border",
                        feature.included
                          ? "bg-electric-blue/10 border-electric-blue/30 cursor-default"
                          : selectedFeatures.includes(feature.id)
                            ? "bg-electric-blue/10 border-electric-blue"
                            : "bg-card border-border hover:border-white/30"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                        selectedFeatures.includes(feature.id)
                          ? "bg-electric-blue border-electric-blue"
                          : "border-white/20"
                      )}>
                        {selectedFeatures.includes(feature.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-white">{feature.name}</span>
                        {feature.included && (
                          <span className="ml-2 text-xs text-electric-blue">({t("included")})</span>
                        )}
                      </div>
                      {!feature.included && (
                        <span className="text-xs text-muted-foreground">
                          +{Math.round(feature.multiplier * 100)}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    {t("continue")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-center mb-6">
                  {t("step3")}
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
                  {timelineOptions.map((timeline) => (
                    <button
                      key={timeline.id}
                      onClick={() => setSelectedTimeline(timeline.id)}
                      className={cn(
                        "flex-1 p-4 rounded-xl text-center transition-all duration-300 border",
                        selectedTimeline === timeline.id
                          ? "bg-electric-blue/10 border-electric-blue"
                          : "bg-card border-border hover:border-white/30"
                      )}
                    >
                      <span className="text-white font-medium">{timeline.name}</span>
                      {timeline.multiplier > 1 && (
                        <span className="block text-xs text-muted-foreground mt-1">
                          +{Math.round((timeline.multiplier - 1) * 100)}% {t("rushFee")}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-lg mx-auto p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/10 text-center"
                >
                  <Sparkles className="w-8 h-8 text-electric-blue mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">{t("estPrice")}</p>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    For {selectedProject?.name} with {selectedFeatures.length} features
                  </p>
                  
                  <a 
                    href={`https://t.me/dream_tech_manager?text=${encodeURIComponent(
                      `Assalomu alaykum, men loyiha narxini hisoblagan edim:\n\n` +
                      `Loyiha: ${selectedProject?.name}\n` +
                      `Funksiyalar: ${selectedFeatures.length} ta\n` +
                      `Tahminiy narx: ${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}\n\n` +
                      `Batafsil gaplashsak bo'ladimi?`
                    )}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <GlowingButton className="w-full py-4">
                      {t("getQuote")}
                    </GlowingButton>
                  </a>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    {t("disclaimer")}
                  </p>
                </motion.div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    {t("back")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
