# 📊 Panduan Implementasi Frontend: Analitik Indeks Saham & Upload Excel

Dokumen ini berisi panduan teknis dan alur integrasi API untuk pengembang Frontend dalam membuat modul **Kelola & Analisis Indeks Saham** (seperti LQ45, IDX30, Kompas100, dll). 

Melalui modul ini, pengguna/admin dapat:
1. **Mengunggah file Excel (.xlsx)** konstituen indeks (baik single maupun batch).
2. **Melihat daftar periode** pengumuman evaluasi indeks yang tersimpan.
3. **Menganalisis saham positif / konsisten** berdasarkan skor konsistensi (*simple consistency score*), durasi bertahan (*longest streak*), frekuensi kemunculan, dan *perfect membership*.

---

## 📡 API Endpoint Specs (Backend)

Base URL: `http://localhost:8000/index` (sesuai penanganan router `prefix="/index"`)

| Method | Endpoint Path | Deskripsi | Content-Type |
| :--- | :--- | :--- | :--- |
| `POST` | `/{index_name}/upload` | Upload 1 file Excel konstituen | `multipart/form-data` |
| `POST` | `/{index_name}/upload-batch` | Upload beberapa file Excel sekaligus | `multipart/form-data` |
| `GET` | `/{index_name}/periods` | Mendapatkan histori periode evaluasi | `application/json` |
| `GET` | `/{index_name}/analytics/simple-consistency` | Mendapatkan data analisis konsistensi saham | `application/json` |

---

## 🔍 Kriteria Saham Positif / Konsisten (*Index Elite*)

Dalam penentuan saham mana yang berkategori **Positif / Konsisten**:

1. **Perfect Member (`is_perfect_member === true`)**:
   - Saham yang selalu ada pada 100% periode evaluasi yang diunggah. 
   - *Status UI*: Badge Emas 🌟 **"Perfect Member"**.
2. **Simple Consistency Score (`simple_consistency_score`)**:
   - Skor dari `0.0` hingga `1.0` (atau 0% - 100%).
   - **Tinggi (Positif)**: `score >= 0.8` (80%+ selalu masuk indeks).
   - **Sedang**: `0.5 <= score < 0.8`.
   - **Rendah / Fluktuatif**: `score < 0.5`.
3. **Longest Streak (`longest_streak`)**:
   - Jumlah periode beruntun tanpa pernah keluar dari indeks.
4. **Bobot Rata-rata (`average_weight`)** *(jika file Excel memuat bobot)*:
   - Menunjukkan besarnya kontribusi kapitalisasi saham terhadap indeks.

---

## 🛠️ Langkah-Langkah Implementasi Frontend

### 1. Buat Service API (`src/service/indexService.js`)

```javascript
import { api } from "./api"; // Axios instance dasar

export const IndexService = {
  // Upload 1 file Excel
  uploadSingleExcel: async (indexName, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/index/${indexName}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  // Upload banyak file Excel sekaligus (Batch)
  uploadBatchExcel: async (indexName, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post(`/index/${indexName}/upload-batch`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  // Ambil daftar periode histori evaluasi
  getPeriods: async (indexName) => {
    return await api.get(`/index/${indexName}/periods`);
  },

  // Ambil analisis konsistensi & saham positif
  getConsistencyAnalytics: async (indexName) => {
    return await api.get(`/index/${indexName}/analytics/simple-consistency`);
  },
};
```

---

### 2. Komponen Upload Excel & Selector Indeks

Pengguna memilih nama indeks (misal: `LQ45`, `IDX30`, `KOMPAS100`) lalu mengunggah berkas `.xlsx`.

```jsx
"use client";

import { useState } from "react";
import { IndexService } from "@/service/indexService";

export default function IndexUploader({ onUploadSuccess }) {
  const [indexName, setIndexName] = useState("LQ45");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setLoading(true);
    setMessage(null);

    try {
      let res;
      if (files.length === 1) {
        res = await IndexService.uploadSingleExcel(indexName, files[0]);
      } else {
        res = await IndexService.uploadBatchExcel(indexName, files);
      }

      setMessage({ type: "success", text: res.message || "Upload & Analisis Berhasil!" });
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      const detail = err.response?.data?.detail || "Gagal mengunggah file Excel";
      setMessage({ type: "error", text: detail });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Upload File Excel Konstituen Indeks</h3>

      {message && (
        <div className={`p-3 rounded-lg text-sm mb-4 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Target Indeks</label>
          <select
            value={indexName}
            onChange={(e) => setIndexName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-gray-800"
          >
            <option value="LQ45">LQ45</option>
            <option value="IDX30">IDX30</option>
            <option value="KOMPAS100">Kompas 100</option>
            <option value="SRI-KEHATI">Sri-Kehati</option>
            <option value="IDX80">IDX80</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih File (.xlsx)</label>
          <input
            type="file"
            accept=".xlsx"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
          />
          <p className="text-xs text-gray-400 mt-1">Anda bisa memilih 1 file atau banyak file sekaligus (Batch).</p>
        </div>

        <button
          type="submit"
          disabled={loading || !files}
          className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-gray-300 text-white font-medium py-2.5 rounded-lg transition"
        >
          {loading ? "Memproses Data Excel & Analitik..." : "Upload & Kalkulasi Indeks"}
        </button>
      </form>
    </div>
  );
}
```

---

### 3. Komponent Tabel Saham Positif & Konsisten

Menampilkan tabel analisis yang menyoroti saham konsisten/positif dengan filter dan penyortiran.

```jsx
"use client";

import { useEffect, useState } from "react";
import { IndexService } from "@/service/indexService";

export default function ConsistencyTable({ selectedIndex = "LQ45" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPerfect, setFilterPerfect] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await IndexService.getConsistencyAnalytics(selectedIndex);
      setData(res || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedIndex]);

  // Filtering Saham Positif
  const filteredData = data.filter((item) => {
    const matchSearch = item.stock_code.toLowerCase().includes(search.toLowerCase());
    const matchPerfect = filterPerfect ? item.is_perfect_member : true;
    return matchSearch && matchPerfect;
  });

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Analisis Konsistensi Saham ({selectedIndex})</h3>
          <p className="text-sm text-gray-500">Daftar emiten yang konsisten bertahan dalam indeks secara historis.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Cari Kode Saham (ex: BBCA)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            onClick={() => setFilterPerfect(!filterPerfect)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              filterPerfect ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {filterPerfect ? "🌟 Hanya Perfect Member" : "Semua Saham"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Memuat analisis konsistensi...</div>
      ) : filteredData.length === 0 ? (
        <div className="py-12 text-center text-gray-400">Tidak ada data analisis untuk diproses.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 text-xs text-gray-500 uppercase">
                <th className="py-3 px-4">Kode Saham</th>
                <th className="py-3 px-4">Skor Konsistensi</th>
                <th className="py-3 px-4">Status Positif</th>
                <th className="py-3 px-4">Total Frekuensi</th>
                <th className="py-3 px-4">Streak Terpanjang</th>
                <th className="py-3 px-4">Rata-Rata Bobot</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-700">
              {filteredData.map((item) => {
                const percentage = (item.simple_consistency_score * 100).toFixed(1);
                const isPositive = item.simple_consistency_score >= 0.8;

                return (
                  <tr key={item.stock_code} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-gray-900">{item.stock_code}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isPositive ? "bg-emerald-500" : "bg-amber-500"}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="font-semibold">{percentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {item.is_perfect_member ? (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                          🌟 Perfect (100%)
                        </span>
                      ) : isPositive ? (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                          Sangat Positif
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          Fluktuatif
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{item.frequency} Periode</td>
                    <td className="py-3 px-4">{item.longest_streak} Periode Beruntun</td>
                    <td className="py-3 px-4">{item.average_weight ? `${item.average_weight.toFixed(2)}%` : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

---

## 📌 Contoh Integrasi pada Halaman `src/app/Admins/SahamIdn/Index/page.jsx`

```jsx
"use client";

import { useState } from "react";
import IndexUploader from "./components/IndexUploader";
import ConsistencyTable from "./components/ConsistencyTable";

export default function KelolaIndex() {
  const [selectedIndex, setSelectedIndex] = useState("LQ45");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen & Analitik Indeks Saham</h1>
          <p className="text-sm text-gray-500">Unggah berkas evaluasi dan analisis emiten yang paling konsisten.</p>
        </div>
      </div>

      <IndexUploader onUploadSuccess={handleUploadSuccess} />
      <ConsistencyTable key={refreshKey} selectedIndex={selectedIndex} />
    </section>
  );
}
```

---

## ✅ Ringkasan Alur Data (Data Flow)

1. User mengunggah file `.xlsx` melalui form upload (`POST /index/{index_name}/upload`).
2. Backend secara otomatis:
   - Membaca sheet Excel & mengekstrak daftar kode saham dan bobot.
   - Menyimpan *Period* & *Constituents* baru ke database PostgreSQL.
   - Menjalankan re-kalkulasi analitik konsistensi (`recompute_analytics`).
3. Frontend meminta data ter-update melalui `GET /index/{index_name}/analytics/simple-consistency`.
4. UI menampilkan daftar emiten saham beserta label **"Perfect Member"** dan indikator persentase **"Sangat Positif"**.
