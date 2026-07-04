import useInView from "../hooks/useInView";

const guarantees = [
  {
    title: "Original 100%",
    desc: "Semua tugas dikerjakan dari awal. Bukan hasil copy-paste atau plagiarisme.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Revisi Gratis",
    desc: "Kurang puas? Revisi aja! Kami kasih garansi revisi sampai kamu ACC.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    title: "Tepat Waktu",
    desc: "Komitmen deadline. Kami pastikan tugas selesai sebelum batas waktu.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    title: "Data Aman",
    desc: "Privasi dan data kamu aman. Identitas tidak akan disebar ke siapapun.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

export default function Garansi() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="garansi" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-xl mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            GARANSI
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Kenapa harus{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Beresin?
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Kami serius sama kualitas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((g, i) => (
            <div
              key={g.title}
              className={`group p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl ${g.bg} flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform`}>
                {g.icon}
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                {g.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {g.desc}
              </p>
              <div className={`mt-4 w-8 h-0.5 rounded-full bg-gradient-to-r ${g.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
