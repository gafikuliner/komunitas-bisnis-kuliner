import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-600 text-lg font-bold text-white">
            KB
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-leaf-800">
              Komunitas Bisnis
            </p>
            <p className="text-xs text-gold-600">Kuliner Indonesia</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/direktori"
            className="hidden text-sm font-medium text-wood-700 hover:text-leaf-600 sm:inline"
          >
            Direktori
          </Link>
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-wood-700 hover:text-leaf-600 md:inline"
          >
            Dashboard
          </Link>
          <Link href="/daftar" className="btn-primary text-xs sm:text-sm">
            Gabung Komunitas
          </Link>
        </nav>
      </div>
    </header>
  );
}
