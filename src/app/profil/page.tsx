"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardNav from "@/components/layout/DashboardNav";
import AnggotaSessionGate from "@/components/anggota/AnggotaSessionGate";
import FormEditProfil from "@/components/profil/FormEditProfil";
import type { Anggota } from "@/types";

function ProfilView({ anggota }: { anggota: Anggota }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-leaf-900 sm:text-4xl">
          Edit Profil Usaha
        </h1>
        <p className="mt-2 text-wood-700">
          Perbarui data usaha Anda. Perubahan akan tampil di direktori anggota.
        </p>
        <div className="mt-6">
          <DashboardNav />
        </div>
      </div>

      <div className="card shadow-md">
        <FormEditProfil anggota={anggota} />
      </div>
    </div>
  );
}

export default function ProfilPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-leaf-50 to-white py-10 sm:py-14">
        <div className="mx-auto px-4 sm:px-6">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center">
                <p className="text-wood-600">Memuat...</p>
              </div>
            }
          >
            <AnggotaSessionGate loadingLabel="Memuat profil...">
              {(anggota) => <ProfilView anggota={anggota} />}
            </AnggotaSessionGate>
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
