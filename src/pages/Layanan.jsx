import useInView from "../hooks/useInView";

const categories = [
  {
    title: "Tugas Sekolah",
    desc: "Dari PR harian sampe makalah, semua kita beresin.",
    items: ["PR Matematika & IPA", "Makalah & Laporan", "PPT Presentasi", "Tugas Kelompok", "Resume & Rangkuman"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    gradient: "from-sky-500 to-blue-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    title: "Tugas Kuliah",
    desc: "Esai, jurnal, studi kasus — level akademik.",
    items: ["Esai & Opini", "Jurnal & Review", "Studi Kasus", "Laporan Praktikum", "Resume Buku"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    title: "Programming",
    desc: "Web, mobile, Python, Java — all done.",
    items: ["Website Landing Page", "Aplikasi Desktop", "Python / Java / C++", "Database SQL", "Debugging & Fix"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    title: "Desain & Multimedia",
    desc: "Brosur, video, PPT keren — aesthetic abis.",
    items: ["Desain Grafis", "Edit Video", "PPT Premium", "Infografis", "Canva Pro"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Riset & Data",
    desc: "Data olah, SPSS, Excel — beres rapi.",
    items: ["Riset Kuantitatif", "Riset Kualitatif", "Olah Data SPSS", "Excel & Visualisasi", "Laporan Riset"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Terjemahan",
    desc: "Inggris-Indonesia, Indonesia-Inggris.",
    items: ["Dokumen Akademik", "Artikel & Jurnal", "Karya Ilmiah", "Bisnis & Legal", "Koreksi Grammar"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
];

export default function Layanan() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="pt-20">
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            LAYANAN
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Semua{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              bisa diberesin
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            6 kategori, 30+ jenis tugas. Apapun tugasmu, kita siap bantu.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className={`group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cat.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className={`mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${cat.gradient} rounded-full`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Mau konsultasi dulu?
          </h2>
          <p className="mt-3 text-indigo-200">Gratis! Chat aja, kita jelasin detailnya.</p>
          <a
            href="/kontak"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
          >
            Hubungi Kami
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
