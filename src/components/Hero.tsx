import Image from "next/image";
import heroImg from "@/img/bazar-hero.png";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
        <div className="text-center md:text-left">
          <span className="inline-block text-xs font-semibold bg-white border border-green-200 text-green-700 rounded-full px-3 py-1">
            প্রতিদিনের বাজার দর আপডেট
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            আজকের বাজারদর জানুন এক নজরে
          </h1>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সর্বশেষ দাম এবং গতকালের তুলনায় দাম
            বাড়া-কমার হিসাব দেখে নিন সহজে।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn bg-green-700 hover:bg-green-800 text-white mt-5 btn-sm sm:btn-md"
          >
            সব পণ্যের দাম দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image src={heroImg} alt="বাজারের ঝুড়ি" priority className="w-full max-w-sm h-auto" />
        </div>
      </div>
    </section>
  );
}