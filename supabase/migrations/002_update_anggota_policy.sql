-- Jalankan di Supabase SQL Editor jika edit profil gagal (RLS)
-- Kebijakan: anggota dapat memperbarui data profil

CREATE POLICY "Anggota dapat memperbarui profil"
  ON anggota FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
