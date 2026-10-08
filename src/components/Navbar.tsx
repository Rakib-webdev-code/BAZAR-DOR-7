import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import logo from "@/img/logo-icon.png";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";
import NavLinks from "./NavLinks";

function NavLinksFallback() {
  return (
    <div className="border-t border-green-100">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-8 w-20 shrink-0 rounded-md bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default async function Navbar() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="বাজার দর" width={36} height={36} priority />
          <div className="leading-tight">
            <p className="font-bold text-lg">বাজার দর</p>
            <BanglaDate />
          </div>
        </Link>
        <AuthButtons />
      </div>
      <Suspense fallback={<NavLinksFallback />}>
        <NavLinks categories={categories} />
      </Suspense>
    </header>
  );
}