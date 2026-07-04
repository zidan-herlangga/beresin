import useInView from "../hooks/useInView";
import { useContent } from "../hooks/useContent";

const defaultArticles = [
  {
    title: "5 Tips Biar Gak Panik Saat Deadline Mepet",
    excerpt: "Deadline tugas besok? Tenang, ada cara biar kamu tetap produktif tanpa panik berlebihan.",
    tag: "Tips",
    tagColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    gradient: "from-indigo-500 to-purple-500",
    date: "15 Jun 2024",
  },
  {
    title: "Cara Bikin Makalah Yang Bikin Dosen Terkesan",
    excerpt: "Mau nilai A? Ikuti struktur dan tips menulis makalah yang benar biar dosen puas.",
    tag: "Akademik",
    tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
    gradient: "from-purple-500 to-pink-500",
    date: "10 Jun 2024",
  },
  {
    title: "Rekomendasi Tools AI Buat Bantu Tugas Kuliah",
    excerpt: "Manfaatin AI buat bantu riset, nulis, dan coding. Tapi tetep pake etika ya!",
    tag: "Teknologi",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
    gradient: "from-cyan-500 to-teal-500",
    date: "5 Jun 2024",
  },
];

export default function Blog() {
  const { data: content } = useContent("beranda");
  const apiArticles = content?.blog;
  const articles = apiArticles
    ? apiArticles.map((a, i) => {
        const def = defaultArticles[i] || {};
        return {
          title: a.title || def.title,
          excerpt: a.excerpt || def.excerpt,
          tag: a.tag || def.tag,
          tagColor: def.tagColor,
          gradient: def.gradient,
          date: a.date || def.date,
        };
      })
    : defaultArticles;

  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="blog" className="py-24 bg-gray-50/80 dark:bg-gray-900 relative overflow-hidden">
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
            BLOG
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Tips &{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Artikel
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Artikel & tips seputar tugas sekolah, kuliah, dan produktivitas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <div
              key={a.title}
              className={`group p-6 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-200/70 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-full h-28 rounded-xl bg-gradient-to-br ${a.gradient} opacity-10 dark:opacity-20 group-hover:opacity-20 transition-opacity`} />

              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-md ${a.tagColor}`}>
                  {a.tag}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{a.date}</span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-gray-900 dark:text-white leading-snug">
                {a.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {a.excerpt}
              </p>

              <p className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Baca selengkapnya &rarr;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
