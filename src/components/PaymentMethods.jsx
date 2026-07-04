import useInView from "../hooks/useInView";

const methods = [
  { name: "BCA", type: "Bank Transfer" },
  { name: "Mandiri", type: "Bank Transfer" },
  { name: "BRI", type: "Bank Transfer" },
  { name: "OVO", type: "E-Wallet" },
  { name: "GoPay", type: "E-Wallet" },
  { name: "Dana", type: "E-Wallet" },
  { name: "Shopee Pay", type: "E-Wallet" },
  { name: "QRIS", type: "All Payment" },
];

const bankColors = [
  "from-blue-600 to-blue-700",
  "from-yellow-500 to-yellow-600",
  "from-emerald-600 to-emerald-700",
  "from-purple-500 to-purple-600",
  "from-blue-400 to-blue-500",
  "from-blue-500 to-blue-600",
  "from-orange-500 to-orange-600",
  "from-indigo-500 to-indigo-600",
];

export default function PaymentMethods() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="pembayaran" className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            PEMBAYARAN
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Metode Pembayaran
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Transfer bank & e-wallet, DP 50% dulu, sisanya setelah selesai.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          {methods.map((m, i) => (
            <div
              key={m.name}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-700/40 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 transition-all duration-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${bankColors[i]} flex items-center justify-center text-white text-[8px] font-bold`}>
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">{m.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{m.type}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-6">
          Pembayaran aman & terpercaya
        </p>
      </div>
    </section>
  );
}
