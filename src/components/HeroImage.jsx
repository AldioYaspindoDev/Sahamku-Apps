"use client";
import React from 'react';

export default function HeroImage() {
  return (
    // Outer container dengan padding untuk memberikan efek "card melayang"
    <section className="bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col font-monofonto">
      
      {/* Main Card Pembungkus Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-gray-900/5 min-h-[600px] justify-center">
        
        {/* Background Gradients (Efek Mesh/Blur Bertema Rose Sahamku) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 to-rose-800 z-0"></div>
        {/* Overlay cahaya di bagian atas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent z-0"></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-28">
          
          {/* Subheading Badge */}
          <h2 className="text-rose-900 font-extrabold tracking-widest uppercase text-sm mb-6 bg-rose-200/50 px-4 py-1.5 rounded-full backdrop-blur-xs">
            AI-Driven US Stock Price Predictor
          </h2>
          
          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mb-6 leading-tight">
            Buat <span className="text-rose-800">Prediksi</span> Harga <br className="hidden sm:block" /> Saham Yang Kamu Mau
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-700/90 max-w-2xl mb-10 leading-relaxed font-medium">
            Kami memprediksi harga saham-saham besar US sebagai landasan kamu dalam mengambil keputusan investasi yang lebih cerdas.
          </p>

          {/* Form Input Pencarian Saham */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="w-full max-w-xl flex items-center bg-white p-2 rounded-full shadow-2xl hover:shadow-xl transition-shadow border border-white/50 mb-8"
          >
            <input 
              type="text" 
              placeholder="Cari Kode Saham (misal: NVDA, AAPL, TSLA)..." 
              className="flex-1 bg-transparent border-none outline-none px-6 text-gray-800 placeholder-gray-400 font-medium"
              required
            />
            <button 
              type="submit" 
              className="w-12 h-12 flex items-center justify-center bg-rose-800 hover:bg-rose-900 text-white rounded-full transition-colors shrink-0 shadow-md"
            >
              {/* Arrow Up-Right Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </form>

          {/* Chips Saham Populer */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['NVDA', 'AAPL', 'GOOGL', 'AMZN', 'TSLA'].map((stock) => (
              <span 
                key={stock} 
                className="px-6 py-2 bg-white/70 hover:bg-white border border-rose-200/50 rounded-full text-gray-800 text-sm font-semibold hover:border-rose-800 hover:text-rose-800 transition-all cursor-pointer shadow-xs"
              >
                {stock}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
