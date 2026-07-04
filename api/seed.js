import { getCollection } from "./lib/db.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "beresin-admin-secret-2024";

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return false;
  try {
    jwt.verify(auth.slice(7), SECRET);
    return true;
  } catch {
    return false;
  }
}

const defaultData = {
  beranda: {
    hero: {
      title: "Tugas Menumpuk?",
      subtitle: "Beresin aja! Platform joki tugas sekolah & kuliah terpercaya. Cepat, berkualitas, nilai aman.",
      stats: [
        { value: 500, suffix: "+", label: "Tugas Selesai" },
        { value: 98, suffix: "%", label: "Kepuasan" },
        { value: 50, suffix: "+", label: "Tim Ahli" },
      ],
    },
    layanan: [
      {
        title: "Tugas Sekolah",
        tag: "SD-SMA",
        items: ["PR & Pekerjaan Rumah", "Makalah & Laporan", "Presentasi", "Mind Map & Rangkuman"],
      },
      {
        title: "Tugas Kuliah",
        tag: "S1-S2",
        items: ["Essay & Paper", "Laporan Praktikum", "Review Jurnal", "Skripsi (per bab)"],
      },
      {
        title: "Programming",
        tag: "CODING",
        items: ["Python / Java / C++", "Web Development", "Database SQL", "Aplikasi Desktop"],
      },
      {
        title: "Desain & Video",
        tag: "KREATIF",
        items: ["Desain Canva / Figma", "Edit Video", "Infografis", "Poster & Flyer"],
      },
    ],
    harga: [
      {
        name: "Pelajar",
        price: "25rb",
        period: "/tugas",
        desc: "Cocok untuk tugas SD-SMA",
        features: ["PR & Makalah", "Presentasi", "Revisi 1x", "Via WhatsApp"],
        popular: false,
      },
      {
        name: "Mahasiswa",
        price: "250rb",
        period: "/tugas",
        desc: "Untuk tugas kuliah & programming",
        features: ["Essay & Paper", "Review Jurnal", "Programming tugas", "Revisi 2x", "Via WA/Email"],
        popular: true,
      },
      {
        name: "PRO",
        price: "500rb",
        period: "/tugas",
        desc: "Untuk project kompleks & skripsi",
        features: ["Full Skripsi (per bab)", "Aplikasi/Website", "Riset lanjutan", "Revisi 3x", "Prioritas"],
        popular: false,
      },
    ],
    caraOrder: [
      { number: "01", title: "Konsultasi", desc: "Hubungi kami via WhatsApp atau email. Ceritakan tugasmu dan deadline-nya." },
      { number: "02", title: "Konfirmasi", desc: "Kami akan memberikan penawaran harga. Setuju? Bayar DP 50%." },
      { number: "03", title: "Proses", desc: "Tim kami mulai mengerjakan tugasmu. Pantau progress via WhatsApp." },
      { number: "04", title: "Selesai", desc: "Tugas dikirim via WA/Email. Kurang puas? Revisi gratis sampai kamu ACC." },
    ],
    tim: [
      { name: "Zidan Herlangga", role: "Founder & Project Manager", initials: "ZH", gradient: "from-indigo-500 to-purple-500" },
      { name: "Aldo Moroseto", role: "Lead Developer", initials: "AM", gradient: "from-purple-500 to-pink-500" },
    ],
    portofolio: [
      { title: "Aplikasi Manajemen Inventaris", category: "Programming", desc: "Sistem informasi stok barang berbasis web", image: "" },
      { title: "Makalah Ekonomi Kreatif", category: "Makalah", desc: "Analisis dampak ekonomi kreatif di Indonesia", image: "" },
      { title: "Desain UI/UX Aplikasi", category: "Desain", desc: "Mobile app design untuk startup edukasi", image: "" },
      { title: "Video Company Profile", category: "Video", desc: "Video promosi perusahaan teknologi", image: "" },
      { title: "Aplikasi Kasir Restoran", category: "Programming", desc: "Desktop app kasir dengan laporan harian", image: "" },
      { title: "Review Jurnal Internasional", category: "Jurnal", desc: "Review 10 jurnal tentang AI dalam pendidikan", image: "" },
    ],
    garansi: [
      { title: "Tepat Waktu", desc: "Tugas selesai sebelum deadline" },
      { title: "Berkualitas", desc: "Dikerjakan oleh tim ahli di bidangnya" },
      { title: "Revisi Gratis", desc: "Revisi sampai kamu benar-benar puas" },
      { title: "Data Aman", desc: "Identitas dan datamu terjamin kerahasiaannya" },
    ],
    testimoni: [
      { name: "Rina", role: "Mahasiswi UI", text: "Makalah selesai dalam 1 hari! Revisinya dikit banget. Makasih Beresin!", initials: "RN", gradient: "from-indigo-500 to-blue-500" },
      { name: "Budi", role: "Siswa SMA 3", text: "PR Matematika beres semua. Nilai aku jadi 90. Recomended banget!", initials: "BD", gradient: "from-purple-500 to-pink-500" },
      { name: "Sari", role: "Mahasiswi ITB", text: "Tugas coding Python yang deadline besok, ternyata bisa selesai malam itu juga.", initials: "SR", gradient: "from-cyan-500 to-teal-500" },
      { name: "Doni", role: "Mahasiswa UGM", text: "Sudah 5 kali pakai jasa ini, hasilnya selalu memuaskan. Trusted!", initials: "DN", gradient: "from-amber-500 to-orange-500" },
      { name: "Maya", role: "Mahasiswi UNPAD", text: "Review jurnalnya lengkap banget, langsung dapat A. Highly recommended!", initials: "MY", gradient: "from-pink-500 to-rose-500" },
    ],
    faq: [
      { q: "Apa itu Beresin?", a: "Beresin adalah platform jasa bantuan tugas sekolah dan kuliah yang terpercaya." },
      { q: "Bagaimana cara order?", a: "Hubungi kami via WhatsApp, ceritakan tugasmu, kami akan memberikan penawaran." },
      { q: "Apakah data saya aman?", a: "Tentu! Identitas dan data pribadimu kami jamin kerahasiaannya." },
      { q: "Berapa lama proses pengerjaan?", a: "Tergantung kompleksitas tugas. Rata-rata 1-3 hari. Tugas mendesak bisa 1 hari." },
      { q: "Apakah bisa revisi?", a: "Bisa! Setiap paket sudah termasuk revisi. Kami pastikan kamu puas." },
    ],
    blog: [
      { title: "Tips Mengerjakan Skripsi dalam 3 Bulan", slug: "tips-mengerjakan-skripsi-dalam-3-bulan", tag: "Tips", date: "15 Mar 2026", excerpt: "Panduan praktis menyelesaikan skripsi tepat waktu tanpa stres berlebihan.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", content: "<p>Skripsi sering menjadi momok bagi mahasiswa semester akhir. Namun dengan strategi yang tepat, kamu bisa menyelesaikannya dalam 3 bulan.</p><h2>1. Tentukan Topik di Bulan Pertama</h2><p>Pilih topik yang kamu kuasai dan sesuai dengan bidang studimu. Konsultasikan dengan dosen pembimbing sejak awal.</p><h2>2. Bab 1-3 di Bulan Kedua</h2><p>Fokus pada proposal skripsi. Cari referensi minimal 20 jurnal terbaru untuk landasan teori yang kuat.</p><h2>3. Bab 4-5 dan Sidang di Bulan Ketiga</h2><p>Setelah proposal ACC, langsung olah data dan tulis hasil penelitian. Jangan lupa konsultasi rutin setiap minggu.</p><h2>Tips Tambahan</h2><ul><li>Gunakan Mendeley/Zotero untuk referensi</li><li>Backup data setiap hari</li><li>Istirahat cukup, jangan lembur berlebihan</li></ul><p>Dengan perencanaan yang matang, skripsi 3 bulan bukan mimpi!</p>" },
      { title: "5 Aplikasi AI yang Bantu Tugas Kuliah", slug: "5-aplikasi-ai-yang-bantu-tugas-kuliah", tag: "Teknologi", date: "10 Feb 2026", excerpt: "Manfaatkan AI untuk membantu riset dan penulisan tugas kuliahmu.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", content: "<p>Kecerdasan buatan (AI) kini bisa menjadi asisten belajarmu. Berikut 5 aplikasi AI yang wajib dicoba:</p><h2>1. ChatGPT</h2><p>Asisten virtual serbaguna untuk brainstorming, menjelaskan konsep rumit, dan membantu struktur penulisan.</p><h2>2. Perplexity AI</h2><p>Mesin pencari berbasis AI yang memberikan jawaban lengkap dengan sumber referensi terpercaya.</p><h2>3. Grammarly</h2><p>Koreksi tata bahasa Inggris, perbaiki gaya penulisan, dan deteksi plagiarisme.</p><h2>4. Claude AI</h2><p>Cocok untuk analisis dokumen panjang dan membantu review jurnal secara mendalam.</p><h2>5. Consensus</h2><p>Mesin pencari khusus untuk jurnal ilmiah. Dapatkan ringkasan penelitian terbaru.</p><p>Gunakan AI secara bijak dan etis ya! AI adalah alat bantu, bukan pengganti pemikiranmu.</p>" },
      { title: "Cara Membuat Makalah yang Baik", slug: "cara-membuat-makalah-yang-baik", tag: "Panduan", date: "5 Jan 2026", excerpt: "Struktur dan tips menulis makalah yang benar agar mendapat nilai A.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80", content: "<p>Makalah yang baik punya struktur jelas dan argumen yang kuat. Simak panduan berikut:</p><h2>1. Tentukan Topik dan Tujuan</h2><p>Pastikan topik spesifik dan memiliki cukup referensi. Buat outline sebelum mulai menulis.</p><h2>2. Struktur Makalah yang Benar</h2><ul><li><strong>Pendahuluan</strong>: Latar belakang, rumusan masalah, tujuan</li><li><strong>Kajian Teori</strong>: Landasan teori relevan</li><li><strong>Pembahasan</strong>: Analisis dan argumen</li><li><strong>Penutup</strong>: Kesimpulan dan saran</li><li><strong>Daftar Pustaka</strong>: Referensi lengkap</li></ul><h2>3. Tips Menulis</h2><ul><li>Gunakan bahasa formal dan baku</li><li>Setiap paragraf punya satu ide pokok</li><li>Sertakan kutipan dari sumber terpercaya</li><li>Cek ejaan dan tata bahasa</li></ul><p>Dengan mengikuti panduan ini, nilai A bukan lagi sekadar mimpi!</p>" },
    ],
  },
  layanan: {
    categories: [
      {
        title: "Tugas Sekolah",
        tag: "SD - SMA",
        services: [
          "PR Matematika", "PR Fisika", "PR Kimia", "PR Biologi",
          "Makalah & Laporan", "Presentasi PowerPoint", "Mind Map",
          "Rangkuman Materi", "Pidato & Puisi", "Cerpen & Karangan",
        ],
      },
      {
        title: "Tugas Kuliah",
        tag: "S1 - S2",
        services: [
          "Essay & Paper", "Laporan Praktikum", "Review Jurnal",
          "Resume Buku", "Proposal Penelitian", "Skripsi (per bab)",
          "Tesis (per bab)", "Studi Kasus", "Analisis Data",
        ],
      },
      {
        title: "Programming",
        tag: "CODING",
        services: [
          "Python (Dasar - Mahir)", "Java OOP", "C / C++", "JavaScript / TypeScript",
          "PHP & MySQL", "HTML / CSS", "React / Vue / Angular",
          "Node.js / Express", "Database SQL", "Aplikasi Desktop (C# / VB)",
        ],
      },
      {
        title: "Desain Grafis & Video",
        tag: "KREATIF",
        services: [
          "Desain Canva", "Desain Figma", "Edit Video (Premiere)",
          "Animasi (After Effects)", "Infografis", "Poster & Flyer",
          "Logo Design", "Thumbnail YouTube",
        ],
      },
      {
        title: "Riset & Data",
        tag: "RISET",
        services: [
          "Olah Data SPSS", "Olah Data Excel", "Analisis Statistik",
          "Literature Review", "Transkrip Wawancara", "Pencarian Jurnal",
        ],
      },
      {
        title: "Layanan Lainnya",
        tag: "DLL",
        services: [
          "Terjemahan (Inggris-Indonesia)", "Koreksi Grammar",
          "Cek Plagiarisme (Turnitin)", "Format Tugas (APA/MLA)",
          "Bantuan PPT Sidang",
        ],
      },
    ],
  },
  "cara-order": {
    steps: [
      { number: "01", title: "Konsultasi", desc: "Hubungi kami via WhatsApp atau email. Ceritakan tugasmu dan deadline-nya.", icon: "chat" },
      { number: "02", title: "Konfirmasi", desc: "Kami akan memberikan penawaran harga. Setuju? Bayar DP 50%.", icon: "check" },
      { number: "03", title: "Proses", desc: "Tim kami mulai mengerjakan tugasmu. Pantau progress via WhatsApp.", icon: "gear" },
      { number: "04", title: "Selesai", desc: "Tugas dikirim via WA/Email. Kurang puas? Revisi gratis sampai kamu ACC.", icon: "done" },
    ],
    faq: [
      { q: "Berapa lama pengerjaan?", a: "Tergantung kompleksitas dan jenis tugas. Rata-rata 1-3 hari." },
      { q: "Metode pembayaran apa saja?", a: "BCA, Mandiri, BRI, OVO, GoPay, Dana, ShopeePay, QRIS." },
      { q: "Apakah ada garansi?", a: "Ya! Kami memberikan garansi tepat waktu dan revisi gratis." },
    ],
  },
  tentang: {
    heroTitle: "Kamu punya masalah dengan tugas?",
    heroSubtitle: "Beresin hadir untuk membantu kamu menyelesaikan tugas sekolah dan kuliah dengan cepat, berkualitas, dan terpercaya.",
    story: [
      "Beresin didirikan oleh Zidan Herlangga pada tahun 2024 dengan misi membantu pelajar dan mahasiswa di Indonesia yang kesulitan menyelesaikan tugas karena keterbatasan waktu, pemahaman, atau sumber daya.",
      "Kami percaya setiap siswa berhak mendapatkan nilai terbaik tanpa harus stres dan kelelahan. Tim kami terdiri dari para profesional dan akademisi berpengalaman yang siap membantu tugasmu.",
    ],
    stats: [
      { value: 500, suffix: "+", label: "Tugas Selesai" },
      { value: 98, suffix: "%", label: "Kepuasan" },
      { value: 50, suffix: "+", label: "Tim Ahli" },
      { value: 4.9, suffix: "", label: "Rating" },
    ],
    tim: [
      { name: "Zidan Herlangga", role: "Founder & Project Manager", initials: "ZH", gradient: "from-indigo-500 to-purple-500" },
      { name: "Aldo Moroseto", role: "Lead Developer", initials: "AM", gradient: "from-purple-500 to-pink-500" },
    ],
    values: [
      { title: "Trusted", desc: "Kami mengutamakan kepercayaan. Data pribadimu aman bersama kami." },
      { title: "Quality", desc: "Setiap tugas dikerjakan oleh tim ahli yang kompeten di bidangnya." },
      { title: "Fast", desc: "Deadline ketat? Tenang, tim kami terbiasa bekerja cepat tanpa mengorbankan kualitas." },
      { title: "Friendly", desc: "Pelayanan ramah dan siap membantu 24/7. Kamu bukan sekedar pelanggan." },
    ],
  },
  kontak: {
    contacts: [
      { label: "WhatsApp", value: "0851-5706-6514", href: "https://wa.me/6285157066514", icon: "wa" },
      { label: "Email", value: "zidanherlangga24@gmail.com", href: "mailto:zidanherlangga24@gmail.com", icon: "email" },
      { label: "Instagram", value: "@beresin", href: "https://instagram.com/beresin", icon: "ig" },
    ],
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Facebook", url: "#" },
      { name: "Twitter", url: "#" },
      { name: "TikTok", url: "#" },
    ],
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!verifyToken(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const col = await getCollection("content");
  let imported = 0;

  for (const [page, data] of Object.entries(defaultData)) {
    const existing = await col.findOne({ page });
    if (!existing) {
      await col.insertOne({ page, data, updatedAt: new Date() });
      imported++;
    }
  }

  res.status(200).json({ success: true, imported, message: `${imported} halaman di-import` });
}
