"use client";

import Link from "next/link";
import PilihAnggota from "@/components/anggota/PilihAnggota";
import { useAnggotaSession } from "@/hooks/useAnggotaSession";
import type { Anggota } from "@/types";

interface AnggotaSessionGateProps {
  children: (anggota: Anggota) => React.ReactNode;
  loadingLabel?: string;
}

export default function AnggotaSessionGate({
  children,
  loadingLabel = "Memuat...",
}: AnggotaSessionGateProps) {
  const { anggota, loading, error, pickerList, selectAnggota } =
    useAnggotaSession();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-wood-600">{loadingLabel}</p>
      </div>
    );
  }

  if (pickerList.length > 0) {
    return <PilihAnggota anggotaList={pickerList} onSelect={selectAnggota} />;
  }

  if (error || !anggota) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-red-600">{error}</p>
        <Link href="/daftar" className="btn-primary mt-6 inline-flex">
          Daftar Sekarang
        </Link>
      </div>
    );
  }

  return <>{children(anggota)}</>;
}
