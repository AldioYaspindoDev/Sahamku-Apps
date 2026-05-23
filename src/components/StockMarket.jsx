export default function StockMarket() {
  const stats = [
    { label: "Saham Terpantau", value: "500+" },
    { label: "Akurasi Prediksi", value: "89%"},
    { label: "Update Harian", value: "24/7"},
    { label: "Pengguna Aktif", value: "10K+" },
  ];

  return (
    <section className="py-25 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-800 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-800 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ringkasan <span className="text-rose-800">Pasar</span> Global
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Data real-time dan statistik performa model AI kami dalam menganalisis pergerakan bursa saham Amerika.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2 text-rose-500">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
