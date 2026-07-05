import { useParams, Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import ShareButtons from '../components/ShareButtons';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function useMeta({ title, description, image, url, type = 'article' }) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} — Beresin Tugas`;

    const setMeta = (attr, value, content) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }, [title, description, image, url, type]);
}

function useJsonLd(json) {
  useEffect(() => {
    if (!json) return;
    const existing = document.getElementById('json-ld-blog');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'json-ld-blog';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(json);
    document.head.appendChild(script);
    return () => script.remove();
  }, [json]);
}

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: beranda } = useContent('beranda');
  const [article, setArticle] = useState(null);
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/views?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setViews(d.count))
      .catch(() => {});
    fetch(`/api/views?slug=${encodeURIComponent(slug)}`, { method: "POST" })
      .catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (beranda?.blog) {
      const found = beranda.blog.find((a) => a.slug === slug);
      if (found) setArticle(found);
    }
  }, [beranda, slug]);

  const a = article;
  const pageUrl = window.location.href;
  const siteUrl = window.location.origin;

  useMeta({
    title: a?.title,
    description: a?.excerpt,
    image: a?.image,
    url: pageUrl,
    type: 'article',
  });

  useJsonLd(a ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    image: a.image,
    datePublished: a.date,
    author: { '@type': 'Organization', name: 'Beresin Tugas' },
    publisher: {
      '@type': 'Organization',
      name: 'Beresin Tugas',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  } : null);

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') || '';
  const readingTime = a ? Math.max(
    1,
    Math.ceil((stripHtml(a.content).split(/\s+/).length || 0) / 200),
  ) : 0;

  if (!a) return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-16 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-16">
      <div className="absolute inset-0 bg-[var(--bg-grid-pattern)] dark:bg-[var(--bg-grid-pattern-dark)]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-indigo-500 transition-colors">
            Beranda
          </Link>
          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link to="/blog" className="hover:text-indigo-500 transition-colors">
            Blog
          </Link>
          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-500 truncate max-w-[180px]">
            {a.title}
          </span>
        </nav>

        {a.image && (
          <div className="w-full aspect-[2/1] sm:aspect-[2.4/1] rounded-2xl overflow-hidden mb-8 bg-gray-200 dark:bg-gray-800 relative">
            <img
              src={a.image}
              alt={a.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {a.tag && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
              {a.tag}
            </span>
          )}
          {a.date && (
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {a.date}
            </span>
          )}
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {readingTime} menit baca
          </span>
          {views !== null && (
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {views.toLocaleString()} dilihat
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          {a.title}
        </h1>

        {a.excerpt && (
          <p className="text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {a.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-gray-200 dark:border-gray-700/50 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              B
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Beresin Tugas
              </p>
              <p className="text-xs text-gray-400">Published {a.date}</p>
            </div>
          </div>
          <ShareButtons url={pageUrl} title={a.title} />
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(a.content || '') }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Bagikan artikel ini:
            </p>
            <ShareButtons url={pageUrl} title={a.title} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 border border-indigo-100 dark:border-gray-700/50">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Butuh bantuan tugas?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tim Beresin siap membantu tugas kuliah dan skripsimu.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://wa.me/6285157066514"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-500 transition-all active:scale-[0.97] shadow-lg shadow-green-600/20"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Gratis
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all active:scale-[0.97] shadow-lg shadow-indigo-500/20"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
