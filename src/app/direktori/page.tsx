import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardNav from "@/components/layout/DashboardNav";
import DirektoriContent from "@/components/direktori/DirektoriContent";

export const metadata = {
  title: "Direktori Anggota | Komunitas Bisnis Kuliner Indonesia",
  description:
    "Jelajahi dan cari anggota komunitas bisnis kuliner Indonesia.",
};

export default function DirektoriPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-leaf-50 to-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-leaf-600 hover:text-leaf-800"
            >
              ← Dashboard
            </Link>
            <h1 className="mt-4 font-display text-3xl font-bold text-leaf-900 sm:text-4xl">
              Direktori Anggota
            </h1>
            <p className="mt-2 max-w-2xl text-wood-700">
              Temukan pelaku bisnis kuliner dari berbagai kota dan kategori.
              Gunakan pencarian untuk menemukan mitra kolaborasi.
            </p>
            <div className="mt-6">
              <DashboardNav />
            </div>
          </div>

          <DirektoriContent />
        </div>
      </main>

      <Footer />
    </>
  );
}
