import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import useInView from "../hooks/useInView";

const defaultArticles = [
  { title: "Tips Mengerjakan Skripsi dalam 3 Bulan", slug: "tips-mengerjakan-skripsi-dalam-3-bulan", tag: "Tips", date: "15 Mar 2026", excerpt: "Panduan praktis menyelesaikan skripsi tepat waktu tanpa stres berlebihan.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" },
  { title: "5 Aplikasi AI yang Bantu Tugas Kuliah", slug: "5-aplikasi-ai-yang-bantu-tugas-kuliah", tag: "Teknologi", date: "10 Feb 2026", excerpt: "Manfaatkan AI untuk membantu riset dan penulisan tugas kuliahmu.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
  { title: "Cara Membuat Makalah yang Baik", slug: "cara-membuat-makalah-yang-baik", tag: "Panduan", date: "5 Jan 2026", excerpt: "Struktur dan tips menulis makalah yang benar agar mendapat nilai A.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80" },
];

export default function BlogPage() {
  const { data: content } = useContent("beranda");
  const apiArticles = content?.blog;
  const articles = apiArticles
    ? apiArticles.map((a, i) => {
        const def = defaultArticles[i] || {};
        return { title: a.title || def.title, slug: a.slug || def.slug, tag: a.tag || def.tag, date: a.date || def.date, excerpt: a.excerpt || def.excerpt, image: a.image || def.image };
      })
    : defaultArticles;

  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`max-w-xl mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            BLOG
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Semua{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Artikel
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Kumpulan artikel & tips seputar tugas sekolah, kuliah, dan produktivitas.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            <p className="text-sm text-gray-400">Belum ada artikel.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <Link
                key={a.slug || i}
                to={`/blog/${a.slug}`}
                className={`group block p-0 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-200/70 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 overflow-hidden ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-full h-44 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">{a.tag}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{a.date}</span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">{a.title}</h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <p className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Baca selengkapnya &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
