import { getCollection } from './lib/db.js';

const STATIC_PAGES = [
  {
    loc: 'https://beresintugas.vercel.app/',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    loc: 'https://beresintugas.vercel.app/layanan',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    loc: 'https://beresintugas.vercel.app/cara-order',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    loc: 'https://beresintugas.vercel.app/tentang',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    loc: 'https://beresintugas.vercel.app/kontak',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    loc: 'https://beresintugas.vercel.app/blog',
    priority: 0.9,
    changefreq: 'weekly',
  },
];

const BLOG_DEFAULTS = [
  { slug: 'tips-mengerjakan-skripsi-dalam-3-bulan', date: '2026-03-15' },
  { slug: '5-aplikasi-ai-yang-bantu-tugas-kuliah', date: '2026-02-10' },
  { slug: 'cara-membuat-makalah-yang-baik', date: '2026-01-05' },
];

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toUrl(slug) {
  return `https://beresintugas.vercel.app/blog/${escapeXml(slug)}`;
}

// Menggunakan Native Date Parser agar lebih fleksibel menangani format string dari DB
function normalizeDate(dateInput) {
  if (!dateInput) return '2026-07-04';

  const parsed = Date.parse(dateInput);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }

  // Fallback jika format string aneh (seperti "15 Mar 2026" tanpa standar ISO)
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const parts = dateInput.split(' ');
  if (parts.length === 3 && months[parts[1]]) {
    return `${parts[2]}-${months[parts[1]]}-${parts[0].padStart(2, '0')}`;
  }

  return '2026-07-04';
}

export default async function handler(req, res) {
  const col = await getCollection('content');
  let blogEntries = [];

  if (col) {
    try {
      const beranda = await col.findOne({ page: 'beranda' });
      if (beranda?.data?.blog) {
        blogEntries = beranda.data.blog.map((a) => ({
          slug: a.slug,
          date: normalizeDate(a.date),
        }));
      }
    } catch (e) {
      // Sangat disarankan log error internal agar terpantau jika DB bermasalah
      console.error('Sitemap DB Error:', e);
    }
  }

  if (blogEntries.length === 0) {
    blogEntries = BLOG_DEFAULTS;
  }

  const today = new Date().toISOString().slice(0, 10);

  const urls = STATIC_PAGES.map((p) => {
    // Memastikan lastmod halaman statis tidak selalu dianggap 'hari ini' kecuali yang sering update
    const lastModDate = p.changefreq === 'weekly' ? today : '2026-07-01';
    return `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  const blogUrls = blogEntries
    .map(
      (b) => `  <url>
    <loc>${toUrl(b.slug)}</loc>
    <lastmod>${b.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
${blogUrls}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
