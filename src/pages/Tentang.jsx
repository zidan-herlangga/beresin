import { useState, useEffect } from "react";
import useInView from "../hooks/useInView";
import { useContent } from "../hooks/useContent";

const defaultValues = [
  { title: "Cepet", desc: "Tugas beres sebelum deadline. No panic." },
  { title: "Profesional", desc: "Dikerjain tim ahli yang kompeten di bidangnya." },
  { title: "Ramah", desc: "Harga kantong pelajar, pelayanan maksimal." },
  { title: "Amanah", desc: "Privasi aman, hasil original, revisi gratis." },
];

const defaultStats = [
  { label: "Tugas Selesai", value: "500+" },
  { label: "Tim Ahli", value: "50+" },
  { label: "Kepuasan", value: "98%" },
  { label: "Cepat Selesai", value: "24 Jam" },
];

const defaultTeam = [
  {
    name: "Zidan Herlangga",
    role: "Founder & Programming Lead",
    desc: "Ahli algoritma & pengembangan web. Lulusan Ilmu Komputer.",
    color: "from-indigo-500 to-blue-500",
    bio: "Founder Beresin dengan latar belakang Ilmu Komputer. Berpengalaman dalam pengembangan web, sistem informasi, dan project management. Berkomitmen membantu pelajar dan mahasiswa Indonesia mendapatkan nilai terbaik.",
    skills: ["React", "Node.js", "Python", "Database", "Project Management"],
    education: "S1 Ilmu Komputer",
    social: { ig: "zidanherlangga", github: "zidan-herlangga" },
  },
  {
    name: "Aldo Moroseto",
    role: "Business & Marketing Lead",
    desc: "Pengelola operasional dan strategi brand Beresin.",
    color: "from-purple-500 to-pink-500",
    bio: "Ahli strategi bisnis dan marketing yang mengelola operasional harian Beresin. Fokus pada pengembangan brand, customer experience, dan ekspansi pasar.",
    skills: ["Digital Marketing", "Brand Strategy", "Operations", "Content Writing"],
    education: "S1 Manajemen Bisnis",
    social: { ig: "aldomoroseto", linkedin: "aldo-moroseto" },
  },
];

export default function Tentang() {
  const { data: content } = useContent("tentang");
  const about = content;
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedMember]);

  const displayStats = about?.stats
    ? about.stats.map((s) => ({
        label: s.label,
        value: s.value + (s.suffix || ""),
      }))
    : defaultStats;

  const displayValues = about?.values || defaultValues;
  const displayTeam = about?.tim || defaultTeam;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="pt-20">
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            TENTANG
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {(about?.heroTitle || "Kenalan sama")}{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Beresin
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {about?.heroSubtitle || "Beresin adalah platform joki tugas buat siswa & mahasiswa se-Indonesia. Kami bantu tugas kamu beres tepat waktu, kualitas ok, harga ramah."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Kenapa Beresin?
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                {about?.story?.[0] || "Awalnya kita sadar banyak temen-temen yang stres banget sama tugas yang numpuk. Deadline mepet, bingung, pusing. Makanya kita bikin Beresin — biar semua bisa di\"beresin\" tanpa drama."}
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed">
                {about?.story?.[1] || "Setiap tugas dikerjain tim ahli yang udah terverifikasi. Kita juga kasih garansi revisi gratis sampai kamu puas. Pokoknya, kamu tinggal duduk manis, tugas beres!"}
              </p>
            </div>
            <div ref={ref} className="grid grid-cols-2 gap-4">
              {displayStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 text-center transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Value Kami
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayValues.map((v, i) => (
              <div key={v.title} className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-200/70 dark:border-gray-700/40 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{i + 1}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">{v.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              TIM KAMI
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Yang ngerjain tugas kamu
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTeam.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedMember(t)}
                className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30 hover:border-indigo-200/50 dark:hover:border-indigo-600/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 text-center text-left"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4f46e5&color=fff&bold=true&size=80`}
                  alt={t.name}
                  className="w-20 h-20 mx-auto rounded-2xl shadow-sm group-hover:scale-105 group-hover:shadow-indigo-500/20 transition-all duration-300"
                />
                <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{t.name}</h3>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{t.role}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{t.desc || t.bio || "Klik untuk lihat profil"}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedMember && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedMember(null)} />
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl p-8 text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=ffffff&color=4f46e5&bold=true&size=96`}
                alt={selectedMember.name}
                className="w-24 h-24 mx-auto rounded-2xl shadow-lg border-2 border-white/30"
              />
              <h3 className="mt-4 text-xl font-bold text-white">{selectedMember.name}</h3>
              <p className="text-sm text-indigo-100">{selectedMember.role}</p>
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Tentang</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedMember.bio || selectedMember.desc || "—"}
                </p>
              </div>
              {selectedMember.education && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Pendidikan</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedMember.education}</p>
                </div>
              )}
              {selectedMember.skills && selectedMember.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Keahlian</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedMember.social && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Sosial Media</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.social.ig && (
                      <a href={`https://instagram.com/${selectedMember.social.ig}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-950/50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        Instagram
                      </a>
                    )}
                    {selectedMember.social.github && (
                      <a href={`https://github.com/${selectedMember.social.github}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                    {selectedMember.social.linkedin && (
                      <a href={`https://linkedin.com/in/${selectedMember.social.linkedin}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Siap beresin tugas kamu?
          </h2>
          <p className="mt-3 text-indigo-200">
            Konsultasi gratis. Chat aja!
          </p>
          <a
            href="/kontak"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
          >
            Hubungi Kami
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
