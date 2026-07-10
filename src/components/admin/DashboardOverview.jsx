import { useMemo, useState, useEffect } from 'react';
import { API, icons, pages } from './constants';
import Svg from './Svg';

function calculateStats(d) {
  return {
    beranda: {
      blog: d.beranda?.blog?.length || 0,
      features: d.beranda?.features?.length || 0,
    },
    layanan: {
      categories: d.layanan?.categories || [],
    },
    [pages[3].id]: {
      steps: d[pages[3].id]?.steps?.length || 0,
      faq: d[pages[3].id]?.faq?.length || 0,
    },
    tentang: {
      story: d.tentang?.story?.length || 0,
      stats: d.tentang?.stats?.length || 0,
      tim: d.tentang?.tim?.length || 0,
      values: d.tentang?.values?.length || 0,
    },
    kontak: {
      contacts: d.kontak?.contacts?.length || 0,
      socials: d.kontak?.socials?.length || 0,
    },
  };
}

export default function DashboardOverview({ onNavigate }) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await Promise.all(
          ['beranda', 'layanan', 'cara-order', 'tentang', 'kontak'].map((p) =>
            fetch(`${API}/content?page=${p}`).then((r) => r.json()),
          ),
        );
        if (cancelled) return;
        const merged = {};
        res.forEach((j) => { merged[j.page] = j.data; });
        setStats(calculateStats(merged));
      } catch {
        if (!cancelled) setStats({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const cards = useMemo(
    () => [
      { label: 'Total Konten', value: loading ? '-' : Object.values(stats).reduce((s, v) => s + Object.values(v).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0), 0), sub: 'Semua halaman', color: 'from-indigo-500 to-purple-600', glow: 'shadow-indigo-600/20', icon: icons.shield },
      { label: 'Halaman', value: '5', sub: 'Beranda, Layanan, Cara Order, Tentang, Kontak', color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-600/20', icon: icons.dashboard },
      { label: 'Blog', value: stats.beranda?.blog || 0, sub: 'Artikel diterbitkan', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-600/20', icon: icons.blog },
      { label: 'Layanan', value: loading ? '-' : (() => { const c = stats.layanan?.categories; return c?.reduce((s, cat) => s + (cat.services?.length || 0), 0) || 0; })(), sub: `${stats.layanan?.categories?.length || 0} kategori`, color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-600/20', icon: icons.layanan },
    ],
    [stats, loading],
  );

  const sections = useMemo(() => {
    if (!stats.beranda) return [];
    return [
      {
        id: 'beranda', label: 'Beranda', icon: icons.beranda,
        items: [
          { name: 'Hero Section', count: 1 },
          { name: 'Fitur', count: stats.beranda?.features || 0 },
          { name: 'Blog', count: stats.beranda?.blog || 0 },
        ],
      },
      {
        id: 'layanan', label: 'Layanan', icon: icons.layanan,
        items: [
          { name: 'Kategori', count: stats.layanan?.categories?.length || 0 },
          { name: 'Total Servis', count: stats.layanan?.categories?.reduce((s, c) => s + (c.services?.length || 0), 0) || 0 },
        ],
      },
      {
        id: 'cara-order', label: 'Cara Order', icon: icons['cara-order'],
        items: [
          { name: 'Langkah', count: stats['cara-order']?.steps?.length || 0 },
          { name: 'FAQ', count: stats['cara-order']?.faq?.length || 0 },
        ],
      },
      {
        id: 'tentang', label: 'Tentang', icon: icons.tentang,
        items: [
          { name: 'Cerita', count: stats.tentang?.story?.length || 0 },
          { name: 'Statistik', count: stats.tentang?.stats?.length || 0 },
          { name: 'Tim', count: stats.tentang?.tim?.length || 0 },
          { name: 'Values', count: stats.tentang?.values?.length || 0 },
        ],
      },
      {
        id: 'kontak', label: 'Kontak', icon: icons.kontak,
        items: [
          { name: 'Kontak', count: stats.kontak?.contacts?.length || 0 },
          { name: 'Sosial', count: stats.kontak?.socials?.length || 0 },
        ],
      },
    ];
  }, [stats]);

  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Selamat Pagi');
    else if (h < 15) setGreeting('Selamat Siang');
    else if (h < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5">
              <div className="w-10 h-10 bg-white/5 rounded-xl mb-3" />
              <div className="h-7 w-16 bg-white/5 rounded mb-2" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent border border-indigo-500/10 p-6 md:p-8">
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {greeting}, Admin 👋
          </h2>
          <p className="text-sm text-gray-400 mt-1.5">
            {dateStr} &middot; {timeStr} WIB
          </p>
          <p className="text-sm text-gray-500 mt-3 max-w-xl">
            Kelola konten website dari sini. Pantau statistik, edit halaman, dan perbarui informasi dengan mudah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="group relative bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow-lg ${c.glow}`}>
              <Svg d={c.icon} className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
            <p className="text-[10px] text-gray-600">{c.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500 inline-block" />
          Ringkasan Konten
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sections.map((s) => {
            const total = s.items.reduce((sum, it) => sum + it.count, 0);
            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="relative group text-left bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5 hover:border-indigo-500/20 hover:bg-indigo-500/[0.03] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center">
                      <Svg d={s.icon} className="w-4 h-4 text-gray-400 group-hover:text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-200">{s.label}</h4>
                  </div>
                  <Svg d={icons.chevronRight} className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
                </div>
                <div className="space-y-2">
                  {s.items.map((it) => (
                    <div key={it.name} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{it.name}</span>
                      <span className="text-gray-600 font-mono">{it.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-gray-600">{total} item</span>
                  <span className="text-indigo-500/60 group-hover:text-indigo-400">Kelola &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
