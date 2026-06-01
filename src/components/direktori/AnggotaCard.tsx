import type { Anggota } from "@/types";

const kategoriColors: Record<string, string> = {
  "Warung Makan": "bg-wood-700/10 text-wood-700",
  Cafe: "bg-gold-100 text-gold-800",
  Restoran: "bg-leaf-100 text-leaf-800",
  Bakery: "bg-orange-100 text-orange-800",
  Catering: "bg-purple-100 text-purple-800",
  Minuman: "bg-sky-100 text-sky-600",
  "Frozen Food": "bg-blue-100 text-blue-700",
  Lainnya: "bg-gray-100 text-gray-700",
};

interface AnggotaCardProps {
  anggota: Anggota;
}

export default function AnggotaCard({ anggota }: AnggotaCardProps) {
  const badgeClass =
    kategoriColors[anggota.kategori_usaha] ?? "bg-gray-100 text-gray-700";

  return (
    <article className="card flex flex-col transition hover:border-leaf-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-600 text-lg font-bold text-white">
          {anggota.nama_usaha.charAt(0).toUpperCase()}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
        >
          {anggota.kategori_usaha}
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-leaf-900">{anggota.nama_usaha}</h3>
      <p className="mt-1 text-sm text-wood-600">{anggota.nama_pemilik}</p>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <span aria-hidden>📍</span>
        <span>{anggota.kota}</span>
      </div>

      {(anggota.instagram || anggota.email) && (
        <div className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500">
          {anggota.instagram && (
            <p>IG: {anggota.instagram}</p>
          )}
          {anggota.email && <p>{anggota.email}</p>}
        </div>
      )}
    </article>
  );
}
