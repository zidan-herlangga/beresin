import { useState, useEffect, useCallback, useMemo } from 'react';
import Svg from '../Svg';
import { icons, sectionConfigs } from '../constants';
import SectionTabs from '../SectionTabs';
import ArrayEditor from '../ArrayEditor';
import Field from '../Field';

const blogFields = [
  { key: 'image', label: 'Gambar', type: 'image' },
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'slug', label: 'Slug', type: 'text', placeholder: 'otomatis dari judul', slugify: 'title' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 2 },
  { key: 'content', label: 'Konten (HTML)', type: 'richtext' },
  { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Tips, Teknologi, Panduan' },
  { key: 'date', label: 'Tanggal', type: 'text', placeholder: '13 Mar 2025' },
  { key: 'author', label: 'Penulis (opsional)', type: 'text', placeholder: 'Admin' },
];

const featureFields = [
  { key: 'icon', label: 'Icon', type: 'text', placeholder: '🔧' },
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 2 },
];

const heroFields = [
  { key: 'title', label: 'Judul Hero', type: 'text' },
  { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
  { key: 'slug', label: 'Slug (opsional)', type: 'text' },
  { key: 'image', label: 'Gambar Background', type: 'image' },
];

const statFields = [
  { key: 'value', label: 'Nilai', type: 'text', placeholder: '500' },
  { key: 'suffix', label: 'Suffix', type: 'text', placeholder: '+ / %' },
  { key: 'label', label: 'Label', type: 'text', placeholder: 'Tugas Selesai' },
];

export default function BerandaEditor({ data, setData, blogMode }) {
  const [section, setSection] = useState('hero');
  const [viewBlog, setViewBlog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlog = useMemo(() => {
    if (!data.blog) return [];
    return data.blog.filter(
      (b) =>
        b.title?.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        b.slug?.toLowerCase().includes((searchTerm || '').toLowerCase()),
    );
  }, [data.blog, searchTerm]);

  useEffect(() => {
    if (blogMode) setSection('blog');
  }, [blogMode]);

  useEffect(() => {
    if (section === 'blog') setViewBlog(true);
  }, [section]);

  const handleSetData = useCallback(
    (sectionKey, val) => {
      setData({ ...data, [sectionKey]: val });
    },
    [data, setData],
  );

  function activeSectionContent() {
    if (section === 'hero') {
      if (!data.hero) {
        return (
          <p className="text-xs text-gray-600">Hero section tidak tersedia.</p>
        );
      }
      return (
        <div className="space-y-4">
          {heroFields.map((f) => (
            <Field
              key={f.key}
              label={f.label}
              type={f.type}
              value={data.hero[f.key]}
              placeholder={f.placeholder}
              onChange={(val) => handleSetData('hero', { ...data.hero, [f.key]: val })}
            />
          ))}
          <div className="pt-4 border-t border-white/[0.06]">
            <ArrayEditor
              label="Statistik Hero"
              items={data.hero.stats}
              fields={statFields}
              onChange={(arr) => handleSetData('hero', { ...data.hero, stats: arr })}
              onAdd={() => handleSetData('hero', { ...data.hero, stats: [...(data.hero.stats || []), { value: '', suffix: '', label: '' }] })}
            />
          </div>
        </div>
      );
    }
    if (section === 'features') {
      return (
        <ArrayEditor
          label="Daftar Fitur"
          items={data.features}
          fields={featureFields}
          onChange={(arr) => handleSetData('features', arr)}
          onAdd={() => handleSetData('features', [...(data.features || []), { icon: '✨', title: '', desc: '' }])}
        />
      );
    }
    if (section === 'blog') {
      return viewBlog ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari artikel..."
              className="flex-1 px-3.5 py-2 bg-black/40 border border-white/[0.07] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <ArrayEditor
            label="Daftar Artikel"
            items={filteredBlog}
            fields={blogFields}
            searchable={false}
            onChange={(arr) => handleSetData('blog', arr)}
            onAdd={() => handleSetData('blog', [...(data.blog || []), { title: '', slug: '', desc: '', content: '', tag: 'Tips', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), author: 'Admin', image: '' }])}
          />
        </div>
      ) : null;
    }
    return null;
  }

  if (section === 'blog') {
    return (
      <div>
        <SectionTabs
          sections={[
            { key: 'hero', label: 'Hero' },
            { key: 'features', label: 'Fitur' },
            { key: 'blog', label: 'Blog' },
          ]}
          active={section}
          onChange={(s) => { setSection(s); if (s === 'blog') setViewBlog(true); }}
        />
        {!viewBlog ? (
          <div className="text-center py-8">
            <Svg d={icons.blog} className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Klik tombol Blog di atas untuk memuat daftar artikel</p>
            <button
              onClick={() => setViewBlog(true)}
              className="mt-3 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg text-xs font-medium transition-all border border-indigo-500/10"
            >
              Muat Blog
            </button>
          </div>
        ) : (
          activeSectionContent()
        )}
      </div>
    );
  }

  return (
    <div>
      <SectionTabs
        sections={sectionConfigs}
        active={section}
        onChange={setSection}
      />
      {activeSectionContent()}
    </div>
  );
}
