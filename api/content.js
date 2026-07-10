import { getCollection } from './lib/db.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

function verifyToken(req) {
  if (!SECRET) return false;
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  try {
    jwt.verify(auth.slice(7), SECRET);
    return true;
  } catch {
    return false;
  }
}

const ALLOWED_PAGES = ['beranda', 'layanan', 'cara-order', 'tentang', 'kontak'];

const defaultData = {
  beranda: {
    hero: {
      title: 'Tugas Menumpuk?',
      subtitle:
        'Beresin Tugas aja! Platform joki tugas sekolah & kuliah terpercaya. Cepat, berkualitas, nilai aman.',
      slug: '',
      image: '',
      stats: [
        { value: 500, suffix: '+', label: 'Tugas Selesai' },
        { value: 98, suffix: '%', label: 'Kepuasan' },
        { value: 50, suffix: '+', label: 'Tim Ahli' },
      ],
    },
    features: [
      {
        icon: '📚',
        title: 'Tugas Sekolah',
        desc: 'PR, makalah, laporan, PPT — semua beres.',
      },
      {
        icon: '🎓',
        title: 'Tugas Kuliah',
        desc: 'Esai, jurnal, studi kasus — kualitas akademik.',
      },
      {
        icon: '💻',
        title: 'Programming',
        desc: 'Web, Python, Java, SQL — all done.',
      },
      {
        icon: '🎨',
        title: 'Desain & Video',
        desc: 'Canva, Figma, edit video — keren abis.',
      },
    ],
    harga: [
      {
        name: 'Pelajar',
        price: '25rb',
        period: '/tugas',
        desc: 'Cocok untuk tugas SD-SMA',
        features: ['PR & Makalah', 'Presentasi', 'Revisi 1x', 'Via WhatsApp'],
        popular: false,
      },
      {
        name: 'Mahasiswa',
        price: '250rb',
        period: '/tugas',
        desc: 'Untuk tugas kuliah & programming',
        features: [
          'Essay & Paper',
          'Review Jurnal',
          'Programming tugas',
          'Revisi 2x',
          'Via WA/Email',
        ],
        popular: true,
      },
      {
        name: 'PRO',
        price: '500rb',
        period: '/tugas',
        desc: 'Untuk project kompleks & skripsi',
        features: [
          'Full Skripsi (per bab)',
          'Aplikasi/Website',
          'Riset lanjutan',
          'Revisi 3x',
          'Prioritas',
        ],
        popular: false,
      },
    ],
    caraOrder: [
      {
        number: '01',
        title: 'Konsultasi',
        desc: 'Hubungi kami via WhatsApp atau email. Ceritakan tugasmu dan deadline-nya.',
      },
      {
        number: '02',
        title: 'Konfirmasi',
        desc: 'Kami akan memberikan penawaran harga. Setuju? Bayar DP 50%.',
      },
      {
        number: '03',
        title: 'Proses',
        desc: 'Tim kami mulai mengerjakan tugasmu. Pantau progress via WhatsApp.',
      },
      {
        number: '04',
        title: 'Selesai',
        desc: 'Tugas dikirim via WA/Email. Kurang puas? Revisi gratis sampai kamu ACC.',
      },
    ],
    tim: [
      {
        name: 'Zidan Herlangga',
        role: 'Founder & Project Manager',
        initials: 'ZH',
        gradient: 'from-indigo-500 to-purple-500',
      },
      {
        name: 'Aldo Moroseto',
        role: 'Lead Developer',
        initials: 'AM',
        gradient: 'from-purple-500 to-pink-500',
      },
    ],
    portofolio: [
      {
        title: 'Aplikasi Manajemen Inventaris',
        category: 'Programming',
        desc: 'Sistem informasi stok barang berbasis web',
        image: '',
      },
      {
        title: 'Makalah Ekonomi Kreatif',
        category: 'Makalah',
        desc: 'Analisis dampak ekonomi kreatif di Indonesia',
        image: '',
      },
      {
        title: 'Desain UI/UX Aplikasi',
        category: 'Desain',
        desc: 'Mobile app design untuk startup edukasi',
        image: '',
      },
      {
        title: 'Video Company Profile',
        category: 'Video',
        desc: 'Video promosi perusahaan teknologi',
        image: '',
      },
      {
        title: 'Aplikasi Kasir Restoran',
        category: 'Programming',
        desc: 'Desktop app kasir dengan laporan harian',
        image: '',
      },
      {
        title: 'Review Jurnal Internasional',
        category: 'Jurnal',
        desc: 'Review 10 jurnal tentang AI dalam pendidikan',
        image: '',
      },
    ],
    garansi: [
      { title: 'Tepat Waktu', desc: 'Tugas selesai sebelum deadline' },
      { title: 'Berkualitas', desc: 'Dikerjakan oleh tim ahli di bidangnya' },
      { title: 'Revisi Gratis', desc: 'Revisi sampai kamu benar-benar puas' },
      {
        title: 'Data Aman',
        desc: 'Identitas dan datamu terjamin kerahasiaannya',
      },
    ],
    testimoni: [
      {
        name: 'Rina',
        role: 'Mahasiswi UI',
        text: 'Makalah selesai dalam 1 hari! Revisinya dikit banget. Makasih Beresin Tugas!',
      },
      {
        name: 'Budi',
        role: 'Siswa SMA 3',
        text: 'PR Matematika beres semua. Nilai aku jadi 90. Recomended banget!',
      },
      {
        name: 'Sari',
        role: 'Mahasiswi ITB',
        text: 'Tugas coding Python yang deadline besok, ternyata bisa selesai malam itu juga.',
      },
      {
        name: 'Doni',
        role: 'Mahasiswa UGM',
        text: 'Sudah 5 kali pakai jasa ini, hasilnya selalu memuaskan. Trusted!',
      },
      {
        name: 'Maya',
        role: 'Mahasiswi UNPAD',
        text: 'Review jurnalnya lengkap banget, langsung dapat A. Highly recommended!',
      },
    ],
    faq: [
      {
        q: 'Berapa lama pengerjaan?',
        a: 'Tergantung kompleksitas dan jenis tugas. Rata-rata 1-3 hari.',
      },
      {
        q: 'Metode pembayaran apa saja?',
        a: 'BCA, Mandiri, BRI, OVO, GoPay, Dana, ShopeePay, QRIS.',
      },
      {
        q: 'Apakah ada garansi?',
        a: 'Ya! Kami memberikan garansi tepat waktu dan revisi gratis.',
      },
    ],
    blog: [
      {
        title: 'Tips Mengerjakan Skripsi dalam 3 Bulan',
        slug: 'tips-mengerjakan-skripsi-dalam-3-bulan',
        tag: 'Tips',
        date: '15 Mar 2026',
        desc:
          'Panduan praktis menyelesaikan skripsi tepat waktu tanpa stres berlebihan.',
        image:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        author: 'Admin',
        content:
          '<p>Skripsi sering menjadi momok bagi mahasiswa semester akhir. Namun dengan strategi yang tepat, kamu bisa menyelesaikannya dalam 3 bulan.</p><h2>1. Tentukan Topik di Bulan Pertama</h2><p>Pilih topik yang kamu kuasai dan sesuai dengan bidang studimu. Konsultasikan dengan dosen pembimbing sejak awal.</p><h2>2. Bab 1-3 di Bulan Kedua</h2><p>Fokus pada proposal skripsi. Cari referensi minimal 20 jurnal terbaru untuk landasan teori yang kuat.</p><h2>3. Bab 4-5 dan Sidang di Bulan Ketiga</h2><p>Setelah proposal ACC, langsung olah data dan tulis hasil penelitian. Jangan lupa konsultasi rutin setiap minggu.</p><h2>Tips Tambahan</h2><ul><li>Gunakan Mendeley/Zotero untuk referensi</li><li>Backup data setiap hari</li><li>Istirahat cukup, jangan lembur berlebihan</li></ul><p>Dengan perencanaan yang matang, skripsi 3 bulan bukan mimpi!</p>',
      },
      {
        title: '5 Aplikasi AI yang Bantu Tugas Kuliah',
        slug: '5-aplikasi-ai-yang-bantu-tugas-kuliah',
        tag: 'Teknologi',
        date: '10 Feb 2026',
        desc:
          'Manfaatkan AI untuk membantu riset dan penulisan tugas kuliahmu.',
        author: 'Admin',
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        content:
          '<p>Kecerdasan buatan (AI) kini bisa menjadi asisten belajarmu. Berikut 5 aplikasi AI yang wajib dicoba:</p><h2>1. ChatGPT</h2><p>Asisten virtual serbaguna untuk brainstorming, menjelaskan konsep rumit, dan membantu struktur penulisan.</p><h2>2. Perplexity AI</h2><p>Mesin pencari berbasis AI yang memberikan jawaban lengkap dengan sumber referensi terpercaya.</p><h2>3. Grammarly</h2><p>Koreksi tata bahasa Inggris, perbaiki gaya penulisan, dan deteksi plagiarisme.</p><h2>4. Claude AI</h2><p>Cocok untuk analisis dokumen panjang dan membantu review jurnal secara mendalam.</p><h2>5. Consensus</h2><p>Mesin pencari khusus untuk jurnal ilmiah. Dapatkan ringkasan penelitian terbaru.</p><p>Gunakan AI secara bijak dan etis ya! AI adalah alat bantu, bukan pengganti pemikiranmu.</p>',
      },
      {
        title: 'Cara Membuat Makalah yang Baik',
        slug: 'cara-membuat-makalah-yang-baik',
        tag: 'Panduan',
        date: '5 Jan 2026',
        desc:
          'Struktur dan tips menulis makalah yang benar agar mendapat nilai A.',
        author: 'Admin',
        image:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        content:
          '<p>Makalah yang baik punya struktur jelas dan argumen yang kuat. Simak panduan berikut:</p><h2>1. Tentukan Topik dan Tujuan</h2><p>Pastikan topik spesifik dan memiliki cukup referensi. Buat outline sebelum mulai menulis.</p><h2>2. Struktur Makalah yang Benar</h2><ul><li><strong>Pendahuluan</strong>: Latar belakang, rumusan masalah, tujuan</li><li><strong>Kajian Teori</strong>: Landasan teori relevan</li><li><strong>Pembahasan</strong>: Analisis dan argumen</li><li><strong>Penutup</strong>: Kesimpulan dan saran</li><li><strong>Daftar Pustaka</strong>: Referensi lengkap</li></ul><h2>3. Tips Menulis</h2><ul><li>Gunakan bahasa formal dan baku</li><li>Setiap paragraf punya satu ide pokok</li><li>Sertakan kutipan dari sumber terpercaya</li><li>Cek ejaan dan tata bahasa</li></ul><p>Dengan mengikuti panduan ini, nilai A bukan lagi sekadar mimpi!</p>',
      },
    ],
  },
  layanan: {
    categories: [
      {
        title: 'Tugas Sekolah',
        tag: 'SD - SMA',
        services: [
          { name: 'PR Matematika', desc: '', price: '' },
          { name: 'PR Fisika', desc: '', price: '' },
          { name: 'PR Kimia', desc: '', price: '' },
          { name: 'PR Biologi', desc: '', price: '' },
          { name: 'Makalah & Laporan', desc: '', price: '' },
          { name: 'Presentasi PowerPoint', desc: '', price: '' },
          { name: 'Mind Map', desc: '', price: '' },
          { name: 'Rangkuman Materi', desc: '', price: '' },
          { name: 'Pidato & Puisi', desc: '', price: '' },
          { name: 'Cerpen & Karangan', desc: '', price: '' },
        ],
      },
      {
        title: 'Tugas Kuliah',
        tag: 'S1 - S2',
        services: [
          { name: 'Essay & Paper', desc: '', price: '' },
          { name: 'Laporan Praktikum', desc: '', price: '' },
          { name: 'Review Jurnal', desc: '', price: '' },
          { name: 'Resume Buku', desc: '', price: '' },
          { name: 'Proposal Penelitian', desc: '', price: '' },
          { name: 'Skripsi (per bab)', desc: '', price: '' },
          { name: 'Tesis (per bab)', desc: '', price: '' },
          { name: 'Studi Kasus', desc: '', price: '' },
          { name: 'Analisis Data', desc: '', price: '' },
        ],
      },
      {
        title: 'Programming',
        tag: 'CODING',
        services: [
          { name: 'Python (Dasar - Mahir)', desc: '', price: '' },
          { name: 'Java OOP', desc: '', price: '' },
          { name: 'C / C++', desc: '', price: '' },
          { name: 'JavaScript / TypeScript', desc: '', price: '' },
          { name: 'PHP & MySQL', desc: '', price: '' },
          { name: 'HTML / CSS', desc: '', price: '' },
          { name: 'React / Vue / Angular', desc: '', price: '' },
          { name: 'Node.js / Express', desc: '', price: '' },
          { name: 'Database SQL', desc: '', price: '' },
          { name: 'Aplikasi Desktop (C# / VB)', desc: '', price: '' },
        ],
      },
      {
        title: 'Desain Grafis & Video',
        tag: 'KREATIF',
        services: [
          { name: 'Desain Canva', desc: '', price: '' },
          { name: 'Desain Figma', desc: '', price: '' },
          { name: 'Edit Video (Premiere)', desc: '', price: '' },
          { name: 'Animasi (After Effects)', desc: '', price: '' },
          { name: 'Infografis', desc: '', price: '' },
          { name: 'Poster & Flyer', desc: '', price: '' },
          { name: 'Logo Design', desc: '', price: '' },
          { name: 'Thumbnail YouTube', desc: '', price: '' },
        ],
      },
      {
        title: 'Riset & Data',
        tag: 'RISET',
        services: [
          { name: 'Olah Data SPSS', desc: '', price: '' },
          { name: 'Olah Data Excel', desc: '', price: '' },
          { name: 'Analisis Statistik', desc: '', price: '' },
          { name: 'Literature Review', desc: '', price: '' },
          { name: 'Transkrip Wawancara', desc: '', price: '' },
          { name: 'Pencarian Jurnal', desc: '', price: '' },
        ],
      },
      {
        title: 'Layanan Lainnya',
        tag: 'DLL',
        services: [
          { name: 'Terjemahan (Inggris-Indonesia)', desc: '', price: '' },
          { name: 'Koreksi Grammar', desc: '', price: '' },
          { name: 'Cek Plagiarisme (Turnitin)', desc: '', price: '' },
          { name: 'Format Tugas (APA/MLA)', desc: '', price: '' },
          { name: 'Bantuan PPT Sidang', desc: '', price: '' },
        ],
      },
    ],
  },
  'cara-order': {
    steps: [
      {
        number: '01',
        title: 'Konsultasi',
        desc: 'Hubungi kami via WhatsApp atau email. Ceritakan tugasmu dan deadline-nya.',
        icon: 'chat',
      },
      {
        number: '02',
        title: 'Konfirmasi',
        desc: 'Kami akan memberikan penawaran harga. Setuju? Bayar DP 50%.',
        icon: 'check',
      },
      {
        number: '03',
        title: 'Proses',
        desc: 'Tim kami mulai mengerjakan tugasmu. Pantau progress via WhatsApp.',
        icon: 'gear',
      },
      {
        number: '04',
        title: 'Selesai',
        desc: 'Tugas dikirim via WA/Email. Kurang puas? Revisi gratis sampai kamu ACC.',
        icon: 'done',
      },
    ],
    faq: [
      {
        q: 'Berapa lama pengerjaan?',
        a: 'Tergantung kompleksitas dan jenis tugas. Rata-rata 1-3 hari.',
      },
      {
        q: 'Metode pembayaran apa saja?',
        a: 'BCA, Mandiri, BRI, OVO, GoPay, Dana, ShopeePay, QRIS.',
      },
      {
        q: 'Apakah ada garansi?',
        a: 'Ya! Kami memberikan garansi tepat waktu dan revisi gratis.',
      },
    ],
  },
  tentang: {
    heroTitle: 'Kamu punya masalah dengan tugas?',
    heroSubtitle:
      'Beresin Tugas hadir untuk membantu kamu menyelesaikan tugas sekolah dan kuliah dengan cepat, berkualitas, dan terpercaya.',
    story: [
      {
        title: 'Awal Mula',
        text: 'Beresin Tugas didirikan oleh Zidan Herlangga pada tahun 2024 dengan misi membantu pelajar dan mahasiswa di Indonesia yang kesulitan menyelesaikan tugas karena keterbatasan waktu, pemahaman, atau sumber daya.',
      },
      {
        title: 'Misi Kami',
        text: 'Kami percaya setiap siswa berhak mendapatkan nilai terbaik tanpa harus stres dan kelelahan. Tim kami terdiri dari para profesional dan akademisi berpengalaman yang siap membantu tugasmu.',
      },
    ],
    stats: [
      { value: 500, suffix: '+', label: 'Tugas Selesai' },
      { value: 98, suffix: '%', label: 'Kepuasan' },
      { value: 50, suffix: '+', label: 'Tim Ahli' },
      { value: 4.9, suffix: '', label: 'Rating' },
    ],
    tim: [
      {
        name: 'Zidan Herlangga',
        role: 'Founder & Project Manager',
        photo: '',
        desc: 'Ahli algoritma & pengembangan web. Lulusan Ilmu Komputer.',
        bio: 'Founder Beresin Tugas dengan latar belakang Ilmu Komputer.',
        skills: 'React, Node.js, Python, Database, Project Management',
        education: 'S1 Ilmu Komputer',
        social_ig: 'zidanherlangga',
        social_github: 'zidan-herlangga',
      },
      {
        name: 'Aldo Moroseto',
        role: 'Lead Developer',
        photo: '',
        desc: 'Pengelola operasional dan strategi brand Beresin.',
        bio: 'Ahli strategi bisnis dan marketing.',
        skills:
          'Digital Marketing, Brand Strategy, Operations, Content Writing',
        education: 'S1 Manajemen Bisnis',
        social_ig: 'aldomoroseto',
        social_linkedin: 'aldo-moroseto',
      },
    ],
    values: [
      {
        icon: '🔒',
        title: 'Trusted',
        desc: 'Kami mengutamakan kepercayaan. Data pribadimu aman bersama kami.',
      },
      {
        icon: '⭐',
        title: 'Quality',
        desc: 'Setiap tugas dikerjakan oleh tim ahli yang kompeten di bidangnya.',
      },
      {
        icon: '⚡',
        title: 'Fast',
        desc: 'Deadline ketat? Tenang, tim kami terbiasa bekerja cepat tanpa mengorbankan kualitas.',
      },
      {
        icon: '🤝',
        title: 'Friendly',
        desc: 'Pelayanan ramah dan siap membantu 24/7. Kamu bukan sekedar pelanggan.',
      },
    ],
  },
  kontak: {
    contacts: [
      {
        title: 'WhatsApp',
        value: '0851-5706-6514',
        link: 'https://wa.me/6285157066514',
        icon: 'wa',
        desc: 'Respon cepat 24 jam',
      },
      {
        title: 'Email',
        value: 'zidanherlangga24@gmail.com',
        link: 'mailto:zidanherlangga24@gmail.com',
        icon: 'email',
        desc: 'Untuk dokumen & file',
      },
      {
        title: 'Instagram',
        value: '@beresin',
        link: 'https://instagram.com/beresin',
        icon: 'ig',
        desc: 'Lihat portofolio kami',
      },
    ],
    socials: [
      { name: 'Instagram', url: '#', icon: 'instagram', username: 'beresin' },
      { name: 'Facebook', url: '#', icon: 'facebook', username: 'beresin' },
      { name: 'Twitter', url: '#', icon: 'twitter', username: 'beresin' },
      { name: 'TikTok', url: '#', icon: 'tiktok', username: 'beresin' },
    ],
  },
};

export { defaultData };

export default async function handler(req, res) {
  const page = req.query.page || req.body?.page;

  if (!page || !ALLOWED_PAGES.includes(page)) {
    return res.status(400).json({ error: `Page tidak valid: ${page}` });
  }

  if (req.method === 'GET') {
    const col = await getCollection('content');
    if (col) {
      const doc = await col.findOne({ page });
      if (doc?.data) {
        return res.status(200).json({ page, data: doc.data, fromDb: true });
      }
    }
    return res
      .status(200)
      .json({ page, data: defaultData[page], fromDb: false });
  }

  if (!verifyToken(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data required' });

    const col = await getCollection('content');
    if (col) {
      await col.updateOne(
        { page },
        { $set: { page, data, updatedAt: new Date() } },
        { upsert: true },
      );
      return res.status(200).json({ success: true, page, data });
    }

    return res.status(503).json({ error: 'Database tidak tersedia' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
