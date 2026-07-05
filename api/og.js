import { defaultData } from "./content.js";

const BASE = "https://beresintugas.vercel.app";
const DEFAULT_IMAGE = `${BASE}/og-image.jpg`;
const SITE_NAME = "Beresin - Joki Tugas Sekolah & Kuliah";

function html({ title, description, image, url, type = "website" }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<script>location.href="${url}"</script>
</head>
<body>
<p>Redirecting...</p>
</body>
</html>`;
}

function findBlog(slug) {
  return (defaultData.beranda.blog || []).find((a) => a.slug === slug);
}

function getMeta(path) {
  const match = path.match(/^\/blog\/([^/]+)/);
  if (match) {
    const slug = match[1];
    const article = findBlog(slug);
    if (article) {
      return {
        title: `${article.title} — Beresin Tugas`,
        description: article.excerpt,
        image: article.image || DEFAULT_IMAGE,
        url: `${BASE}/blog/${slug}`,
        type: "article",
      };
    }
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

  return pageMeta[path] || pageMeta["/"];
}

export default async function handler(req, res) {
  const path = req.query.path || new URL(req.url, BASE).pathname;

  const meta = getMeta(path);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html(meta));
}
