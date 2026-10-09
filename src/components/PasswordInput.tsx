"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({
  name = "password",
  placeholder = "পাসওয়ার্ড",
}: {
  name?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mt-1">
      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="input input-bordered w-full pr-11"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
}