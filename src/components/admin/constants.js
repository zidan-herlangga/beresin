export const API = import.meta.env.VITE_API_URL || '/api';

export const icons = {
  shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
  dashboard:
    'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  beranda: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  layanan: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  'cara-order':
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  tentang:
    'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  kontak: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z',
  logout: 'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  blog: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  move: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  chevronRight:
    'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  x: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  save: 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z',
  spinner:
    'M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
};

export const pages = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'beranda', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'cara-order', label: 'Cara Order' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'kontak', label: 'Kontak' },
];

export const teamFields = [
  { key: 'photo', label: 'Foto URL', type: 'image', placeholder: 'https://...' },
  { key: 'name', label: 'Nama', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea' },
  { key: 'bio', label: 'Bio (lengkap)', type: 'textarea' },
  { key: 'education', label: 'Pendidikan', type: 'textarea' },
  { key: 'skills', label: 'Skill (pisahkan koma)', type: 'text' },
  { key: 'social_ig', label: 'Instagram URL', type: 'text' },
  { key: 'social_github', label: 'GitHub URL', type: 'text' },
  { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
];

export const sectionConfigs = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'features', label: 'Fitur / Layanan' },
  { key: 'blog', label: 'Blog / Artikel' },
];

export const sectionConfigsLayanan = [
  { key: 'categories', label: 'Kategori Layanan' },
];

export const sectionConfigsCaraOrder = [
  { key: 'steps', label: 'Langkah-langkah' },
  { key: 'faq', label: 'FAQ' },
];

export const sectionConfigsTentang = [
  { key: 'story', label: 'Cerita / Story' },
  { key: 'stats', label: 'Angka Statistik' },
  { key: 'tim', label: 'Anggota Tim' },
  { key: 'values', label: 'Values' },
];

export const sectionConfigsKontak = [
  { key: 'contacts', label: 'Kontak' },
  { key: 'socials', label: 'Social Media' },
];
