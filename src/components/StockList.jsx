"use client";

import { useEffect, useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiActivity, FiArrowRight } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import { MarketService } from "../service/marketService";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// ─── StockRow ──────────────────────────────────────────────────────────────
function StockRow({ name, price, change, percentageChange, rank }) {
  const isPositive = percentageChange >= 0;

  const getLogo = (stockName) => {
    const logos = {
      "NVDA": "/asset/Nvidia.jpeg",
      "AAPL": "/asset/Apple.jpeg",
      "GOOGL": "/asset/Google.jpeg",
      "TSLA": "/asset/Tesla.jpeg",
      "MSFT": "/asset/Microsoft.jpeg",
      "Adobe": "/asset/Adobe.jpeg",
      "Amazon": "/asset/Amazon.jpeg",
      "META": "/asset/Meta.jpeg",
      "S&P 500": "/asset/Grafik.jpeg",
      "NASDAQ": "/asset/Grafik.jpeg",
      "DOW JONES": "/asset/Grafik.jpeg"
    };
    return logos[stockName] || "/asset/SahamkuLogo.png";
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-rose-50/50 transition-all duration-300 border border-transparent hover:border-rose-100">
      {/* Rank */}
      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 group-hover:bg-rose-100 group-hover:text-rose-700 transition-colors">
        {rank}
      </div>

      {/* Logo */}
      <div className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-colors shadow-sm shrink-0 ${
        isPositive ? "border-emerald-100 group-hover:border-emerald-200" : "border-rose-100 group-hover:border-rose-200"
      }`}>
        <Image
          src={getLogo(name)}
          alt={name}
          width={44}
          height={44}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 text-sm group-hover:text-rose-800 transition-colors uppercase tracking-tight truncate">{name}</h4>
        <p className="text-[11px] text-gray-400 font-medium">Global Market</p>
      </div>

      {/* Price & Change */}
      <div className="text-right shrink-0">
        <div className="font-bold text-gray-900 text-sm tabular-nums">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md mt-0.5 ${
          isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
        }`}>
          {isPositive ? <FiTrendingUp size={11} /> : <FiTrendingDown size={11} />}
          {isPositive ? "+" : ""}{percentageChange.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

// ─── MarketChart ───────────────────────────────────────────────────────────
function MarketChart({ markets }) {
  const labels = markets.map((m) => m.name);
  const prices = markets.map((m) => m.price);
  const allPositive = markets.every((m) => m.percentage_change >= 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Harga",
        data: prices,
        borderColor: allPositive ? "#10b981" : "#f43f5e",
        backgroundColor: allPositive
          ? "rgba(16,185,129,0.06)"
          : "rgba(244,63,94,0.06)",
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: "#fff",
        pointBorderColor: allPositive ? "#10b981" : "#f43f5e",
        pointBorderWidth: 2.5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { size: 12, weight: "600" },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) =>
            ` $${ctx.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 11, weight: "500" }, color: "#94a3b8" },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          font: { size: 11 },
          color: "#94a3b8",
          callback: (v) => `$${Number(v).toLocaleString()}`,
        },
        grid: { color: "rgba(0,0,0,0.03)", drawBorder: false },
        border: { display: false },
      },
    },
  };

  return <Line data={data} options={options} />;
}

// ─── StockList (Main Export) ───────────────────────────────────────────────
export default function StockList() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await MarketService.getDataMarket();
        setMarkets(response.slice(0, 5));
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  // Summary stats from live data
  const totalChange = markets.reduce((sum, m) => sum + (m.change || 0), 0);
  const avgChange = markets.length > 0 ? totalChange / markets.length : 0;
  const positiveCount = markets.filter((m) => m.percentage_change >= 0).length;

  return (
    <main id="stock-list" className="bg-white overflow-hidden scroll-mt-20">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Pergerakan <span className="text-rose-800">Pasar</span> Hari Ini
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pantau harga saham dan indeks utama secara real-time dengan update otomatis setiap 30 detik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Chart ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 hover:shadow-lg transition-shadow duration-500">
            {/* Chart Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Grafik Harga Pasar</h3>
                <p className="text-xs text-gray-400">Perbandingan harga saham & indeks terpantau</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <FiTrendingUp className="text-emerald-600" size={14} />
                <span className="text-xs font-bold text-emerald-700">Live</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative w-full h-64 mb-6">
              {loading ? (
                <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse flex items-center justify-center">
                  <FiActivity className="text-gray-300 text-3xl" />
                </div>
              ) : markets.length > 0 ? (
                <MarketChart markets={markets} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Data grafik tidak tersedia.
                </div>
              )}
            </div>

            {/* Chart Legend */}
            {!loading && markets.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {markets.map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <span className={`w-2 h-2 rounded-full ${m.percentage_change >= 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {m.name}
                  </span>
                ))}
              </div>
            )}

            {/* Mini Stats */}
            {!loading && markets.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-400 font-medium mb-1">Terpantau</div>
                  <div className="text-lg font-bold text-gray-900">{markets.length}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-400 font-medium mb-1">Naik</div>
                  <div className="text-lg font-bold text-emerald-600">{positiveCount}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-400 font-medium mb-1">Avg Δ</div>
                  <div className={`text-lg font-bold ${avgChange >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {avgChange >= 0 ? "+" : ""}{avgChange.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Stock List ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500">
            {/* List Header */}
            <div className="p-6 md:p-8 pb-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900">Daftar Harga Pasar</h3>
                <Link
                  href="/AllMarkets"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  Lihat Semua <FiArrowRight size={12} />
                </Link>
              </div>
              <p className="text-xs text-gray-400">Update otomatis setiap 30 detik</p>
            </div>

            {/* Stock Rows */}
            <div className="px-4 md:px-6 pb-6">
              {loading ? (
                <div className="space-y-2">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                      <div className="w-7 h-7 bg-gray-100 rounded-lg" />
                      <div className="w-11 h-11 bg-gray-100 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 w-20 bg-gray-100 rounded" />
                        <div className="h-2.5 w-28 bg-gray-50 rounded" />
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-3.5 w-20 bg-gray-100 rounded" />
                        <div className="h-5 w-16 bg-gray-50 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : markets.length > 0 ? (
                <div className="space-y-1">
                  {markets.map((market, index) => (
                    <StockRow
                      key={index}
                      rank={index + 1}
                      name={market.name}
                      price={market.price}
                      change={market.change}
                      percentageChange={market.percentage_change}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    <FiActivity className="text-gray-300 text-2xl" />
                  </div>
                  <p className="text-gray-400 font-medium text-sm">Data pasar tidak tersedia saat ini.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 py-3 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Data dari Yahoo Finance API</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Real-time
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}