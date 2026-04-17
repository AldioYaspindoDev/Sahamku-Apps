import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Data saham
const sahamList = [
  {
    id: 1,
    kode: "NVDA",
    nama: "NVIDIA Corporation",
    logo: "/asset/Nvidia.jpeg",
    link: "/PrediksiSaham/NVDA",
  },
  {
    id: 2,
    kode: "AAPL",
    nama: "Apple Inc.",
    logo: "/asset/Apple.jpeg",
    link: "/PrediksiSaham/AAPL",
  },
  {
    id: 3,
    kode: "GOOGL",
    nama: "Alphabet Inc.",
    logo: "/asset/Google.jpeg",
    link: "/PrediksiSaham/GOOGL",
  },
  {
    id: 4,
    kode: "AMZN",
    nama: "Amazon.com Inc.",
    logo: "/asset/Amazon.jpeg",
    link: "#",
  },
  {
    id: 5,
    kode: "MSFT",
    nama: "Microsoft Corporation",
    logo: "/asset/Microsoft.jpeg",
    link: "#",
  },
  {
    id: 6,
    kode: "TSLA",
    nama: "Tesla Inc.",
    logo: "/asset/Tesla.jpeg",
    link: "#",
  },
  {
    id: 7,
    kode: "META",
    nama: "Meta Platforms Inc.",
    logo: "/asset/Meta.jpeg",
    link: "#",
  },
  {
    id: 8,
    kode: "NFLX",
    nama: "Netflix Inc.",
    logo: "/asset/Netflix.jpeg",
    link: "#",
  },
  {
    id: 9,
    kode: "ADBE",
    nama: "Adobe Inc.",
    logo: "/asset/Adobe.jpeg",
    link: "#",
  },
  {
    id: 10,
    kode: "CRM",
    nama: "Salesforce Inc.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    link: "#",
  },
  {
    id: 11,
    kode: "INTC",
    nama: "Intel Corporation",
    logo: "/asset/Intel.jpeg",
    link: "#",
  },
  {
    id: 12,
    kode: "AMD",
    nama: "Advanced Micro Devices",
    logo: "/asset/AMD.jpeg",
    link: "#",
  },
];

// Komponen card saham reusable
function CardSaham({ kode, nama, logo, link }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex gap-5 items-start hover:shadow-2xl hover:border-rose-200 transition-all duration-300 group">
      {/* Logo */}
      <div className="shrink-0 p-1 border-2 border-zinc-100 rounded-full group-hover:border-rose-200 transition-colors">
        <Image
          src={logo}
          alt={nama}
          width={70}
          height={70}
          className="rounded-full object-cover"
        />
      </div>

      {/* Informasi */}
      <div className="flex-1">
        <h3 className="text-zinc-900 text-2xl font-bold font-['Poppins'] leading-tight">
          {kode}
        </h3>
        <p className="text-zinc-500 text-lg font-medium font-['Poppins'] mt-1">
          {nama}
        </p>
        <hr className="w-full border-t border-zinc-100 my-4" />
        <Link 
          href={link}
          className={`inline-flex items-center gap-2 text-xl font-semibold font-['Poppins'] transition-all ${
            link !== "#" 
              ? "text-rose-800 hover:text-rose-900 hover:translate-x-1" 
              : "text-zinc-300 cursor-not-allowed"
          }`}
        >
          {link !== "#" ? "Coba Prediksi →" : "Coming Soon"}
        </Link>
      </div>
    </div>
  );
}

export default function PrediksiSaham() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 font-['Poppins'] tracking-tight">
              Pilih Saham untuk <span className="text-rose-800">Prediksi</span>
            </h1>
            <p className="mt-4 text-zinc-500 text-xl font-light">
              Gunakan teknologi AI kami untuk menganalisa pergerakan harga saham favorit Anda.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sahamList.map((saham) => (
              <CardSaham
                key={saham.id}
                kode={saham.kode}
                nama={saham.nama}
                logo={saham.logo}
                link={saham.link}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
