import { useState, useEffect, useCallback, useRef, useMemo } from "react";

const API = "/api";

const icons = {
  dashboard: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  beranda: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  layanan: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "cara-order": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  tentang: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  kontak: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  plus: "M12 4v16m8-8H4",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  chevronDown: "M19 9l-7 7-7-7",
  chevronRight: "M9 5l7 7-7 7",
  grip: "M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-6 5h2v2H8v-2zm6 0h2v2h-2v-2z",
  arrowUp: "M5 15l7-7 7 7",
  arrowDown: "M19 9l-7 7-7-7",
  x: "M6 18L18 6M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  save: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  spinner: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  pages: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z",
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
};

const pages = [
  { id: "dashboard", label: "Dashboard" },
  { id: "beranda", label: "Beranda" },
  { id: "layanan", label: "Layanan" },
  { id: "cara-order", label: "Cara Order" },
  { id: "tentang", label: "Tentang" },
  { id: "kontak", label: "Kontak" },
];

/* ─── SVG component ─── */
function Svg({ d, className }) {
  return <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={1.5} d={d} /></svg>;
}

/* ─── Toast ─── */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-4 right-4 z-50 animate-slideDown">
      <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-xl backdrop-blur-xl text-sm ${
        type === "success" ? "bg-emerald-900/80 border-emerald-700/40 text-emerald-200" : "bg-red-900/80 border-red-700/40 text-red-200"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="opacity-40 hover:opacity-100"><Svg d={icons.x} className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

/* ─── Confirm Modal ─── */
function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel, danger }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-gray-900 border border-white/[0.08] rounded-xl p-5 max-w-sm w-full shadow-2xl animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${danger ? "bg-red-500/15 text-red-400" : "bg-indigo-500/15 text-indigo-400"}`}>
          <Svg d={danger ? icons.alert : icons.info} className="w-4.5 h-4.5" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{message}</p>
        <div className="flex gap-2.5 justify-end">
          <button onClick={onCancel} className="px-3.5 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 rounded-lg text-xs font-medium transition-all">Batal</button>
          <button onClick={onConfirm} className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${danger ? "bg-red-600 hover:bg-red-500" : "bg-indigo-600 hover:bg-indigo-500"}`}>{confirmLabel || "Konfirmasi"}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Login ─── */
function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok) { localStorage.setItem("beresin-admin-token", json.token); onLogin(json.token); }
      else setErr(json.error || "Login gagal");
    } catch { setErr("Gagal terhubung ke server"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm" />
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 border border-white/5">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/20">
              <Svg d={icons.shield} className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Beresin</h1>
            <p className="text-xs text-gray-500 mt-1">Masukkan password admin</p>
          </div>
          {err && (
            <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-red-900/30 border border-red-800/30 text-red-300 text-xs">
              <Svg d={icons.alert} className="w-3.5 h-3.5 shrink-0" />
              {err}
            </div>
          )}
          <div className="relative mb-3">
            <input type={show ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all" autoFocus />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              <Svg d={show ? icons.eye : icons.eye} className="w-4.5 h-4.5" />
            </button>
          </div>
          <button type="submit" disabled={loading || !password}
            className="relative w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg text-sm hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">
            <span className={`${loading ? "opacity-0" : "opacity-100"}`}>Masuk</span>
            {loading && <span className="absolute inset-0 flex items-center justify-center"><Svg d={icons.spinner} className="w-4.5 h-4.5 animate-spin" /></span>}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Field ─── */
function Field({ label, value, onChange, type, rows, placeholder, hint }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const base = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all";
  return (
    <div className="mb-2.5">
      <label htmlFor={id} className="block text-[10px] font-medium text-gray-500 mb-1 tracking-wide uppercase">{label}</label>
      {type === "textarea"
        ? <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 2} placeholder={placeholder} className={base + " resize-none"} />
        : <input id={id} type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />}
      {hint && <p className="text-[9px] text-gray-600 mt-0.5">{hint}</p>}
    </div>
  );
}

/* ─── Draggable Item Card ─── */
function ItemCard({ children, index, onRemove, canRemove, onMoveUp, isFirst, isLast }) {
  const [dragOver, setDragOver] = useState(false);
  const handleDragStart = (e) => { e.dataTransfer.setData("text/plain", index); e.currentTarget.classList.add("opacity-40"); };
  const handleDragEnd = (e) => { e.currentTarget.classList.remove("opacity-40"); setDragOver(false); };
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); const from = parseInt(e.dataTransfer.getData("text/plain")); if (from !== index && onMoveUp) onMoveUp(from, index); };

  return (
    <div draggable={!!onMoveUp} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
      className={`group relative bg-white/[0.03] rounded-lg border transition-all duration-150 ${dragOver ? "border-indigo-500/40 bg-indigo-500/5 ring-1 ring-indigo-500/20" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05]"} p-3 mb-2`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {onMoveUp && <span className="text-gray-500 cursor-grab active:cursor-grabbing"><Svg d={icons.grip} className="w-3 h-3" /></span>}
          <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onMoveUp && !isFirst && <button onClick={() => onMoveUp(index, index - 1)} className="text-gray-500 hover:text-gray-300 p-0.5 rounded hover:bg-white/[0.05]"><Svg d={icons.arrowUp} className="w-3 h-3" /></button>}
          {onMoveUp && !isLast && <button onClick={() => onMoveUp(index, index + 1)} className="text-gray-500 hover:text-gray-300 p-0.5 rounded hover:bg-white/[0.05]"><Svg d={icons.arrowDown} className="w-3 h-3" /></button>}
          {canRemove && <button onClick={onRemove} className="text-red-400/50 hover:text-red-300 p-0.5 rounded hover:bg-red-900/20"><Svg d={icons.trash} className="w-3.5 h-3.5" /></button>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── Array Editor ─── */
function ArrayEditor({ label, items, onUpdate, fields, itemLabel, gridCols }) {
  const addItem = () => {
    const empty = {};
    fields.forEach((f) => { empty[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : ""; });
    onUpdate([...items, empty]);
  };
  const removeItem = (idx) => { if (items.length <= 1) return; onUpdate(items.filter((_, i) => i !== idx)); };
  const updateItem = (idx, key, val) => { const c = [...items]; c[idx] = { ...c[idx], [key]: val }; onUpdate(c); };
  const moveItem = (from, to) => { const c = [...items]; const [m] = c.splice(from, 1); c.splice(to, 0, m); onUpdate(c); };

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">{label}</h3>
        <button onClick={addItem} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg border border-indigo-500/20 transition-all active:scale-95">
          <Svg d={icons.plus} className="w-3 h-3" />
          Tambah {itemLabel || "Item"}
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-xs border border-dashed border-white/[0.06] rounded-lg">
          <Svg d={icons.file} className="w-6 h-6 mx-auto mb-2 opacity-30" />
          Belum ada {itemLabel || "item"}
        </div>
      ) : items.map((item, idx) => (
        <ItemCard key={idx} index={idx} onRemove={() => removeItem(idx)} canRemove={items.length > 1} onMoveUp={moveItem} isFirst={idx === 0} isLast={idx === items.length - 1}>
          <div className={gridCols ? `grid grid-cols-1 ${gridCols} gap-x-3` : ""}>
            {fields.map((f) => (
              <div key={f.key} className="mb-1.5 last:mb-0">
                <label className="block text-[9px] text-gray-500 mb-0.5 font-medium uppercase tracking-wider">{f.label}</label>
                {f.type === "textarea"
                  ? <textarea value={item[f.key] || ""} onChange={(e) => updateItem(idx, f.key, e.target.value)} rows={f.rows || 2} placeholder={f.placeholder} className="w-full px-2 py-1.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-[11px] focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10 transition-all resize-none" />
                  : f.type === "boolean"
                    ? <select value={String(item[f.key] ?? false)} onChange={(e) => updateItem(idx, f.key, e.target.value === "true")} className="w-full px-2 py-1.5 bg-black/30 border border-white/[0.06] rounded-lg text-white text-[11px] focus:outline-none focus:border-indigo-500/40 transition-all">
                        <option value="false">Tidak</option><option value="true">Ya</option>
                      </select>
                    : <input type={f.type || "text"} value={item[f.key] || ""} onChange={(e) => updateItem(idx, f.key, e.target.value)} placeholder={f.placeholder} className="w-full px-2 py-1.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-[11px] focus:outline-none focus:border-indigo-500/40 transition-all" />}
              </div>
            ))}
          </div>
        </ItemCard>
      ))}
    </div>
  );
}

/* ─── Nested Array Editor ─── */
function NestedArrayEditor({ label, items, onUpdate, config }) {
  const addItem = () => { const e = { title: "", tag: "", items: [] }; if (config.subItems) e[config.subItems] = []; if (config.services) e.services = []; onUpdate([...items, e]); };
  const removeItem = (idx) => { if (items.length <= 1) return; onUpdate(items.filter((_, i) => i !== idx)); };
  const updateItem = (idx, key, val) => { const c = [...items]; c[idx] = { ...c[idx], [key]: val }; onUpdate(c); };
  const addSub = (idx, k) => { const c = [...items]; if (!c[idx][k]) c[idx][k] = []; c[idx][k].push(""); onUpdate(c); };
  const removeSub = (idx, k, si) => { const c = [...items]; c[idx][k] = c[idx][k].filter((_, i) => i !== si); onUpdate(c); };
  const updateSub = (idx, k, si, v) => { const c = [...items]; c[idx][k][si] = v; onUpdate(c); };
  const moveItem = (from, to) => { const c = [...items]; const [m] = c.splice(from, 1); c.splice(to, 0, m); onUpdate(c); };
  const renderSubList = (idx, subKey, subLabel, subPlaceholder) => (
    <div className="mt-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">{subLabel || "Items"}</span>
        <button onClick={() => addSub(idx, subKey)} className="text-[9px] text-indigo-400/70 hover:text-indigo-300">+ Tambah</button>
      </div>
      {(items[idx][subKey] || []).length === 0
        ? <p className="text-[9px] text-gray-600 italic">Belum ada item</p>
        : (items[idx][subKey] || []).map((si, siIdx) => (
            <div key={siIdx} className="flex gap-1 mb-1">
              <input value={si} onChange={(e) => updateSub(idx, subKey, siIdx, e.target.value)} placeholder={subPlaceholder || "Item"} className="flex-1 px-1.5 py-1 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-[10px] focus:outline-none focus:border-indigo-500/40 transition-all" />
              <button onClick={() => removeSub(idx, subKey, siIdx)} className="text-red-400/50 hover:text-red-300 px-1"><Svg d={icons.x} className="w-3 h-3" /></button>
            </div>
          ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">{label}</h3>
        <button onClick={addItem} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg border border-indigo-500/20 transition-all active:scale-95">
          <Svg d={icons.plus} className="w-3 h-3" /> Tambah
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-xs border border-dashed border-white/[0.06] rounded-lg">
          <Svg d={icons.file} className="w-6 h-6 mx-auto mb-2 opacity-30" />
          Belum ada item
        </div>
      ) : items.map((item, idx) => (
        <ItemCard key={idx} index={idx} onRemove={() => removeItem(idx)} canRemove={items.length > 1} onMoveUp={moveItem} isFirst={idx === 0} isLast={idx === items.length - 1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <input value={item.title || ""} onChange={(e) => updateItem(idx, "title", e.target.value)} placeholder="Judul" className="w-full px-2 py-1.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-[11px] mb-1.5 focus:outline-none focus:border-indigo-500/40 transition-all" />
            <input value={item.tag || ""} onChange={(e) => updateItem(idx, "tag", e.target.value)} placeholder="Tag" className="w-full px-2 py-1.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-[11px] mb-1.5 focus:outline-none focus:border-indigo-500/40 transition-all" />
          </div>
          {config.subItems && renderSubList(idx, config.subItems, config.subLabel, config.subPlaceholder)}
          {config.services && renderSubList(idx, "services", config.subLabel || "Services", "Nama layanan")}
        </ItemCard>
      ))}
    </div>
  );
}

/* ─── Section Tabs ─── */
function SectionTabs({ sections, active, onChange }) {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
      {sections.map((s) => (
        <button key={s.id} onClick={() => onChange(s.id)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
            active === s.id
              ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 border border-indigo-500/20 shadow-sm"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] border border-transparent"
          }`}>
          {s.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Dashboard ─── */
function DashboardOverview({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const r = {};
      try {
        for (const page of ["beranda", "layanan", "cara-order", "tentang", "kontak"]) {
          const res = await fetch(`${API}/content?page=${page}`);
          r[page] = (await res.json()).data || {};
        }
        setStats(r);
      } catch { setStats(null); }
      finally { setLoading(false); }
    })();
  }, []);

  const countItems = (d) => d ? Object.values(d).reduce((s, v) => s + (Array.isArray(v) ? v.length : 0), 0) : 0;

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "Halaman", value: "5", color: "from-indigo-500 to-purple-600", icon: icons.pages },
      { label: "Total Konten", value: Object.values(stats).reduce((s, d) => s + countItems(d), 0), color: "from-emerald-500 to-teal-600", icon: icons.file },
      { label: "Layanan", value: stats.layanan?.categories?.length || 0, color: "from-amber-500 to-orange-600", icon: icons.layanan },
      { label: "Testimoni", value: stats.beranda?.testimoni?.length || 0, color: "from-pink-500 to-rose-600", icon: icons.chat },
    ];
  }, [stats]);

  const pageCards = [
    { id: "beranda", label: "Beranda", desc: "Hero, layanan, harga, testimoni", items: stats ? countItems(stats.beranda) : 0 },
    { id: "layanan", label: "Layanan", desc: "Kategori & daftar jasa", items: stats ? stats.layanan?.categories?.length || 0 : 0 },
    { id: "cara-order", label: "Cara Order", desc: "Langkah & FAQ", items: stats ? (stats["cara-order"]?.steps?.length || 0) + (stats["cara-order"]?.faq?.length || 0) : 0 },
    { id: "tentang", label: "Tentang", desc: "Hero, cerita, tim, values", items: stats ? countItems(stats.tentang) : 0 },
    { id: "kontak", label: "Kontak", desc: "Kontak & sosial media", items: stats ? countItems(stats.kontak) : 0 },
  ];

  if (loading) return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-white/[0.02] rounded-xl border border-white/[0.06] p-4"><div className="h-3 w-16 bg-white/5 rounded mb-2" /><div className="h-6 w-12 bg-white/5 rounded" /></div>)}
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all group">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-2.5 shadow-lg shadow-${c.color.split(" ")[0].replace("from-", "")}/10`}>
              <Svg d={c.icon} className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pageCards.map((p) => (
          <button key={p.id} onClick={() => onNavigate(p.id)}
            className="text-left bg-white/[0.02] rounded-xl border border-white/[0.06] p-4 hover:border-indigo-500/20 hover:bg-indigo-500/[0.03] transition-all group active:scale-[0.98]">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{p.label}</h4>
              <Svg d={icons.chevronRight} className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-[10px] text-gray-500 mb-1.5">{p.desc}</p>
            <span className="text-[9px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded-full">{p.items} item</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Section content definitions ─── */
const berandaSections = [
  { id: "hero", label: "Hero" },
  { id: "layanan", label: "Layanan" },
  { id: "harga", label: "Harga" },
  { id: "cara-order", label: "Cara Order" },
  { id: "tim", label: "Tim" },
  { id: "portofolio", label: "Portofolio" },
  { id: "garansi", label: "Garansi" },
  { id: "testimoni", label: "Testimoni" },
  { id: "faq", label: "FAQ" },
  { id: "blog", label: "Blog" },
];

const layananSections = [{ id: "kategori", label: "Kategori" }];
const caraOrderSections = [{ id: "langkah", label: "Langkah" }, { id: "faq", label: "FAQ" }];
const tentangSections = [{ id: "hero", label: "Hero" }, { id: "cerita", label: "Cerita" }, { id: "stats", label: "Statistik" }, { id: "tim", label: "Tim" }, { id: "values", label: "Values" }];
const kontakSections = [{ id: "kontak", label: "Kontak" }, { id: "social", label: "Sosial" }];

/* ─── Editors ─── */
function BerandaEditor({ data, setData }) {
  const [section, setSection] = useState("hero");
  const setHero = (k, v) => setData({ ...data, hero: { ...data.hero, [k]: v } });
  const setStats = (v) => setData({ ...data, hero: { ...data.hero, stats: v } });

  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={berandaSections} active={section} onChange={setSection} />
      {section === "hero" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div className="sm:col-span-2"><Field label="Judul" value={data.hero?.title || ""} onChange={(v) => setHero("title", v)} placeholder="cth: Tugas Menumpuk?" /></div>
          <div className="sm:col-span-2"><Field label="Subtitle" value={data.hero?.subtitle || ""} onChange={(v) => setHero("subtitle", v)} type="textarea" rows={2} placeholder="Deskripsi hero section..." /></div>
          <div className="sm:col-span-2">
            <ArrayEditor label="Statistik" items={data.hero?.stats || []} onUpdate={setStats} itemLabel="Stat"
              fields={[{ key: "value", label: "Nilai", type: "number", placeholder: "500" }, { key: "suffix", label: "Suffix", placeholder: "+ / %" }, { key: "label", label: "Label", placeholder: "Tugas Selesai" }]} />
          </div>
        </div>
      )}
      {section === "layanan" && <NestedArrayEditor label="Layanan" items={data.layanan || []} onUpdate={(v) => setData({ ...data, layanan: v })} config={{ subItems: "items", subLabel: "Daftar Layanan", subPlaceholder: "Nama layanan" }} />}
      {section === "harga" && <ArrayEditor label="Paket Harga" items={data.harga || []} onUpdate={(v) => setData({ ...data, harga: v })} itemLabel="Paket"
        fields={[{ key: "name", label: "Nama Paket", placeholder: "Pelajar / Mahasiswa / PRO" }, { key: "price", label: "Harga", placeholder: "25rb / 250rb / 500rb" }, { key: "period", label: "Period", placeholder: "/tugas" }, { key: "desc", label: "Deskripsi", placeholder: "..." }, { key: "features", label: "Fitur (koma)", placeholder: "Fitur1, Fitur2" }, { key: "popular", label: "Popular?", type: "boolean" }]}
        gridCols="sm:grid-cols-2" />}
      {section === "cara-order" && <ArrayEditor label="Langkah" items={data.caraOrder || []} onUpdate={(v) => setData({ ...data, caraOrder: v })} itemLabel="Langkah"
        fields={[{ key: "number", label: "Nomor", placeholder: "01" }, { key: "title", label: "Judul", placeholder: "Konsultasi" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }]} />}
      {section === "tim" && <ArrayEditor label="Anggota" items={data.tim || []} onUpdate={(v) => setData({ ...data, tim: v })} itemLabel="Anggota"
        fields={[{ key: "name", label: "Nama", placeholder: "Zidan Herlangga" }, { key: "role", label: "Role", placeholder: "Founder" }, { key: "initials", label: "Inisial", placeholder: "ZH" }, { key: "gradient", label: "Gradient", placeholder: "from-indigo-500 to-purple-500" }]}
        gridCols="sm:grid-cols-2" />}
      {section === "portofolio" && <ArrayEditor label="Item" items={data.portofolio || []} onUpdate={(v) => setData({ ...data, portofolio: v })} itemLabel="Item"
        fields={[{ key: "title", label: "Judul", placeholder: "Nama project" }, { key: "category", label: "Kategori", placeholder: "Programming" }, { key: "desc", label: "Deskripsi", placeholder: "..." }]} />}
      {section === "garansi" && <ArrayEditor label="Garansi" items={data.garansi || []} onUpdate={(v) => setData({ ...data, garansi: v })} itemLabel="Garansi"
        fields={[{ key: "title", label: "Judul", placeholder: "Tepat Waktu" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }]} />}
      {section === "testimoni" && <ArrayEditor label="Testimoni" items={data.testimoni || []} onUpdate={(v) => setData({ ...data, testimoni: v })} itemLabel="Testimoni"
        fields={[{ key: "name", label: "Nama", placeholder: "Rina" }, { key: "role", label: "Role", placeholder: "Mahasiswi UI" }, { key: "text", label: "Testimoni", type: "textarea", rows: 2 }, { key: "initials", label: "Inisial", placeholder: "RN" }, { key: "gradient", label: "Gradient", placeholder: "from-indigo-500 to-blue-500" }]}
        gridCols="sm:grid-cols-2" />}
      {section === "faq" && <ArrayEditor label="FAQ" items={data.faq || []} onUpdate={(v) => setData({ ...data, faq: v })} itemLabel="FAQ"
        fields={[{ key: "q", label: "Pertanyaan", placeholder: "Apa itu Beresin?" }, { key: "a", label: "Jawaban", type: "textarea", rows: 2 }]} />}
      {section === "blog" && <ArrayEditor label="Artikel" items={data.blog || []} onUpdate={(v) => setData({ ...data, blog: v })} itemLabel="Artikel"
        fields={[{ key: "title", label: "Judul" }, { key: "tag", label: "Tag", placeholder: "Tips" }, { key: "date", label: "Tanggal", placeholder: "15 Mar 2026" }, { key: "excerpt", label: "Kutipan", type: "textarea", rows: 2 }]}
        gridCols="sm:grid-cols-2" />}
    </div>
  );
}

function LayananEditor({ data, setData }) {
  const [section, setSection] = useState("kategori");
  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={layananSections} active={section} onChange={setSection} />
      {section === "kategori" && <NestedArrayEditor label="Kategori" items={data.categories || []} onUpdate={(v) => setData({ ...data, categories: v })} config={{ services: true, subLabel: "Daftar Layanan", subPlaceholder: "Nama layanan" }} />}
    </div>
  );
}

function CaraOrderEditor({ data, setData }) {
  const [section, setSection] = useState("langkah");
  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={caraOrderSections} active={section} onChange={setSection} />
      {section === "langkah" && <ArrayEditor label="Langkah" items={data.steps || []} onUpdate={(v) => setData({ ...data, steps: v })} itemLabel="Langkah"
        fields={[{ key: "number", label: "Nomor", placeholder: "01" }, { key: "title", label: "Judul", placeholder: "Konsultasi" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }, { key: "icon", label: "Icon", placeholder: "chat / check / gear / done" }]} />}
      {section === "faq" && <ArrayEditor label="FAQ" items={data.faq || []} onUpdate={(v) => setData({ ...data, faq: v })} itemLabel="FAQ"
        fields={[{ key: "q", label: "Pertanyaan" }, { key: "a", label: "Jawaban", type: "textarea", rows: 2 }]} />}
    </div>
  );
}

function TentangEditor({ data, setData }) {
  const [section, setSection] = useState("hero");
  const set = (k, v) => setData({ ...data, [k]: v });
  const setStory = (idx, val) => { const c = [...(data.story || [])]; c[idx] = val; setData({ ...data, story: c }); };

  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={tentangSections} active={section} onChange={setSection} />
      {section === "hero" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Field label="Judul" value={data.heroTitle || ""} onChange={(v) => set("heroTitle", v)} placeholder="Kamu punya masalah dengan tugas?" />
          <div className="sm:col-span-2"><Field label="Subtitle" value={data.heroSubtitle || ""} onChange={(v) => set("heroSubtitle", v)} type="textarea" rows={2} /></div>
        </div>
      )}
      {section === "cerita" && (
        <div>
          {(data.story || []).length === 0 && <p className="text-[10px] text-gray-600 mb-2 italic">Belum ada cerita.</p>}
          {(data.story || [""]).map((p, i) => (
            <div key={i} className="flex gap-1 mb-1.5">
              <textarea value={p} onChange={(e) => setStory(i, e.target.value)} rows={2} placeholder="Paragraf cerita..." className="flex-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 text-xs focus:outline-none focus:border-indigo-500/50 transition-all resize-none" />
              {i > 0 && <button onClick={() => { const c = [...data.story]; c.splice(i, 1); setData({ ...data, story: c }); }} className="text-red-400/60 hover:text-red-300 p-1"><Svg d={icons.x} className="w-3.5 h-3.5" /></button>}
            </div>
          ))}
          <button onClick={() => setData({ ...data, story: [...(data.story || []), ""] })} className="flex items-center gap-1 text-[10px] text-indigo-400/70 hover:text-indigo-300 mt-1">
            <Svg d={icons.plus} className="w-3 h-3" /> Tambah paragraf
          </button>
        </div>
      )}
      {section === "stats" && <ArrayEditor label="Stat" items={data.stats || []} onUpdate={(v) => set("stats", v)} itemLabel="Stat"
        fields={[{ key: "value", label: "Nilai", type: "number", placeholder: "500" }, { key: "suffix", label: "Suffix", placeholder: "+" }, { key: "label", label: "Label", placeholder: "Tugas Selesai" }]} />}
      {section === "tim" && <ArrayEditor label="Anggota" items={data.tim || []} onUpdate={(v) => set("tim", v)} itemLabel="Anggota"
        fields={[{ key: "name", label: "Nama" }, { key: "role", label: "Role" }, { key: "initials", label: "Inisial" }, { key: "gradient", label: "Gradient" }]} gridCols="sm:grid-cols-2" />}
      {section === "values" && <ArrayEditor label="Value" items={data.values || []} onUpdate={(v) => set("values", v)} itemLabel="Value"
        fields={[{ key: "title", label: "Judul" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }]} />}
    </div>
  );
}

function KontakEditor({ data, setData }) {
  const [section, setSection] = useState("kontak");
  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={kontakSections} active={section} onChange={setSection} />
      {section === "kontak" && <ArrayEditor label="Kontak" items={data.contacts || []} onUpdate={(v) => setData({ ...data, contacts: v })} itemLabel="Kontak"
        fields={[{ key: "label", label: "Label", placeholder: "WhatsApp / Email" }, { key: "value", label: "Nilai", placeholder: "0851-5706-6514" }, { key: "href", label: "Link", placeholder: "https://wa.me/..." }, { key: "icon", label: "Icon", placeholder: "wa / email / ig" }]} />}
      {section === "social" && <ArrayEditor label="Social" items={data.socials || []} onUpdate={(v) => setData({ ...data, socials: v })} itemLabel="Social"
        fields={[{ key: "name", label: "Nama Platform", placeholder: "Instagram" }, { key: "url", label: "URL", placeholder: "https://instagram.com/..." }]} />}
    </div>
  );
}

const editors = { beranda: BerandaEditor, layanan: LayananEditor, "cara-order": CaraOrderEditor, tentang: TentangEditor, kontak: KontakEditor };

/* ─── Dashboard Layout ─── */
function AdminDashboard({ token, onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const dataRef = useRef(data);
  const pageRef = useRef(activePage);

  useEffect(() => { dataRef.current = data; }, [data]);
  useEffect(() => { pageRef.current = activePage; }, [activePage]);
  useEffect(() => { if (activePage !== "dashboard") loadContent(activePage); }, [activePage]);

  const showToast = useCallback((msg, type) => setToast({ message: msg, type, key: Date.now() }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const loadContent = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/content?page=${page}`);
      const json = await res.json();
      setData(json.data || {});
      setDirty(false);
    } catch { showToast("Gagal load data", "error"); }
    finally { setLoading(false); }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/content?page=${pageRef.current}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: dataRef.current }),
      });
      const json = await res.json();
      if (res.ok) { showToast("Data berhasil disimpan!", "success"); setDirty(false); }
      else showToast(json.error || "Gagal menyimpan", "error");
    } catch { showToast("Gagal terhubung ke server", "error"); }
    finally { setSaving(false); }
  };

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (pageRef.current !== "dashboard") saveContent();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [saveContent]);

  const handleNavigate = (pageId) => {
    setSidebarOpen(false);
    if (pageId !== activePage) setActivePage(pageId);
  };

  const Editor = editors[activePage];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={dismissToast} />}
      {confirm && <ConfirmModal {...confirm} />}

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-56 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-white/[0.04] flex flex-col shrink-0 transition-all duration-300 ease-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Svg d={icons.shield} className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Beresin</h1>
              <p className="text-[9px] text-gray-600">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {pages.map((p) => {
            const isActive = activePage === p.id;
            return (
              <button key={p.id} onClick={() => handleNavigate(p.id)}
                className={`relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all duration-200 ${
                  isActive
                    ? "text-indigo-300 bg-gradient-to-r from-indigo-600/15 to-purple-600/5 border border-indigo-500/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                }`}>
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500" />}
                <Svg d={icons[p.id]} className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-400" : "text-gray-600"}`} />
                {p.label}
                {dirty && isActive && p.id !== "dashboard" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/[0.04]">
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-2.5 py-2 text-[10px] text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all">
            <Svg d={icons.logout} className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 lg:hidden bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.04] px-3 py-2.5 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white p-1 -ml-1">
            <Svg d={icons.menu} className="w-4.5 h-4.5" />
          </button>
          <span className="text-xs font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Beresin</span>
          {dirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
        </div>

        <div className="flex-1 px-3 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 max-w-3xl mx-auto w-full">
          {activePage === "dashboard" ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Dashboard</h2>
              </div>
              <DashboardOverview onNavigate={handleNavigate} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-white">{pages.find(p => p.id === activePage)?.label}</h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">Kelola konten halaman ini</p>
                </div>
                <div className="flex items-center gap-2">
                  {dirty && (
                    <span className="flex items-center gap-1 text-[9px] text-amber-400/80 bg-amber-400/5 px-2 py-0.5 rounded-full border border-amber-400/10">
                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                      Belum simpan
                    </span>
                  )}
                </div>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 w-24 bg-white/5 rounded mb-3" />
                      <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="h-8 bg-white/5 rounded-lg" />
                        <div className="h-8 bg-white/5 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {Editor && <Editor data={data} setData={(d) => { setData(d); setDirty(true); }} />}
                  <div className="sticky bottom-0 bg-gray-950/90 backdrop-blur-xl py-3 mt-6 -mx-3 md:-mx-5 lg:-mx-6 px-3 md:px-5 lg:px-6 border-t border-white/[0.04] flex items-center gap-2.5">
                    <button onClick={saveContent} disabled={saving || !dirty}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                      {saving
                        ? <span className="flex items-center gap-1.5"><Svg d={icons.spinner} className="w-3.5 h-3.5 animate-spin" />Menyimpan...</span>
                        : <span className="flex items-center gap-1.5"><Svg d={icons.save} className="w-3.5 h-3.5" />Simpan</span>}
                    </button>
                    <button onClick={() => setConfirm({
                      type: "reset", title: "Reset Perubahan?", message: "Semua perubahan yang belum disimpan akan hilang.", confirmLabel: "Reset", danger: true,
                      onConfirm: () => { loadContent(activePage); setConfirm(null); }, onCancel: () => setConfirm(null),
                    })} disabled={!dirty}
                      className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 rounded-lg text-xs border border-white/[0.06] transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                      Reset
                    </button>
                    <span className="ml-auto text-[9px] text-gray-600 bg-white/5 px-2 py-1 rounded-full hidden sm:inline">Ctrl+S</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.25s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("beresin-admin-token"));
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${API}/admin/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json()).then((j) => setVerified(j.valid)).catch(() => setVerified(false));
    }
  }, [token]);

  if (!token || !verified) return <AdminLogin onLogin={(t) => { setToken(t); setVerified(true); }} />;
  return <AdminDashboard token={token} onLogout={() => { localStorage.removeItem("beresin-admin-token"); setToken(null); setVerified(false); }} />;
}