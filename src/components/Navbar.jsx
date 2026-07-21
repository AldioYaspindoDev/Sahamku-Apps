import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/">
            <div className="shrink-0 flex items-center gap-3">
              <Image
                src="/asset/SahamkuLogo.png"
                alt="Sahamku Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-rose-800 tracking-tight">Sahamku</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-rose-800 font-medium transition-colors">
              Beranda
            </Link>
            {/* Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-gray-700 hover:text-rose-800 font-medium transition-colors">
                Daftar Saham
                <svg className="w-4 h-4 text-gray-400 group-hover:text-rose-800 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 top-full mt-2 w-72 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 bg-white rounded-xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1 z-50">
                <Link href="/PrediksiSaham" className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 group-hover/item:text-rose-800 transition-colors">
                      Saham US
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Analisis & prediksi saham pasar Amerika Serikat
                    </p>
                  </div>
                </Link>

                <Link href="/PrediksiSahamIna" className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 group-hover/item:text-rose-800 transition-colors">
                      Saham INA
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Analisis & prediksi saham pasar Indonesia (IHSG)
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            {/* ================================ */}
            <Link href="/AboutUs" className="text-gray-700 hover:text-rose-800 font-medium transition-colors">
              Tentang Kami
            </Link>
            <Link href="/Register" className="px-6 py-2.5 bg-rose-800 text-white rounded-full font-medium hover:bg-rose-900 transition-all shadow-md hover:shadow-lg">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button (Placeholder) */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-rose-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

