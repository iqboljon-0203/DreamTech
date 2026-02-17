"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MoveRight, Zap, Check, Star, Sparkles, Rocket, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingButton, OutlineGlowButton } from '@/components/aceternity';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  time?: string;
  popular?: boolean;
  buttonText: string;
  badgeText?: string;
  icon?: React.ReactNode;
  delay?: number;
}

function PricingCard({ title, price, features, time, popular, buttonText, badgeText, icon, delay = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-3xl p-8 flex flex-col h-full border transition-all duration-300 group",
        popular 
          ? "bg-secondary/10 border-electric-blue/50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]" 
          : "bg-secondary/5 border-white/5 hover:border-white/10 hover:bg-secondary/10"
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-electric-blue to-deep-purple rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {badgeText || "Most Popular"}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 text-electric-blue">
          {icon || <Zap className="w-6 h-6" />}
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground/90">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl font-bold text-foreground">{price}</span>
       </div>
        {time && (
            <div className="mt-2 text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded w-fit">
                ⏱ {time}
            </div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className={cn("w-5 h-5 flex-shrink-0", popular ? "text-electric-blue" : "text-emerald-500")} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <a 
        href={`https://t.me/dream_tech_manager?text=${encodeURIComponent(
          `Assalomu alaykum, men ${title} tarifini (${price}) buyurtma qilmoqchiman.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto"
      >
        <button className={cn(
            "w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2",
            popular 
                ? "bg-gradient-to-r from-electric-blue to-deep-purple text-white shadow-lg shadow-electric-blue/20 hover:shadow-electric-blue/40" 
                : "bg-secondary/50 text-foreground border border-white/5 hover:bg-secondary hover:border-white/10"
        )}>
            {buttonText}
            <MoveRight className="w-4 h-4" />
        </button>
      </a>
    </motion.div>
  );
}

export function PricingSection() {
  const t = useTranslations('Pricing');

  const webPlans = [
    {
      key: 'start',
      icon: <Zap className="w-6 h-6" />,
      delay: 0
    },
    {
      key: 'pro',
      icon: <Sparkles className="w-6 h-6" />,
      popular: true,
      delay: 0.1
    },
    {
      key: 'premium',
      icon: <Crown className="w-6 h-6" />,
      delay: 0.2
    }
  ];

  const seoPlans = [
    {
      key: 'start',
      delay: 0
    },
    {
      key: 'standard',
      popular: true,
      delay: 0.1
    },
    {
      key: 'pro',
      delay: 0.2
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('description')}
          </p>
        </div>

        {/* Category 1: Web Development */}
        <div className="mb-24">
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-electric-blue/50" />
                {t('webDev.title')}
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-electric-blue/50" />
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {webPlans.map((plan) => (
                <PricingCard
                key={plan.key}
                title={t(`webDev.${plan.key}.name`)}
                price={t(`webDev.${plan.key}.price`)}
                features={[
                    t(`webDev.${plan.key}.features.f1`),
                    t(`webDev.${plan.key}.features.f2`),
                    t(`webDev.${plan.key}.features.f3`),
                    t(`webDev.${plan.key}.features.f4`),
                    // premium and pro have f5
                    ...(t.has(`webDev.${plan.key}.features.f5`) ? [t(`webDev.${plan.key}.features.f5`)] : [])
                ]}
                time={t(`webDev.${plan.key}.time`)}
                popular={plan.popular}
                badgeText={t('webDev.pro.badge')}
                buttonText={t('order')}
                icon={plan.icon}
                delay={plan.delay}
                />
            ))}
            </div>
        </div>

        {/* Special Offer Banner */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-24 relative rounded-3xl overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-deep-purple opacity-20" />
            <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left border border-white/10 rounded-3xl">
                <div>
                     <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                        <Rocket className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
                        {t('special.title')}
                     </h3>
                     <p className="text-muted-foreground text-lg max-w-xl">
                        {t('special.desc')}
                     </p>
                </div>
                <a 
                    href="https://t.me/dream_tech_manager?text=Assalomu%20alaykum,%20men%20maxsus%20taklifdan%20foydalanmoqchiman%20(Web%20%2B%20SEO)"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        {t('special.button')}
                    </button>
                </a>
            </div>
        </motion.div>

        {/* Category 2: SEO */}
        <div>
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-500/50" />
                {t('seo.title')}
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-500/50" />
            </h3>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {seoPlans.map((plan) => (
                <PricingCard
                key={plan.key}
                title={t(`seo.${plan.key}.name`)}
                price={t(`seo.${plan.key}.price`)}
                features={[
                    t(`seo.${plan.key}.features.f1`),
                    t(`seo.${plan.key}.features.f2`),
                    // pro might not have f3
                    ...(t.has(`seo.${plan.key}.features.f3`) ? [t(`seo.${plan.key}.features.f3`)] : [])
                ]}
                popular={plan.popular}
                badgeText={t('webDev.pro.badge')}
                buttonText={t('order')}
                delay={plan.delay}
                />
            ))}
            </div>
        </div>

      </div>
    </section>
  );
}
