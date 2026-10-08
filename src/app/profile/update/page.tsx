"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ProtectedGuard from "@/components/ProtectedGuard";
import { authClient } from "@/lib/auth-client";

function UpdateForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="bg-white border border-green-100 rounded-xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm">নাম</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mt-1"
            placeholder="আপনার নাম"
          />
        </label>
        <button disabled={loading} className="btn bg-green-700 hover:bg-green-800 text-white w-full">
          {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}

export default function UpdatePage() {
  return (
    <ProtectedGuard>
      <UpdateForm />
    </ProtectedGuard>
  );
}