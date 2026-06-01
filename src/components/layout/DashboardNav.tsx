"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAnggotaIdFromSession, getAnggotaIdFromUrl } from "@/lib/session";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/profil", label: "Edit Profil", icon: "✏️" },
  { path: "/direktori", label: "Direktori", icon: "👥" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const anggotaId = getAnggotaIdFromUrl() ?? getAnggotaIdFromSession();
  const idQuery = anggotaId ? `?id=${anggotaId}` : "";

  return (
    <nav className="flex flex-wrap gap-2">
      {menuItems.map((item) => {
        const href =
          item.path === "/direktori" ? item.path : `${item.path}${idQuery}`;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={href}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-leaf-600 text-white shadow-md"
                : "border border-leaf-200 bg-white text-leaf-700 hover:bg-leaf-50"
            }`}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
