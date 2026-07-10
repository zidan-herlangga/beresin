import { useState } from 'react';
import { teamFields } from '../constants';
import SectionTabs from '../SectionTabs';
import ArrayEditor from '../ArrayEditor';

const storyFields = [
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'text', label: 'Teks', type: 'textarea', rows: 4 },
];

const statsFields = [
  { key: 'value', label: 'Nilai', type: 'text', placeholder: '100+' },
  { key: 'label', label: 'Label', type: 'text', placeholder: 'Client Puas' },
];

const valueFields = [
  { key: 'icon', label: 'Icon', type: 'text', placeholder: '🔧' },
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 2 },
];

export default function TentangEditor({ data, setData }) {
  const [section, setSection] = useState('story');

  const sections = [
    { key: 'story', label: 'Cerita' },
    { key: 'stats', label: 'Statistik' },
    { key: 'tim', label: 'Tim' },
    { key: 'values', label: 'Values' },
  ];

  function activeSectionContent() {
    if (section === 'story') {
      return (
        <ArrayEditor
          label="Cerita"
          items={data.story}
          fields={storyFields}
          onChange={(arr) => setData({ ...data, story: arr })}
          onAdd={() => setData({ ...data, story: [...(data.story || []), { title: '', text: '' }] })}
        />
      );
    }
    if (section === 'stats') {
      return (
        <ArrayEditor
          label="Statistik"
          items={data.stats}
          fields={statsFields}
          onChange={(arr) => setData({ ...data, stats: arr })}
          onAdd={() => setData({ ...data, stats: [...(data.stats || []), { value: '', label: '' }] })}
        />
      );
    }
    if (section === 'tim') {
      return (
        <ArrayEditor
          label="Anggota Tim"
          items={data.tim}
          fields={teamFields}
          onChange={(arr) => setData({ ...data, tim: arr })}
          onAdd={() =>
            setData({
              ...data,
              tim: [
                ...(data.tim || []),
                { name: '', role: '', photo: '', desc: '', bio: '', education: '', skills: '', social_ig: '', social_github: '', social_linkedin: '' },
              ],
            })
          }
        />
      );
    }
    if (section === 'values') {
      return (
        <ArrayEditor
          label="Values"
          items={data.values}
          fields={valueFields}
          onChange={(arr) => setData({ ...data, values: arr })}
          onAdd={() => setData({ ...data, values: [...(data.values || []), { icon: '✨', title: '', desc: '' }] })}
        />
      );
    }
    return null;
  }

  return (
    <div>
      <SectionTabs sections={sections} active={section} onChange={setSection} />
      {activeSectionContent()}
    </div>
  );
}
