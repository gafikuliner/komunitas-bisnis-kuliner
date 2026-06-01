"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAnggota } from "@/lib/anggota";
import { setAnggotaSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";
import { KATEGORI_USAHA, type Anggota, type KategoriUsaha } from "@/types";
import SuccessNotification from "@/components/ui/SuccessNotification";

interface FormEditProfilProps {
  anggota: Anggota;
  onUpdated?: (anggota: Anggota) => void;
}

export default function FormEditProfil({
  anggota,
  onUpdated,
}: FormEditProfilProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    nama_pemilik: anggota.nama_pemilik,
    whatsapp: anggota.whatsapp,
    nama_usaha: anggota.nama_usaha,
    kota: anggota.kota,
    kategori_usaha: anggota.kategori_usaha as KategoriUsaha,
    email: anggota.email ?? "",
    instagram: anggota.instagram ?? "",
    alamat: anggota.alamat ?? "",
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
      setError("Supabase belum dikonfigurasi. Periksa file .env.local Anda.");
      return;
    }

    setLoading(true);

    const { anggota: updated, error: dbError } = await updateAnggota(
      anggota.id,
      {
        nama_pemilik: form.nama_pemilik,
        whatsapp: form.whatsapp,
        nama_usaha: form.nama_usaha,
        kota: form.kota,
        kategori_usaha: form.kategori_usaha,
        email: form.email || undefined,
        instagram: form.instagram || undefined,
        alamat: form.alamat || undefined,
      }
    );

    setLoading(false);

    if (dbError || !updated) {
      setError(
        dbError?.includes("policy") || dbError?.includes("permission")
          ? `${dbError} — Jalankan file supabase/migrations/002_update_anggota_policy.sql di Supabase SQL Editor.`
          : dbError ?? "Gagal menyimpan perubahan."
      );
      return;
    }

    setSuccess(true);
    setAnggotaSession(updated.id, updated.nama_pemilik);
    onUpdated?.(updated);

    setTimeout(() => {
      router.push(`/dashboard?id=${updated.id}`);
    }, 1500);
  }

  return (
    <div>
      {success && (
        <div className="mb-6">
          <SuccessNotification
            title="Profil Berhasil Diperbarui!"
            message="Perubahan disimpan. Mengalihkan ke dashboard..."
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
            Data Usaha
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
          <h2 className="mb-4 font-display text-lg font-semibold text-leaf-800">
            Kontak & Alamat (Opsional)
          </h2>
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
                value={form.alamat}
                onChange={handleChange}
                disabled={loading || success}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || success}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="btn-outline"
            disabled={loading || success}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
