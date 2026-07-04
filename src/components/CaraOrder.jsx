import { useContent } from "../hooks/useContent";
import useInView from "../hooks/useInView";

const defaultSteps = [
  {
    num: "01",
    title: "Konsultasi",
    desc: "Chat via WhatsApp, jelasin tugas kamu — deadline, materi, dan request spesifik.",
    color: "from-indigo-500 to-blue-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Konfirmasi Harga",
    desc: "Kami kasih penawaran harga. Setuju? Lanjut ke pembayaran DP 50%.",
    color: "from-purple-500 to-pink-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Proses Pengerjaan",
    desc: "Tim ahli kami mengerjakan tugasmu dengan teliti. Kamu bisa pantau progress.",
    color: "from-cyan-500 to-teal-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Selesai & Revisi",
    desc: "Tugas dikirim via WA/Email. Revisi gratis sampai kamu puas!",
    color: "from-amber-500 to-orange-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function CaraOrder() {
  const { data: content } = useContent("beranda");
  const apiSteps = content?.caraOrder;
  const steps = apiSteps
    ? apiSteps.map((s, i) => {
        const def = defaultSteps[i] || {};
        return {
          num: s.number || def.num,
          title: s.title || def.title,
          desc: s.desc || def.desc,
          color: def.color,
          icon: def.icon,
        };
      })
    : defaultSteps;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="cara-order" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-xl mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            CARA ORDER
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gimana cara pesannya?
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Cuma 4 langkah aja, gampang banget!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`group relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-5xl font-extrabold text-gray-200 dark:text-gray-700/50 group-hover:text-indigo-100 dark:group-hover:text-indigo-900/30 transition-colors">
                {s.num}
              </span>
              <div className={`mt-2 w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-sm`}>
                {s.icon}
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
