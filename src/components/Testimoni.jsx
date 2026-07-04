import { useState } from "react";
import useInView from "../hooks/useInView";

const testimonials = [
  {
    name: "Rina",
    role: "Mahasiswi UI",
    text: "Makalah selesai dalam 1 hari! Revisinya dikit banget. Makasih Beresin!",
    initials: "RN",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    name: "Budi",
    role: "Siswa SMA 3",
    text: "PR Matematika beres semua. Nilai aku jadi 90. Recomended banget!",
    initials: "BD",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Sari",
    role: "Mahasiswi ITB",
    text: "Tugas coding Python yang deadline besok, ternyata bisa selesai malam itu juga.",
    initials: "SR",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    name: "Doni",
    role: "Mahasiswa UGM",
    text: "Sudah 5 kali pakai jasa ini, hasilnya selalu memuaskan. Trusted!",
    initials: "DN",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Maya",
    role: "Mahasiswi UNPAD",
    text: "Review jurnalnya lengkap banget, langsung dapat A. Highly recommended!",
    initials: "MY",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function Testimoni() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="testimoni" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-xl mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            TESTIMONI
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Kata{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              mereka
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative min-h-[220px]">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`transition-all duration-500 ${
                    i === active
                      ? "opacity-100 translate-x-0 block"
                      : "opacity-0 translate-x-8 hidden"
                  }`}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-10 bg-gradient-to-r from-indigo-600 to-purple-600"
                      : "w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
              <span className="ml-auto text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                {active + 1}/{testimonials.length}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 shrink-0 ${
                    i === active
                      ? "border-indigo-200 dark:border-indigo-600/40 bg-indigo-50/50 dark:bg-indigo-950/30"
                      : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      {t.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
