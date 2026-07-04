import { useState } from "react";
import useInView from "../hooks/useInView";
import { useContent } from "../hooks/useContent";

const defaultFaqs = [
  {
    q: "Apakah hasil tugas original?",
    a: "Tentu! Semua tugas dikerjakan dari awal oleh tim ahli kami. Kami tidak melakukan copy-paste dan setiap tugas melalui cek plagiarisme.",
  },
  {
    q: "Berapa lama proses pengerjaan?",
    a: "Tergantung tingkat kesulitan. Tugas ringan bisa selesai 6-12 jam, tugas kompleks 1-3 hari. Kami juga punya layanan EXPRESS untuk deadline mepet!",
  },
  {
    q: "Apakah bisa request penulis tertentu?",
    a: "Bisa! Kamu bisa request tim favorit yang sudah pernah ngerjain tugas kamu sebelumnya.",
  },
  {
    q: "Bagaimana cara pembayaran?",
    a: "Kami menerima transfer bank (BCA, Mandiri, BRI), OVO, GoPay, Dana, dan ShopeePay. Bisa DP 50% dulu.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ada! Garansi revisi gratis sampai kamu puas. Kepuasan kamu adalah prioritas kami.",
  },
  {
    q: "Bagaimana cara memesan?",
    a: "Gampang! Klik tombol 'Mulai Konsultasi', chat via WhatsApp, jelasin tugasmu, kami proses secepatnya.",
  },
];

export default function FAQ() {
  const { data: content } = useContent("beranda");
  const faqs = content?.faq || defaultFaqs;

  const [openIdx, setOpenIdx] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="faq" className="py-24 bg-gray-50/80 dark:bg-gray-900 relative">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-xl mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Ada pertanyaan?
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Yang sering ditanyakan pelanggan kami.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 ${
                openIdx === i
                  ? "border-indigo-200/60 dark:border-indigo-600/30 bg-white dark:bg-gray-800/50 shadow-md"
                  : "border-gray-200/50 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/20 hover:bg-white dark:hover:bg-gray-800/30"
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left gap-3"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {faq.q}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIdx === i ? "rotate-180 text-indigo-500" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIdx === i ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
