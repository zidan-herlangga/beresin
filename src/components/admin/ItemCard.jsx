import { useState } from 'react';
import Svg from './Svg';
import { icons } from './constants';

export default function ItemCard({
  item,
  index,
  fields,
  onChange,
  onDelete,
  onSwap,
  renderExtra,
  isExpanded,
  onToggle,
}) {
  const [localExpanded, setLocalExpanded] = useState(false);
  const controlled = isExpanded !== undefined;
  const expanded = controlled ? isExpanded : localExpanded;

  const handleToggle = () => {
    if (controlled) {
      onToggle(index);
    } else {
      setLocalExpanded(!localExpanded);
    }
  };

  const title = item?.title || item?.name || item?.nama || item?.label || `Item ${index + 1}`;

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden transition-all hover:border-white/[0.1]">
      <div
        onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            onSwap(index, -1);
          }}
          className="p-1 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer inline-flex"
        >
          <Svg d={icons.move} className="w-4 h-4" />
        </span>
        <span className="flex-1 text-sm font-medium text-gray-300 truncate">{title}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="p-1.5 text-gray-600 hover:text-red-400 transition-colors"
          >
            <Svg d={icons.trash} className="w-3.5 h-3.5" />
          </button>
          <Svg
            d={icons.chevronRight}
            className={`w-4 h-4 text-gray-600 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-white/[0.04] space-y-3 animate-fadeIn">
          {fields.map((f) => {
            const val = item[f.key];
            return (
              <div key={f.key}>
                {f.type === 'image' ? (
                  <div className="flex items-start gap-3">
                    {val && (
                      <img
                        src={val}
                        alt="preview"
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/[0.06]"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">{f.label}</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={val || ''}
                          onChange={(e) => {
                            const updated = [...fields];
                            onChange(
                              index,
                              { ...item, [f.key]: e.target.value },
                              updated,
                            );
                          }}
                          placeholder={f.placeholder || 'https://...'}
                          className="flex-1 px-3 py-1.5 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ) : f.type === 'textarea' ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">{f.label}</label>
                    <textarea
                      value={val || ''}
                      onChange={(e) => onChange(index, { ...item, [f.key]: e.target.value }, fields)}
                      rows={f.rows || 3}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-y"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      value={val || ''}
                      onChange={(e) => onChange(index, { ...item, [f.key]: e.target.value }, fields)}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.07] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                )}
              </div>
            );
          })}
          {renderExtra && renderExtra(item, index)}
        </div>
      )}
    </div>
  );
}
