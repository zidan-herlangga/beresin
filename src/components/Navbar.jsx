import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Blog', to: '/blog' },
  { label: 'Cara Order', to: '/cara-order' },
  { label: 'Tentang', to: '/tentang' },
  { label: 'Kontak', to: '/kontak' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useTheme();
  const loc = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setOpen(false), [loc]);

  const isActive = (to) => {
    if (to === '/') return loc.pathname === '/';
    return loc.pathname.startsWith(to);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-gray-950/60 backdrop-blur-2xl border-b border-gray-100/50 dark:border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.svg"
                alt="Beresin"
                width="120"
                height="120"
                className="h-8 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                fetchPriority="high"
              />
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Beresin
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm transition-colors ${
                    isActive(l.to)
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pl-6 border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setDark(!dark)}
                  className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all"
                  aria-label="Toggle dark mode"
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                  >
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                  >
                    <svg
                      className="w-4 h-4 text-indigo-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                </button>
                <Link
                  to="/kontak"
                  className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Pesan
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setDark(!dark)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle dark mode"
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                >
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                >
                  <svg
                    className="w-4 h-4 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    d="M3 6h18M3 12h18M3 18h18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/30 border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative px-6 pt-8 pb-6 text-center">
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-8">
                <img
                  src="/logo.svg"
                  alt="Beresin"
                  width="120"
                  height="120"
                  className="h-8 w-auto mx-auto mb-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Menu Navigasi
                </p>
              </div>

              <div className="space-y-1.5">
                {links.map((l, i) => {
                  const active = isActive(l.to);
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md transition-all ${
                          active
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-600'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/kontak"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.97]"
                >
                  Pesan Sekarang
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
                </Link>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Konsultasi gratis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
