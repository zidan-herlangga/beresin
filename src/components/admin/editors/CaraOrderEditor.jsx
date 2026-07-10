import { useState } from 'react';
import { sectionConfigsCaraOrder } from '../constants';
import SectionTabs from '../SectionTabs';
import ArrayEditor from '../ArrayEditor';

const stepFields = [
  { key: 'icon', label: 'Icon', type: 'text', placeholder: '🔧' },
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 2 },
];

const faqFields = [
  { key: 'q', label: 'Pertanyaan', type: 'text' },
  { key: 'a', label: 'Jawaban', type: 'textarea', rows: 3 },
];

export default function CaraOrderEditor({ data, setData }) {
  const [section, setSection] = useState('steps');

  const handleSet = (key, arr) => setData({ ...data, [key]: arr });

  return (
    <div>
      <SectionTabs sections={sectionConfigsCaraOrder} active={section} onChange={setSection} />
      {section === 'steps' && (
        <ArrayEditor
          label="Langkah-langkah"
          items={data.steps}
          fields={stepFields}
          onChange={(arr) => handleSet('steps', arr)}
          onAdd={() => handleSet('steps', [...(data.steps || []), { icon: '📝', title: '', desc: '' }])}
        />
      )}
      {section === 'faq' && (
        <ArrayEditor
          label="FAQ"
          items={data.faq}
          fields={faqFields}
          onChange={(arr) => handleSet('faq', arr)}
          onAdd={() => handleSet('faq', [...(data.faq || []), { q: '', a: '' }])}
        />
      )}
    </div>
  );
}
