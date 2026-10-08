const DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => DIGITS[Number(d)]);

// 1850 -> ১,৮৫০
export const bnNum = (n: number) => toBn(n.toLocaleString("en-US"));

const UNITS: Record<string, [string, string]> = {
  kg: ["প্রতি কেজি", "কেজি"],
  liter: ["প্রতি লিটার", "লিটার"],
  litre: ["প্রতি লিটার", "লিটার"],
  l: ["প্রতি লিটার", "লিটার"],
  dozen: ["প্রতি ডজন", "ডজন"],
  doz: ["প্রতি ডজন", "ডজন"],
  piece: ["প্রতি পিস", "পিস"],
  pcs: ["প্রতি পিস", "পিস"],
  pc: ["প্রতি পিস", "পিস"],
};

export const unitLabel = (u: string) =>
  UNITS[u.toLowerCase()]?.[0] ?? `প্রতি ${u}`;

export const unitShort = (u: string) => UNITS[u.toLowerCase()]?.[1] ?? u;