"use client";

import { useState, useEffect, use } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function StockPredictionPage({ params }) {
  // Melacak symbol dari URL (e.g., /PrediksiSaham/NVDA)
  const solvedParams = use(params);
  const symbol = solvedParams.symbol?.toUpperCase() || "UNKNOWN";

  const [formData, setFormData] = useState({
    open: "",
    high: "",
    low: "",
    volume: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapping symbol ke nama lengkap (bisa dikembangkan lewat API atau data statis)
  const stockInfo = {
    NVDA: { name: "NVIDIA Corporation", logo: "/asset/Nvidia.jpeg" },
    AAPL: { name: "Apple Inc.", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
    GOOGL: { name: "Alphabet Inc.", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
    // Tambahkan lainnya sesuai kebutuhan
  };

  const currentStock = stockInfo[symbol] || { name: symbol, logo: null };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Tentukan endpoint berdasarkan symbol
    let apiEndpoint = `http://localhost:8000/predict/${symbol.toLowerCase()}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          open: parseFloat(formData.open),
          high: parseFloat(formData.high),
          low: parseFloat(formData.low),
          volume: parseFloat(formData.volume),
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Model prediksi untuk ${symbol} belum tersedia di server.`);
        }
        throw new Error("Gagal mengambil prediksi dari server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Poppins']">
      <Navbar />
      
      <main className="grow py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/PrediksiSaham" className="inline-flex items-center gap-2 text-rose-800 font-semibold mb-8 hover:gap-3 transition-all">
            ← Kembali ke Daftar Saham
          </Link>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white p-2 px-4 rounded-full border border-zinc-200 shadow-sm mb-6">
              {currentStock.logo && (
                <Image 
                  src={currentStock.logo} 
                  alt={symbol} 
                  width={30} 
                  height={30} 
                  className="rounded-full"
                />
              )}
              <span className="text-zinc-600 font-semibold">{symbol} - {currentStock.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
              AI Stock <span className="text-rose-800">Prediction</span>
            </h1>
            <p className="mt-4 text-zinc-500 text-lg max-w-2xl mx-auto">
              Analisa pergerakan harga {currentStock.name} menggunakan teknologi Advanced Machine Learning.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Input Form Card - REUSABLE COMPONENT STYLE */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100">
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-rose-800 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                Input Data Harian
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Field Open */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Nilai Open</label>
                    <input
                      type="number"
                      name="open"
                      step="any"
                      required
                      placeholder="0.00"
                      value={formData.open}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all"
                    />
                  </div>
                  
                  {/* Field High */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Nilai High</label>
                    <input
                      type="number"
                      name="high"
                      step="any"
                      required
                      placeholder="0.00"
                      value={formData.high}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all"
                    />
                  </div>

                  {/* Field Low */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Nilai Low</label>
                    <input
                      type="number"
                      name="low"
                      step="any"
                      required
                      placeholder="0.00"
                      value={formData.low}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all"
                    />
                  </div>

                  {/* Field Volume */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Nilai Volume</label>
                    <input
                      type="number"
                      name="volume"
                      step="any"
                      required
                      placeholder="0"
                      value={formData.volume}
                      onChange={handleInputChange}
                      className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-rose-800 text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-rose-900 transition-all disabled:bg-zinc-300"
                >
                  {loading ? "Menganalisa..." : `Prediksi ${symbol} Sekarang`}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100 min-h-100">
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                Hasil Analisa AI
              </h2>

              {!result && !error && !loading && (
                <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                  <p className="font-medium text-lg italic">Menunggu data input...</p>
                </div>
              )}

              {error && (
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-medium">
                  {error}
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                    <span className="text-zinc-500 text-sm font-semibold uppercase">Prediksi Harga Penutupan</span>
                    <div className="text-4xl font-extrabold text-rose-800 mt-1">${result.predict_close}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <span className="text-zinc-500 text-xs font-semibold uppercase">MAE</span>
                      <div className="text-zinc-900 font-bold">0.1245</div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <span className="text-zinc-500 text-xs font-semibold uppercase">R2 Score</span>
                      <div className="text-zinc-900 font-bold">0.9821</div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900 text-white rounded-2xl">
                    <span className="text-zinc-400 text-sm font-medium">Analisa Sinyal:</span>
                    <div className={`text-2xl font-bold mt-2 ${result.decision.includes("NAIK") ? "text-green-400" : "text-red-400"}`}>
                      {result.decision}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
