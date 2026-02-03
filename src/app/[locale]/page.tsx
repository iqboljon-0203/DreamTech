import { useTranslations } from 'next-intl';
import { Link } from "@/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  PortfolioSection,
  FeaturesSection,
  TestimonialsSection,
  CalculatorSection,
  ContactSection,
} from "@/components/sections";
import { 
  Code2, 
  Smartphone, 
  Palette, 
  TrendingUp,
  Bot,
} from "lucide-react";

export default function Home() {
  const t = useTranslations('Hero');
  const tServices = useTranslations('Services');

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
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-deep-purple/10 rounded-full blur-[120px]" />
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

      {/* Services Section - Bento Grid */}
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

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Calculator Section */}
      <CalculatorSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
