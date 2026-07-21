"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/componentsAdmin/sidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { TrendingUp, Upload, Search, ArrowRight, BarChart3, ShieldCheck, Star, Database } from "lucide-react";

const INDEX_LIST = [
  {
    code: "LQ45",
    name: "Indeks LQ45",
    category: "Likuiditas Tinggi",
    description: "45 saham konstituen dengan likuiditas tinggi dan kapitalisasi pasar besar di BEI.",
    totalPeriods: "5 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, BMRI, TLKM, ASII",
    status: "Aktif",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    code: "IDX30",
    name: "Indeks IDX30",
    category: "Likuiditas Tinggi",
    description: "30 saham terkemuka pilihan terbaik dengan transaksi paling likuid di Bursa Efek Indonesia.",
    totalPeriods: "4 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, BMRI, BBNI, ICBP",
    status: "Aktif",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    code: "KOMPAS100",
    name: "Indeks Kompas 100",
    category: "Broad Market",
    description: "100 saham yang memiliki likuiditas baik dan nilai kapitalisasi pasar tinggi.",
    totalPeriods: "3 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, UNTR, ADRO, AMRT",
    status: "Aktif",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    code: "SRI-KEHATI",
    name: "Indeks SRI-KEHATI",
    category: "ESG & Sustainable",
    description: "Indeks saham berbasis kriteria Sustainable & Responsible Investment (ESG) lingkungan.",
    totalPeriods: "3 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, BMRI, TLKM, KLBF",
    status: "Aktif",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    code: "IDX80",
    name: "Indeks IDX80",
    category: "Broad Market",
    description: "80 saham pilihan yang memiliki kinerja likuiditas serta nilai kapitalisasi pasar baik.",
    totalPeriods: "2 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, BMRI, ASII, GOTO",
    status: "Aktif",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    code: "BISNIS27",
    name: "Indeks Bisnis-27",
    category: "Partner Index",
    description: "27 saham pilihan hasil kerja sama Bursa Efek Indonesia dengan Harian Bisnis Indonesia.",
    totalPeriods: "2 Periode Tersimpan",
    topConstituents: "BBCA, BBRI, BMRI, TLKM, ASII",
    status: "Aktif",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
];

export default function SahamIdnPage() {
  const { isAuthenticated, loading } = useAdminAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
        <span>Memverifikasi Sesi Admin...</span>
      </div>
    );
  }

  const filteredIndexes = INDEX_LIST.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "Semua" ? true : item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        {/* Header Bar Dashboard Admin */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white transition-[width,height] ease-linear">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-gray-200" />
            <h1 className="text-base font-semibold text-gray-800">
              Daftar Indeks Saham Indonesia (IHSG)
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/Admins/SahamIdn/Index"
              className="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Data Excel Indeks</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Banner Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-rose-800" />
                  <h2 className="text-xl font-bold text-gray-900">Katalog Indeks Saham BEI</h2>
                </div>
                <p className="text-sm text-gray-500">
                  Pilih indeks saham di bawah ini untuk melihat analitik konsistensi emiten atau mengunggah data konstituen dari file Excel.
                </p>
              </div>

              {/* Quick Info Badge */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2 bg-slate-50 border border-gray-200 rounded-lg text-center">
                  <p className="text-xs text-gray-500 uppercase font-medium">Total Indeks Terdaftar</p>
                  <p className="text-lg font-bold text-gray-900">{INDEX_LIST.length} Indeks</p>
                </div>
                <div className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-lg text-center">
                  <p className="text-xs text-rose-700 uppercase font-medium">Status Database</p>
                  <p className="text-lg font-bold text-rose-900">Terhubung</p>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari indeks (contoh: LQ45, IDX30)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500 text-gray-900"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                {["Semua", "Likuiditas Tinggi", "Broad Market", "ESG & Sustainable", "Partner Index"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${
                      selectedCategory === cat
                        ? "bg-rose-800 text-white border-rose-800 shadow-xs"
                        : "bg-slate-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabel Daftar Indeks */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Daftar Indeks Efek & Konstituen
                </h3>
                <span className="text-xs text-gray-500">
                  Menampilkan {filteredIndexes.length} dari {INDEX_LIST.length} Indeks
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-3.5 px-6">Indeks & Kode</th>
                      <th className="py-3.5 px-6">Deskripsi</th>
                      <th className="py-3.5 px-6">Kategori</th>
                      <th className="py-3.5 px-6">Top Konstituen</th>
                      <th className="py-3.5 px-6 text-center">Aksi / Pengelolaan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {filteredIndexes.map((idx) => (
                      <tr key={idx.code} className="hover:bg-slate-50/80 transition-colors">
                        {/* Kode Indeks & Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-900 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              {idx.code}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{idx.name}</p>
                              <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <Database className="w-3 h-3 text-emerald-600" />
                                {idx.totalPeriods}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Deskripsi */}
                        <td className="py-4 px-6 max-w-xs text-xs text-gray-600 leading-relaxed">
                          {idx.description}
                        </td>

                        {/* Kategori Badge */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${idx.badgeColor}`}>
                            {idx.category}
                          </span>
                        </td>

                        {/* Top Konstituen */}
                        <td className="py-4 px-6 text-xs text-gray-500 font-mono">
                          {idx.topConstituents}
                        </td>

                        {/* Button Action */}
                        <td className="py-4 px-6 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/Admins/SahamIdn/Index?name=${idx.code}`}
                              className="px-3 py-1.5 bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold rounded-lg transition-all shadow-xs flex items-center gap-1.5"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Kelola & Upload Excel</span>
                            </Link>

                            <Link
                              href={`/Admins/SahamIdn/Index?name=${idx.code}`}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-all flex items-center gap-1"
                            >
                              <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
                              <span>Analitik</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}