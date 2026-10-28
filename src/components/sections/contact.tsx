"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { ArrowButton, Eyebrow, Reveal } from "@/components/ui/premium";

const fieldClass =
  "w-full bg-transparent border-0 border-b border-input py-3 text-lg font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-muted-foreground mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations("Contact");
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    telegram: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = ["website", "webapp", "mobile", "ecommerce", "design", "other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name: formState.name,
              phone: formState.phone,
              telegram: formState.telegram,
              projectType: formState.projectType,
              message: formState.message,
          })
      });

      if (response.ok) {
          setIsSubmitted(true);
          setFormState({ name: "", phone: "", telegram: "", projectType: "", message: "" });
      } else {
          const errorData = await response.json();
          console.error("Form submission failed:", errorData);
          alert(`Xatolik: ${errorData.error || "Xabar yuborishda xatolik yuz berdi"}`);
      }
    } catch (error) {
        console.error("Error submitting form:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="tone-dark relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid lg:grid-cols-12 gap-14 lg:gap-16">
        {/* Left */}
        <Reveal className="lg:col-span-5 flex flex-col">
          <Eyebrow className="mb-6">{t("tag")}</Eyebrow>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-6">
            {t("titlePart1")} <span className="text-foreground/55">{t("titlePart2")}</span>
          </h2>
          <p className="lead text-muted-foreground max-w-md mb-12">{t("description")}</p>

          <div className="border-t border-border">
            <a
              href="https://t.me/dream_tech_manager"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 border-b border-border"
            >
              <span>
                <span className="eyebrow block text-muted-foreground mb-1">{t("info.telegram")}</span>
                <span className="text-xl font-light">@dream_tech_manager</span>
              </span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="tel:+998507723108" className="group flex items-center justify-between py-5 border-b border-border">
              <span>
                <span className="eyebrow block text-muted-foreground mb-1">Tel</span>
                <span className="text-xl font-light">+998 50 772 31 08</span>
              </span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center justify-between py-5 border-b border-border">
              <span className="eyebrow text-muted-foreground">{t("responseTime")}</span>
              <span className="eyebrow">{t("within24h")}</span>
            </div>
          </div>
        </Reveal>

        {/* Right form */}
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="border border-border p-7 md:p-10 h-full">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-start justify-center py-12"
              >
                <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-8">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="display text-3xl mb-3">{t("form.successTitle")}</h3>
                <p className="lead text-muted-foreground mb-8">{t("form.successDesc")}</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="eyebrow underline underline-offset-4 hover:opacity-70"
                >
                  {t("form.sendAnother")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                <Field id="name" label={t("form.name")}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                    placeholder={t("form.namePlaceholder")}
                  />
                </Field>

                <Field id="phone" label={t("form.phone")}>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                    placeholder={t("form.phonePlaceholder")}
                  />
                </Field>

                <Field id="telegram" label={t("form.telegram")}>
                  <input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formState.telegram}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder={t("form.telegramPlaceholder")}
                  />
                </Field>

                <Field id="projectType" label={t("form.service")}>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      required
                      className={`${fieldClass} appearance-none cursor-pointer pr-8`}
                    >
                      <option value="" className="bg-background text-foreground">{t("form.selectType")}</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type} className="bg-background text-foreground">
                          {t(`form.types.${type}`)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field id="message" label={t("form.message")}>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className={`${fieldClass} resize-none`}
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <ArrowButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t("form.sending") : t("form.submit")}
                  </ArrowButton>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
