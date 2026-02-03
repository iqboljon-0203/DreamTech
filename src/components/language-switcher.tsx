"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Flag Components
const UzFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="250" fill="#1EB53A"/>
    <rect width="500" height="83.333" y="0" fill="#0099B5"/>
    <rect width="500" height="83.333" y="166.667" fill="#CE1126"/>
    <rect width="500" height="5" y="80.833" fill="#DC2228"/>
    <rect width="500" height="5" y="164.167" fill="#DC2228"/>
    <rect width="500" height="78.333" y="85.833" fill="#FFFFFF"/>
    <circle cx="70" cy="41.667" r="25" fill="#FFFFFF"/>
    <circle cx="80" cy="41.667" r="25" fill="#0099B5"/>
    <g fill="#FFFFFF" transform="translate(116, 21) scale(1.5)">
      <path d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(24,0)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(48,0)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(12,20)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(36,20)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(60,20)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(24,40)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(48,40)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(0,40)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(12,60)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(36,60)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
      <path transform="translate(24,80)" d="M0,-10 L2.35,-2.77 L9.95,-2.77 L3.8,-7.23 L6.15,0 L0,-4.47 L-6.15,0 L-3.8,-7.23 L-9.95,-2.77 L-2.35,-2.77 Z"/>
    </g>
  </svg>
);

const GbFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className} xmlns="http://www.w3.org/2000/svg">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const RuFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 9 6" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="9" height="2" y="0" fill="#fff"/>
    <rect width="9" height="2" y="2" fill="#0039a6"/>
    <rect width="9" height="2" y="4" fill="#d52b1e"/>
  </svg>
);

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "uz", label: "O'zbek", flag: UzFlag },
    { code: "en", label: "English", flag: GbFlag },
    { code: "ru", label: "Русский", flag: RuFlag },
  ];

  const handleLanguageChange = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];
  const FlagComponent = currentLanguage.flag;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg transition-all duration-300",
          "bg-white/5 border border-white/10 hover:bg-white/10",
          isOpen && "bg-white/10 ring-2 ring-electric-blue/30"
        )}
        disabled={isPending}
      >
        <div className="w-[21px] h-[16px] relative overflow-hidden rounded-[2px] shadow-sm flex-shrink-0">
           <FlagComponent className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium uppercase text-foreground hidden sm:inline-block">
            {locale}
        </span>
        <ChevronDown 
            className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-300",
                isOpen && "rotate-180"
            )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-40 p-1.5 bg-card/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden z-50 origin-top-right"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left",
                  locale === lang.code 
                    ? "bg-electric-blue/10 text-electric-blue" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                    "w-[21px] h-[16px] relative overflow-hidden rounded-[2px] shadow-sm ring-1 ring-border group-hover:ring-foreground/20 transition-all flex-shrink-0",
                    locale === lang.code && "ring-electric-blue/50"
                )}>
                    <lang.flag className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
