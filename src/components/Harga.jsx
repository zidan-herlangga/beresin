import { useContent } from "../hooks/useContent";
import useInView from "../hooks/useInView";

const defaultPlans = [
  {
    name: "Pelajar",
    price: "25",
    unit: "rb",
    desc: "Cocok buat tugas ringan",
    features: ["PR & tugas harian", "Makalah singkat", "Revisi 1x", "Via chat"],
    gradient: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
  },
  {
    name: "Mahasiswa",
    price: "250",
    unit: "rb",
    desc: "Termasuk programming! Untuk tugas kuliah",
    features: ["Esai & jurnal", "Programming tugas", "Studi kasus", "Laporan praktikum", "Revisi 2x", "Cek Turnitin"],
    gradient: "from-indigo-500 to-purple-500",
    lightBg: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
    popular: true,
  },
  {
    name: "PRO",
    price: "500",
    unit: "rb",
    desc: "Tugas berat, prioritas penuh",
    features: [
      "Skripsi/Thesis bab",
      "Desain & video",
      "Riset lanjutan",
      "Revisi 3x",
      "Prioritas & cepat",
    ],
    gradient: "from-purple-500 to-pink-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200/50 dark:border-purple-800/30",
  },
];

const getIcon = (plan) => (
  <div className={`w-12 h-12 rounded-2xl ${plan.lightBg} flex items-center justify-center`}>
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M9 12l2 2 4-4" />
    </svg>
  </div>
);

export default function Harga() {
  const { data: content } = useContent("beranda");
  const apiPlans = content?.harga;
  const plans = apiPlans
    ? apiPlans.map((p, i) => {
        const def = defaultPlans[i] || {};
        return {
          name: p.name || def.name,
          price: p.price?.replace("rb", "") || def.price,
          unit: p.price?.includes("rb") ? "rb" : def.unit,
          desc: p.desc || def.desc,
          features: p.features || def.features,
          gradient: def.gradient,
          lightBg: def.lightBg,
          borderColor: def.borderColor,
          popular: p.popular || def.popular,
        };
      })
    : defaultPlans;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="harga" className="py-24 bg-gray-50/80 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-indigo-100/30 dark:from-indigo-900/10 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-xl mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            HARGA
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Harga ramah,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              kualitas juara
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Mulai dari <span className="font-semibold text-gray-900 dark:text-white">Rp25.000</span> aja!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`group relative p-7 rounded-2xl border transition-all duration-500 ${
                plan.popular
                  ? `${plan.borderColor} bg-white dark:bg-gray-800/60 shadow-2xl scale-105 md:scale-105`
                  : `${plan.borderColor} bg-white/80 dark:bg-gray-800/30 shadow-sm hover:shadow-xl hover:-translate-y-0.5`
              } ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-bold rounded-full shadow-lg shadow-indigo-500/20 whitespace-nowrap">
                    PALING POPULER
                  </span>
                </div>
              )}

              {getIcon(plan)}

              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
                {plan.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-0.5">
                <span className="text-sm text-gray-500 dark:text-gray-400">Rp</span>
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">.{plan.unit}</span>
              </div>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{plan.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/50 shrink-0">
                      <svg className="w-2.5 h-2.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/kontak"
                className={`mt-8 block text-center py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Pilih {plan.name}
              </a>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${plan.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-8">
          *Harga dapat berubah tergantung tingkat kesulitan dan deadline
        </p>
      </div>
    </section>
  );
}
