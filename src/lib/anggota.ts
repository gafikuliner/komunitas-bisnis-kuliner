import { supabase } from "@/lib/supabase";
import type { Anggota, AnggotaFormData, KategoriUsaha } from "@/types";

export interface AnggotaFilter {
  nama_usaha?: string;
  kota?: string;
  kategori_usaha?: KategoriUsaha | "";
}

function buildPayload(data: AnggotaFormData) {
  return {
    nama_pemilik: data.nama_pemilik.trim(),
    whatsapp: data.whatsapp.trim(),
    nama_usaha: data.nama_usaha.trim(),
    kota: data.kota.trim(),
    kategori_usaha: data.kategori_usaha,
    email: data.email?.trim() || null,
    instagram: data.instagram?.trim() || null,
    alamat: data.alamat?.trim() || null,
  };
}

export async function daftarAnggota(
  data: AnggotaFormData
): Promise<{ anggota: Anggota | null; error: string | null }> {
  const { data: anggota, error } = await supabase
    .from("anggota")
    .insert(buildPayload(data))
    .select()
    .single();

  if (error) {
    return { anggota: null, error: error.message };
  }

  return { anggota: anggota as Anggota, error: null };
}

export async function getAnggotaById(
  id: string
): Promise<{ anggota: Anggota | null; error: string | null }> {
  const { data, error } = await supabase
    .from("anggota")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { anggota: null, error: error.message };
  }

  return { anggota: data as Anggota, error: null };
}

export async function updateAnggota(
  id: string,
  data: AnggotaFormData
): Promise<{ anggota: Anggota | null; error: string | null }> {
  const { data: anggota, error } = await supabase
    .from("anggota")
    .update(buildPayload(data))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { anggota: null, error: error.message };
  }

  return { anggota: anggota as Anggota, error: null };
}

export async function cariAnggota(
  filters: AnggotaFilter = {}
): Promise<{ anggota: Anggota[]; error: string | null }> {
  let query = supabase
    .from("anggota")
    .select("*")
    .order("nama_usaha", { ascending: true });

  if (filters.nama_usaha?.trim()) {
    query = query.ilike("nama_usaha", `%${filters.nama_usaha.trim()}%`);
  }

  if (filters.kota?.trim()) {
    query = query.eq("kota", filters.kota.trim());
  }

  if (filters.kategori_usaha) {
    query = query.eq("kategori_usaha", filters.kategori_usaha);
  }

  const { data, error } = await query;

  if (error) {
    return { anggota: [], error: error.message };
  }

  return { anggota: (data ?? []) as Anggota[], error: null };
}

export async function getDaftarKota(): Promise<{
  kota: string[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("anggota")
    .select("kota")
    .order("kota", { ascending: true });

  if (error) {
    return { kota: [], error: error.message };
  }

  const unique = [...new Set((data ?? []).map((row) => row.kota as string))];
  return { kota: unique, error: null };
}
