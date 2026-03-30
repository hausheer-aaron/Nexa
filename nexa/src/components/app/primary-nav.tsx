"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`min-w-fit px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white/10 text-white"
                : "text-white/78 hover:bg-white/8 hover:text-white"
            }`}
          >
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
