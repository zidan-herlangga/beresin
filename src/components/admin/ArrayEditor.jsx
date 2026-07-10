import { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import Svg from './Svg';
import { icons } from './constants';
import ItemCard from './ItemCard';

const ITEMS_PER_PAGE = 10;

export default function ArrayEditor({
  label,
  items,
  fields,
  onChange,
  onAdd,
  searchable = true,
}) {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    setPage(0);
    setExpandedIndex(null);
  }, [label]);

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item) => {
      const title = item?.title || item?.name || item?.nama || item?.label || '';
      return title.toLowerCase().includes(q);
    });
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil((filtered.length || 0) / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * ITEMS_PER_PAGE;
  const paged = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSwap = useCallback(
    (index, dir) => {
      if (!items) return;
      const realIndex = start + index;
      const arr = [...items];
      const target = realIndex + dir;
      if (target < 0 || target >= arr.length) return;
      [arr[realIndex], arr[target]] = [arr[target], arr[realIndex]];
      onChange(arr);
    },
    [items, onChange, start],
  );

  const handleDelete = useCallback(
    (index) => {
      if (!items) return;
      const realIndex = start + index;
      const arr = items.filter((_, i) => i !== realIndex);
      onChange(arr);
      if (expandedIndex === realIndex) setExpandedIndex(null);
    },
    [items, onChange, start, expandedIndex],
  );

  const handleItemChange = useCallback(
    (index, updated) => {
      if (!items) return;
      const realIndex = start + index;
      const arr = [...items];
      arr[realIndex] = updated;
      onChange(arr);
    },
    [items, onChange, start],
  );

  const handleToggle = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const count = items?.length || 0;
  const showingLabel = search.trim()
    ? `${filtered.length} dari ${count} item`
    : `${count} item`;

  return (
    <div className="space-y-3" ref={editorRef}>
      {label && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h4 className="text-sm font-semibold text-gray-300">{label}</h4>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-600">{showingLabel}</span>
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg text-xs font-medium transition-all border border-indigo-500/10"
            >
              <Svg d={icons.plus} className="w-3.5 h-3.5" />
              Tambah
            </button>
          </div>
        </div>
      )}

      {searchable && count > 0 && (
        <div className="relative">
          <Svg d={icons.link} className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Cari item..."
            className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/[0.07] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
      )}

      {count === 0 ? (
        <p className="text-xs text-gray-600 text-center py-6 bg-white/[0.01] rounded-xl border border-dashed border-white/[0.04]">
          Belum ada item
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-xs text-gray-600 text-center py-6 bg-white/[0.01] rounded-xl border border-dashed border-white/[0.04]">
          Tidak ditemukan
        </p>
      ) : (
        <>
          <div className="space-y-2">
            {paged.map((item, i) => (
              <ItemCard
                key={item._key || (start + i)}
                item={item}
                index={i}
                fields={fields}
                onChange={handleItemChange}
                onDelete={handleDelete}
                onSwap={handleSwap}
                isExpanded={expandedIndex === (start + i)}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {totalPages > 1 && !search.trim() && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              >
                <Svg d={icons.chevronRight} className="w-3.5 h-3.5 rotate-180" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    i === safePage
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={safePage === totalPages - 1}
                className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              >
                <Svg d={icons.chevronRight} className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
