"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "🏠 হোম" },
    ...categories.map((c) => ({
      href: `/category/${c.slug}`,
      label: `${c.icon} ${c.nameBn}`,
    })),
  ];

  return (
    <nav className="border-t border-green-100">
      <ul className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap md:flex-nowrap gap-1 text-xs sm:text-sm md:overflow-x-auto md:whitespace-nowrap">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-md px-2.5 sm:px-3 py-1.5 transition whitespace-nowrap ${
                  active
                    ? "bg-green-700 text-white font-semibold"
                    : "text-gray-700 bg-green-50 md:bg-transparent hover:bg-green-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}