"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { daftarAnggota } from "@/lib/anggota";
import { setAnggotaSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";
import { KATEGORI_USAHA, type KategoriUsaha } from "@/types";
import SuccessNotification from "@/components/ui/SuccessNotification";

export default function FormPendaftaran() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    nama_pemilik: "",
    whatsapp: "",
    nama_usaha: "",
    kota: "",
    kategori_usaha: "" as KategoriUsaha | "",
    email: "",
    instagram: "",
    alamat: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Supabase belum dikonfigurasi. Salin .env.local.example ke .env.local dan isi kredensial Supabase Anda."
      );
      return;
    }

    if (!form.kategori_usaha) {
      setError("Silakan pilih kategori usaha.");
      return;
    }

    setLoading(true);

    const { anggota, error: dbError } = await daftarAnggota({
      nama_pemilik: form.nama_pemilik,
      whatsapp: form.whatsapp,
      nama_usaha: form.nama_usaha,
      kota: form.kota,
      kategori_usaha: form.kategori_usaha as KategoriUsaha,
      email: form.email || undefined,
      instagram: form.instagram || undefined,
      alamat: form.alamat || undefined,
    });

    setLoading(false);

    if (dbError || !anggota) {
      setError(dbError ?? "Pendaftaran gagal. Silakan coba lagi.");
      return;
    }

    setSuccess(true);

    setAnggotaSession(anggota.id, anggota.nama_pemilik);

    setTimeout(() => {
      router.push(`/dashboard?id=${anggota.id}`);
    }, 2000);
  }

  return (
    <div>
      {success && (
        <div className="mb-6">
          <SuccessNotification
            title="Pendaftaran Berhasil!"
            message="Data Anda telah disimpan. Anda akan diarahkan ke Dashboard Anggota..."
          />
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-leaf-800">
            Data Wajib
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="nama_pemilik" className="label-field">
                Nama Pemilik <span className="text-red-500">*</span>
              </label>
              <input
                id="nama_pemilik"
                name="nama_pemilik"
                type="text"
                required
                className="input-field"
                placeholder="Contoh: Budi Santoso"
                value={form.nama_pemilik}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="label-field">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                className="input-field"
                placeholder="08xxxxxxxxxx"
                value={form.whatsapp}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div>
              <label htmlFor="nama_usaha" className="label-field">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <input
                id="nama_usaha"
                name="nama_usaha"
                type="text"
                required
                className="input-field"
                placeholder="Contoh: Warung Nusantara"
                value={form.nama_usaha}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div>
              <label htmlFor="kota" className="label-field">
                Kota <span className="text-red-500">*</span>
              </label>
              <input
                id="kota"
                name="kota"
                type="text"
                required
                className="input-field"
                placeholder="Contoh: Jakarta Selatan"
                value={form.kota}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div>
              <label htmlFor="kategori_usaha" className="label-field">
                Kategori Usaha <span className="text-red-500">*</span>
              </label>
              <select
                id="kategori_usaha"
                name="kategori_usaha"
                required
                className="input-field"
                value={form.kategori_usaha}
                onChange={handleChange}
                disabled={loading || success}
              >
                <option value="">— Pilih kategori —</option>
                {KATEGORI_USAHA.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-1 font-display text-lg font-semibold text-leaf-800">
            Data Opsional
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Boleh dikosongkan jika belum ada.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="label-field">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field"
                placeholder="email@contoh.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div>
              <label htmlFor="instagram" className="label-field">
                Instagram
              </label>
              <input
                id="instagram"
                name="instagram"
                type="text"
                className="input-field"
                placeholder="@namaakun"
                value={form.instagram}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="alamat" className="label-field">
                Alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                rows={3}
                className="input-field resize-none"
                placeholder="Alamat usaha (opsional)"
                value={form.alamat}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="btn-secondary w-full sm:w-auto"
          disabled={loading || success}
        >
          {loading ? "Menyimpan..." : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}
