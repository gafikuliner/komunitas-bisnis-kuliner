export const KATEGORI_USAHA = [
  "Warung Makan",
  "Cafe",
  "Restoran",
  "Bakery",
  "Catering",
  "Minuman",
  "Frozen Food",
  "Lainnya",
] as const;

export type KategoriUsaha = (typeof KATEGORI_USAHA)[number];

export interface Anggota {
  id: string;
  nama_pemilik: string;
  whatsapp: string;
  nama_usaha: string;
  kota: string;
  kategori_usaha: KategoriUsaha;
  email: string | null;
  instagram: string | null;
  alamat: string | null;
  created_at: string;
}

export interface AnggotaFormData {
  nama_pemilik: string;
  whatsapp: string;
  nama_usaha: string;
  kota: string;
  kategori_usaha: KategoriUsaha;
  email?: string;
  instagram?: string;
  alamat?: string;
}

export interface Artikel {
  id: string;
  judul: string;
  isi: string;
  gambar: string | null;
  created_at: string;
}
