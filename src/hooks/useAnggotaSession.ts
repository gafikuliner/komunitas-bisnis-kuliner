"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cariAnggota, getAnggotaById } from "@/lib/anggota";
import {
  getAnggotaIdFromUrl,
  resolveAnggotaId,
  setAnggotaSession,
  syncAnggotaIdToUrl,
} from "@/lib/session";
import type { Anggota } from "@/types";

export function useAnggotaSession() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const idFromSearchParams = searchParams.get("id");

  const [mounted, setMounted] = useState(false);
  const [anggota, setAnggota] = useState<Anggota | null>(null);
  const [pickerList, setPickerList] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectAnggota = useCallback(
    (member: Anggota) => {
      setAnggotaSession(member.id, member.nama_pemilik);
      syncAnggotaIdToUrl(pathname, member.id);
      setPickerList([]);
      setAnggota(member);
      setError(null);
    },
    [pathname]
  );

  const loadAnggota = useCallback(async () => {
    if (!mounted) return;

    setLoading(true);
    setError(null);
    setPickerList([]);

    const urlId = idFromSearchParams ?? getAnggotaIdFromUrl();
    let id = resolveAnggotaId(urlId);

    if (!id) {
      const { anggota: list, error: listError } = await cariAnggota({});

      if (listError) {
        setError(listError);
        setAnggota(null);
        setLoading(false);
        return;
      }

      if (list.length === 1) {
        id = list[0].id;
        setAnggotaSession(id, list[0].nama_pemilik);
      } else if (list.length > 1) {
        setPickerList(list);
        setAnggota(null);
        setLoading(false);
        return;
      }
    }

    if (!id) {
      setError("Belum ada anggota terdaftar. Silakan daftar terlebih dahulu.");
      setAnggota(null);
      setLoading(false);
      return;
    }

    syncAnggotaIdToUrl(pathname, id);

    const { anggota: data, error: fetchError } = await getAnggotaById(id);

    if (fetchError || !data) {
      setError("Data anggota tidak ditemukan.");
      setAnggota(null);
    } else {
      setAnggota(data);
      setAnggotaSession(data.id, data.nama_pemilik);
    }

    setLoading(false);
  }, [mounted, idFromSearchParams, pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    loadAnggota();
  }, [loadAnggota]);

  return {
    anggota,
    loading: !mounted || loading,
    error,
    pickerList,
    selectAnggota,
    refresh: loadAnggota,
  };
}
