import useInView from "../hooks/useInView";
import { useContent } from "../hooks/useContent";

const defaultProjects = [
  {
    title: "Aplikasi Manajemen Inventaris",
    desc: "Sistem informasi stok barang berbasis web — PHP & MySQL, laporan real-time, multi-user.",
    tag: "Programming",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
    gradient: "from-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "Makalah Ekonomi Kreatif",
    desc: "Analisis dampak ekonomi kreatif terhadap pertumbuhan UMKM di Indonesia — 20 halaman, 30+ referensi jurnal.",
    tag: "Makalah",
    tagColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    gradient: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
  },
  {
    title: "Desain UI/UX Aplikasi Mobile",
    desc: "Mobile app design untuk startup edukasi — Figma, prototyping interaktif, design system lengkap.",
    tag: "Desain",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    gradient: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80",
  },
  {
    title: "Video Company Profile",
    desc: "Video promosi perusahaan teknologi durasi 3 menit — animasi motion graphics, voice over, subtitle.",
    tag: "Video",
    tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
    gradient: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  },
  {
    title: "Aplikasi Kasir Restoran",
    desc: "Desktop app kasir dengan fitur laporan harian, manajemen menu, dan cetak struk — C# & SQL Server.",
    tag: "Programming",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
    gradient: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Review Jurnal Internasional",
    desc: "Review 10 jurnal Q1-Q2 tentang AI dalam pendidikan — analisis metodologi, temuan, dan implikasi.",
    tag: "Jurnal",
    tagColor: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
    gradient: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80",
  },
];

export default function Portofolio() {
  const { data: content } = useContent("beranda");
  const apiProjects = content?.portofolio;
  const projects = apiProjects
    ? apiProjects.map((p, i) => {
        const def = defaultProjects[i] || {};
        return {
          title: p.title || def.title,
          desc: p.desc || def.desc,
          tag: p.category || def.tag,
          tagColor: def.tagColor,
          gradient: def.gradient,
          image: p.image || def.image || "",
        };
      })
    : defaultProjects;

  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="portofolio" className="py-24 bg-gray-50/80 dark:bg-gray-900 relative overflow-hidden">
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
            PORTOFOLIO
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contoh{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Tugas
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Beberapa hasil tugas yang udah kami kerjakan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`group relative p-6 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-200/70 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {p.image ? (
                <div className="w-full h-32 rounded-xl overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              ) : (
                <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${p.gradient} opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity`} />
              )}

              <div className="mt-3">
                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-md ${p.tagColor}`}>
                  {p.tag}
                </span>
                <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${p.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
