"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProtectedGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const warned = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !warned.current) {
      warned.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return <>{children}</>;
}