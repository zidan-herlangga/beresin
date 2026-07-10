import { useState, useCallback, useEffect, useRef } from 'react';
import { icons, pages, API } from './constants';
import Svg from './Svg';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';
import DashboardOverview from './DashboardOverview';
import BerandaEditor from './editors/BerandaEditor';
import LayananEditor from './editors/LayananEditor';
import CaraOrderEditor from './editors/CaraOrderEditor';
import TentangEditor from './editors/TentangEditor';
import KontakEditor from './editors/KontakEditor';

const editors = {
  beranda: BerandaEditor,
  layanan: LayananEditor,
  'cara-order': CaraOrderEditor,
  tentang: TentangEditor,
  kontak: KontakEditor,
};

export default function AdminDashboard({ token, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [blogMode, setBlogMode] = useState(false);

  const dataRef = useRef(data);
  const pageRef = useRef(activePage);

  useEffect(() => { dataRef.current = data; }, [data]);
  useEffect(() => { pageRef.current = activePage; }, [activePage]);

  const showToast = useCallback((msg, type) => setToast({ message: msg, type, key: Date.now() }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const loadContent = useCallback(async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/content?page=${page}`);
      const json = await res.json();
      setData(json.data || {});
      setDirty(false);
    } catch {
      showToast('Gagal load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (activePage !== 'dashboard') loadContent(activePage);
  }, [activePage, loadContent]);

  const saveContent = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/content?page=${pageRef.current}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: dataRef.current }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('Data berhasil disimpan!', 'success');
        setDirty(false);
      } else {
        showToast(json.error || 'Gagal menyimpan', 'error');
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    } finally {
      setSaving(false);
    }
  }, [token, showToast]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (pageRef.current !== 'dashboard') saveContent();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [saveContent]);

  const handleNavigate = (pageId) => {
    setSidebarOpen(false);
    if (pageId === 'blog') {
      setBlogMode(true);
      if (activePage !== 'beranda') setActivePage('beranda');
    } else {
      setBlogMode(false);
      if (pageId !== activePage) setActivePage(pageId);
    }
  };

  const displayPage = blogMode ? 'blog' : activePage;
  const Editor =
    activePage === 'dashboard'
      ? null
      : editors[blogMode ? 'beranda' : activePage];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={dismissToast} />}
      {confirm && <ConfirmModal {...confirm} />}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-white/[0.04] flex flex-col shrink-0 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Svg d={icons.shield} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Beresin
              </h1>
              <p className="text-[11px] text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-white"
          >
            <Svg d={icons.x} className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {pages.map((p) => {
            const isActive = blogMode ? p.id === 'blog' : activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleNavigate(p.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'text-indigo-200 bg-indigo-600/15 border border-indigo-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                }`}
              >
                <Svg d={icons[p.id]} className={`w-4.5 h-4.5 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span className="font-medium text-[13px]">{p.label}</span>
                {dirty && isActive && p.id !== 'dashboard' && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/[0.04]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-all"
          >
            <Svg d={icons.logout} className="w-4 h-4" />
            <span className="text-[13px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="sticky top-0 z-30 lg:hidden bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.04] px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <Svg d={icons.menu} className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>

        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          {activePage === 'dashboard' ? (
            <DashboardOverview onNavigate={handleNavigate} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center">
                    <Svg d={icons[displayPage]} className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {pages.find((p) => p.id === displayPage)?.label}
                    </h2>
                    <p className="text-xs text-gray-500">Kelola konten halaman ini</p>
                  </div>
                </div>
                {dirty && (
                  <span className="flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Belum disimpan
                  </span>
                )}
              </div>

              {loading ? (
                <div className="animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 h-64" />
              ) : (
                <>
                  <div className="bg-white/[0.015] border border-white/[0.05] rounded-2xl p-5 md:p-6">
                    {Editor && (
                      <Editor
                        data={data}
                        setData={(d) => { setData(d); setDirty(true); }}
                        blogMode={blogMode}
                      />
                    )}
                  </div>

                  <div className="sticky bottom-4 z-20 mt-6">
                    <div className="bg-gray-900/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-2xl">
                      <button
                        onClick={saveContent}
                        disabled={saving || !dirty}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-30 active:scale-[0.97]"
                      >
                        {saving ? (
                          <Svg d={icons.spinner} className="w-4 h-4 animate-spin" />
                        ) : (
                          <Svg d={icons.save} className="w-4 h-4" />
                        )}
                        {saving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                      <button
                        onClick={() =>
                          setConfirm({
                            title: 'Reset Perubahan?',
                            message: 'Semua perubahan yang belum disimpan akan hilang.',
                            confirmLabel: 'Reset',
                            danger: true,
                            onConfirm: () => { loadContent(activePage); setConfirm(null); },
                            onCancel: () => setConfirm(null),
                          })
                        }
                        disabled={!dirty}
                        className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 rounded-xl text-sm border border-white/[0.06] transition-all disabled:opacity-30"
                      >
                        Reset
                      </button>
                      <span className="ml-auto text-xs text-gray-600 bg-white/5 px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1">
                        <kbd className="font-mono">Ctrl + S</kbd>
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Scroll to top */}
      <button
        onClick={() => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-30 w-10 h-10 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white shadow-lg backdrop-blur-xl border border-indigo-500/20 flex items-center justify-center transition-all opacity-60 hover:opacity-100"
        title="Ke atas"
      >
        <Svg d={icons.chevronRight} className="w-5 h-5 -rotate-90" />
      </button>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.25s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
