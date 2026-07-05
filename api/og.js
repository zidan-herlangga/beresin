import { defaultData } from "./content.js";
import { getCollection } from "./lib/db.js";

const BASE = "https://beresintugas.vercel.app";
const DEFAULT_IMAGE = `${BASE}/og-image.jpg`;
const SITE_NAME = "Beresin - Joki Tugas Sekolah & Kuliah";

function escape(str) {
  return str.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function html({ title, description, image, url, type = "website" }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${escape(url)}" />
<meta property="og:title" content="${escape(title)}" />
<meta property="og:description" content="${escape(description)}" />
<meta property="og:image" content="${escape(image)}" />
<meta property="og:site_name" content="${escape(SITE_NAME)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(title)}" />
<meta name="twitter:description" content="${escape(description)}" />
<meta name="twitter:image" content="${escape(image)}" />
<script>location.href="${escape(url)}"</script>
</head>
<body>
<p>Redirecting...</p>
</body>
</html>`;
}

async function findBlog(slug) {
  const fromDefault = (defaultData.beranda.blog || []).find((a) => a.slug === slug);
  if (fromDefault) return fromDefault;

  try {
    const col = await getCollection("content");
    if (col) {
      const doc = await col.findOne({ page: "beranda" });
      if (doc?.data?.blog) {
        return doc.data.blog.find((a) => a.slug === slug);
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
  const blogMatch = path.match(/^\/blog\/([^/]+)/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const article = await findBlog(slug);
    if (article) {
      return {
        title: `${article.title} — Beresin Tugas`,
        description: article.excerpt || article.title,
        image: article.image || DEFAULT_IMAGE,
        url: `${BASE}/blog/${slug}`,
        type: "article",
      };
    }
    return pageMeta["/blog"];
  }

  return pageMeta[path] || pageMeta["/"];
}

export default async function handler(req, res) {
  const path = req.query.path || new URL(req.url, BASE).pathname;

  const meta = await getMeta(path);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html(meta));
}
