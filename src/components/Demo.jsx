export default function Demo() {
  const newsItems = [
    {
      title: "Investasi Jangka Sangat Panjang",
      description: "Menurut keyakinan saya, BBRI sedang mengalami fase koreksi yang sehat sebelum melanjutkan tren bullish jangka panjang.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Kondisi Pasar Global",
      description: "Indeks saham AS menunjukkan penguatan di tengah rilis data inflasi yang lebih rendah dari perkiraan analis pasar.",
      image: "https://images.unsplash.com/photo-1611974717525-58a44d1360c0?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Teknologi & AI",
      description: "Sektor teknologi terus memimpin pasar dengan adaptasi AI yang semakin masif di berbagai industri manufaktur.",
      image: "https://images.unsplash.com/photo-1518186239717-2e9b39d7b6b3?auto=format&fit=crop&q=80&w=600",
    }
  ];

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
          {newsItems.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.description}
                </p>
                <button className="mt-6 text-rose-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
