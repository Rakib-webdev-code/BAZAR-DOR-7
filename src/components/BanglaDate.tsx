"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const subscribe = () => () => {};

export default function BanglaDate() {
  const date = useSyncExternalStore(subscribe, format, () => "");
  return <p className="text-xs text-gray-500 min-h-4">{date}</p>;
}