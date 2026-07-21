"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/componentsAdmin/sidebar";
import { IndexService } from "@/service/indexService";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, Star, Layers, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

function IndexContent() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const searchParams = useSearchParams();
  const indexParam = searchParams.get("name") || "LQ45";
  const [selectedIndex, setSelectedIndex] = useState(indexParam);
  const [files, setFiles] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState([]);
  const [periodsData, setPeriodsData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPerfect, setFilterPerfect] = useState(false);

  useEffect(() => {
    if (indexParam) {
      setSelectedIndex(indexParam);
    }
  }, [indexParam]);

  // Fetch Data Function
  const fetchIndexData = async () => {
    if (!isAuthenticated) return;
    setLoadingData(true);
    try {
      const [analyticsRes, periodsRes] = await Promise.allSettled([
        IndexService.getConsistencyAnalytics(selectedIndex),
        IndexService.getPeriods(selectedIndex)
      ]);

      if (analyticsRes.status === "fulfilled") {
        setAnalyticsData(analyticsRes.value || []);
      } else {
        setAnalyticsData([]);
      }

      if (periodsRes.status === "fulfilled") {
        setPeriodsData(periodsRes.value || []);
      } else {
        setPeriodsData([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data indeks:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchIndexData();
    }
  }, [selectedIndex, isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
        <span>Memverifikasi Sesi Admin...</span>
      </div>
    );
  }

  // Handle Upload File Excel
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setUploadLoading(true);
    setUploadMessage(null);

    try {
      let res;
      if (files.length === 1) {
        res = await IndexService.uploadSingleExcel(selectedIndex, files[0]);
      } else {
        res = await IndexService.uploadBatchExcel(selectedIndex, files);
      }

      setUploadMessage({
        type: "success",
        text: res?.message || `Berhasil mengunggah & memproses ${files.length} file Excel untuk indeks ${selectedIndex}!`,
      });
      setFiles(null);
      
      // Refresh analytics data
      fetchIndexData();
    } catch (err) {
      const detail = err.response?.data?.detail || err.message || "Gagal mengunggah file Excel";
      setUploadMessage({ type: "error", text: detail });
    } finally {
      setUploadLoading(false);
    }
  };

  // Filter Analytics Data
  const filteredAnalytics = analyticsData.filter((item) => {
    const stockCode = item.stock_code || "";
    const matchSearch = stockCode.toLowerCase().includes(search.toLowerCase());
    const matchPerfect = filterPerfect ? item.is_perfect_member : true;
    return matchSearch && matchPerfect;
  });

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        {/* Header Dashboard Admin */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white transition-[width,height] ease-linear">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-gray-200" />
            <Link
              href="/Admins/SahamIdn"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Katalog Indeks</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-rose-100 text-rose-800 rounded-full">
              Index Analytics Module
            </span>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manajemen Konstituen Indeks Saham</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Unggah file Excel evaluasi indeks (.xlsx) untuk menyimpan konstituen & menghitung skor konsistensi emiten.
                </p>
              </div>

              {/* Selector Target Indeks */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Pilih Indeks:</span>
                <select
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(e.target.value)}
                  className="px-4 py-2 bg-slate-100 border border-gray-300 rounded-lg text-sm font-bold text-rose-900 focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer"
                >
                  <option value="LQ45">Indeks LQ45</option>
                  <option value="IDX30">Indeks IDX30</option>
                  <option value="KOMPAS100">Indeks Kompas 100</option>
                  <option value="SRI-KEHATI">Indeks SRI-KEHATI</option>
                  <option value="IDX80">Indeks IDX80</option>
                  <option value="BISNIS27">Indeks Bisnis-27</option>
                </select>
              </div>
            </div>

            {/* Grid 2 Kolom: Form Upload & Periode Evaluasi */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form Upload Excel (2 Kolom) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileSpreadsheet className="w-5 h-5 text-rose-800" />
                  <h3 className="text-base font-bold text-gray-800">
                    Upload Berkas Excel Konstituen ({selectedIndex})
                  </h3>
                </div>

                {uploadMessage && (
                  <div
                    className={`p-4 rounded-lg text-sm mb-4 flex items-center gap-3 ${
                      uploadMessage.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {uploadMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span>{uploadMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pilih Berkas (.xlsx)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-rose-500 rounded-xl p-6 text-center transition-all bg-slate-50/50">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".xlsx"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-800 hover:file:bg-rose-200 cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Mendukung upload single atau banyak file sekaligus (Batch Evaluation).
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploadLoading || !files}
                    className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {uploadLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Memproses Data Excel & Re-kalkulasi...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload & Simpan ke Database</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Sidebar Daftar Periode Evaluasi (1 Kolom) */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-rose-800" />
                      <h3 className="text-base font-bold text-gray-800">Histori Periode</h3>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-semibold">
                      {periodsData.length} Evaluasi
                    </span>
                  </div>

                  {loadingData ? (
                    <div className="py-8 text-center text-xs text-gray-400">Memuat periode...</div>
                  ) : periodsData.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      Belum ada periode evaluasi tersimpan untuk {selectedIndex}.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {periodsData.map((pd, idx) => (
                        <div
                          key={pd.id || idx}
                          className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between text-xs text-gray-700"
                        >
                          <span className="font-semibold text-gray-900">
                            {pd.period_name || pd.name || `Periode #${idx + 1}`}
                          </span>
                          <span className="text-gray-400">
                            {pd.effective_date || pd.created_at ? new Date(pd.effective_date || pd.created_at).toLocaleDateString("id-ID") : "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  Total data evaluasi mempengaruhi persentase skor konsistensi.
                </div>
              </div>
            </div>

            {/* Tabel Analisis Konsistensi Saham Positif */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-rose-800" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Analisis Konsistensi Saham ({selectedIndex})
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Daftar emiten positif yang paling konsisten bertahan dalam konstituen indeks.
                  </p>
                </div>

                {/* Controls: Filter & Search */}
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Cari Kode Saham (ex: BBCA)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500 text-gray-900"
                  />
                  <button
                    onClick={() => setFilterPerfect(!filterPerfect)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                      filterPerfect
                        ? "bg-amber-100 text-amber-800 border-amber-300 shadow-xs"
                        : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{filterPerfect ? "Hanya Perfect Member" : "Semua Saham"}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Table */}
              {loadingData ? (
                <div className="py-16 text-center text-gray-500 text-sm">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-rose-800" />
                  <span>Memuat data analitik konsistensi...</span>
                </div>
              ) : filteredAnalytics.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-sm">
                  Tidak ada data analisis emiten yang ditemukan untuk indeks {selectedIndex}.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-slate-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Kode Saham</th>
                        <th className="py-3 px-4">Skor Konsistensi</th>
                        <th className="py-3 px-4">Status Kualifikasi</th>
                        <th className="py-3 px-4">Frekuensi Hadir</th>
                        <th className="py-3 px-4">Streak Terpanjang</th>
                        <th className="py-3 px-4">Rata-Rata Bobot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                      {filteredAnalytics.map((item) => {
                        const scoreNum = Number(item.simple_consistency_score || 0);
                        const percentage = (scoreNum * 100).toFixed(1);
                        const isPositive = scoreNum >= 0.8;

                        return (
                          <tr key={item.stock_code} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-gray-900">{item.stock_code}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 ${
                                      item.is_perfect_member
                                        ? "bg-amber-500"
                                        : isPositive
                                        ? "bg-emerald-500"
                                        : "bg-rose-500"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="font-semibold text-gray-800">{percentage}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {item.is_perfect_member ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                                  🌟 Perfect (100%)
                                </span>
                              ) : isPositive ? (
                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
                                  Sangat Positif
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                                  Fluktuatif
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-800">
                              {item.frequency || item.appearance_count || 0} Periode
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-800">
                              {item.longest_streak || 0} Periode Beruntun
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-800">
                              {item.average_weight ? `${Number(item.average_weight).toFixed(2)}%` : "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function KelolaIndex() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Memuat modul indeks...</div>}>
      <IndexContent />
    </Suspense>
  );
}