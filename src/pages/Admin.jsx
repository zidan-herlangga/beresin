import { useState, useEffect } from "react";

const API = "/api";

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok) {
        localStorage.setItem("beresin-admin-token", json.token);
        onLogin(json.token);
      } else {
        setErr(json.error || "Login gagal");
      }
    } catch {
      setErr("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Beresin</h1>
          <p className="text-sm text-gray-500 mt-1">Masukkan password admin</p>
        </div>
        {err && <p className="text-red-400 text-sm mb-4 text-center">{err}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}

const tabs = [
  { id: "beranda", label: "Beranda" },
  { id: "layanan", label: "Layanan" },
  { id: "cara-order", label: "Cara Order" },
  { id: "tentang", label: "Tentang" },
  { id: "kontak", label: "Kontak" },
];

function Field({ label, value, onChange, type, rows, placeholder }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  }
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input
        id={id}
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function ArrayEditor({ label, items, onUpdate, fields, itemLabel }) {
  const addItem = () => {
    const empty = {};
    fields.forEach((f) => { empty[f.key] = ""; });
    onUpdate([...items, empty]);
  };
  const removeItem = (idx) => {
    if (items.length <= 1) return;
    onUpdate(items.filter((_, i) => i !== idx));
  };
  const updateItem = (idx, key, val) => {
    const copy = [...items];
    copy[idx] = { ...copy[idx], [key]: val };
    onUpdate(copy);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-200">{label}</h3>
        <button onClick={addItem} className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition">+ Tambah {itemLabel || "Item"}</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-3 border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-mono">#{idx + 1}</span>
            <button onClick={() => removeItem(idx)} className="text-xs text-red-400 hover:text-red-300 transition">Hapus</button>
          </div>
          {fields.map((f) => (
            <div key={f.key} className="mb-2">
              <label className="block text-[11px] text-gray-400 mb-0.5">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={item[f.key] || ""}
                  onChange={(e) => updateItem(idx, f.key, e.target.value)}
                  rows={f.rows || 2}
                  placeholder={f.placeholder}
                  className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={item[f.key] || ""}
                  onChange={(e) => updateItem(idx, f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function NestedArrayEditor({ label, items, onUpdate, config }) {
  const addItem = () => {
    const empty = { title: "", tag: "", items: [] };
    if (config.subItems) empty[config.subItems] = [];
    if (config.services) empty.services = [];
    onUpdate([...items, empty]);
  };
  const removeItem = (idx) => {
    if (items.length <= 1) return;
    onUpdate(items.filter((_, i) => i !== idx));
  };
  const updateItem = (idx, key, val) => {
    const copy = [...items];
    copy[idx] = { ...copy[idx], [key]: val };
    onUpdate(copy);
  };
  const addSubItem = (idx, subKey) => {
    const copy = [...items];
    if (!copy[idx][subKey]) copy[idx][subKey] = [];
    copy[idx][subKey].push("");
    onUpdate(copy);
  };
  const removeSubItem = (idx, subKey, sidx) => {
    const copy = [...items];
    copy[idx][subKey] = copy[idx][subKey].filter((_, i) => i !== sidx);
    onUpdate(copy);
  };
  const updateSubItem = (idx, subKey, sidx, val) => {
    const copy = [...items];
    copy[idx][subKey][sidx] = val;
    onUpdate(copy);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-200">{label}</h3>
        <button onClick={addItem} className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition">+ Tambah</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-3 border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-mono">#{idx + 1}</span>
            <button onClick={() => removeItem(idx)} className="text-xs text-red-400 hover:text-red-300">Hapus</button>
          </div>
          <input
            value={item.title || ""}
            onChange={(e) => updateItem(idx, "title", e.target.value)}
            placeholder="Judul"
            className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-xs mb-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            value={item.tag || ""}
            onChange={(e) => updateItem(idx, "tag", e.target.value)}
            placeholder="Tag"
            className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {config.subItems && (
            <>
              <div className="flex items-center justify-between mt-2 mb-1">
                <span className="text-[11px] text-gray-400">{config.subLabel || "Items"}</span>
                <button onClick={() => addSubItem(idx, config.subItems)} className="text-[10px] text-indigo-400 hover:text-indigo-300">+ Tambah</button>
              </div>
              {(item[config.subItems] || []).map((si, siIdx) => (
                <div key={siIdx} className="flex gap-1 mb-1">
                  <input
                    value={si}
                    onChange={(e) => updateSubItem(idx, config.subItems, siIdx, e.target.value)}
                    placeholder={config.subPlaceholder || "Item"}
                    className="flex-1 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button onClick={() => removeSubItem(idx, config.subItems, siIdx)} className="text-red-400 text-[11px] px-1">x</button>
                </div>
              ))}
            </>
          )}
          {config.services && (
            <>
              <div className="flex items-center justify-between mt-2 mb-1">
                <span className="text-[11px] text-gray-400">{config.subLabel || "Services"}</span>
                <button onClick={() => addSubItem(idx, "services")} className="text-[10px] text-indigo-400 hover:text-indigo-300">+ Tambah</button>
              </div>
              {(item.services || []).map((sv, svIdx) => (
                <div key={svIdx} className="flex gap-1 mb-1">
                  <input
                    value={sv}
                    onChange={(e) => updateSubItem(idx, "services", svIdx, e.target.value)}
                    placeholder="Nama layanan"
                    className="flex-1 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button onClick={() => removeSubItem(idx, "services", svIdx)} className="text-red-400 text-[11px] px-1">x</button>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function BerandaEditor({ data, setData }) {
  const setHero = (key, val) => setData({ ...data, hero: { ...data.hero, [key]: val } });
  const setStats = (stats) => setData({ ...data, hero: { ...data.hero, stats } });

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Edit Beranda</h2>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Hero Section</h3>
        <Field label="Judul" value={data.hero?.title || ""} onChange={(v) => setHero("title", v)} />
        <Field label="Subtitle" value={data.hero?.subtitle || ""} onChange={(v) => setHero("subtitle", v)} type="textarea" rows={2} />
        <ArrayEditor
          label="Statistik"
          items={data.hero?.stats || []}
          onUpdate={setStats}
          itemLabel="Stat"
          fields={[
            { key: "value", label: "Nilai", type: "number" },
            { key: "suffix", label: "Suffix (+, %, dll)", placeholder: "+" },
            { key: "label", label: "Label" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <NestedArrayEditor
          label="Layanan Cards"
          items={data.layanan || []}
          onUpdate={(v) => setData({ ...data, layanan: v })}
          config={{ subItems: "items", subLabel: "Daftar Layanan", subPlaceholder: "Nama layanan" }}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Harga</h3>
        <ArrayEditor
          label="Paket Harga"
          items={data.harga || []}
          onUpdate={(v) => setData({ ...data, harga: v })}
          itemLabel="Paket"
          fields={[
            { key: "name", label: "Nama Paket" },
            { key: "price", label: "Harga (25rb / 250rb / 500rb)" },
            { key: "period", label: "Period (/tugas)" },
            { key: "desc", label: "Deskripsi singkat" },
            { key: "features", label: "Fitur (pisahkan koma)", placeholder: "Fitur1, Fitur2, Fitur3" },
            { key: "popular", label: "Popular? (true/false)", placeholder: "false" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Cara Order"
          items={data.caraOrder || []}
          onUpdate={(v) => setData({ ...data, caraOrder: v })}
          itemLabel="Langkah"
          fields={[
            { key: "number", label: "Nomor (01, 02, dst)" },
            { key: "title", label: "Judul" },
            { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Tim Ahli"
          items={data.tim || []}
          onUpdate={(v) => setData({ ...data, tim: v })}
          itemLabel="Anggota"
          fields={[
            { key: "name", label: "Nama" },
            { key: "role", label: "Role" },
            { key: "initials", label: "Inisial (ZH)" },
            { key: "gradient", label: "Gradient (from-X to-Y)" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Portofolio</h3>
        <ArrayEditor
          label="Portofolio Items"
          items={data.portofolio || []}
          onUpdate={(v) => setData({ ...data, portofolio: v })}
          itemLabel="Item"
          fields={[
            { key: "title", label: "Judul" },
            { key: "category", label: "Kategori" },
            { key: "desc", label: "Deskripsi" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Garansi"
          items={data.garansi || []}
          onUpdate={(v) => setData({ ...data, garansi: v })}
          itemLabel="Garansi"
          fields={[
            { key: "title", label: "Judul" },
            { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Testimoni"
          items={data.testimoni || []}
          onUpdate={(v) => setData({ ...data, testimoni: v })}
          itemLabel="Testimoni"
          fields={[
            { key: "name", label: "Nama" },
            { key: "role", label: "Role/Asal" },
            { key: "text", label: "Testimoni Text", type: "textarea", rows: 2 },
            { key: "initials", label: "Inisial" },
            { key: "gradient", label: "Gradient" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="FAQ"
          items={data.faq || []}
          onUpdate={(v) => setData({ ...data, faq: v })}
          itemLabel="FAQ"
          fields={[
            { key: "q", label: "Pertanyaan" },
            { key: "a", label: "Jawaban", type: "textarea", rows: 2 },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Blog</h3>
        <ArrayEditor
          label="Artikel"
          items={data.blog || []}
          onUpdate={(v) => setData({ ...data, blog: v })}
          itemLabel="Artikel"
          fields={[
            { key: "title", label: "Judul" },
            { key: "tag", label: "Tag" },
            { key: "date", label: "Tanggal" },
            { key: "excerpt", label: "Kutipan", type: "textarea", rows: 2 },
          ]}
        />
      </div>
    </div>
  );
}

function LayananEditor({ data, setData }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Edit Layanan</h2>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <NestedArrayEditor
          label="Kategori Layanan"
          items={data.categories || []}
          onUpdate={(v) => setData({ ...data, categories: v })}
          config={{ services: true, subLabel: "Daftar Layanan", subPlaceholder: "Nama layanan" }}
        />
      </div>
    </div>
  );
}

function CaraOrderEditor({ data, setData }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Edit Cara Order</h2>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Langkah-langkah"
          items={data.steps || []}
          onUpdate={(v) => setData({ ...data, steps: v })}
          itemLabel="Langkah"
          fields={[
            { key: "number", label: "Nomor (01, 02, dst)" },
            { key: "title", label: "Judul" },
            { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 },
            { key: "icon", label: "Icon (chat / check / gear / done)" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">FAQ Cara Order</h3>
        <ArrayEditor
          label="FAQ"
          items={data.faq || []}
          onUpdate={(v) => setData({ ...data, faq: v })}
          itemLabel="FAQ"
          fields={[
            { key: "q", label: "Pertanyaan" },
            { key: "a", label: "Jawaban", type: "textarea", rows: 2 },
          ]}
        />
      </div>
    </div>
  );
}

function TentangEditor({ data, setData }) {
  const set = (key, val) => setData({ ...data, [key]: val });
  const setStory = (idx, val) => {
    const copy = [...(data.story || [])];
    copy[idx] = val;
    setData({ ...data, story: copy });
  };
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Edit Tentang</h2>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <Field label="Hero Title" value={data.heroTitle || ""} onChange={(v) => set("heroTitle", v)} />
        <Field label="Hero Subtitle" value={data.heroSubtitle || ""} onChange={(v) => set("heroSubtitle", v)} type="textarea" rows={2} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Cerita (paragraf)</label>
          {(data.story || [""]).map((p, i) => (
            <div key={i} className="flex gap-1 mb-1.5">
              <textarea
                value={p}
                onChange={(e) => setStory(i, e.target.value)}
                rows={2}
                className="flex-1 px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {i > 0 && <button onClick={() => { const c = [...data.story]; c.splice(i, 1); setData({ ...data, story: c }); }} className="text-red-400 text-xs px-1">x</button>}
            </div>
          ))}
          <button onClick={() => setData({ ...data, story: [...(data.story || []), ""] })} className="text-xs text-indigo-400 hover:text-indigo-300">+ Tambah paragraf</button>
        </div>
        <ArrayEditor
          label="Statistik"
          items={data.stats || []}
          onUpdate={(v) => set("stats", v)}
          itemLabel="Stat"
          fields={[
            { key: "value", label: "Nilai", type: "number" },
            { key: "suffix", label: "Suffix" },
            { key: "label", label: "Label" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Tim"
          items={data.tim || []}
          onUpdate={(v) => set("tim", v)}
          itemLabel="Anggota"
          fields={[
            { key: "name", label: "Nama" },
            { key: "role", label: "Role" },
            { key: "initials", label: "Inisial" },
            { key: "gradient", label: "Gradient" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Values"
          items={data.values || []}
          onUpdate={(v) => set("values", v)}
          itemLabel="Value"
          fields={[
            { key: "title", label: "Judul" },
            { key: "desc", label: "Deskripsi", type: "textarea", rows: 2 },
          ]}
        />
      </div>
    </div>
  );
}

function KontakEditor({ data, setData }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Edit Kontak</h2>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Kontak"
          items={data.contacts || []}
          onUpdate={(v) => setData({ ...data, contacts: v })}
          itemLabel="Kontak"
          fields={[
            { key: "label", label: "Label (WhatsApp, Email, dll)" },
            { key: "value", label: "Nilai (nomor WA, email, username)" },
            { key: "href", label: "Link" },
            { key: "icon", label: "Icon (wa, email, ig)" },
          ]}
        />
      </div>
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/50">
        <ArrayEditor
          label="Social Media"
          items={data.socials || []}
          onUpdate={(v) => setData({ ...data, socials: v })}
          itemLabel="Social"
          fields={[
            { key: "name", label: "Nama Platform" },
            { key: "url", label: "URL" },
          ]}
        />
      </div>
    </div>
  );
}

const editors = {
  beranda: BerandaEditor,
  layanan: LayananEditor,
  "cara-order": CaraOrderEditor,
  tentang: TentangEditor,
  kontak: KontakEditor,
};

function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState("beranda");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadContent(activeTab);
  }, [activeTab]);

  const loadContent = async (page) => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API}/content/${page}?page=${page}`);
      const json = await res.json();
      setData(json.data || {});
    } catch {
      setMsg("Gagal load data");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`${API}/content/${activeTab}?page=${activeTab}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (res.ok) {
        setMsg("Data berhasil disimpan!");
      } else {
        setMsg(json.error || "Gagal menyimpan");
      }
    } catch {
      setMsg("Gagal terhubung ke server");
    } finally {
      setSaving(false);
    }
  };

  const Editor = editors[activeTab];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Beresin Admin</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                activeTab === t.id
                  ? "bg-indigo-600/20 text-indigo-300 font-medium"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full px-3 py-2 text-xs text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6">
          {msg && (
            <div className={`text-sm text-center py-2 px-4 rounded-lg mb-4 ${
              msg.includes("berhasil") ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
            }`}>
              {msg}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-gray-400 text-sm">Loading...</span>
            </div>
          ) : (
            <>
              {Editor && <Editor data={data} setData={setData} />}
              <div className="sticky bottom-0 bg-gray-950 py-4 border-t border-gray-800 mt-8 flex gap-3">
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={() => loadContent(activeTab)}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("beresin-admin-token"));
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${API}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((j) => setVerified(j.valid))
        .catch(() => setVerified(false));
    }
  }, [token]);

  if (!token || !verified) {
    return <AdminLogin onLogin={(t) => { setToken(t); setVerified(true); }} />;
  }

  return <AdminDashboard token={token} onLogout={() => { localStorage.removeItem("beresin-admin-token"); setToken(null); setVerified(false); }} />;
}
