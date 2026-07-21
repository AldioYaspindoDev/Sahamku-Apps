"use client";

import { useEffect, useState, useRef } from "react";
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

// ─── StockRow (tidak diubah) ───────────────────────────────────────────────
function StockRow({ name, price, change, percentageChange }) {
  const isPositive = percentageChange >= 0;
  
  // Mapping logo berdasarkan nama saham
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
    <div className="flex items-center justify-between p-5 hover:bg-gray-50/80 rounded-2xl transition-all duration-300 border-b border-gray-100 last:border-0 group cursor-default">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center overflow-hidden justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-110 duration-500 ${
          isPositive ? "bg-emerald-50" : "bg-rose-50"
        }`}>
          <Image 
            src={getLogo(name)}
            alt={name} 
            width={48}
            height={48}
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 group-hover:text-rose-800 transition-colors uppercase tracking-tight">{name}</h4>
          <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Global Market</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-gray-900 text-lg group-hover:scale-105 transition-transform origin-right duration-300">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${
          isPositive ? "text-emerald-500" : "text-rose-500"
        }`}>
          {isPositive ? <FiTrendingUp size={14} className="animate-bounce" /> : <FiTrendingDown size={14} className="animate-bounce" />}
          {isPositive ? "+" : ""}{percentageChange.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

// ─── MarketChart (komponen baru) ───────────────────────────────────────────
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
          ? "rgba(16,185,129,0.08)"
          : "rgba(244,63,94,0.08)",
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: allPositive ? "#10b981" : "#f43f5e",
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
        ticks: { font: { size: 11 }, color: "#9ca3af" },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          font: { size: 11 },
          color: "#9ca3af",
          callback: (v) => `$${Number(v).toLocaleString()}`,
        },
        grid: { color: "rgba(0,0,0,0.04)" },
        border: { display: false },
      },
    },
  };

  return <Line data={data} options={options} />;
}

// ─── StockList (struktur utama tidak diubah) ──────────────────────────────
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

  return (
    <main id="stock-list" className="bg-white overflow-hidden scroll-mt-20">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Visual Side: Grafik Pasar ── */}
          <div className="relative group">
            <div className="absolute -inset-10 bg-linear-to-tr from-rose-200 via-rose-50 to-rose-100 rounded-[4rem] opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-700" />

            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-white/50 bg-white group-hover:shadow-rose-200/50 transition-shadow duration-500 p-8 md:p-10">
              {/* Header grafik */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-full mb-3 tracking-wider uppercase">
                    Analisis AI
                  </span>
                  <p className="text-gray-900 font-black text-2xl tracking-tight">Market Terpantau 24/7</p>
                  <p className="text-gray-400 text-sm mt-1">Performa harga saham saat ini</p>
                </div>
                {/* Floating profit card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-3 flex items-center gap-3 animate-float">
                  <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <FiTrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">Live Profit</p>
                    <p className="text-base font-bold text-gray-900 leading-none">+$2,480.00</p>
                  </div>
                </div>
              </div>

              {/* Area grafik */}
              <div className="relative w-full h-64">
                {loading ? (
                  <div className="w-full h-full bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center">
                    <FiActivity className="text-gray-200 text-3xl" />
                  </div>
                ) : markets.length > 0 ? (
                  <MarketChart markets={markets} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Data grafik tidak tersedia.</p>
                  </div>
                )}
              </div>

              {/* Mini legend */}
              {!loading && markets.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-5">
                  {markets.map((m, i) => (
                    <span key={i} className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {m.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors duration-500" />
          </div>

          {/* ── List Side (tidak diubah) ── */}
          <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-gray-50 p-8 md:p-12 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />

            <div className="flex justify-between items-end mb-10 relative z-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                  Pasar <span className="text-rose-800">Hari Ini</span>
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Market Data</span>
                </div>
              </div>
              <Link href="/AllMarkets" className="group flex items-center gap-2 text-rose-800 font-bold hover:gap-3 transition-all duration-300 bg-rose-50 px-5 py-2.5 rounded-2xl hover:bg-rose-800 hover:text-white">
                Show All <FiArrowRight />
              </Link>
            </div>

            <div className="space-y-1 relative z-10">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-5 border-b border-gray-50 last:border-0 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl" />
                      <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-100 rounded" />
                        <div className="h-3 w-32 bg-gray-50 rounded" />
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                      <div className="h-3 w-12 bg-gray-50 rounded" />
                    </div>
                  </div>
                ))
              ) : (
                markets.map((market, index) => (
                  <StockRow
                    key={index}
                    name={market.name}
                    price={market.price}
                    change={market.change}
                    percentageChange={market.percentage_change}
                  />
                ))
              )}

              {!loading && markets.length === 0 && (
                <div className="text-center py-16">
                  <FiActivity className="mx-auto text-gray-200 text-5xl mb-4" />
                  <p className="text-gray-400 font-medium">Data pasar tidak tersedia saat ini.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </main>
  );
}