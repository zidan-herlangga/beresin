import useInView from "../hooks/useInView";

const team = [
  {
    name: "Zidan Herlangga",
    role: "Programming Lead",
    skill: "Python, JavaScript, PHP",
    desc: "Ahli algoritma dan pengembangan web. Lulusan Ilmu Komputer.",
    color: "from-indigo-500 to-blue-500",
    initials: "ZH",
  },
  {
    name: "Aldo Moroseto",
    role: "Business & Marketing",
    skill: "Strategi, Copywriting, Branding",
    desc: "Pengelola operasional dan strategi pengembangan brand Beresin.",
    color: "from-purple-500 to-pink-500",
    initials: "AM",
  },
];

export default function TimAhli() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="tim" className="py-24 bg-gray-50/80 dark:bg-gray-900 relative overflow-hidden">
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
            TIM AHLI
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Kenalan dengan{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Tim Kami
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Mereka yang akan ngerjain tugas kamu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-lg mx-auto">
          {team.map((t, i) => (
            <div
              key={t.name}
              className={`group p-6 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-200/70 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                {t.initials}
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
                {t.name}
              </h3>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {t.role}
              </p>
              <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                {t.skill}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
