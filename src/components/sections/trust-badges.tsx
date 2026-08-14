"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  FileText, 
  ShieldCheck, 
  BadgeDollarSign, 
  Lock 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Badge {
  icon: React.ElementType;
  key: string;
  gradient: string;
  iconColor: string;
}

function BadgeCard({ badge, index }: { badge: Badge; index: number }) {
  const t = useTranslations("TrustBadges");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 md:p-8 rounded-3xl border border-white/5 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 overflow-hidden"
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
        badge.gradient
      )} />
      
      <div className="relative flex flex-col items-center text-center gap-4">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 bg-white/5 group-hover:bg-white/10 shadow-lg",
        )}>
          <badge.icon className={cn("w-8 h-8", badge.iconColor)} />
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-3 text-foreground">
            {t(`badges.${badge.key}.title`)}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {t(`badges.${badge.key}.desc`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TrustBadgesSection() {
  const t = useTranslations("TrustBadges");

  const badges: Badge[] = [
    {
      icon: FileText,
      key: "contract",
      gradient: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400"
    },
    {
      icon: ShieldCheck,
      key: "guarantee",
      gradient: "from-green-500 to-emerald-500",
      iconColor: "text-emerald-400"
    },
    {
      icon: BadgeDollarSign,
      key: "transparent",
      gradient: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-400"
    },
    {
      icon: Lock,
      key: "security",
      gradient: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-electric-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <BadgeCard key={badge.key} badge={badge} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
