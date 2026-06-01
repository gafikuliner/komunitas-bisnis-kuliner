"use client";

import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardNav from "@/components/layout/DashboardNav";
import AnggotaSessionGate from "@/components/anggota/AnggotaSessionGate";
import type { Anggota } from "@/types";

function DashboardView({ anggota }: { anggota: Anggota }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6">
        <p className="text-sm font-medium text-leaf-600">Dashboard Anggota</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-leaf-900 sm:text-3xl">
          Halo, {anggota.nama_pemilik}! 👋
        </h1>
        <p className="mt-2 text-wood-700">
          Kelola profil usaha Anda dan jelajahi komunitas bisnis kuliner.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/profil?id=${anggota.id}`} className="btn-secondary">
            Edit Profil
          </Link>
          <Link href="/direktori" className="btn-outline bg-white">
            Lihat Direktori
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <DashboardNav />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-leaf-800">Profil Usaha</h2>
            <Link
              href={`/profil?id=${anggota.id}`}
              className="text-sm font-medium text-leaf-600 hover:text-leaf-800"
            >
              Edit →
            </Link>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Nama Usaha</dt>
              <dd className="font-medium text-wood-800">{anggota.nama_usaha}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Kategori</dt>
              <dd className="font-medium text-wood-800">
                {anggota.kategori_usaha}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Kota</dt>
              <dd className="font-medium text-wood-800">{anggota.kota}</dd>
            </div>
            <div>
              <dt className="text-gray-500">WhatsApp</dt>
              <dd className="font-medium text-wood-800">{anggota.whatsapp}</dd>
            </div>
            {anggota.email && (
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium text-wood-800">{anggota.email}</dd>
              </div>
            )}
            {anggota.instagram && (
              <div>
                <dt className="text-gray-500">Instagram</dt>
                <dd className="font-medium text-wood-800">
                  {anggota.instagram}
                </dd>
              </div>
            )}
            {anggota.alamat && (
              <div>
                <dt className="text-gray-500">Alamat</dt>
                <dd className="font-medium text-wood-800">{anggota.alamat}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="card border-gold-200 bg-gold-50">
          <h2 className="font-semibold text-gold-800">Menu Komunitas</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href={`/profil?id=${anggota.id}`}
                className="flex items-center gap-2 font-medium text-leaf-700 hover:text-leaf-900"
              >
                <span className="text-leaf-600">✓</span> Edit Profil Usaha
              </Link>
            </li>
            <li>
              <Link
                href="/direktori"
                className="flex items-center gap-2 font-medium text-leaf-700 hover:text-leaf-900"
              >
                <span className="text-leaf-600">✓</span> Direktori & Pencarian
                Anggota
              </Link>
            </li>
            <li className="flex items-center gap-2 text-wood-500">
              <span>○</span> Informasi Bisnis Kuliner (tahap berikutnya)
            </li>
            <li className="flex items-center gap-2 text-wood-500">
              <span>○</span> Chat AI (menunggu persetujuan Anda)
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-leaf-600 hover:text-leaf-800">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="text-wood-600">Memuat...</p>
            </div>
          }
        >
          <AnggotaSessionGate loadingLabel="Memuat dashboard...">
            {(anggota) => <DashboardView anggota={anggota} />}
          </AnggotaSessionGate>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
