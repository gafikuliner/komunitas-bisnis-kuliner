-- ============================================================
-- RLS Tabel ANGGOTA — Komunitas Bisnis Kuliner Indonesia
-- Jalankan SELURUH script ini di Supabase → SQL Editor → Run
--
-- Cocok untuk aplikasi saat ini (anon key, tanpa login Supabase Auth).
-- Direktori = baca publik | Daftar = INSERT | Edit profil = UPDATE
-- DELETE untuk anon/authenticated TIDAK diizinkan (aman default)
-- ============================================================

-- 1) Aktifkan RLS
ALTER TABLE public.anggota ENABLE ROW LEVEL SECURITY;

-- 2) Hapus kebijakan lama (jika sudah pernah dibuat)
DROP POLICY IF EXISTS "Siapa pun bisa mendaftar anggota" ON public.anggota;
DROP POLICY IF EXISTS "Siapa pun bisa melihat anggota" ON public.anggota;
DROP POLICY IF EXISTS "Anggota dapat memperbarui profil" ON public.anggota;
DROP POLICY IF EXISTS "anggota_select_public" ON public.anggota;
DROP POLICY IF EXISTS "anggota_insert_daftar" ON public.anggota;
DROP POLICY IF EXISTS "anggota_update_profil" ON public.anggota;

-- 3) Hak akses tabel: baca, daftar, edit — tanpa hapus
REVOKE ALL ON public.anggota FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.anggota TO anon, authenticated;

-- Helper: daftar kategori usaha (sama dengan constraint aplikasi)
-- Dipakai di policy INSERT dan UPDATE

-- 4) SELECT — Dashboard & Direktori
CREATE POLICY "anggota_select_public"
  ON public.anggota
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5) INSERT — Form pendaftaran (/daftar)
CREATE POLICY "anggota_insert_daftar"
  ON public.anggota
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(nama_pemilik)) >= 2
    AND char_length(trim(whatsapp)) >= 10
    AND char_length(trim(nama_usaha)) >= 2
    AND char_length(trim(kota)) >= 2
    AND kategori_usaha IN (
      'Warung Makan',
      'Cafe',
      'Restoran',
      'Bakery',
      'Catering',
      'Minuman',
      'Frozen Food',
      'Lainnya'
    )
    AND (
      email IS NULL
      OR char_length(trim(email)) >= 5
    )
    AND (
      instagram IS NULL
      OR char_length(trim(instagram)) >= 1
    )
    AND (
      alamat IS NULL
      OR char_length(trim(alamat)) >= 1
    )
  );

-- 6) UPDATE — Edit profil (/profil)
--    USING  = baris lama boleh diubah (semua anggota terdaftar)
--    WITH CHECK = data baru harus valid (sama seperti insert)
CREATE POLICY "anggota_update_profil"
  ON public.anggota
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (
    char_length(trim(nama_pemilik)) >= 2
    AND char_length(trim(whatsapp)) >= 10
    AND char_length(trim(nama_usaha)) >= 2
    AND char_length(trim(kota)) >= 2
    AND kategori_usaha IN (
      'Warung Makan',
      'Cafe',
      'Restoran',
      'Bakery',
      'Catering',
      'Minuman',
      'Frozen Food',
      'Lainnya'
    )
    AND (
      email IS NULL
      OR char_length(trim(email)) >= 5
    )
    AND (
      instagram IS NULL
      OR char_length(trim(instagram)) >= 1
    )
    AND (
      alamat IS NULL
      OR char_length(trim(alamat)) >= 1
    )
  );

-- ============================================================
-- TIDAK ada policy DELETE → anon/authenticated tidak bisa hapus
-- Admin nanti: gunakan service_role key atau policy terpisah
-- ============================================================

-- Verifikasi (opsional): lihat policy aktif
-- SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'anggota';
