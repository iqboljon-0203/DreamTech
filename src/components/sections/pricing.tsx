"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowButton, Eyebrow, Reveal, SectionHeader } from '@/components/ui/premium';

interface PricingCardProps {
  index: number;
  title: string;
  price: string;
  features: string[];
  includes?: string[];
  excludes?: string[];
  includedText?: string;
  notIncludedText?: string;
  time?: string;
  popular?: boolean;
  buttonText: string;
  badgeText?: string;
}

function PricingCard({ index, title, price, features, includes, excludes, includedText, notIncludedText, time, popular, buttonText, badgeText }: PricingCardProps) {
  return (
    <Reveal
      delay={index * 0.08}
      className={cn(
        "relative flex flex-col h-full p-7 md:p-8 border",
        popular ? "tone-dark border-transparent" : "bg-card border-border"
      )}
    >
      <div className="flex items-center justify-between mb-10">
        <span className="eyebrow text-muted-foreground">0{index + 1}</span>
        {popular && (
          <span className="eyebrow px-2.5 py-1 bg-foreground text-background">{badgeText}</span>
        )}
      </div>

      <h3 className="font-mono text-[17px] font-medium mb-3">{title}</h3>
      <div className="display text-4xl md:text-5xl mb-3">{price}</div>
      {time && <div className="eyebrow text-muted-foreground mb-8">{time}</div>}

      <ul className="space-y-3 mb-8 pt-6 border-t border-border">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] font-light">
            <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={1.5} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {includes && includes.length > 0 && (
        <div className="mb-6">
          <p className="eyebrow text-muted-foreground mb-3">{includedText}</p>
          <ul className="space-y-2">
            {includes.map((inc, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light">
                <Check className="w-3.5 h-3.5 mt-1 shrink-0" strokeWidth={1.5} />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {excludes && excludes.length > 0 && (
        <div className="mb-8">
          <p className="eyebrow text-muted-foreground mb-3">{notIncludedText}</p>
          <ul className="space-y-2">
            {excludes.map((exc, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                <Minus className="w-3.5 h-3.5 mt-1 shrink-0" strokeWidth={1.5} />
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ArrowButton
        href={`https://t.me/dream_tech_manager?text=${encodeURIComponent(
          `Assalomu alaykum, men ${title} tarifini (${price}) buyurtma qilmoqchiman.`
        )}`}
        external
        variant={popular ? "solid" : "outline"}
        className="mt-auto w-full [&>span:last-child]:flex-1 [&>span:last-child]:justify-center"
      >
        {buttonText}
      </ArrowButton>
    </Reveal>
  );
}

export function PricingSection() {
  const t = useTranslations('Pricing');
  const tNav = useTranslations('Navigation');

  const webPlans = [
    { key: 'start' },
    { key: 'pro', popular: true },
    { key: 'premium' },
  ];

  const seoPlans = [
    { key: 'start' },
    { key: 'standard', popular: true },
    { key: 'pro' },
  ];

  return (
    <section id="pricing" className="tone-light dotted relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader eyebrow={tNav('pricing')} title={t('title')} description={t('description')} />

        {/* Web Development */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Eyebrow className="text-foreground">{t('webDev.title')}</Eyebrow>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
            {webPlans.map((plan, i) => (
              <PricingCard
                key={plan.key}
                index={i}
                title={t(`webDev.${plan.key}.name`)}
                price={t(`webDev.${plan.key}.price`)}
                features={[1, 2, 3, 4, 5]
                  .filter(n => t.has(`webDev.${plan.key}.features.f${n}`))
                  .map(n => t(`webDev.${plan.key}.features.f${n}`))}
                includes={[1, 2, 3, 4, 5, 6, 7]
                  .filter(n => t.has(`webDev.${plan.key}.includes.i${n}`))
                  .map(n => t(`webDev.${plan.key}.includes.i${n}`))}
                excludes={[1, 2, 3, 4, 5, 6, 7]
                  .filter(n => t.has(`webDev.${plan.key}.excludes.e${n}`))
                  .map(n => t(`webDev.${plan.key}.excludes.e${n}`))}
                includedText={t('included')}
                notIncludedText={t('notIncluded')}
                time={t(`webDev.${plan.key}.time`)}
                popular={plan.popular}
                badgeText={t('webDev.pro.badge')}
                buttonText={t('order')}
              />
            ))}
          </div>
        </div>

        {/* Special offer */}
        <Reveal className="tone-dark mb-20 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <Eyebrow className="mb-5">Web + SEO</Eyebrow>
            <h3 className="display text-3xl md:text-4xl mb-3">{t('special.title')}</h3>
            <p className="lead text-muted-foreground max-w-2xl">{t('special.desc')}</p>
          </div>
          <ArrowButton
            href="https://t.me/dream_tech_manager?text=Assalomu%20alaykum,%20men%20maxsus%20taklifdan%20foydalanmoqchiman%20(Web%20%2B%20SEO)"
            external
          >
            {t('special.button')}
          </ArrowButton>
        </Reveal>

        {/* SEO */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Eyebrow className="text-foreground">{t('seo.title')}</Eyebrow>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 items-stretch">
            {seoPlans.map((plan, i) => (
              <PricingCard
                key={plan.key}
                index={i}
                title={t(`seo.${plan.key}.name`)}
                price={t(`seo.${plan.key}.price`)}
                features={[1, 2, 3]
                  .filter(n => t.has(`seo.${plan.key}.features.f${n}`))
                  .map(n => t(`seo.${plan.key}.features.f${n}`))}
                popular={plan.popular}
                badgeText={t('webDev.pro.badge')}
                buttonText={t('order')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
