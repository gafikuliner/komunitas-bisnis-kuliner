"use client";

import { useCallback, useEffect, useState } from "react";
import { cariAnggota, getDaftarKota } from "@/lib/anggota";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { Anggota, KategoriUsaha } from "@/types";
import AnggotaCard from "@/components/direktori/AnggotaCard";
import PencarianAnggota, {
  type PencarianFilters,
} from "@/components/direktori/PencarianAnggota";

const emptyFilters: PencarianFilters = {
  nama_usaha: "",
  kota: "",
  kategori_usaha: "",
};

export default function DirektoriContent() {
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [daftarKota, setDaftarKota] = useState<string[]>([]);
  const [filters, setFilters] = useState<PencarianFilters>(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnggota = useCallback(async (currentFilters: PencarianFilters) => {
    if (!isSupabaseConfigured()) {
      setError(
        "Supabase belum dikonfigurasi. Periksa file .env.local Anda."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { anggota: data, error: err } = await cariAnggota({
      nama_usaha: currentFilters.nama_usaha || undefined,
      kota: currentFilters.kota || undefined,
      kategori_usaha: (currentFilters.kategori_usaha ||
        undefined) as KategoriUsaha | undefined,
    });

    if (err) {
      setError(err);
      setAnggota([]);
    } else {
      setAnggota(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getDaftarKota().then(({ kota }) => setDaftarKota(kota));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAnggota(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, loadAnggota]);

  return (
    <div className="space-y-8">
      <PencarianAnggota
        filters={filters}
        daftarKota={daftarKota}
        onChange={setFilters}
        onReset={() => setFilters(emptyFilters)}
        totalHasil={anggota.length}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-wood-600">Memuat direktori anggota...</p>
        </div>
      ) : anggota.length === 0 ? (
        <div className="card text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-3 font-medium text-wood-800">
            Tidak ada anggota ditemukan
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Coba ubah kata kunci pencarian atau reset filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {anggota.map((item) => (
            <AnggotaCard key={item.id} anggota={item} />
          ))}
        </div>
      )}
    </div>
  );
}
