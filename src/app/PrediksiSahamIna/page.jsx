"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IndexService } from "@/service/indexService";

// ── Metadata deskripsi index populer Indonesia ──────
const INDEX_META = {
  LQ45: {
    fullName: "Indeks LQ45",
    description:
      "Indeks yang mengukur kinerja harga dari 45 saham di BEI yang memiliki likuiditas tinggi dan kapitalisasi pasar besar serta didukung oleh kualitas fundamental perusahaan yang baik.",
    criteria: [
      "Masuk dalam 60 saham teratas berdasarkan rata-rata nilai transaksi harian di pasar reguler selama 12 bulan terakhir",
      "Masuk dalam 60 saham teratas berdasarkan kapitalisasi pasar rata-rata di pasar reguler selama 12 bulan terakhir",
      "Telah tercatat di BEI selama minimum 3 bulan",
      "Memiliki kondisi keuangan, prospek pertumbuhan, dan nilai transaksi yang baik",
    ],
    color: "from-blue-600 to-cyan-500",
    accent: "blue",
  },
  IDX30: {
    fullName: "Indeks IDX30",
    description:
      "Indeks yang mengukur kinerja harga dari 30 saham yang memiliki likuiditas tinggi dan kapitalisasi pasar besar serta didukung oleh fundamental perusahaan yang baik. Merupakan subset ketat dari LQ45.",
    criteria: [
      "30 saham dengan likuiditas dan kapitalisasi tertinggi dari seleksi LQ45",
      "Evaluasi berkala setiap 6 bulan (Februari & Agustus)",
      "Menjadi benchmark utama investor institusional",
    ],
    color: "from-rose-600 to-pink-500",
    accent: "rose",
  },
  KOMPAS100: {
    fullName: "Indeks KOMPAS100",
    description:
      "Indeks yang mengukur kinerja harga dari 100 saham yang memiliki likuiditas baik, kapitalisasi pasar besar, dan fundamental yang kuat. Kerja sama BEI dan Harian Kompas.",
    criteria: [
      "100 saham terpilih dengan likuiditas dan kapitalisasi besar",
      "Evaluasi berkala setiap 6 bulan",
      "Mempertimbangkan fundamental dan pola perdagangan",
    ],
    color: "from-emerald-600 to-teal-500",
    accent: "emerald",
  },
  "SRI-KEHATI": {
    fullName: "Indeks SRI-KEHATI",
    description:
      "Indeks yang mengukur kinerja harga saham dari 25 perusahaan yang menerapkan prinsip Sustainable & Responsible Investment (SRI) serta ESG (Environmental, Social, Governance).",
    criteria: [
      "Perusahaan tidak bergerak di industri alkohol, tembakau, senjata, atau perjudian",
      "Memiliki kapitalisasi pasar dan total aset minimum tertentu",
      "Menerapkan prinsip ESG dan keberlanjutan",
    ],
    color: "from-green-600 to-lime-500",
    accent: "green",
  },
  IDX80: {
    fullName: "Indeks IDX80",
    description:
      "Indeks yang mengukur kinerja harga dari 80 saham yang memiliki likuiditas tinggi dan kapitalisasi pasar besar serta didukung oleh fundamental perusahaan yang baik.",
    criteria: [
      "80 saham terpilih dengan likuiditas dan kapitalisasi besar",
      "Superset dari IDX30 dan sebagian LQ45",
      "Evaluasi berkala setiap 6 bulan",
    ],
    color: "from-violet-600 to-purple-500",
    accent: "violet",
  },
  BISNIS27: {
    fullName: "Indeks Bisnis-27",
    description:
      "Indeks yang terdiri dari 27 saham pilihan hasil kerja sama Bursa Efek Indonesia dengan Harian Bisnis Indonesia, berdasarkan kriteria fundamental dan teknikal.",
    criteria: [
      "27 saham pilihan dengan kriteria fundamental dan teknikal",
      "Kerja sama BEI dan Harian Bisnis Indonesia",
      "Evaluasi berkala setiap 6 bulan",
    ],
    color: "from-amber-600 to-orange-500",
    accent: "amber",
  },
};

const DEFAULT_META = {
  fullName: "Indeks Saham",
  description: "Indeks saham Indonesia yang terdaftar di Bursa Efek Indonesia.",
  criteria: ["Evaluasi berkala setiap 6 bulan oleh BEI"],
  color: "from-slate-600 to-gray-500",
  accent: "slate",
};

function getMeta(name) {
  return INDEX_META[name] || { ...DEFAULT_META, fullName: `Indeks ${name}` };
}

// ── Komponen Utama ──────────────────────────────────

export default function PrediksiSahamIna() {
  const [indexes, setIndexes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [constituentsData, setConstituentsData] = useState([]);
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPerfect, setFilterPerfect] = useState(false);

  const detailRef = useRef(null);

  // Fetch semua index saat mount
  useEffect(() => {
    (async () => {
      try {
        const data = await IndexService.getAllIndexes();
        setIndexes(data || []);
      } catch {
        setIndexes([]);
      } finally {
        setLoadingMain(false);
      }
    })();
  }, []);

  // Ketika user pilih index → fetch analytics + constituents
  const handleSelectIndex = async (indexName) => {
    setSelectedIndex(indexName);
    setLoadingDetail(true);
    setSearch("");
    setFilterPerfect(false);

    try {
      const [analyticsRes, constituentsRes] = await Promise.allSettled([
        IndexService.getConsistencyAnalytics(indexName),
        IndexService.getConstituents(indexName),
      ]);
      setAnalyticsData(analyticsRes.status === "fulfilled" ? analyticsRes.value || [] : []);
      setConstituentsData(constituentsRes.status === "fulfilled" ? constituentsRes.value || [] : []);
    } catch {
      setAnalyticsData([]);
      setConstituentsData([]);
    } finally {
      setLoadingDetail(false);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const meta = selectedIndex ? getMeta(selectedIndex) : null;

  // Merge analytics with constituents untuk tabel ranking
  const mergedRanking = constituentsData.map((c, i) => {
    const analytics = analyticsData.find((a) => a.stock_code === c.stock_code);
    return {
      rank: i + 1,
      stock_code: c.stock_code,
      company_name: c.company_name || "-",
      weight_pasca: c.weight_pasca,
      free_float_ratio: c.free_float_ratio,
      frequency: analytics?.frequency || 0,
      longest_streak: analytics?.longest_streak || 0,
      is_perfect_member: analytics?.is_perfect_member || false,
      simple_consistency_score: analytics?.simple_consistency_score || 0,
    };
  });

  const filteredRanking = mergedRanking.filter((row) => {
    const matchSearch =
      row.stock_code.toLowerCase().includes(search.toLowerCase()) ||
      row.company_name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterPerfect ? row.is_perfect_member : true;
    return matchSearch && matchFilter;
  });

  // Top 15 saham konsisten untuk chart
  const topConsistent = [...analyticsData]
    .sort((a, b) => b.simple_consistency_score - a.simple_consistency_score)
    .slice(0, 15);

  const maxScore = topConsistent.length > 0 ? topConsistent[0].simple_consistency_score : 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════ HERO SECTION ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 pt-24 pb-20">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Decorative blurs */}
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-900/30 border border-rose-700/40 rounded-full text-rose-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            Indeks Saham Indonesia
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Insight <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Indeks Saham</span> Indonesia
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            Jelajahi data indeks saham utama di Bursa Efek Indonesia. Temukan emiten yang <strong className="text-white">paling konsisten bertahan</strong> di setiap indeks untuk membantu keputusan investasi Anda.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Analisis Konsistensi
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Data Konstituen Terbaru
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              Ranking Emiten
            </div>
          </div>
        </div>
      </section>

      {/* ══════ INDEX CARDS GRID ══════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pilih Indeks Saham</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Klik pada indeks di bawah untuk melihat analisis mendalam, grafik konsistensi, dan ranking emiten.</p>
          </div>

          {loadingMain ? (
            <div className="flex justify-center py-20">
              <div className="flex items-center gap-3 text-gray-500">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Memuat data indeks...
              </div>
            </div>
          ) : indexes.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Data Indeks</h3>
              <p className="text-gray-500">Admin belum mengunggah data indeks saham. Silakan hubungi administrator.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {indexes.map((idx) => {
                const m = getMeta(idx.name);
                const isActive = selectedIndex === idx.name;
                return (
                  <button
                    key={idx.id}
                    onClick={() => handleSelectIndex(idx.name)}
                    className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isActive
                        ? "border-rose-500 bg-white shadow-lg shadow-rose-100 ring-2 ring-rose-200"
                        : "border-gray-200 bg-white hover:border-rose-300"
                    }`}
                  >
                    {/* Gradient bar top */}
                    <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${m.color} opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "!opacity-100" : ""}`} />

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg font-bold transition-colors ${isActive ? "text-rose-800" : "text-gray-900 group-hover:text-rose-800"}`}>
                          {m.fullName}
                        </h3>
                        <span className="text-xs font-mono text-gray-400 tracking-wider">{idx.name}</span>
                      </div>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} text-white text-sm font-bold shadow-sm`}>
                        {idx.name.slice(0, 2)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{m.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-semibold text-gray-700">{idx.total_periods}</span> Periode
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="font-semibold text-gray-700">{idx.total_constituents}</span> Emiten
                      </div>
                    </div>

                    {idx.latest_period_start && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                        Periode terbaru: <span className="font-medium text-gray-600">{idx.latest_period_start}</span>
                      </div>
                    )}

                    {isActive && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                        <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-6-6h12l-6 6z" /></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════ DETAIL SECTION (muncul setelah klik card) ══════ */}
      {selectedIndex && (
        <div ref={detailRef}>
          {loadingDetail ? (
            <section className="py-20 bg-white">
              <div className="flex justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Memuat data {selectedIndex}...
                </div>
              </div>
            </section>
          ) : (
            <>
              {/* ── Panel Detail Index ── */}
              <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Info Kiri */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                          {selectedIndex.slice(0, 2)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{meta.fullName}</h2>
                          <span className="text-sm font-mono text-gray-400">{selectedIndex}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">{meta.description}</p>

                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Kriteria Seleksi</h4>
                      <ul className="space-y-2">
                        {meta.criteria.map((c, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <svg className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats Kanan */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        <StatCard
                          label="Total Emiten"
                          value={constituentsData.length}
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                          color="blue"
                        />
                        <StatCard
                          label="Perfect Members"
                          value={analyticsData.filter((a) => a.is_perfect_member).length}
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                          color="amber"
                        />
                        <StatCard
                          label="Data Analitik"
                          value={analyticsData.length}
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                          color="emerald"
                        />
                        <StatCard
                          label="Skor Tertinggi"
                          value={topConsistent.length > 0 ? topConsistent[0].simple_consistency_score.toFixed(1) : "0"}
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                          color="rose"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Grafik Konsistensi Emiten (Top 15) ── */}
              {topConsistent.length > 0 && (
                <section className="py-16 bg-slate-50 border-b border-gray-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        🏆 Top 15 Emiten Paling Konsisten
                      </h3>
                      <p className="text-gray-500">Saham yang paling lama dan paling sering bertahan di dalam indeks {meta.fullName}, berdasarkan skor konsistensi gabungan frekuensi & streak.</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                      <div className="space-y-3">
                        {topConsistent.map((item, i) => {
                          const pct = maxScore > 0 ? (item.simple_consistency_score / maxScore) * 100 : 0;
                          return (
                            <div key={item.stock_code} className="group flex items-center gap-4">
                              {/* Rank */}
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                i === 0 ? "bg-amber-100 text-amber-700" :
                                i === 1 ? "bg-gray-100 text-gray-600" :
                                i === 2 ? "bg-orange-100 text-orange-700" :
                                "bg-slate-50 text-slate-500"
                              }`}>
                                {i + 1}
                              </div>

                              {/* Kode */}
                              <span className="w-16 text-sm font-bold text-gray-800 font-mono shrink-0">
                                {item.stock_code}
                              </span>

                              {/* Bar */}
                              <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                                <div
                                  className={`h-full rounded-lg bg-gradient-to-r ${
                                    i === 0 ? "from-amber-500 to-amber-400" :
                                    i < 3 ? "from-rose-500 to-rose-400" :
                                    i < 5 ? "from-blue-500 to-blue-400" :
                                    "from-slate-400 to-slate-300"
                                  } transition-all duration-700 ease-out`}
                                  style={{ width: `${pct}%` }}
                                />
                                {/* Perfect member star */}
                                {item.is_perfect_member && (
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 text-sm">⭐</span>
                                )}
                              </div>

                              {/* Score */}
                              <div className="w-20 text-right">
                                <span className="text-sm font-bold text-gray-800">{item.simple_consistency_score.toFixed(1)}</span>
                                <span className="text-xs text-gray-400 ml-0.5">/100</span>
                              </div>

                              {/* Freq & Streak */}
                              <div className="hidden md:flex items-center gap-3 w-36 shrink-0 text-xs text-gray-500">
                                <span title="Frekuensi muncul">
                                  <svg className="w-3.5 h-3.5 inline mr-0.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                  {item.frequency}x
                                </span>
                                <span title="Streak terpanjang">
                                  <svg className="w-3.5 h-3.5 inline mr-0.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                  {item.longest_streak} streak
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-400">
                        <span className="flex items-center gap-1">⭐ Perfect Member — Hadir di semua periode</span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-400 inline-block" /> Peringkat 1
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-rose-500 to-rose-400 inline-block" /> Top 3
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ── Tabel Ranking Emiten ── */}
              <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        📋 Ranking Konstituen {meta.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Periode terbaru • {constituentsData.length} emiten • Diurutkan berdasarkan bobot
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Search */}
                      <div className="relative">
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                          type="text"
                          placeholder="Cari kode/nama..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all w-56"
                        />
                      </div>
                      {/* Filter Perfect */}
                      <button
                        onClick={() => setFilterPerfect(!filterPerfect)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          filterPerfect
                            ? "bg-amber-50 border-amber-300 text-amber-800"
                            : "bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-700"
                        }`}
                      >
                        ⭐ Perfect Only
                      </button>
                    </div>
                  </div>

                  {filteredRanking.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <p className="text-lg font-medium">Tidak ada data emiten yang sesuai.</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50 border-b border-gray-200">
                              <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-16">#</th>
                              <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kode Saham</th>
                              <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Perusahaan</th>
                              <th className="px-4 py-3.5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Bobot (%)</th>
                              <th className="px-4 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Frekuensi</th>
                              <th className="px-4 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Streak</th>
                              <th className="px-4 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Skor</th>
                              <th className="px-4 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {filteredRanking.map((row) => (
                              <tr key={row.stock_code} className="hover:bg-rose-50/30 transition-colors">
                                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{row.rank}</td>
                                <td className="px-4 py-3">
                                  <span className="font-bold text-gray-900 font-mono">{row.stock_code}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{row.company_name}</td>
                                <td className="px-4 py-3 text-right font-mono">
                                  {row.weight_pasca != null ? (
                                    <span className="font-semibold text-gray-800">{row.weight_pasca.toFixed(2)}%</span>
                                  ) : (
                                    <span className="text-gray-300">—</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-flex items-center justify-center w-8 h-6 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                                    {row.frequency}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-flex items-center justify-center w-8 h-6 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md">
                                    {row.longest_streak}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${
                                          row.simple_consistency_score >= 80 ? "bg-emerald-500" :
                                          row.simple_consistency_score >= 50 ? "bg-blue-500" :
                                          row.simple_consistency_score >= 25 ? "bg-amber-500" :
                                          "bg-gray-400"
                                        }`}
                                        style={{ width: `${row.simple_consistency_score}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700 w-8 text-right">{row.simple_consistency_score.toFixed(0)}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {row.is_perfect_member ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                                      ⭐ Perfect
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-400 text-xs rounded-full border border-gray-200">
                                      Reguler
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Footer info */}
                      <div className="px-6 py-3 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>Menampilkan {filteredRanking.length} dari {mergedRanking.length} emiten</span>
                        <span>Data berdasarkan analisis histori multi-periode</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

// ── Sub-komponen ────────────────────────────────────

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <div className={`p-5 rounded-xl border ${colorMap[color]} transition-all hover:shadow-sm`}>
      <div className="flex items-center gap-2 mb-2 opacity-80">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{label}</span></div>
      <p className="text-2xl font-extrabold">{value}</p>
    </div>
  );
}