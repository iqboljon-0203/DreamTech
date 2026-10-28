import { useTranslations } from 'next-intl';
import { Link } from "@/navigation";
import { Navbar } from "@/components/layout/navbar";
import dynamic from 'next/dynamic';
import { DotField } from "@/components/ui/dot-field";
import { ArrowButton, Eyebrow } from "@/components/ui/premium";

// Lazy load heavy components
const ServicesSection = dynamic(() => import('@/components/sections/services').then(mod => mod.ServicesSection));
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio').then(mod => mod.PortfolioSection));
const FeaturesSection = dynamic(() => import('@/components/sections/features').then(mod => mod.FeaturesSection));
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials').then(mod => mod.TestimonialsSection));
const PricingSection = dynamic(() => import('@/components/sections/pricing').then(mod => mod.PricingSection));
const CalculatorSection = dynamic(() => import('@/components/sections/calculator').then(mod => mod.CalculatorSection));
const TrustBadgesSection = dynamic(() => import('@/components/sections/trust-badges').then(mod => mod.TrustBadgesSection));
const FAQSection = dynamic(() => import('@/components/sections/faq').then(mod => mod.FAQSection));
const ContactSection = dynamic(() => import('@/components/sections/contact').then(mod => mod.ContactSection));
const Footer = dynamic(() => import('@/components/layout/footer').then(mod => mod.Footer));

export default function Home() {
  const t = useTranslations('Hero');
  const tServices = useTranslations('Services');

  const heroServices = [
    tServices('webDev.title'),
    tServices('mobileApps.title'),
    tServices('bots.title'),
    tServices('seo.title'),
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="tone-dark relative min-h-[100svh] overflow-hidden flex flex-col">
        <DotField />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 mx-auto w-full max-w-[1440px] px-5 md:px-10 pt-28 pb-10 md:pb-14 grid grid-rows-[auto_1fr_auto]">
          {/* Service list, top right */}
          <ul className="hidden md:block justify-self-end text-right space-y-1">
            {heroServices.map((service) => (
              <li key={service}>
                <Link
                  href="#services"
                  className="display text-2xl lg:text-[34px] opacity-90 hover:opacity-60 transition-opacity"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>

          <div />

          {/* Headline, bottom left */}
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-8 text-foreground/70">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-foreground animate-pulse" />
                  {t('tagline')}
                </span>
              </Eyebrow>
              <h1 className="display text-[42px] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[84px] mb-8">
                {t('title.part1')}{" "}
                <span className="text-foreground/55">{t('title.part2')}</span>
              </h1>
              <p className="lead text-foreground/75 max-w-xl mb-10">{t('description')}</p>
              <div className="flex flex-wrap gap-3">
                <ArrowButton href="https://t.me/dream_tech_manager" external>
                  {t('cta')}
                </ArrowButton>
                <ArrowButton href="#portfolio" variant="outline">
                  {t('viewWork')}
                </ArrowButton>
              </div>
            </div>

            {/* Tech stack, bottom right */}
            <div className="lg:col-span-5 lg:justify-self-end">
              <p className="eyebrow text-muted-foreground mb-4 lg:text-right">{t('trusted')}</p>
              <div className="flex flex-wrap lg:justify-end gap-x-5 gap-y-2 eyebrow text-foreground/85">
                {["Next.js", "React", "TypeScript", "Node.js", "Tailwind"].map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <PortfolioSection />
      <FeaturesSection />
      <PricingSection />
      <CalculatorSection />
      <TrustBadgesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
