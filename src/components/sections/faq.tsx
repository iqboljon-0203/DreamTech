"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowButton, Eyebrow, Reveal } from "@/components/ui/premium";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full py-6 flex items-start gap-5 text-left group"
      >
        <span className="eyebrow text-muted-foreground pt-1.5 w-6 shrink-0">0{index + 1}</span>
        <h3 className={cn("flex-1 text-lg md:text-xl font-normal transition-opacity", !isOpen && "group-hover:opacity-70")}>
          {question}
        </h3>
        <Plus
          className={cn("w-5 h-5 mt-1 shrink-0 transition-transform duration-300", isOpen && "rotate-45")}
          strokeWidth={1.25}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-11 pr-10 font-light leading-relaxed text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const t = useTranslations("FAQ");
  const tContact = useTranslations("Contact");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

  return (
    <section id="faq" className="tone-light dotted relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <Eyebrow className="mb-6">FAQ</Eyebrow>
          <h2 className="display text-4xl sm:text-5xl mb-6">{t("title")}</h2>
          <p className="lead text-muted-foreground mb-10 max-w-sm">{t("description")}</p>
          <ArrowButton href="https://t.me/dream_tech_manager" external>
            {tContact("quickTelegram")}
          </ArrowButton>
        </Reveal>

        <Reveal className="lg:col-span-8 border-t border-border" delay={0.1}>
          {faqs.map((key, index) => (
            <FAQItem
              key={key}
              index={index}
              question={t(`items.${key}.question`)}
              answer={t(`items.${key}.answer`)}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
