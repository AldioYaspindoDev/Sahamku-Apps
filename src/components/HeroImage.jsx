"use client";
import React from 'react';

export default function HeroImage() {
  return (
    <section className="bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col font-monofonto relative overflow-hidden">
      
      {/* Container utama dengan warna flat merah muda (pink) */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col rounded-[2.5rem] bg-rose-800 overflow-hidden shadow-xl border border-pink-200 min-h-[750px] justify-between pt-16 lg:pt-20">
        
        {/* Content Layer: Heading & Description */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mb-6 leading-tight">
            Buat <span className="text-slate-100">Prediksi</span> Harga <br className="hidden sm:block" /> Saham Yang Kamu Mau
          </h1>
          
          {/* Description */}
          <p className="text-slate-300 sm:text-lg lg:text-xl text-gray-700/90 max-w-2xl leading-relaxed font-medium">
            Kami memprediksi harga saham-saham besar US sebagai landasan kamu dalam mengambil keputusan investasi yang lebih cerdas.
          </p>
        </div>

        {/* Layer 3 Cards: Left Card, Center Card (Search & Chart), Right Card */}
        <div className="relative w-full z-10 px-4 sm:px-8 lg:px-12 flex justify-center items-end min-h-[500px] overflow-hidden pb-0">
          
          {/* Left Card - White Side Card (Posisi absolut di kiri luar, memanjang ke atas di samping teks) */}
          <div className="absolute left-0 bottom-0 w-[15%] lg:w-[18%] h-[85%] bg-white rounded-tr-[2.5rem] shadow-lg border-t border-r border-gray-100" />

          {/* Center Card - Main Content Card (Berada di tengah) */}
          <div className="w-full max-w-3xl bg-white rounded-t-[2.5rem] shadow-xl border-t border-x border-gray-100 p-6 sm:p-10 flex flex-col items-center z-20 transform translate-y-20">
            
            {/* Search Input Form */}
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="w-full max-w-xl flex items-center bg-white p-2 rounded-full shadow border border-gray-100 mb-6"
            >
              <input 
                type="text" 
                placeholder="Cari Kode Saham (misal: NVDA, AAPL, TSLA)..." 
                className="flex-1 bg-transparent border-none outline-none px-4 sm:px-6 text-gray-800 placeholder-gray-400 font-medium text-sm sm:text-base"
                required
              />
              <button 
                type="submit" 
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-rose-800 hover:bg-rose-900 text-white rounded-full transition-colors shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </form>

            {/* Popular Stock Chips */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-8">
              {['NVDA', 'AAPL', 'GOOGL', 'AMZN', 'TSLA'].map((stock) => (
                <span 
                  key={stock} 
                  className="px-5 py-1.5 bg-gray-50 hover:bg-rose-50 border border-gray-100 rounded-full text-gray-800 text-xs sm:text-sm font-semibold hover:border-rose-300 hover:text-rose-800 transition-all cursor-pointer"
                >
                  {stock}
                </span>
              ))}
            </div>

            {/* Glowing Stock Chart (Dark Mode - Flat Background) */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-hidden">
              {/* Grid Background Line overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-35" />
              
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Market Forecast</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">+12.4%</span>
                </div>
                
                {/* SVG charts lines (Flat lines) */}
                <div className="h-44 w-full flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    {/* Pink Line */}
                    <path d="M 0 130 Q 80 40 160 110 T 320 30 T 480 80 L 500 90" fill="none" stroke="#ec4899" strokeWidth="3" />
                    
                    {/* Blue Line */}
                    <path d="M 0 90 Q 100 130 200 40 T 400 110 T 500 30" fill="none" stroke="#3b82f6" strokeWidth="3" />
                    
                    {/* Dots */}
                    <circle cx="200" cy="40" r="5" fill="#3b82f6" />
                    <circle cx="320" cy="30" r="5" fill="#ec4899" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card - White Side Card (Posisi absolut di kanan luar, memanjang ke atas di samping teks) */}
          <div className="absolute right-0 bottom-0 w-[15%] lg:w-[18%] h-[85%] bg-white rounded-tl-[2.5rem] shadow-lg border-t border-l border-gray-100" />

        </div>

      </div>
    </section>
  );
}
