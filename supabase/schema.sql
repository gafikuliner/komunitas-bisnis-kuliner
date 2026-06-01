-- ============================================================
-- Komunitas Bisnis Kuliner Indonesia - Database Schema
-- Jalankan di Supabase: SQL Editor > New query > Run
-- ============================================================

-- Tabel anggota komunitas
CREATE TABLE IF NOT EXISTS anggota (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_pemilik TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  nama_usaha TEXT NOT NULL,
  kota TEXT NOT NULL,
  kategori_usaha TEXT NOT NULL,
  email TEXT,
  instagram TEXT,
  alamat TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT anggota_kategori_check CHECK (
    kategori_usaha IN (
      'Warung Makan',
      'Cafe',
      'Restoran',
      'Bakery',
      'Catering',
      'Minuman',
      'Frozen Food',
      'Lainnya'
    )
  )
);

-- Tabel artikel (untuk tahap berikutnya)
CREATE TABLE IF NOT EXISTS artikel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  gambar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index untuk pencarian anggota (tahap berikutnya)
CREATE INDEX IF NOT EXISTS idx_anggota_nama_usaha ON anggota (nama_usaha);
CREATE INDEX IF NOT EXISTS idx_anggota_kota ON anggota (kota);
CREATE INDEX IF NOT EXISTS idx_anggota_kategori ON anggota (kategori_usaha);

-- Row Level Security
ALTER TABLE anggota ENABLE ROW LEVEL SECURITY;
ALTER TABLE artikel ENABLE ROW LEVEL SECURITY;

-- Hak akses: tanpa DELETE untuk pengguna aplikasi
REVOKE ALL ON anggota FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON anggota TO anon, authenticated;

-- Kebijakan RLS (detail lengkap: supabase/rls_anggota.sql)
CREATE POLICY "anggota_select_public"
  ON anggota FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anggota_insert_daftar"
  ON anggota FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(nama_pemilik)) >= 2
    AND char_length(trim(whatsapp)) >= 10
    AND char_length(trim(nama_usaha)) >= 2
    AND char_length(trim(kota)) >= 2
    AND kategori_usaha IN (
      'Warung Makan', 'Cafe', 'Restoran', 'Bakery',
      'Catering', 'Minuman', 'Frozen Food', 'Lainnya'
    )
  );

CREATE POLICY "anggota_update_profil"
  ON anggota FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (
    char_length(trim(nama_pemilik)) >= 2
    AND char_length(trim(whatsapp)) >= 10
    AND char_length(trim(nama_usaha)) >= 2
    AND char_length(trim(kota)) >= 2
    AND kategori_usaha IN (
      'Warung Makan', 'Cafe', 'Restoran', 'Bakery',
      'Catering', 'Minuman', 'Frozen Food', 'Lainnya'
    )
  );

-- Kebijakan: artikel bisa dibaca publik
CREATE POLICY "Siapa pun bisa membaca artikel"
  ON artikel FOR SELECT
  TO anon, authenticated
  USING (true);

-- Catatan admin (tahap berikutnya):
-- Untuk edit/hapus anggota dan CRUD artikel oleh admin,
-- tambahkan kebijakan terpisah dengan role admin atau service role key.
