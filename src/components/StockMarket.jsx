export default function StockMarket() {
  const stats = [
    {
      label: "Saham Terpantau",
      value: "500+",
      description: "Cakupan pasar global",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
      ),
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Akurasi Prediksi",
      value: "89%",
      description: "Rata-rata model XGBoost",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      color: "from-emerald-500 to-green-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Update Harian",
      value: "24/7",
      description: "Real-time market feed",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      color: "from-amber-500 to-orange-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Pengguna Aktif",
      value: "10K+",
      description: "Investor tergabung",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
      ),
      color: "from-rose-500 to-pink-400",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Ringkasan <span className="text-rose-800">Pasar</span> Global
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Statistik performa platform dan cakupan analisis AI kami dalam memantau pergerakan bursa saham dunia.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>

                {/* Value */}
                <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</div>

                {/* Description */}
                <div className="text-xs text-slate-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider accent */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-slate-600" />
            <span className="font-medium tracking-wider uppercase">Powered by XGBoost AI</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-slate-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
