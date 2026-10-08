"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!name || !email) return toast.error("নাম ও ইমেইল দিন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl border border-green-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm">নাম</span>
            <input name="name" className="input input-bordered w-full mt-1" placeholder="আপনার নাম" />
          </label>
          <label className="block">
            <span className="text-sm">ইমেইল</span>
            <input name="email" type="email" className="input input-bordered w-full mt-1" placeholder="you@example.com" />
          </label>
          <label className="block">
            <span className="text-sm">পাসওয়ার্ড</span>
            <input name="password" type="password" className="input input-bordered w-full mt-1" placeholder="কমপক্ষে ৮ অক্ষর" />
          </label>
          <button disabled={loading} className="btn bg-green-700 hover:bg-green-800 text-white w-full">
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => social("google")} className="btn btn-outline btn-sm sm:btn-md">
            <FaGoogle /> Google
          </button>
          <button onClick={() => social("github")} className="btn btn-outline btn-sm sm:btn-md">
            <FaGithub /> GitHub
          </button>
        </div>
        <p className="text-center text-sm mt-5">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-700 font-semibold">সাইন ইন</Link>
        </p>
      </div>
    </div>
  );
}