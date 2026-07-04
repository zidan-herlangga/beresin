import { useState, useRef } from "react";

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setError("Tipe file tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau SVG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem("beresin-admin-token");
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        onChange(json.url);
      } else {
        setError(json.error || "Gagal upload");
      }
    } catch {
      setError("Gagal terhubung ke server");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mb-4">
      <label className="block text-[11px] text-gray-500 mb-1 font-semibold uppercase tracking-wider">{label || "Gambar"}</label>

      {value && (
        <div className="relative mb-2 rounded-lg overflow-hidden border border-white/[0.06] group">
          <img src={value} alt="Preview" className="w-full h-36 object-cover" onError={(e) => { e.target.style.display = "none" }} />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium rounded-xl border border-indigo-500/20 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Mengupload...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
              Upload Gambar
            </>
          )}
        </button>
        {value && (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-indigo-400 truncate max-w-[200px]">
            {value.split("/").pop()}
          </a>
        )}
      </div>

      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" onChange={handleFile} className="hidden" />
    </div>
  );
}
