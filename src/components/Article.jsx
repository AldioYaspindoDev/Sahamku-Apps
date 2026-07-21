"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArticleServie } from "../service/articleService";
export default function Articles() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const HandleGetArticle = async () => {
    setLoading(true);
    try {
      const response = await ArticleServie.getArticle();
      setNews(response)
    } catch (error) {
      console.error("gagal mendapatkan data article",error.message)
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    HandleGetArticle();
  }, []);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-200">
          {news.length > 0 ? (news.map((item, index) => (
            <div key={index} className="p-10 border-r border-b border-gray-200 flex flex-col bg-white hover:bg-gray-50 transition-colors duration-200 group">
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden rounded-xl mb-6 border border-gray-100 shadow-sm">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={item.headline}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-800 transition-colors leading-snug">
                  {item.headline}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {item.summary}
                </p>
                <Link href={`/Articles/${item.id}`} className="mt-auto text-rose-800 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm">
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))) : (
            <div className="p-10 border-r border-b border-gray-200 text-center col-span-3">
              <p className="text-gray-500">Tidak ada berita tersedia saat ini.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
