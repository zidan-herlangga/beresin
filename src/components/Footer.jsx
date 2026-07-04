import { Link } from "react-router-dom";

const sosmed = [
  { name: "Instagram", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7h-.01V8H10v2z" },
  { name: "Facebook", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
  { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { name: "TikTok", icon: "M16.6 5.82s.51.5 0 0A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.71 0 3.25 2.67 5.89 5.94 5.89 3.43 0 6.32-2.88 6.32-6.32V9.28c.67.43 1.43.74 2.28.88v-3.1c-.88-.25-1.66-.8-2.28-1.24z" },
];

const layananLinks = [
  { name: "Tugas Sekolah", to: "/layanan" },
  { name: "Tugas Kuliah", to: "/layanan" },
  { name: "Programming", to: "/layanan" },
  { name: "Desain & Video", to: "/layanan" },
  { name: "Riset & Data", to: "/layanan" },
];

const infoLinks = [
  { name: "Cara Order", to: "/cara-order" },
  { name: "Syarat & Ketentuan", action: "syarat" },
  { name: "Kebijakan Privasi", action: "syarat" },
  { name: "Blog", to: "/" },
];

const kontakData = [
  { label: "0812-3456-7890", href: "tel:6281234567890" },
  { label: "hello@beresin.com", href: "mailto:hello@beresin.com" },
  { label: "@beresin.id", href: "https://instagram.com/beresin.id" },
];

const columnLinks = [
  { title: "Layanan", items: layananLinks, type: "link" },
  { title: "Info", items: infoLinks, type: "info" },
  { title: "Kontak", items: kontakData, type: "contact" },
];

export default function Footer({ onOpenSyarat }) {
  return (
    <footer className="relative py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800/50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img src="/logo.svg" alt="Beresin" className="h-9 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Beresin
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 dark:text-gray-500 max-w-xs">
              Platform joki tugas sekolah &amp; kuliah terpercaya di Indonesia. Tugas beres, nilai aman, hati senang.
            </p>
            <div className="flex gap-2.5 mt-6">
              {sosmed.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {columnLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => {
                  if (col.type === "info" && item.action === "syarat") {
                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => onOpenSyarat?.()}
                          className="text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item.name}
                        </button>
                      </li>
                    );
                  }
                  if (col.type === "contact") {
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-5">
              Pembayaran
            </h4>
            <div className="flex flex-wrap gap-2">
              {["BCA", "Mandiri", "BRI", "OVO", "GoPay", "Dana", "QRIS"].map((pm) => (
                <span
                  key={pm}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400"
                >
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Beresin. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Dibuat dengan <span className="text-red-400 animate-pulse">&hearts;</span> untuk pelajar Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
