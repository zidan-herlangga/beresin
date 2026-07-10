import { useState } from 'react';
import { sectionConfigsKontak } from '../constants';
import SectionTabs from '../SectionTabs';
import ArrayEditor from '../ArrayEditor';

const contactFields = [
  { key: 'icon', label: 'Icon', type: 'text', placeholder: '📞' },
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'text' },
  { key: 'value', label: 'Nilai (link/nomor)', type: 'text' },
  { key: 'link', label: 'Link (opsional)', type: 'text' },
];

const socialFields = [
  { key: 'icon', label: 'Icon', type: 'text', placeholder: 'instagram' },
  { key: 'name', label: 'Nama Platform', type: 'text' },
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'username', label: 'Username', type: 'text' },
];

export default function KontakEditor({ data, setData }) {
  const [section, setSection] = useState('contacts');

  return (
    <div>
      <SectionTabs sections={sectionConfigsKontak} active={section} onChange={setSection} />
      {section === 'contacts' && (
        <ArrayEditor
          label="Kontak"
          items={data.contacts}
          fields={contactFields}
          onChange={(arr) => setData({ ...data, contacts: arr })}
          onAdd={() => setData({ ...data, contacts: [...(data.contacts || []), { icon: '📞', title: '', desc: '', value: '', link: '' }] })}
        />
      )}
      {section === 'socials' && (
        <ArrayEditor
          label="Social Media"
          items={data.socials}
          fields={socialFields}
          onChange={(arr) => setData({ ...data, socials: arr })}
          onAdd={() => setData({ ...data, socials: [...(data.socials || []), { icon: 'instagram', name: '', url: '', username: '' }] })}
        />
      )}
    </div>
  );
}
