"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "border-b border-white/5 last:border-0 transition-colors duration-300",
        isOpen ? "bg-white/5" : "hover:bg-white/[0.02]"
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-6 px-4 md:px-6 flex items-center justify-between gap-4 text-left focus:outline-none"
      >
        <h3 className={cn(
          "text-lg md:text-xl font-medium transition-colors",
          isOpen ? "text-electric-blue" : "text-foreground"
        )}>
          {question}
        </h3>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300",
          isOpen ? "bg-electric-blue/20 text-electric-blue rotate-180" : "bg-white/5 text-muted-foreground"
        )}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
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
            <div className="pb-6 px-4 md:px-6 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

  const faqs = [
    { q: "q1", a: "q1" },
    { q: "q2", a: "q2" },
    { q: "q3", a: "q3" },
    { q: "q4", a: "q4" },
    { q: "q5", a: "q5" },
    { q: "q6", a: "q6" },
    { q: "q7", a: "q7" },
    { q: "q8", a: "q8" }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="text-lg md:text-xl text-muted-foreground"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-secondary/20 backdrop-blur-sm overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.q}
              index={index}
              question={t(`items.${faq.q}.question`)}
              answer={t(`items.${faq.q}.answer`)}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
