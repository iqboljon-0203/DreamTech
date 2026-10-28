"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const languages = ["uz", "ru", "en"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={cn("eyebrow flex items-center gap-3", className)}>
      {languages.map((code) => (
        <button
          key={code}
          onClick={() => handleLanguageChange(code)}
          disabled={isPending}
          aria-current={locale === code ? "true" : undefined}
          className={cn(
            "transition-opacity",
            locale === code ? "opacity-100" : "opacity-45 hover:opacity-100"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
