import AnimatedCounter from './AnimatedCounter';
import { useContent } from "../hooks/useContent";

export default function Hero() {
  const { data: content } = useContent("beranda");
  const hero = content?.hero;
  const statData = hero?.stats ?? [
    { value: 500, suffix: "+", label: "Tugas Selesai" },
    { value: 98, suffix: "%", label: "Kepuasan" },
    { value: 50, suffix: "+", label: "Tim Ahli" },
    { value: 24, suffix: " Jam", label: "Cepat Selesai" },
  ];
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />
      <div className="absolute inset-0 bg-[var(--bg-noise)]" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-blob" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: '-8s' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="opacity-0 animate-float-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-full mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse-glow" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
              #1 JOKI TUGAS
            </span>
          </div>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-gray-900 dark:text-white leading-[0.85] tracking-tighter">
          <span className="block opacity-0 animate-float-up">Tugas</span>
          <span
            className="block mt-1 opacity-0 animate-float-up"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-500 via-amber-400 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift">
              Menumpuk?
            </span>
          </span>
        </h1>

        <p
          className="opacity-0 animate-float-up mt-6 max-w-lg mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
          style={{ animationDelay: '0.3s' }}
        >
          Serahkan aja ke{' '}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Beresin
          </span>
          .
          <br />
          Cepat, profesional, ramah di kantong.
        </p>

        <div
          className="opacity-0 animate-float-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: '0.45s' }}
        >
          <a
            href="/kontak"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
          >
            Mulai Konsultasi
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="/layanan"
            className="px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium rounded-xl text-sm hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-all"
          >
            Lihat Layanan
          </a>
        </div>

        <div
          className="opacity-0 animate-float-up mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          style={{ animationDelay: '0.6s' }}
        >
          {statData.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
