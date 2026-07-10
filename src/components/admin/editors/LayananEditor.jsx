import { useState } from 'react';
import { sectionConfigsLayanan } from '../constants';
import SectionTabs from '../SectionTabs';
import NestedArrayEditor from '../NestedArrayEditor';

const serviceFields = [
  { key: 'name', label: 'Nama Servis', type: 'text' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 2 },
  { key: 'price', label: 'Harga', type: 'text', placeholder: 'Rp 50.000' },
];

export default function LayananEditor({ data, setData }) {
  const [section, setSection] = useState('categories');

  return (
    <div>
      <SectionTabs sections={sectionConfigsLayanan} active={section} onChange={setSection} />
      <NestedArrayEditor
        label="Kategori & Layanan"
        array={data.categories}
        fields={serviceFields}
        onChange={(arr) => setData({ ...data, categories: arr })}
        onAdd={() => setData({ ...data, categories: [...(data.categories || []), { title: '', services: [] }] })}
        itemKey="services"
        itemLabel="layanan"
        defaultItem={{ name: '', desc: '', price: '' }}
      />
    </div>
  );
}
