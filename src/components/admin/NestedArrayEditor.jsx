import { useCallback } from 'react';
import Svg from './Svg';
import { icons } from './constants';

export default function NestedArrayEditor({
  label,
  array,
  fields,
  onChange,
  onAdd,
  itemKey = 'services',
  itemLabel = 'layanan',
  defaultItem = {},
}) {
  const handleDelete = useCallback(
    (catIdx, svcIdx) => {
      const updated = array.map((cat, ci) => {
        if (ci !== catIdx) return cat;
        const svcs = (cat[itemKey] || []).filter((_, si) => si !== svcIdx);
        return { ...cat, [itemKey]: svcs };
      });
      onChange(updated);
    },
    [array, onChange, itemKey],
  );

  const handleNestedField = useCallback(
    (catIdx, svcIdx, fieldKey, value) => {
      const updated = array.map((cat, ci) => {
        if (ci !== catIdx) return cat;
        const svcs = [...(cat[itemKey] || [])];
        svcs[svcIdx] = { ...svcs[svcIdx], [fieldKey]: value };
        return { ...cat, [itemKey]: svcs };
      });
      onChange(updated);
    },
    [array, onChange, itemKey],
  );

  const handleAddService = useCallback(
    (catIdx) => {
      const updated = array.map((cat, ci) => {
        if (ci !== catIdx) return cat;
        return { ...cat, [itemKey]: [...(cat[itemKey] || []), { ...defaultItem }] };
      });
      onChange(updated);
    },
    [array, onChange, itemKey, defaultItem],
  );

  const handleCatDelete = useCallback(
    (catIdx) => {
      const updated = array.filter((_, i) => i !== catIdx);
      onChange(updated);
    },
    [array, onChange],
  );

  const handleCatField = useCallback(
    (catIdx, fieldKey, value) => {
      const updated = array.map((cat, ci) => {
        if (ci !== catIdx) return cat;
        return { ...cat, [fieldKey]: value };
      });
      onChange(updated);
    },
    [array, onChange],
  );

  return (
    <div className="space-y-4">
      {label && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-300">{label}</h4>
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg text-xs font-medium transition-all border border-indigo-500/10"
          >
            <Svg d={icons.plus} className="w-3.5 h-3.5" />
            Tambah Kategori
          </button>
        </div>
      )}
      {(!array || array.length === 0) && (
        <p className="text-xs text-gray-600 text-center py-6 bg-white/[0.01] rounded-xl border border-dashed border-white/[0.04]">
          Belum ada kategori
        </p>
      )}
      {array?.map((cat, catIdx) => (
        <div
          key={cat._key || catIdx}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              value={cat.title || cat.name || ''}
              onChange={(e) => handleCatField(catIdx, 'title', e.target.value)}
              placeholder="Nama kategori"
              className="flex-1 px-3 py-2 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
            />
            <button
              type="button"
              onClick={() => handleCatDelete(catIdx)}
              className="p-2 text-gray-600 hover:text-red-400 transition-colors"
            >
              <Svg d={icons.trash} className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {(cat[itemKey] || []).map((svc, svcIdx) => (
              <div
                key={svc._key || svcIdx}
                className="bg-black/20 border border-white/[0.04] rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {itemLabel} #{svcIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(catIdx, svcIdx)}
                    className="p-1 text-gray-600 hover:text-red-400"
                  >
                    <Svg d={icons.trash} className="w-3 h-3" />
                  </button>
                </div>
                {fields.map((f) => (
                  <div key={f.key}>
                    {f.type === 'textarea' ? (
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                        <textarea
                          value={svc[f.key] || ''}
                          onChange={(e) => handleNestedField(catIdx, svcIdx, f.key, e.target.value)}
                          rows={f.rows || 3}
                          placeholder={f.placeholder}
                          className="w-full px-3 py-2 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-y"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                        <input
                          type={f.type || 'text'}
                          value={svc[f.key] || ''}
                          onChange={(e) => handleNestedField(catIdx, svcIdx, f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full px-3 py-2 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddService(catIdx)}
              className="w-full py-2 border border-dashed border-white/[0.06] rounded-lg text-xs text-gray-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
            >
              + Tambah {itemLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
