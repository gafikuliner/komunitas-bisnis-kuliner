import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-leaf-100 bg-leaf-900 text-leaf-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-gold-300">
              Komunitas Bisnis Kuliner Indonesia
            </p>
            <p className="mt-3 text-sm leading-relaxed text-leaf-200">
              Wadah digital untuk pelaku bisnis kuliner belajar, berkembang,
              berkolaborasi, dan meningkatkan penjualan.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gold-300">Tautan</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-white">
                  Daftar Anggota
                </Link>
              </li>
              <li>
                <Link href="/direktori" className="hover:text-white">
                  Direktori Anggota
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gold-300">Untuk Siapa?</p>
            <p className="mt-3 text-sm leading-relaxed text-leaf-200">
              UMKM makanan & minuman, cafe, restoran, warung, bakery, catering,
              dan pebisnis F&B di seluruh Indonesia.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-leaf-800 pt-6 text-center text-xs text-leaf-400">
          © {new Date().getFullYear()} Komunitas Bisnis Kuliner Indonesia. Semua
          hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
