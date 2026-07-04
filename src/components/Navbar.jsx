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
              <img src="/logo.svg" alt="Beresin" className="h-8 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
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
          className={`absolute inset-0 bg-black/60 backdrop-blur-lg transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="relative w-full max-w-md mx-4">
            <div className="text-center">
              <div className="flex items-center justify-between mb-10 px-2">
                <span className="text-sm font-bold">
                  <img
                    src="/logo.svg"
                    alt="Beresin"
                    className="h-7 w-auto inline-block"
                  />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
              </div>

              <div className="space-y-1">
                {links.map((l, i) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`group block py-3 px-4 transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-mono mr-4 group-hover:text-indigo-400 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {l.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div
                className={`mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 px-2 transition-all duration-500 delay-700 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <Link
                  to="/kontak"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
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
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
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
