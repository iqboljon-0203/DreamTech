"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  HeadphonesIcon, 
  Rocket, 
  Code2, 
  Clock 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient?: string;
  iconColor?: string;
}

function FeatureCard({ feature, index, featured = false }: { feature: Feature; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative p-6 rounded-2xl border transition-all duration-300",
        featured 
          ? "bg-card/50 border-white/10 hover:border-white/20 hover:bg-card" 
          : "bg-transparent border-transparent hover:bg-white/5"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300",
          featured ? "bg-white/5" : "bg-white/5 group-hover:bg-white/10"
        )}>
          <feature.icon className={cn("w-6 h-6 transition-colors", feature.iconColor || "text-muted-foreground group-hover:text-foreground")} />
        </div>
        
        <div>
          <h3 className={cn("text-xl font-semibold mb-2 transition-colors", featured ? "text-foreground" : "group-hover:text-electric-blue")}>
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>

      {featured && (
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
          feature.gradient
        )} />
      )}
    </motion.div>
  );
}

export function FeaturesSection() {
  const t = useTranslations("Features");

  const mainFeatures: Feature[] = [
    {
      icon: Zap,
      title: t("cards.lightning.title"),
      description: t("cards.lightning.desc"),
      gradient: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-400"
    },
    {
      icon: Shield,
      title: t("cards.security.title"),
      description: t("cards.security.desc"),
      gradient: "from-green-500 to-emerald-500",
      iconColor: "text-emerald-400"
    },
    {
      icon: HeadphonesIcon,
      title: t("cards.support.title"),
      description: t("cards.support.desc"),
      gradient: "from-blue-500 to-cyan-500",
      iconColor: "text-cyan-400"
    },
  ];

  const additionalFeatures = [
    {
      icon: Rocket,
      title: t("cards.rapid.title"),
      description: t("cards.rapid.desc"),
    },
    {
      icon: Code2,
      title: t("cards.clean.title"),
      description: t("cards.clean.desc"),
    },
    {
      icon: Clock,
      title: t("cards.delivery.title"),
      description: t("cards.delivery.desc"),
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-deep-purple/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              {t("tag")}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
          >
            {t("title")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} featured={true} />
          ))}
        </div>

        {/* Additional Features List */}
        <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-center">{t("more")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index + 3} />
            ))}
            </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-16">
          {[
            { label: t("stats.projects"), value: "50+" },
            { label: t("stats.satisfaction"), value: "99%" },
            { label: t("stats.support"), value: "24/7" },
            { label: t("stats.exp"), value: "5+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-electric-blue mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
