"use client";

import { KATEGORI_USAHA } from "@/types";

export interface PencarianFilters {
  nama_usaha: string;
  kota: string;
  kategori_usaha: string;
}

interface PencarianAnggotaProps {
  filters: PencarianFilters;
  daftarKota: string[];
  onChange: (filters: PencarianFilters) => void;
  onReset: () => void;
  totalHasil: number;
}

export default function PencarianAnggota({
  filters,
  daftarKota,
  onChange,
  onReset,
  totalHasil,
}: PencarianAnggotaProps) {
  function updateField(
    field: keyof PencarianFilters,
    value: string
  ) {
    onChange({ ...filters, [field]: value });
  }

  const hasFilter =
    filters.nama_usaha || filters.kota || filters.kategori_usaha;

  return (
    <div className="card border-leaf-100 bg-gradient-to-br from-white to-leaf-50/50">
      <h2 className="font-semibold text-leaf-800">Pencarian Anggota</h2>
      <p className="mt-1 text-sm text-gray-600">
        Cari berdasarkan nama usaha, filter kota, atau kategori usaha.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="cari-nama" className="label-field">
            Nama Usaha
          </label>
          <input
            id="cari-nama"
            type="search"
            className="input-field"
            placeholder="Ketik nama usaha..."
            value={filters.nama_usaha}
            onChange={(e) => updateField("nama_usaha", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="filter-kota" className="label-field">
            Kota
          </label>
          <select
            id="filter-kota"
            className="input-field"
            value={filters.kota}
            onChange={(e) => updateField("kota", e.target.value)}
          >
            <option value="">Semua kota</option>
            {daftarKota.map((kota) => (
              <option key={kota} value={kota}>
                {kota}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-kategori" className="label-field">
            Kategori Usaha
          </label>
          <select
            id="filter-kategori"
            className="input-field"
            value={filters.kategori_usaha}
            onChange={(e) => updateField("kategori_usaha", e.target.value)}
          >
            <option value="">Semua kategori</option>
            {KATEGORI_USAHA.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-wood-600">
          Menampilkan <strong>{totalHasil}</strong> anggota
          {hasFilter ? " (hasil filter)" : ""}
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-leaf-600 hover:text-leaf-800"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
}
