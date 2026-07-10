import { useContent } from "../hooks/useContent";
import useInView from "../hooks/useInView";

const defaultServices = [
  {
    title: "Tugas Sekolah",
    desc: "PR, makalah, laporan, PPT — semua beres.",
    items: ["PR & Pekerjaan Rumah", "Makalah & Laporan", "PPT Presentasi", "Tugas Kelompok"],
    color: "indigo",
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: "Tugas Kuliah",
    desc: "Esai, jurnal, studi kasus — kualitas akademik.",
    items: ["Esai & Jurnal", "Studi Kasus", "Resume Buku", "Review Jurnal"],
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Programming",
    desc: "Web and mobile apps, Python, Java, SQL — all done.",
    items: ["Website & Aplikasi", "Python / Java / C++", "Database SQL", "Debugging & Error"],
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Lainnya",
    desc: "Terjemahan, desain, video, riset — all in one.",
    items: ["Terjemahan", "Desain Grafis", "Editing Video", "Riset Data"],
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

const bentoGrid = [
  { service: 0, className: "sm:col-span-2 sm:row-span-1" },
  { service: 1, className: "sm:col-span-1 sm:row-span-2" },
  { service: 2, className: "sm:col-span-1 sm:row-span-1" },
  { service: 3, className: "sm:col-span-2 sm:row-span-1" },
];

export default function Layanan() {
  const { data: content } = useContent("beranda");
  const apiServices = content?.features;
  const services = apiServices
    ? apiServices.map((s, i) => {
        const def = defaultServices[i] || {};
        return {
          title: s.title || def.title,
          desc: s.desc || def.desc,
          items: def.items,
          color: def.color,
          gradient: def.gradient,
          bg: def.bg,
          icon: def.icon,
        };
      })
    : defaultServices;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="layanan" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
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
            LAYANAN
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Semua jenis tugas,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              kami siap bantu
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            4 kategori utama dengan 16+ jenis tugas. Pilih sesuai kebutuhanmu.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 auto-rows-[200px]">
          {bentoGrid.map((item) => {
            const s = services[item.service];
            return (
              <div
                key={s.title}
                className={`group relative p-6 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-200/70 dark:border-gray-700/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 ${item.className} ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${item.service * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-50/30 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>

                <h3 className="relative mt-3 text-base font-bold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="relative mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  {s.desc}
                </p>

                <div className="relative mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/60 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
