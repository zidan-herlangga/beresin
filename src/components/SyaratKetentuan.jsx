import { useEffect } from "react";

export default function SyaratKetentuan({ open, setOpen }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Syarat & Ketentuan</h3>
          <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            <strong className="text-gray-900 dark:text-white">1. Layanan</strong>
            <br />
            Beresin menyediakan jasa pengerjaan tugas sekolah dan kuliah. Semua tugas dikerjakan oleh tim ahli sesuai dengan permintaan dan deadline yang disepakati.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">2. Pembayaran</strong>
            <br />
            Pembayaran dilakukan 50% di awal (DP) dan 50% setelah tugas selesai. Pembayaran dapat dilakukan melalui transfer bank (BCA, Mandiri, BRI) atau e-wallet (OVO, GoPay, Dana, ShopeePay).
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">3. Revisi</strong>
            <br />
            Setiap tugas mendapatkan garansi revisi sesuai paket yang dipilih. Revisi tambahan di luar paket akan dikenakan biaya tambahan.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">4. Privasi</strong>
            <br />
            Identitas dan data pribadi kamu akan dijaga kerahasiaannya. Kami tidak akan menyebarkan informasi kamu ke pihak ketiga.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">5. Pembatalan</strong>
            <br />
            Pembatalan pesanan dapat dilakukan sebelum proses pengerjaan dimulai. DP yang sudah dibayarkan tidak dapat dikembalikan jika proses sudah berjalan.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">6. Hak Cipta</strong>
            <br />
            Hasil tugas sepenuhnya menjadi milik kamu setelah pelunasan. Kami tidak akan menggunakan kembali tugas yang sudah dikerjakan.
          </p>
        </div>
      </div>
    </div>
  );
}
