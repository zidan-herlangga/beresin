import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = join(__dirname, '..', 'public', 'og-image.jpg');

const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
.container {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #db2777 100%);
  display: flex; flex-direction: column; justify-content: center; padding: 64px 80px;
  position: relative;
}
.container::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%);
}
.grid {
  position: absolute; inset: 0; opacity: 0.05;
  background-image: linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px);
  background-size: 40px 40px;
}
.content { position: relative; z-index: 1; }
.badge {
  display: inline-block; padding: 8px 20px; border-radius: 999px;
  background: rgba(255,255,255,0.15); color: #fff; font-size: 16px; font-weight: 600;
  letter-spacing: 2px; margin-bottom: 24px; backdrop-filter: blur(4px);
}
h1 {
  font-size: 72px; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 16px;
}
h1 span { background: linear-gradient(to right, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
p {
  font-size: 24px; color: rgba(255,255,255,0.8); line-height: 1.5; max-width: 700px;
}
.footer {
  position: absolute; bottom: 40px; right: 80px; z-index: 1;
  display: flex; align-items: center; gap: 16px;
}
.footer img { width: 40px; height: 40px; border-radius: 8px; }
.footer span { color: rgba(255,255,255,0.6); font-size: 18px; font-weight: 600; }
</style>
</head>
<body>
<div class="container">
  <div class="grid"></div>
  <div class="content">
    <div class="badge">JOKI TUGAS INDONESIA</div>
    <h1>Beresin<span>.</span></h1>
    <p>Tugas sekolah &amp; kuliah beres dalam hitungan jam. Cepat, profesional, harga ramah pelajar.</p>
  </div>
  <div class="footer">
    <span>beresintugas.vercel.app</span>
  </div>
</div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({ path: output, type: 'jpeg', quality: 95 });
await browser.close();
console.log('OG image generated:', output);
