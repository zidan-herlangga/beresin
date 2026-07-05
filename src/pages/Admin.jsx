import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ImageUpload from "../components/ImageUpload";
import RichEditor from "../components/RichEditor";

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
  blog: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
};

const pages = [
  { id: "dashboard", label: "Dashboard" },
  { id: "beranda", label: "Beranda" },
  { id: "layanan", label: "Layanan" },
  { id: "blog", label: "Blog" },
  { id: "cara-order", label: "Cara Order" },
  { id: "tentang", label: "Tentang" },
  { id: "kontak", label: "Kontak" },
];

function Svg({ d, className }) {
  return <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={1.5} d={d} /></svg>;
}

/* ─── Toast ─── */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-6 right-6 z-50 animate-slideDown">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-xl text-sm min-w-[320px] ${
        type === "success" ? "bg-emerald-900/85 border-emerald-700/40 text-emerald-200" : "bg-red-900/85 border-red-700/40 text-red-200"
      }`}>
        <span className={`w-2 h-2 rounded-full ${type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button onClick={onClose} className="opacity-40 hover:opacity-100"><Svg d={icons.x} className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

/* ─── Confirm Modal ─── */
function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel, danger }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-gray-900 border border-white/[0.08] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/15 text-red-400" : "bg-indigo-500/15 text-indigo-400"}`}>
          <Svg d={danger ? icons.alert : icons.info} className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 rounded-xl text-sm font-medium transition-all">Batal</button>
          <button onClick={onConfirm} className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97] ${danger ? "bg-red-600 hover:bg-red-500" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"}`}>{confirmLabel || "Konfirmasi"}</button>
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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <div className="absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm" />
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/5">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20">
              <Svg d={icons.shield} className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Beresin</h1>
            <p className="text-sm text-gray-500 mt-1.5">Masukkan password admin</p>
          </div>
          {err && (
            <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-red-900/30 border border-red-800/30 text-red-300 text-sm">
              <Svg d={icons.alert} className="w-4 h-4 shrink-0" />
              {err}
            </div>
          )}
          <div className="relative mb-4">
            <input type={show ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all" autoFocus />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              <Svg d={icons.eye} className="w-5 h-5" />
            </button>
          </div>
          <button type="submit" disabled={loading || !password}
            className="relative w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-sm hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-indigo-500/10">
            <span className={`${loading ? "opacity-0" : "opacity-100"}`}>Masuk</span>
            {loading && <span className="absolute inset-0 flex items-center justify-center"><Svg d={icons.spinner} className="w-5 h-5 animate-spin" /></span>}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Field ─── */
function Field({ label, value, onChange, type, rows, placeholder, hint, icon }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const base = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200";
  return (
    <div className="group mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        {icon && <Svg d={icon} className="w-3.5 h-3.5 text-gray-500" />}
        <label htmlFor={id} className="text-xs font-semibold text-gray-400 tracking-wide">{label}</label>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-focus-within:from-indigo-500/50 group-focus-within:to-purple-500/50 transition-all duration-300" />
        {type === "textarea"
          ? <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 3} placeholder={placeholder} className={base + " resize-none pl-4"} />
          : <input id={id} type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base + " pl-4"} />}
      </div>
      {hint && <p className="text-xs text-gray-600 mt-1 ml-1">{hint}</p>}
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
      className={`group relative bg-white/[0.02] rounded-2xl border transition-all duration-200 ${
        dragOver ? "border-indigo-500/50 bg-indigo-500/8 ring-2 ring-indigo-500/25 shadow-lg shadow-indigo-500/5" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-lg"
      } p-5 mb-3`}>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          {onMoveUp && (
            <span className="text-gray-500 cursor-grab active:cursor-grabbing hover:text-gray-300 transition-colors">
              <Svg d={icons.grip} className="w-4 h-4" />
            </span>
          )}
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/[0.04] text-[11px] font-mono font-semibold text-gray-500">{index + 1}</span>
          {onMoveUp && !isFirst && (
            <button onClick={() => onMoveUp(index, index - 1)} className="text-gray-600 hover:text-gray-200 p-1 rounded-lg hover:bg-white/[0.06] transition-all">
              <Svg d={icons.arrowUp} className="w-3.5 h-3.5" />
            </button>
          )}
          {onMoveUp && !isLast && (
            <button onClick={() => onMoveUp(index, index + 1)} className="text-gray-600 hover:text-gray-200 p-1 rounded-lg hover:bg-white/[0.06] transition-all">
              <Svg d={icons.arrowDown} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          {canRemove && (
            <button onClick={onRemove} className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-red-400/60 hover:text-red-300 hover:bg-red-900/15 rounded-lg transition-all opacity-0 group-hover:opacity-100">
              <Svg d={icons.trash} className="w-3.5 h-3.5" />
              Hapus
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── Array Editor ─── */
function ArrayEditor({ label, items, onUpdate, fields, itemLabel }) {
  const addItem = () => {
    const empty = {};
    fields.forEach((f) => { empty[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : ""; });
    onUpdate([...items, empty]);
  };
  const removeItem = (idx) => { if (items.length <= 1) return; onUpdate(items.filter((_, i) => i !== idx)); };
  const updateItem = (idx, key, val) => {
    const c = [...items];
    c[idx] = { ...c[idx], [key]: val };
    const srcField = fields.find(f => f.autoSlug === key);
    if (srcField) {
      c[idx][srcField.key] = val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    onUpdate(c);
  };
  const moveItem = (from, to) => { const c = [...items]; const [m] = c.splice(from, 1); c.splice(to, 0, m); onUpdate(c); };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-400/60 to-purple-500/60" />
          <h3 className="text-sm font-bold text-gray-200">{label}</h3>
          {items.length > 0 && (
            <span className="text-[11px] text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded-full font-mono">{items.length}</span>
          )}
        </div>
        <button onClick={addItem} className="flex items-center gap-1.5 text-xs px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-medium rounded-xl border border-indigo-500/20 hover:border-indigo-500/30 transition-all active:scale-95 shadow-sm">
          <Svg d={icons.plus} className="w-3.5 h-3.5" />
          Tambah {itemLabel || "Item"}
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.03] flex items-center justify-center mb-3">
            <Svg d={icons.file} className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-gray-500">Belum ada {itemLabel || "item"}</p>
          <button onClick={addItem} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg transition-all">
            + Tambah Sekarang
          </button>
        </div>
      ) : items.map((item, idx) => (
        <ItemCard key={idx} index={idx} onRemove={() => removeItem(idx)} canRemove={items.length > 1} onMoveUp={moveItem} isFirst={idx === 0} isLast={idx === items.length - 1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1">
                {fields.map((f) => (
                  <div key={f.key} className={f.type === "textarea" || f.type === "boolean" || f.type === "image" || f.type === "richtext" ? "sm:col-span-2 mb-0" : "mb-0"}>
                    {f.type === "image" ? (
                      <ImageUpload value={item[f.key] || ""} onChange={(v) => updateItem(idx, f.key, v)} label={f.label} />
                    ) : f.type === "richtext" ? (
                      <RichEditor value={item[f.key] || ""} onChange={(v) => updateItem(idx, f.key, v)} label={f.label} placeholder={f.placeholder} />
                    ) : (
                      <>
                        <label className="block text-[11px] text-gray-500 mb-1 font-semibold tracking-wider">{f.label}</label>
                        {f.type === "textarea"
                          ? <textarea value={item[f.key] || ""} onChange={(e) => updateItem(idx, f.key, e.target.value)} rows={f.rows || 2} placeholder={f.placeholder} className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-xs focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10 transition-all resize-none" />
                          : f.type === "boolean"
                            ? <select value={String(item[f.key] ?? false)} onChange={(e) => updateItem(idx, f.key, e.target.value === "true")} className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.06] rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500/40 transition-all">
                                <option value="false">Tidak</option><option value="true">Ya</option>
                              </select>
                            : <input type={f.type || "text"} value={item[f.key] || ""} onChange={(e) => updateItem(idx, f.key, e.target.value)} placeholder={f.placeholder} className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-xs focus:outline-none focus:border-indigo-500/40 transition-all" />}
                      </>
                    )}
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
  const renderSub = (idx, k, label, placeholder) => (
    <div className="mt-4 pt-4 border-t border-white/[0.04]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-gray-400 font-semibold tracking-wider">{label || "Items"}</span>
        <button onClick={() => addSub(idx, k)} className="flex items-center gap-1 text-xs text-indigo-400/70 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 px-2.5 py-1 rounded-lg transition-all">
          <Svg d={icons.plus} className="w-3 h-3" /> Tambah
        </button>
      </div>
      {(items[idx][k] || []).length === 0
        ? <p className="text-xs text-gray-600 italic bg-white/[0.02] rounded-lg px-3 py-4 text-center">Belum ada item</p>
        : (items[idx][k] || []).map((si, siIdx) => (
            <div key={siIdx} className="flex gap-2 mb-2">
              <input value={si} onChange={(e) => updateSub(idx, k, siIdx, e.target.value)} placeholder={placeholder || "Item"} className="flex-1 px-3 py-2 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-xs focus:outline-none focus:border-indigo-500/40 transition-all" />
              <button onClick={() => removeSub(idx, k, siIdx)} className="text-red-400/50 hover:text-red-300 px-2.5 rounded-lg hover:bg-red-900/15 transition-all"><Svg d={icons.x} className="w-3.5 h-3.5" /></button>
            </div>
          ))}
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-400/60 to-purple-500/60" />
          <h3 className="text-sm font-bold text-gray-200">{label}</h3>
          {items.length > 0 && (
            <span className="text-[11px] text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded-full font-mono">{items.length}</span>
          )}
        </div>
        <button onClick={addItem} className="flex items-center gap-1.5 text-xs px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-medium rounded-xl border border-indigo-500/20 hover:border-indigo-500/30 transition-all active:scale-95 shadow-sm">
          <Svg d={icons.plus} className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.03] flex items-center justify-center mb-3">
            <Svg d={icons.file} className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-gray-500">Belum ada item</p>
          <button onClick={addItem} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg transition-all">
            + Tambah Sekarang
          </button>
        </div>
      ) : items.map((item, idx) => (
        <ItemCard key={idx} index={idx} onRemove={() => removeItem(idx)} canRemove={items.length > 1} onMoveUp={moveItem} isFirst={idx === 0} isLast={idx === items.length - 1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1 font-semibold tracking-wider">Judul</label>
              <input value={item.title || ""} onChange={(e) => updateItem(idx, "title", e.target.value)} placeholder="Judul" className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-xs focus:outline-none focus:border-indigo-500/40 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1 font-semibold tracking-wider">Tag</label>
              <input value={item.tag || ""} onChange={(e) => updateItem(idx, "tag", e.target.value)} placeholder="Tag" className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.06] rounded-lg text-white placeholder-gray-700 text-xs focus:outline-none focus:border-indigo-500/40 transition-all" />
            </div>
          </div>
          {config.subItems && renderSub(idx, config.subItems, config.subLabel, config.subPlaceholder)}
          {config.services && renderSub(idx, "services", config.subLabel || "Services", "Nama layanan")}
        </ItemCard>
      ))}
    </div>
  );
}

/* ─── Section Tabs ─── */
const sectionIcons = {
  hero: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  layanan: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  harga: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "cara-order": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  tim: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  portofolio: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  garansi: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  testimoni: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  faq: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  blog: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  kategori: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z",
  langkah: "M13 10V3L4 14h7v7l9-11h-7z",
  stats: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  cerita: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  values: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  kontak: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  social: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
};

function SectionTabs({ sections, active, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-1 px-1">
      {sections.map((s) => (
        <button key={s.id} onClick={() => onChange(s.id)}
          className={`group relative shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === s.id
              ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-200 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
          }`}>
          {sectionIcons[s.id] && (
            <Svg d={sectionIcons[s.id]} className={`w-3.5 h-3.5 ${active === s.id ? "text-indigo-400" : "text-gray-500 group-hover:text-gray-300"}`} />
          )}
          {s.label}
          {active === s.id && (
            <span className="absolute -bottom-[1px] left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500" />
          )}
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
    const b = stats.beranda || {};
    return [
      { label: "Total Konten", value: Object.values(stats).reduce((s, d) => s + countItems(d), 0), sub: "Semua halaman", color: "from-indigo-500 to-purple-600", icon: icons.file, glow: "shadow-indigo-500/10" },
      { label: "Artikel Blog", value: b.blog?.length || 0, sub: "Tips & artikel", color: "from-cyan-500 to-blue-600", icon: icons.file, glow: "shadow-cyan-500/10" },
      { label: "Testimoni", value: b.testimoni?.length || 0, sub: "Kepuasan klien", color: "from-pink-500 to-rose-600", icon: icons.chat, glow: "shadow-pink-500/10" },
      { label: "Layanan", value: stats.layanan?.categories?.length || 0, sub: "Kategori jasa", color: "from-amber-500 to-orange-600", icon: icons.layanan, glow: "shadow-amber-500/10" },
    ];
  }, [stats]);

  const sections = useMemo(() => {
    if (!stats) return [];
    const b = stats.beranda || {};
    return [
      { id: "beranda", label: "Beranda", icon: icons.beranda, items: [
        { name: "Hero", count: 1 }, { name: "Layanan", count: b.layanan?.length || 0 },
        { name: "Harga", count: b.harga?.length || 0 }, { name: "Cara Order", count: b.caraOrder?.length || 0 },
        { name: "Tim", count: b.tim?.length || 0 }, { name: "Portofolio", count: b.portofolio?.length || 0 },
        { name: "Garansi", count: b.garansi?.length || 0 }, { name: "Testimoni", count: b.testimoni?.length || 0 },
        { name: "FAQ", count: b.faq?.length || 0 }, { name: "Blog", count: b.blog?.length || 0 },
      ] },
      { id: "layanan", label: "Layanan", icon: icons.layanan, items: [
        { name: "Kategori", count: stats.layanan?.categories?.length || 0 },
        { name: "Total Servis", count: stats.layanan?.categories?.reduce((s, c) => s + (c.services?.length || 0), 0) || 0 },
      ] },
      { id: "cara-order", label: "Cara Order", icon: icons["cara-order"], items: [
        { name: "Langkah", count: stats["cara-order"]?.steps?.length || 0 },
        { name: "FAQ", count: stats["cara-order"]?.faq?.length || 0 },
      ] },
      { id: "tentang", label: "Tentang", icon: icons.tentang, items: [
        { name: "Cerita", count: stats.tentang?.story?.length || 0 },
        { name: "Statistik", count: stats.tentang?.stats?.length || 0 },
        { name: "Tim", count: stats.tentang?.tim?.length || 0 },
        { name: "Values", count: stats.tentang?.values?.length || 0 },
      ] },
      { id: "kontak", label: "Kontak", icon: icons.kontak, items: [
        { name: "Kontak", count: stats.kontak?.contacts?.length || 0 },
        { name: "Sosial", count: stats.kontak?.socials?.length || 0 },
      ] },
    ];
  }, [stats]);

  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Selamat Pagi");
    else if (h < 15) setGreeting("Selamat Siang");
    else if (h < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  if (loading) return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5">
            <div className="w-10 h-10 bg-white/5 rounded-xl mb-3" />
            <div className="h-7 w-16 bg-white/5 rounded mb-2" />
            <div className="h-3 w-20 bg-white/5 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5">
            <div className="h-5 w-24 bg-white/5 rounded mb-3" />
            <div className="space-y-2"><div className="h-3 bg-white/5 rounded w-full" /><div className="h-3 bg-white/5 rounded w-3/4" /></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent border border-indigo-500/10 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {greeting}, Admin 👋
          </h2>
          <p className="text-sm text-gray-400 mt-1.5">
            {dateStr} &middot; {timeStr} WIB
          </p>
          <p className="text-sm text-gray-500 mt-3 max-w-xl">
            Kelola konten website dari sini. Pantau statistik, edit halaman, dan perbarui informasi dengan mudah.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="group relative bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 active:scale-[0.98]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow-lg ${c.glow} group-hover:scale-110 transition-transform duration-300`}>
              <Svg d={c.icon} className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
            <p className="text-[10px] text-gray-600">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Content Overview */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500 inline-block" />
          Ringkasan Konten
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sections.map((s) => {
            const total = s.items.reduce((sum, it) => sum + it.count, 0);
            return (
              <button key={s.id} onClick={() => onNavigate(s.id)}
                className="relative group text-left bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5 hover:border-indigo-500/20 hover:bg-indigo-500/[0.03] transition-all duration-300 active:scale-[0.98] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/3 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-all duration-500" />
                <div className="relative flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-indigo-600/15 transition-all duration-300">
                      <Svg d={s.icon} className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">{s.label}</h4>
                  </div>
                  <Svg d={icons.chevronRight} className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="relative space-y-2">
                  {s.items.map((it) => (
                    <div key={it.name} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 group-hover:text-gray-400 transition-colors">{it.name}</span>
                      <span className="text-gray-600 group-hover:text-gray-300 font-mono">{it.count}</span>
                    </div>
                  ))}
                </div>
                <div className="relative mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">{total} item</span>
                  <span className="text-[11px] text-indigo-500/60 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">Kelola &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 inline-block" />
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Edit Beranda", page: "beranda", icon: icons.beranda, gradient: "from-indigo-600/20 to-purple-600/10", border: "border-indigo-500/10", text: "text-indigo-300" },
            { label: "Edit Layanan", page: "layanan", icon: icons.layanan, gradient: "from-amber-600/20 to-orange-600/10", border: "border-amber-500/10", text: "text-amber-300" },
            { label: "Cara Order", page: "cara-order", icon: icons["cara-order"], gradient: "from-cyan-600/20 to-blue-600/10", border: "border-cyan-500/10", text: "text-cyan-300" },
            { label: "Lihat Blog", page: "beranda", icon: icons.file, gradient: "from-pink-600/20 to-rose-600/10", border: "border-pink-500/10", text: "text-pink-300" },
          ].map((a) => (
            <button key={a.label} onClick={() => onNavigate(a.page)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r ${a.gradient} border ${a.border} hover:brightness-125 transition-all duration-200 active:scale-[0.97]`}>
              <Svg d={a.icon} className={`w-5 h-5 ${a.text}`} />
              <span className="text-sm font-medium text-white">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Section definitions ─── */
const berandaSections = [
  { id: "hero", label: "Hero" }, { id: "layanan", label: "Layanan" }, { id: "harga", label: "Harga" },
  { id: "cara-order", label: "Cara Order" }, { id: "tim", label: "Tim" }, { id: "portofolio", label: "Portofolio" },
  { id: "garansi", label: "Garansi" }, { id: "testimoni", label: "Testimoni" }, { id: "faq", label: "FAQ" }, { id: "blog", label: "Blog" },
];
const layananSections = [{ id: "kategori", label: "Kategori" }];
const caraOrderSections = [{ id: "langkah", label: "Langkah" }, { id: "faq", label: "FAQ" }];
const tentangSections = [{ id: "hero", label: "Hero" }, { id: "cerita", label: "Cerita" }, { id: "stats", label: "Statistik" }, { id: "tim", label: "Tim" }, { id: "values", label: "Values" }];
const kontakSections = [{ id: "kontak", label: "Kontak" }, { id: "social", label: "Sosial" }];

/* ─── Editors ─── */
function BerandaEditor({ data, setData, blogMode }) {
  const [section, setSection] = useState("hero");

  useEffect(() => {
    if (blogMode) setSection("blog");
  }, [blogMode]);

  const setHero = (k, v) => setData({ ...data, hero: { ...data.hero, [k]: v } });
  const setStats = (v) => setData({ ...data, hero: { ...data.hero, stats: v } });
  return (
    <div className="animate-fadeIn">
      <SectionTabs sections={berandaSections} active={section} onChange={setSection} />
      {section === "hero" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div className="sm:col-span-2"><Field label="Judul" value={data.hero?.title || ""} onChange={(v) => setHero("title", v)} placeholder="cth: Tugas Menumpuk?" /></div>
          <div className="sm:col-span-2"><Field label="Subtitle" value={data.hero?.subtitle || ""} onChange={(v) => setHero("subtitle", v)} type="textarea" rows={2} placeholder="Deskripsi hero section..." /></div>
          <div className="sm:col-span-2"><ArrayEditor label="Statistik" items={data.hero?.stats || []} onUpdate={setStats} itemLabel="Stat"
            fields={[{ key: "value", label: "Nilai", type: "number", placeholder: "500" }, { key: "suffix", label: "Suffix", placeholder: "+ / %" }, { key: "label", label: "Label", placeholder: "Tugas Selesai" }]} /></div>
        </div>
      )}
      {section === "layanan" && <NestedArrayEditor label="Layanan" items={data.layanan || []} onUpdate={(v) => setData({ ...data, layanan: v })} config={{ subItems: "items", subLabel: "Daftar Layanan", subPlaceholder: "Nama layanan" }} />}
      {section === "harga" && <ArrayEditor label="Paket Harga" items={data.harga || []} onUpdate={(v) => setData({ ...data, harga: v })} itemLabel="Paket"
        fields={[{ key: "name", label: "Nama Paket", placeholder: "Pelajar / Mahasiswa / PRO" }, { key: "price", label: "Harga", placeholder: "25rb / 250rb / 500rb" }, { key: "period", label: "Period", placeholder: "/tugas" }, { key: "desc", label: "Deskripsi", placeholder: "Deskripsi singkat" }, { key: "features", label: "Fitur (koma)", placeholder: "Fitur1, Fitur2" }, { key: "popular", label: "Popular?", type: "boolean" }]} />}
      {section === "cara-order" && <ArrayEditor label="Langkah" items={data.caraOrder || []} onUpdate={(v) => setData({ ...data, caraOrder: v })} itemLabel="Langkah"
        fields={[{ key: "number", label: "Nomor", placeholder: "01" }, { key: "title", label: "Judul", placeholder: "Konsultasi" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }]} />}
      {section === "tim" && <ArrayEditor label="Anggota" items={data.tim || []} onUpdate={(v) => setData({ ...data, tim: v })} itemLabel="Anggota"
        fields={[{ key: "name", label: "Nama", placeholder: "Zidan Herlangga" }, { key: "role", label: "Role", placeholder: "Founder" }, { key: "initials", label: "Inisial", placeholder: "ZH" }, { key: "gradient", label: "Gradient", placeholder: "from-indigo-500 to-purple-500" }]} />}
      {section === "portofolio" && <ArrayEditor label="Item" items={data.portofolio || []} onUpdate={(v) => setData({ ...data, portofolio: v })} itemLabel="Item"
        fields={[{ key: "title", label: "Judul", placeholder: "Nama project" }, { key: "category", label: "Kategori", placeholder: "Programming" }, { key: "desc", label: "Deskripsi", placeholder: "Deskripsi project" }, { key: "image", label: "Gambar", type: "image" }]} />}
      {section === "garansi" && <ArrayEditor label="Garansi" items={data.garansi || []} onUpdate={(v) => setData({ ...data, garansi: v })} itemLabel="Garansi"
        fields={[{ key: "title", label: "Judul", placeholder: "Tepat Waktu" }, { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 }]} />}
      {section === "testimoni" && <ArrayEditor label="Testimoni" items={data.testimoni || []} onUpdate={(v) => setData({ ...data, testimoni: v })} itemLabel="Testimoni"
        fields={[{ key: "name", label: "Nama", placeholder: "Rina" }, { key: "role", label: "Role", placeholder: "Mahasiswi UI" }, { key: "text", label: "Testimoni", type: "textarea", rows: 2 }, { key: "initials", label: "Inisial", placeholder: "RN" }, { key: "gradient", label: "Gradient", placeholder: "from-indigo-500 to-blue-500" }]} />}
      {section === "faq" && <ArrayEditor label="FAQ" items={data.faq || []} onUpdate={(v) => setData({ ...data, faq: v })} itemLabel="FAQ"
        fields={[{ key: "q", label: "Pertanyaan", placeholder: "Apa itu Beresin?" }, { key: "a", label: "Jawaban", type: "textarea", rows: 2 }]} />}
      {section === "blog" && <ArrayEditor label="Artikel" items={data.blog || []} onUpdate={(v) => setData({ ...data, blog: v })} itemLabel="Artikel"
        fields={[{ key: "title", label: "Judul" }, { key: "slug", label: "Slug", placeholder: "auto-dari-judul", autoSlug: "title" }, { key: "tag", label: "Tag", placeholder: "Tips" }, { key: "date", label: "Tanggal", placeholder: "15 Mar 2026" }, { key: "image", label: "Gambar", type: "image" }, { key: "excerpt", label: "Kutipan", type: "textarea", rows: 2 }, { key: "content", label: "Konten", type: "richtext" }]} />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <Field label="Judul" value={data.heroTitle || ""} onChange={(v) => set("heroTitle", v)} placeholder="Kamu punya masalah dengan tugas?" />
          <div className="sm:col-span-2"><Field label="Subtitle" value={data.heroSubtitle || ""} onChange={(v) => set("heroSubtitle", v)} type="textarea" rows={2} /></div>
        </div>
      )}
      {section === "cerita" && (
        <div>
          {(data.story || []).length === 0 && <p className="text-sm text-gray-600 mb-3 italic">Belum ada cerita.</p>}
          {(data.story || [""]).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <textarea value={p} onChange={(e) => setStory(i, e.target.value)} rows={2} placeholder="Paragraf cerita..." className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" />
              {i > 0 && <button onClick={() => { const c = [...data.story]; c.splice(i, 1); setData({ ...data, story: c }); }} className="text-red-400/60 hover:text-red-300 px-2"><Svg d={icons.x} className="w-4 h-4" /></button>}
            </div>
          ))}
          <button onClick={() => setData({ ...data, story: [...(data.story || []), ""] })} className="flex items-center gap-1.5 text-xs text-indigo-400/70 hover:text-indigo-300 transition mt-2">
            <Svg d={icons.plus} className="w-4 h-4" /> Tambah paragraf
          </button>
        </div>
      )}
      {section === "stats" && <ArrayEditor label="Stat" items={data.stats || []} onUpdate={(v) => set("stats", v)} itemLabel="Stat"
        fields={[{ key: "value", label: "Nilai", type: "number", placeholder: "500" }, { key: "suffix", label: "Suffix", placeholder: "+" }, { key: "label", label: "Label", placeholder: "Tugas Selesai" }]} />}
      {section === "tim" && <ArrayEditor label="Anggota" items={data.tim || []} onUpdate={(v) => set("tim", v)} itemLabel="Anggota"
        fields={[{ key: "name", label: "Nama" }, { key: "role", label: "Role" }, { key: "initials", label: "Inisial" }, { key: "gradient", label: "Gradient" }]} />}
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

/* ─── Admin Dashboard ─── */
function AdminDashboard({ token, onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [focusSection, setFocusSection] = useState(null);
  const [blogMode, setBlogMode] = useState(false);
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
    if (pageId === "blog") {
      setBlogMode(true);
      if (activePage !== "beranda") setActivePage("beranda");
    } else {
      setBlogMode(false);
      if (pageId !== activePage) setActivePage(pageId);
    }
  };

  const displayPage = blogMode ? "blog" : activePage;
  const Editor = activePage === "dashboard" ? null : editors[blogMode ? "beranda" : activePage];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={dismissToast} />}
      {confirm && <ConfirmModal {...confirm} />}

      {sidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-white/[0.04] flex flex-col shrink-0 transition-all duration-300 ease-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } lg:rounded-none rounded-r-2xl shadow-2xl shadow-black/50`}>
        <div className="relative p-5 border-b border-white/[0.04]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/15 shrink-0">
                <Svg d={icons.shield} className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Beresin</h1>
                <p className="text-[11px] text-gray-500 mt-0.5">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all -mr-1">
              <Svg d={icons.x} className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {pages.map((p) => {
            const isActive = blogMode ? p.id === "blog" : activePage === p.id;
            return (
              <button key={p.id} onClick={() => handleNavigate(p.id)}
                className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "text-indigo-200 bg-gradient-to-r from-indigo-600/15 to-purple-600/8 border border-indigo-500/10 shadow-sm"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                }`}>
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500" />}
                <Svg d={icons[p.id]} className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-indigo-400" : "text-gray-500"}`} />
                <span className="font-medium text-[13px]">{p.label}</span>
                {dirty && isActive && p.id !== "dashboard" && <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/20" />}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/[0.04]">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-all">
            <Svg d={icons.logout} className="w-4 h-4" />
            <span className="text-[13px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="sticky top-0 z-30 lg:hidden bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.04] px-4 py-2.5 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] -ml-1.5 transition-all active:scale-90">
            <Svg d={icons.menu} className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Svg d={icons.shield} className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin</span>
            </div>
            {dirty && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/20" />}
          </div>
        </div>

        <div className="flex-1 px-4 py-6 md:px-6 md:py-6 lg:px-8 lg:py-8 max-w-4xl mx-auto w-full">
          {activePage === "dashboard" ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
              </div>
              <DashboardOverview onNavigate={handleNavigate} />
            </>
          ) : (
            <>
              {/* Page Header */}
              <div className="relative mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/10 flex items-center justify-center">
                      <Svg d={icons[displayPage]} className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{pages.find(p => p.id === displayPage)?.label}</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Kelola konten halaman ini</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {dirty && (
                      <span className="flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-400/8 px-3 py-1.5 rounded-full border border-amber-400/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Belum disimpan
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6">
                    <div className="flex gap-2 mb-6"><div className="h-9 w-24 bg-white/5 rounded-xl" /><div className="h-9 w-24 bg-white/5 rounded-xl" /></div>
                    <div className="space-y-4"><div className="h-12 bg-white/5 rounded-xl" /><div className="h-24 bg-white/5 rounded-xl" /><div className="h-12 bg-white/5 rounded-xl" /></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white/[0.015] border border-white/[0.05] rounded-2xl p-5 md:p-6 lg:p-7">
                    {Editor && <Editor data={data} setData={(d) => { setData(d); setDirty(true); }} blogMode={blogMode} />}
                  </div>

                  {/* Save Bar */}
                  <div className="sticky bottom-4 z-20 mt-6 -mx-1 px-1">
                    <div className="bg-gray-900/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-2xl shadow-black/40">
                      <button onClick={saveContent} disabled={saving || !dirty}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.97] shadow-lg shadow-indigo-500/15">
                        {saving
                          ? <span className="flex items-center gap-2"><Svg d={icons.spinner} className="w-4 h-4 animate-spin" />Menyimpan...</span>
                          : <span className="flex items-center gap-2"><Svg d={icons.save} className="w-4 h-4" />Simpan</span>}
                      </button>
                      <button onClick={() => setConfirm({
                        type: "reset", title: "Reset Perubahan?", message: "Semua perubahan yang belum disimpan akan hilang.", confirmLabel: "Reset", danger: true,
                        onConfirm: () => { loadContent(activePage); setConfirm(null); }, onCancel: () => setConfirm(null),
                      })} disabled={!dirty}
                        className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 rounded-xl text-sm border border-white/[0.06] transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.97]">
                        Reset
                      </button>
                      <span className="ml-auto text-xs text-gray-600 bg-white/5 px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px] font-mono">Ctrl</kbd>
                        <span className="text-gray-600">+</span>
                        <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px] font-mono">S</kbd>
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out forwards; }
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