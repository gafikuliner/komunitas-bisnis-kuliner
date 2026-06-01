import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FormPendaftaran from "@/components/daftar/FormPendaftaran";

export const metadata = {
  title: "Daftar Anggota | Komunitas Bisnis Kuliner Indonesia",
  description: "Form pendaftaran anggota komunitas bisnis kuliner Indonesia.",
};

export default function DaftarPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-leaf-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="text-sm text-leaf-600 hover:text-leaf-800"
            >
              ← Kembali ke Beranda
            </Link>
            <h1 className="mt-4 font-display text-3xl font-bold text-leaf-900 sm:text-4xl">
              Gabung Komunitas
            </h1>
            <p className="mt-3 text-wood-700">
              Isi formulir di bawah untuk mendaftar sebagai anggota. Data wajib
              ditandai dengan tanda bintang (*).
            </p>
          </div>

          <div className="card shadow-md">
            <FormPendaftaran />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
