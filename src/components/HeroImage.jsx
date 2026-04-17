export default function HeroImage() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-150 h-150 bg-rose-50 rounded-full blur-3xl opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-black font-bold tracking-wide uppercase text-xl mb-4">
              AI-Driven US Stock Price Predictor
            </h2>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Buat <span className="text-rose-800">Prediksi</span> Harga Saham Yang Kamu Mau
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Kami memprediksi harga saham-saham besar US sebagai landasan kamu dalam mengambil keputusan investasi yang lebih cerdas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-rose-800 text-white text-lg font-bold rounded-full hover:bg-rose-900 transition-all shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1">
                Start Predict
              </button>
              <button className="px-10 py-4 bg-white border-2 border-rose-800 text-rose-800 text-lg font-bold rounded-full hover:bg-rose-50 transition-all">
                Learn More
              </button>
            </div>

            {/* Popular Stocks Chips */}
            <div className="mt-16">
              {/* <p className="text-gray-500 text-sm font-medium mb-4">Prediksi Lebih dari 100 Saham US:</p> */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {['NVDA', 'AAPL', 'GOOGL', 'AMZN', 'TSLA'].map((stock) => (
                  <span key={stock} className="px-6 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-semibold hover:border-rose-800 hover:text-rose-800 transition-colors cursor-default">
                    {stock}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className=
            "relative z-10 p-4 bg-white/30 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <img
                className="w-full h-auto rounded-2xl shadow-lg"
                src="/asset/HeroImage.png"
                alt="Stock Analysis Hero"
              />
            </div>
            {/* Decorative element behind image */}
            <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl -z-10 rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
