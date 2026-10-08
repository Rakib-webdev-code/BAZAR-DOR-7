"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    (document.activeElement as HTMLElement | null)?.blur();
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return <div className="h-9 w-32 rounded-md bg-gray-200 animate-pulse" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md border-green-700 text-green-700 hover:bg-green-700 hover:text-white">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-sm sm:btn-md bg-green-700 hover:bg-green-800 text-white">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold">
            {user.name?.charAt(0) ?? "U"}
          </div>
        )}
        <span className="hidden sm:block text-sm font-medium max-w-28 truncate">{user.name}</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-lg border border-green-100 w-56 p-2 mt-2 z-50">
        <li className="px-3 py-2 text-sm">
          <span className="font-semibold">{user.name}</span>
          <span className="text-xs text-gray-500 break-all">{user.email}</span>
        </li>
        <li>
          <Link href="/profile" onClick={() => (document.activeElement as HTMLElement | null)?.blur()}>
            প্রোফাইল
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="text-red-600">সাইন আউট</button>
        </li>
      </ul>
    </div>
  );
}