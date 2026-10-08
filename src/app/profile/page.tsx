"use client";

import Link from "next/link";
import ProtectedGuard from "@/components/ProtectedGuard";
import { authClient } from "@/lib/auth-client";

function ProfileContent() {
  const { data: session } = authClient.useSession();
  const user = session!.user;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">আমার প্রোফাইল</h1>
      <div className="bg-white border border-green-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0) ?? "U"}
          </div>
        )}
        <div className="text-center sm:text-left flex-1 min-w-0">
          <p className="text-lg font-semibold truncate">{user.name}</p>
          <p className="text-sm text-gray-600 break-all">{user.email}</p>
        </div>
        <Link
          href="/profile/update"
          className="btn btn-outline btn-sm border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedGuard>
      <ProfileContent />
    </ProtectedGuard>
  );
}