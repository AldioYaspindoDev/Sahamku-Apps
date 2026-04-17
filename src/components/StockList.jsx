function StockRow({ name, price, change }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700">
          {name[0]}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">Nasdaq Global Select</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-gray-900">${price}</div>
        <div className="text-sm font-medium text-green-600">{change}</div>
      </div>
    </div>
  );
}

export default function StockList() {
  return (
    <main className="bg-white">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Chart Display */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-100 rounded-4xl opacity-50 blur-xl group-hover:opacity-70 transition-opacity"></div>
            <img
              className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100"
              src="https://images.unsplash.com/photo-1611974717525-58a44d1360c0?auto=format&fit=crop&q=80&w=800"
              alt="Stock Chart Visualization"
            />
          </div>

          {/* Stock List Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Pasar Teratas</h3>
              <button className="text-rose-800 font-semibold hover:underline">Lihat Semua &gt;</button>
            </div>
            
            <div className="space-y-2">
              <StockRow name="NVDA" price="198.81" change="+0.26%" />
              <StockRow name="AAPL" price="182.52" change="+0.15%" />
              <StockRow name="GOOGL" price="145.32" change="-0.08%" />
              <StockRow name="TSLA" price="210.45" change="+1.24%" />
              <StockRow name="MSFT" price="375.12" change="+0.45%" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
