"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Articles() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/news/").then((res) => res.json()).then((data) => {
      setNews(data);
      setLoading(false);
    }).catch((err) => {
      console.error("Gagal Mengambil berita : ", err);
      setLoading(false);
    })
  });

  if(loading) return <p className="text-center text-gray-600">Memuat Berita...</p>

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Kondisi <span className="text-rose-800">Pasar</span> Hari Ini
          </h2>
          <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Berita terbaru dan analisis pasar untuk membantu Anda tetap terinformasi.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? (news.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={item.headline}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-800 transition-colors">
                  {item.headline}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.summary}
                </p>
                <Link href={`/Articles/${item.id}`} className="mt-6 text-rose-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))) : (
            <p className="text-gray-500">Tidak ada berita tersedia saat ini.</p>
          )}
        </div>
      </div>
    </section>
  );
}
