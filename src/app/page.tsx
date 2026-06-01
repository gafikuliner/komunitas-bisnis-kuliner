import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const manfaat = [
  {
    icon: "🤝",
    title: "Networking Kuliner",
    desc: "Terhubung dengan ratusan pemilik usaha makanan dan minuman di seluruh Indonesia.",
  },
  {
    icon: "📚",
    title: "Belajar Bisnis",
    desc: "Akses artikel, tips pemasaran, dan strategi pengembangan usaha kuliner.",
  },
  {
    icon: "📈",
    title: "Tingkatkan Penjualan",
    desc: "Dapatkan wawasan praktis untuk branding, operasional, dan penjualan.",
  },
  {
    icon: "🌿",
    title: "Komunitas Supportif",
    desc: "Berbagi pengalaman dan kolaborasi dengan sesama pelaku bisnis F&B.",
  },
];

const keuntungan = [
  "Terdaftar di direktori anggota komunitas",
  "Profil usaha Anda terlihat oleh anggota lain",
  "Akses informasi bisnis kuliner terkini",
  "Kesempatan kolaborasi bisnis antar anggota",
  "Asisten AI bisnis kuliner (segera hadir)",
];

const fitur = [
  {
    title: "Profil & Edit Usaha",
    desc: "Kelola dan perbarui data usaha Anda — nama, kota, kategori, dan kontak.",
    badge: "Tersedia",
  },
  {
    title: "Direktori Anggota",
    desc: "Jelajahi anggota komunitas dari berbagai kota dan kategori usaha.",
    badge: "Tersedia",
  },
  {
    title: "Pencarian Anggota",
    desc: "Cari mitra bisnis berdasarkan nama usaha, kota, dan kategori.",
    badge: "Tersedia",
  },
  {
    title: "Informasi Bisnis",
    desc: "Artikel tips pemasaran, penjualan, dan strategi kuliner.",
    badge: "Tahap 2",
  },
  {
    title: "Chat AI Asisten",
    desc: "Konsultasi bisnis kuliner dengan asisten AI cerdas.",
    badge: "Menunggu persetujuan",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-gold-50">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-leaf-200/40 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-gold-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-gold-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-700">
                Komunitas #1 Bisnis Kuliner Indonesia
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-leaf-900 sm:text-5xl lg:text-6xl">
                Tumbuh Bersama di{" "}
                <span className="text-gold-600">Komunitas Bisnis Kuliner</span>{" "}
                Indonesia
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-wood-700 sm:text-xl">
                Wadah digital untuk pemilik warung, cafe, restoran, bakery,
                catering, dan seluruh pelaku bisnis makanan & minuman — belajar,
                berkembang, berkolaborasi, dan meningkatkan penjualan.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/daftar" className="btn-secondary text-center">
                  Gabung Komunitas
                </Link>
                <Link href="/#manfaat" className="btn-outline text-center">
                  Pelajari Manfaatnya
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Manfaat */}
        <section id="manfaat" className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-leaf-900 sm:text-4xl">
                Manfaat Bergabung
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-wood-700">
                Komunitas ini dirancang khusus untuk membantu pelaku bisnis
                kuliner Indonesia berkembang lebih cepat.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {manfaat.map((item) => (
                <div key={item.title} className="card text-center">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-4 font-semibold text-leaf-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Keuntungan */}
        <section className="bg-leaf-900 py-16 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold text-gold-300 sm:text-4xl">
                  Keuntungan Menjadi Anggota
                </h2>
                <p className="mt-4 text-leaf-100">
                  Daftar gratis dan mulai manfaatkan ekosistem komunitas bisnis
                  kuliner terbesar untuk UMKM F&B di Indonesia.
                </p>
              </div>
              <ul className="space-y-4">
                {keuntungan.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-leaf-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 text-center">
              <Link href="/daftar" className="btn-secondary">
                Gabung Komunitas Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section id="fitur" className="bg-gradient-to-b from-white to-leaf-50 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-leaf-900 sm:text-4xl">
                Fitur Aplikasi
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-wood-700">
                Platform lengkap untuk mengelola profil, networking, dan
                pengembangan bisnis kuliner Anda.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fitur.map((item) => (
                <div
                  key={item.title}
                  className="card border-leaf-100 transition hover:shadow-md"
                >
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      item.badge === "Tersedia"
                        ? "bg-leaf-100 text-leaf-700"
                        : item.badge === "Menunggu persetujuan"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-gold-100 text-gold-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <h3 className="mt-3 font-semibold text-leaf-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-500 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Siap Bergabung?
            </h2>
            <p className="mt-4 text-lg text-gold-50">
              Daftarkan usaha kuliner Anda hari ini dan jadilah bagian dari
              komunitas yang saling mendukung.
            </p>
            <Link
              href="/daftar"
              className="mt-8 inline-flex rounded-xl bg-white px-8 py-3 font-semibold text-gold-700 shadow-lg transition hover:bg-leaf-50"
            >
              Gabung Komunitas
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
