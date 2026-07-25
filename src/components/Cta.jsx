import Link from "next/link";
export default function Cta() {
  return (
    <section className="py-24 bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1 h-64 lg:h-full min-h-100">
              <img
                className="w-full h-full object-cover"
                src="/asset/Grafik.webp"
                alt="Investment Simulation"
              />
            </div>
            
            {/* Text Section */}
            <div className="order-1 lg:order-2 p-12 lg:p-20 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Simulasikan <span className="text-rose-800">Investasi</span> Saham Anda
              </h2>
              <p className="text-xl text-gray-600 font-light mb-10">
                Gunakan alat simulasi kami untuk melihat potensi keuntungan dari strategi investasi Anda berdasarkan prediksi AI kami yang akurat.
              </p>
              <Link href="/PrediksiSaham" className="px-10 py-4 bg-rose-800 text-white text-lg font-bold rounded-full hover:bg-rose-900 transition-all shadow-lg hover:shadow-rose-800/20 active:scale-95">
                Coba Simulasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
