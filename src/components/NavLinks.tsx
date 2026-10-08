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
      <ul className="max-w-6xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto text-sm whitespace-nowrap">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-1.5 transition ${
                  active
                    ? "bg-green-700 text-white font-semibold"
                    : "text-gray-700 hover:bg-green-50"
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