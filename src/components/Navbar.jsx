import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-rose-800 font-medium transition-colors">
              Beranda
            </Link>
            <Link href="/PrediksiSaham" className="text-gray-700 hover:text-rose-800 font-medium transition-colors">
              Daftar Saham
            </Link>
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

