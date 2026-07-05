import { useState } from 'react';
import useInView from '../hooks/useInView';
import { useContent } from '../hooks/useContent';

const defaultContacts = [
  {
    label: 'WhatsApp',
    value: '0851-5706-6514',
    href: 'https://wa.me/6285157066514',
    gradient: 'from-green-500 to-emerald-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'zidanherlangga24@gmail.com',
    href: 'mailto:zidanherlangga24@gmail.com',
    gradient: 'from-blue-500 to-indigo-600',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '#',
    href: '#',
    gradient: 'from-pink-500 to-rose-600',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect width="18" height="18" x="3" y="3" rx="5" strokeWidth={1.5} />
        <path
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Kontak() {
  const { data: content } = useContent('kontak');

  const apiContacts = content?.contacts;
  const contacts = apiContacts
    ? apiContacts.map((c, i) => {
        const def = defaultContacts[i] || {};
        return {
          label: c.label || def.label,
          value: c.value || def.value,
          href: c.href || def.href,
          gradient: def.gradient,
          icon: def.icon,
        };
      })
    : defaultContacts;

  const [ref, inView] = useInView({ threshold: 0.1 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      nama: form.nama.value,
      email: form.email.value,
      pesan: form.pesan.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Pesan berhasil dikirim! Kami akan menghubungi kamu.',
        });
        form.reset();
        setLoading(false);
        return;
      }
      setStatus({
        type: 'error',
        message: json.error || 'Gagal mengirim pesan.',
      });
      setLoading(false);
      return;
    } catch {
      setStatus({
        type: 'error',
        message: 'Gagal mengirim pesan. Coba lagi nanti.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="pt-20">
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            KONTAK
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Yuk,{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              ngobrol
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Konsultasi gratis, respon cepat. Tinggal chat aja!
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg transition-all duration-300 ${
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${contacts.indexOf(c) * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0`}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {c.label}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {c.value}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className={`p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Atau kirim pesan
              </h3>
              <div className="space-y-3">
                <input
                  name="nama"
                  required
                  placeholder="Nama kamu"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email kamu"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all"
                />
                <textarea
                  name="pesan"
                  required
                  rows={4}
                  placeholder="Tulis pesan..."
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-60"
                >
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
                {status && (
                  <p
                    className={`text-center text-xs ${status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
