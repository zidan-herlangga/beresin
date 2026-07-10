import Svg from './Svg';
import { icons } from './constants';
import RichEditor from '../RichEditor';

export default function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows = 3,
}) {
  if (type === 'image') {
    return (
      <div className="flex items-start gap-3">
        {value && (
          <img
            src={value}
            alt="preview"
            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/[0.06]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'https://...'}
              className="flex-1 px-3.5 py-2 bg-black/40 border border-white/[0.07] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => {
                const url = prompt('Masukkan URL gambar:');
                if (url) onChange(url);
              }}
              className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-xl border border-white/[0.06] text-gray-400 hover:text-white transition-all"
              title="Upload via URL"
            >
              <Svg d={icons.image} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'richtext') {
    return <RichEditor value={value} onChange={onChange} label={label} placeholder={placeholder} />;
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.07] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-y"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.07] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
      />
    </div>
  );
}
