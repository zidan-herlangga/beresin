import useInView from "../hooks/useInView";
import { useContent } from "../hooks/useContent";

const defaultValues = [
  { title: "Cepet", desc: "Tugas beres sebelum deadline. No panic." },
  { title: "Profesional", desc: "Dikerjain tim ahli yang kompeten di bidangnya." },
  { title: "Ramah", desc: "Harga kantong pelajar, pelayanan maksimal." },
  { title: "Amanah", desc: "Privasi aman, hasil original, revisi gratis." },
];

const defaultStats = [
  { label: "Tugas Selesai", value: "500+" },
  { label: "Tim Ahli", value: "50+" },
  { label: "Kepuasan", value: "98%" },
  { label: "Cepat Selesai", value: "24 Jam" },
];

const defaultTeam = [
  { name: "Zidan Herlangga", role: "Programming Lead", desc: "Ahli algoritma & pengembangan web. Lulusan Ilmu Komputer.", color: "from-indigo-500 to-blue-500" },
  { name: "Aldo Moroseto", role: "Business & Marketing", desc: "Pengelola operasional dan strategi brand Beresin.", color: "from-purple-500 to-pink-500" },
];

export default function Tentang() {
  const { data: content } = useContent("tentang");
  const about = content;
  
  const displayStats = about?.stats
    ? about.stats.map((s) => ({
        label: s.label,
        value: s.value + (s.suffix || ""),
      }))
    : defaultStats;

  const displayValues = about?.values || defaultValues;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="pt-20">
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            TENTANG
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {(about?.heroTitle || "Kenalan sama")}{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Beresin
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {about?.heroSubtitle || "Beresin adalah platform joki tugas buat siswa & mahasiswa se-Indonesia. Kami bantu tugas kamu beres tepat waktu, kualitas ok, harga ramah."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Kenapa Beresin?
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                {about?.story?.[0] || "Awalnya kita sadar banyak temen-temen yang stres banget sama tugas yang numpuk. Deadline mepet, bingung, pusing. Makanya kita bikin Beresin — biar semua bisa di\"beresin\" tanpa drama."}
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed">
                {about?.story?.[1] || "Setiap tugas dikerjain tim ahli yang udah terverifikasi. Kita juga kasih garansi revisi gratis sampai kamu puas. Pokoknya, kamu tinggal duduk manis, tugas beres!"}
              </p>
            </div>
            <div ref={ref} className="grid grid-cols-2 gap-4">
              {displayStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 text-center transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Value Kami
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayValues.map((v, i) => (
              <div key={v.title} className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-200/70 dark:border-gray-700/40 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{i + 1}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">{v.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              TIM KAMI
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Yang ngerjain tugas kamu
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(about?.tim || defaultTeam).map((t, i) => (
              <div
                key={t.name}
                className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 text-center"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4f46e5&color=fff&bold=true&size=80`}
                  alt={t.name}
                  className="w-20 h-20 mx-auto rounded-2xl shadow-sm group-hover:scale-105 group-hover:shadow-indigo-500/20 transition-all duration-300"
                />
                <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{t.name}</h3>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{t.role}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Siap beresin tugas kamu?
          </h2>
          <p className="mt-3 text-indigo-200">
            Konsultasi gratis. Chat aja!
          </p>
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
