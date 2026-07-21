"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Data saham US
const sahamList = [
  {
    id: 1,
    kode: "NVDA",
    nama: "NVIDIA Corporation",
    logo: "/asset/Nvidia.jpeg",
    link: "/PrediksiSaham/NVDA",
    sektor: "Semiconductor",
    exchange: "NASDAQ",
    color: "from-green-600 to-emerald-500",
  },
  {
    id: 2,
    kode: "AAPL",
    nama: "Apple Inc.",
    logo: "/asset/Apple.jpeg",
    link: "/PrediksiSaham/AAPL",
    sektor: "Consumer Electronics",
    exchange: "NASDAQ",
    color: "from-slate-600 to-gray-500",
  },
  {
    id: 3,
    kode: "GOOGL",
    nama: "Alphabet Inc.",
    logo: "/asset/Google.jpeg",
    link: "/PrediksiSaham/GOOGL",
    sektor: "Internet Services",
    exchange: "NASDAQ",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 4,
    kode: "AMZN",
    nama: "Amazon.com Inc.",
    logo: "/asset/Amazon.jpeg",
    link: "#",
    sektor: "E-Commerce & Cloud",
    exchange: "NASDAQ",
    color: "from-orange-600 to-amber-500",
  },
  {
    id: 5,
    kode: "MSFT",
    nama: "Microsoft Corporation",
    logo: "/asset/Microsoft.jpeg",
    link: "#",
    sektor: "Software & Cloud",
    exchange: "NASDAQ",
    color: "from-blue-700 to-indigo-500",
  },
  {
    id: 6,
    kode: "TSLA",
    nama: "Tesla Inc.",
    logo: "/asset/Tesla.jpeg",
    link: "#",
    sektor: "Electric Vehicles",
    exchange: "NASDAQ",
    color: "from-red-600 to-rose-500",
  },
  {
    id: 7,
    kode: "META",
    nama: "Meta Platforms Inc.",
    logo: "/asset/Meta.jpeg",
    link: "#",
    sektor: "Social Media & VR",
    exchange: "NASDAQ",
    color: "from-sky-600 to-blue-500",
  },
  {
    id: 8,
    kode: "NFLX",
    nama: "Netflix Inc.",
    logo: "/asset/Netflix.jpeg",
    link: "#",
    sektor: "Streaming",
    exchange: "NASDAQ",
    color: "from-red-700 to-red-500",
  },
  {
    id: 9,
    kode: "ADBE",
    nama: "Adobe Inc.",
    logo: "/asset/Adobe.jpeg",
    link: "#",
    sektor: "Software",
    exchange: "NASDAQ",
    color: "from-rose-700 to-pink-500",
  },
  {
    id: 10,
    kode: "CRM",
    nama: "Salesforce Inc.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    link: "#",
    sektor: "Cloud CRM",
    exchange: "NYSE",
    color: "from-cyan-600 to-blue-500",
  },
  {
    id: 11,
    kode: "INTC",
    nama: "Intel Corporation",
    logo: "/asset/Intel.jpeg",
    link: "#",
    sektor: "Semiconductor",
    exchange: "NASDAQ",
    color: "from-blue-600 to-sky-500",
  },
  {
    id: 12,
    kode: "AMD",
    nama: "Advanced Micro Devices",
    logo: "/asset/AMD.jpeg",
    link: "#",
    sektor: "Semiconductor",
    exchange: "NASDAQ",
    color: "from-red-600 to-orange-500",
  },
];

export default function PrediksiSaham() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ══════ HERO SECTION ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 pt-24 pb-20">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Decorative blurs */}
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/30 border border-blue-700/40 rounded-full text-blue-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            US Stock Market
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Prediksi <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Saham Amerika</span> Serikat
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            Gunakan teknologi <strong className="text-white">AI &amp; Machine Learning</strong> kami untuk menganalisis dan memprediksi pergerakan harga saham-saham teknologi terbesar di pasar Amerika Serikat.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Prediksi AI
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              Grafik Interaktif
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              XGBoost Model
            </div>
          </div>
        </div>
      </section>

      {/* ══════ STOCK CARDS GRID ══════ */}
      <section className="py-20 bg-slate-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pilih Saham untuk Prediksi</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Klik pada saham di bawah untuk melihat prediksi harga menggunakan model AI kami.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sahamList.map((saham) => {
              const isAvailable = saham.link !== "#";
              return (
                <Link
                  key={saham.id}
                  href={saham.link}
                  className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isAvailable
                      ? "border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      : "border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-70"
                  }`}
                  onClick={(e) => { if (!isAvailable) e.preventDefault(); }}
                >
                  {/* Gradient bar top */}
                  <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${saham.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start gap-4 mb-4">
                    {/* Logo */}
                    <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-blue-200 transition-colors shadow-sm">
                      <Image
                        src={saham.logo}
                        alt={saham.nama}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold transition-colors ${isAvailable ? "text-gray-900 group-hover:text-blue-700" : "text-gray-500"}`}>
                        {saham.kode}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{saham.nama}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span className="font-medium text-gray-600">{saham.sektor}</span>
                    </span>
                    <span className="text-gray-200">•</span>
                    <span className="font-medium text-gray-600">{saham.exchange}</span>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-gray-100">
                    {isAvailable ? (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Coba Prediksi
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Coming Soon
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom info */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-sm text-gray-500">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Prediksi dibuat menggunakan model <strong className="text-gray-700">XGBoost</strong> dengan data historis pasar saham.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
