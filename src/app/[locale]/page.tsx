import { useTranslations } from 'next-intl';
import { Link } from "@/navigation";
import { Navbar } from "@/components/layout/navbar";
import dynamic from 'next/dynamic';
import { 
  Spotlight,
  BackgroundBeams,
  BentoGrid,
  BentoGridItem,
  CodeAnimation,
  PhoneMockup,
  GrowthChart,
  GlowingButton,
  OutlineGlowButton,
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

// Lazy load heavy components
// Lazy load heavy components
const ServicesSection = dynamic(() => import('@/components/sections/services').then(mod => mod.ServicesSection));
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio').then(mod => mod.PortfolioSection));
const FeaturesSection = dynamic(() => import('@/components/sections/features').then(mod => mod.FeaturesSection));
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials').then(mod => mod.TestimonialsSection));
const PricingSection = dynamic(() => import('@/components/sections/pricing').then(mod => mod.PricingSection));
const CalculatorSection = dynamic(() => import('@/components/sections/calculator').then(mod => mod.CalculatorSection));
const ContactSection = dynamic(() => import('@/components/sections/contact').then(mod => mod.ContactSection));
const Footer = dynamic(() => import('@/components/layout/footer').then(mod => mod.Footer));

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#3b82f6" />
        <BackgroundBeams className="opacity-40" />
        
        {/* Gradient blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] transform-gpu" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-deep-purple/10 rounded-full blur-[120px] transform-gpu" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {t('tagline')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t('title.part1')}{" "}
            <span className="gradient-text-enhanced">{t('title.part2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/dream_tech_manager" target="_blank" rel="noopener noreferrer">
              <GlowingButton className="text-base px-8 py-4">
                {t('cta')}
              </GlowingButton>
            </a>
            <Link href="#portfolio">
              <OutlineGlowButton className="text-base px-8 py-4">
                {t('viewWork')}
              </OutlineGlowButton>
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col items-center gap-4 mt-16">
            <span className="text-sm font-medium text-muted-foreground/80 uppercase tracking-widest">{t('trusted')}</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Next JS", "React JS", "TypeScript", "Node JS", "Tailwind CSS"].map((tech) => (
                <div 
                  key={tech} 
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-foreground hover:bg-secondary hover:border-electric-blue/30 transition-all duration-300 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* Services Section - Lazy Loaded */}
      <ServicesSection />


      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Calculator Section */}
      <CalculatorSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
