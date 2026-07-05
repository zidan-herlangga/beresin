import useInView from '../hooks/useInView';
import { useContent } from '../hooks/useContent';

const defaultSteps = [
  {
    num: '01',
    title: 'Konsultasi',
    desc: 'Chat via WhatsApp, ceritain tugas kamu — deadline, materi, request spesifik. Tim kami bakal dengerin dan kasih saran terbaik.',
    gradient: 'from-indigo-500 to-blue-500',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Konfirmasi Harga',
    desc: 'Kami kasih penawaran harga sesuai tingkat kesulitan dan deadline. Setuju? Lanjut bayar DP 50% aja.',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Proses Pengerjaan',
    desc: 'Tim ahli kami ngerjain tugas kamu. Kamu bisa pantau progress kapan aja. Ada revisi? tinggal chat.',
    gradient: 'from-cyan-500 to-teal-500',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Selesai & Revisi',
    desc: 'Tugas dikirim via WA/Email. Kurang puas? Revisi gratis sampai kamu ACC. Bayar sisa pelunasan.',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const defaultFaqItems = [
  {
    q: 'Berapa lama prosesnya?',
    a: 'Tergantung tingkat kesulitan. Tugas ringan 6-12 jam, kompleks 1-3 hari.',
  },
  {
    q: 'Pembayaran gimana?',
    a: 'DP 50% dulu, sisanya setelah tugas selesai dan kamu ACC.',
  },
  { q: 'Bisa revisi?', a: 'Tentu! Revisi gratis sampai kamu puas.' },
];

export default function CaraOrder() {
  const { data: content } = useContent('cara-order');

  const apiSteps = content?.steps;
  const steps = apiSteps
    ? apiSteps.map((s, i) => {
        const def = defaultSteps[i] || {};
        return {
          num: s.number || def.num,
          title: s.title || def.title,
          desc: s.desc || def.desc,
          gradient: def.gradient,
          icon: def.icon,
        };
      })
    : defaultSteps;

  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="pt-20">
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            CARA ORDER
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gampang,{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              4 langkah aja
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Dari konsultasi sampai tugas beres — semua lewat WhatsApp, gampang &
            cepat.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`group relative flex gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg transition-all duration-500 ${
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="hidden sm:flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white text-lg font-bold shadow-sm`}
                  >
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-full min-h-[3rem] bg-gradient-to-b from-indigo-200 to-transparent dark:from-indigo-800 mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`sm:hidden w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {s.num}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                  <div
                    className={`mt-3 h-0.5 w-0 group-hover:w-20 transition-all duration-500 bg-gradient-to-r ${s.gradient} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
            Masih ragu?
          </h2>
          <div className="space-y-3">
            {(content?.faq || defaultFaqItems).map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/30"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Yuk, chat sekarang!
          </h2>
          <p className="mt-3 text-indigo-200">
            Gratis konsultasi, no obligated.
          </p>
          <a
            href="/kontak"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
          >
            Mulai Chat
            <svg
              className="w-4 h-4"
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
        </div>
      </section>
    </div>
  );
}
