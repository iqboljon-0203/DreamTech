"use client";
import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { 
  BentoGrid,
  BentoGridItem,
  CodeAnimation,
  PhoneMockup,
  GrowthChart,
  ChatAnimation,
  UIUXAnimation,
} from "@/components/aceternity";
import { 
  Code2, 
  Smartphone, 
  Palette, 
  TrendingUp,
  Bot,
} from "lucide-react";

export function ServicesSection() {
  const tServices = useTranslations('Services');

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{tServices('title')}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {tServices('description')}
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="md:auto-rows-[20rem]">
          {/* Web Development - Large */}
          <Link href="#contact" className="md:col-span-2 block group h-full">
            <BentoGridItem
              title={tServices('webDev.title')}
              description={tServices('webDev.description')}
              header={<CodeAnimation />}
              icon={<Code2 className="w-5 h-5 text-electric-blue" />}
              className="h-full cursor-pointer group-hover:border-electric-blue/50 transition-colors"
            />
          </Link>

          {/* Mobile Apps - Small */}
          <Link href="#contact" className="block group h-full">
            <BentoGridItem
              title={tServices('mobileApps.title')}
              description={tServices('mobileApps.description')}
              header={<PhoneMockup />}
              icon={<Smartphone className="w-5 h-5 text-deep-purple" />}
              className="h-full cursor-pointer group-hover:border-deep-purple/50 transition-colors"
            />
          </Link>

          {/* UI/UX Design - Small */}
          <Link href="#contact" className="block group h-full">
            <BentoGridItem
              title={tServices('uiUx.title')}
              description={tServices('uiUx.description')}
              header={<UIUXAnimation />}
              icon={<Palette className="w-5 h-5 text-cyan-400" />}
              className="h-full cursor-pointer group-hover:border-cyan-400/50 transition-colors"
            />
          </Link>

          {/* Telegram Bots - Small */}
          <Link href="#contact" className="block group h-full">
            <BentoGridItem
              title={tServices('bots.title')}
              description={tServices('bots.description')}
              header={<ChatAnimation />}
              icon={<Bot className="w-5 h-5 text-yellow-400" />}
              className="h-full cursor-pointer group-hover:border-yellow-400/50 transition-colors"
            />
          </Link>

          {/* SEO & Marketing - Small */}
          <Link href="#contact" className="block group h-full">
            <BentoGridItem
              title={tServices('seo.title')}
              description={tServices('seo.description')}
              header={<GrowthChart />}
              icon={<TrendingUp className="w-5 h-5 text-green-400" />}
              className="h-full cursor-pointer group-hover:border-green-400/50 transition-colors"
            />
          </Link>
        </BentoGrid>
      </div>
    </section>
  );
}
