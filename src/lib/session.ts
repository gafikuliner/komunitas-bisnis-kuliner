const ANGGOTA_ID_KEY = "anggota_id";
const ANGGOTA_NAMA_KEY = "anggota_nama";

export function getAnggotaIdFromSession(): string | null {
  if (typeof window === "undefined") return null;

  const fromLocal = localStorage.getItem(ANGGOTA_ID_KEY);
  if (fromLocal) return fromLocal;

  const fromSession = sessionStorage.getItem(ANGGOTA_ID_KEY);
  if (fromSession) {
    localStorage.setItem(ANGGOTA_ID_KEY, fromSession);
    return fromSession;
  }

  return null;
}

export function setAnggotaSession(id: string, nama?: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANGGOTA_ID_KEY, id);
  sessionStorage.setItem(ANGGOTA_ID_KEY, id);
  if (nama) {
    localStorage.setItem(ANGGOTA_NAMA_KEY, nama);
    sessionStorage.setItem(ANGGOTA_NAMA_KEY, nama);
  }
}

export function clearAnggotaSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANGGOTA_ID_KEY);
  localStorage.removeItem(ANGGOTA_NAMA_KEY);
  sessionStorage.removeItem(ANGGOTA_ID_KEY);
  sessionStorage.removeItem(ANGGOTA_NAMA_KEY);
}

export function resolveAnggotaId(urlId?: string | null): string | null {
  if (urlId) {
    setAnggotaSession(urlId);
    return urlId;
  }
  return getAnggotaIdFromSession();
}

/** Baca ?id= dari URL (fallback jika useSearchParams belum siap) */
export function getAnggotaIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("id");
}

export function syncAnggotaIdToUrl(pathname: string, id: string): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("id") === id) return;
  params.set("id", id);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    query ? `${pathname}?${query}` : pathname
  );
}
