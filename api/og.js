import { getCollection } from "./lib/db.js";

const BASE = "https://beresintugas.vercel.app";
const DEFAULT_IMAGE = `${BASE}/og-image.jpg`;
const FB_APP_ID = "";

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function optimizeImage(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url || "";
  return url.replace("/upload/", "/upload/w_1200,h_630,c_fill,q_auto,f_auto/");
}

function metaTag(property, content) {
  return content ? `<meta property="${property}" content="${escapeHtml(content)}" />\n` : "";
}

function html({ title, description, image, url, type = "website" }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
${metaTag("fb:app_id", FB_APP_ID)}
${metaTag("og:type", type)}
${metaTag("og:url", url)}
${metaTag("og:title", title)}
${metaTag("og:description", description)}
${metaTag("og:image", image)}
${metaTag("og:image:width", "1200")}
${metaTag("og:image:height", "630")}
${metaTag("og:site_name", "Beresin - Joki Tugas Sekolah & Kuliah")}
${metaTag("twitter:card", "summary_large_image")}
${metaTag("twitter:title", title)}
${metaTag("twitter:description", description)}
${metaTag("twitter:image", image)}
</head>
<body>
</body>
</html>`;
}

const BLOG_DATA = [
  { title: "Tips Mengerjakan Skripsi dalam 3 Bulan", slug: "tips-mengerjakan-skripsi-dalam-3-bulan", tag: "Tips", date: "15 Mar 2026", excerpt: "Panduan praktis menyelesaikan skripsi tepat waktu tanpa stres berlebihan.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" },
  { title: "5 Aplikasi AI yang Bantu Tugas Kuliah", slug: "5-aplikasi-ai-yang-bantu-tugas-kuliah", tag: "Teknologi", date: "10 Feb 2026", excerpt: "Manfaatkan AI untuk membantu riset dan penulisan tugas kuliahmu.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
  { title: "Cara Membuat Makalah yang Baik", slug: "cara-membuat-makalah-yang-baik", tag: "Panduan", date: "5 Jan 2026", excerpt: "Struktur dan tips menulis makalah yang benar agar mendapat nilai A.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80" },
];

async function findBlog(slug) {
  const fromHardcoded = BLOG_DATA.find((a) => a.slug === slug);
  if (fromHardcoded) return fromHardcoded;

  try {
    const col = await getCollection("content");
    if (col) {
      const doc = await col.findOne({ page: "beranda" });
      if (doc?.data?.blog) {
        return doc.data.blog.find((a) => a.slug === slug) || null;
      }
    }
  } catch {}
  return null;
}

const pageMeta = {
  "/": {
    title: "Beresin - Joki Tugas Sekolah & Kuliah Online #1 di Indonesia",
    description: "Beresin jasa joki tugas sekolah dan kuliah. Cepat, profesional, harga ramah pelajar mulai Rp25.000. Konsultasi gratis via WhatsApp.",
    image: DEFAULT_IMAGE,
    url: BASE,
  },
  "/tentang": {
    title: "Tentang Beresin - Jasa Joki Tugas Terpercaya",
    description: "Kenali lebih dekat Beresin, platform joki tugas sekolah dan kuliah terpercaya di Indonesia.",
    image: DEFAULT_IMAGE,
    url: `${BASE}/tentang`,
  },
  "/layanan": {
    title: "Layanan Joki Tugas - Beresin",
    description: "Lihat layanan joki tugas sekolah, kuliah, programming, desain, dan riset dari Beresin.",
    image: DEFAULT_IMAGE,
    url: `${BASE}/layanan`,
  },
  "/cara-order": {
    title: "Cara Order Joki Tugas - Beresin",
    description: "Cara mudah order joki tugas di Beresin. Konsultasi, konfirmasi, proses, selesai!",
    image: DEFAULT_IMAGE,
    url: `${BASE}/cara-order`,
  },
  "/kontak": {
    title: "Kontak Beresin - Hubungi Kami",
    description: "Hubungi Beresin via WhatsApp, email, atau media sosial untuk konsultasi gratis.",
    image: DEFAULT_IMAGE,
    url: `${BASE}/kontak`,
  },
  "/blog": {
    title: "Blog Beresin - Tips & Artikel Tugas",
    description: "Artikel dan tips seputar tugas sekolah, kuliah, dan produktivitas dari Beresin.",
    image: DEFAULT_IMAGE,
    url: `${BASE}/blog`,
  },
};

async function getMeta(path) {
  const blogMatch = path.match(/^\/blog\/(.+)/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const article = await findBlog(slug);
    if (article) {
      return {
        title: `${article.title} — Beresin Tugas`,
        description: article.excerpt || article.title,
        image: optimizeImage(article.image) || DEFAULT_IMAGE,
        url: `${BASE}/blog/${encodeURIComponent(slug)}`,
        type: "article",
      };
    }
    return pageMeta["/blog"];
  }

  const meta = pageMeta[path] || pageMeta["/"];
  return { ...meta, image: optimizeImage(meta.image) };
}

export default async function handler(req, res) {
  let path = req.query.path || new URL(req.url, BASE).pathname;
  if (!path || path === "/api/og") path = "/";
  if (!path.startsWith("/")) path = "/" + path;

  const meta = await getMeta(path);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html(meta));
}
