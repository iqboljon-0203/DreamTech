import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function BrandLogo({ 
  className, 
  width = 32, 
  height = 32, 
  priority = false 
}: BrandLogoProps) {
  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {/* Dark Mode Logo (Visible in dark mode) */}
      <Image
        src="/logo-dark.jpg"
        alt="Dream Tech Logo"
        width={width}
        height={height}
        className="object-contain rounded-sm hidden dark:block"
        priority={priority}
      />
      {/* Light Mode Logo (Visible in light mode) */}
      <Image
        src="/logo-light.jpg"
        alt="Dream Tech Logo"
        width={width}
        height={height}
        className="object-contain rounded-sm block dark:hidden"
        priority={priority}
      />
    </div>
  );
}
