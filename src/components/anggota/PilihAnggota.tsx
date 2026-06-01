import type { Anggota } from "@/types";

interface PilihAnggotaProps {
  anggotaList: Anggota[];
  onSelect: (anggota: Anggota) => void;
}

export default function PilihAnggota({
  anggotaList,
  onSelect,
}: PilihAnggotaProps) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="card text-center">
        <p className="text-4xl">👤</p>
        <h2 className="mt-3 font-display text-xl font-bold text-leaf-900">
          Pilih Profil Anda
        </h2>
        <p className="mt-2 text-sm text-wood-600">
          Beberapa anggota terdaftar. Pilih usaha Anda untuk membuka dashboard
          dan mengedit profil.
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {anggotaList.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="card w-full text-left transition hover:border-leaf-300 hover:shadow-md"
            >
              <p className="font-semibold text-leaf-900">{item.nama_usaha}</p>
              <p className="mt-1 text-sm text-wood-600">{item.nama_pemilik}</p>
              <p className="mt-2 text-xs text-gray-500">
                {item.kota} · {item.kategori_usaha}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
