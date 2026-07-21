"use client"
import { useEffect, useState } from "react"
import { MarketService } from "../../service/marketService"
import Navbar from "../../components/Navbar";

export default function AllMarketData(){

    const [market, setMarket] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetDataMarket = async () => {
        setLoading(true);
        try {
            const response = await MarketService.getDataMarket();
            setMarket(response);
        } catch (error) {
            console.error("Gagal Mendapatkan data market",error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        GetDataMarket();
    },[]);

    const getLogo = (stockName) => {
        const logos = {
          "NVDA": "/asset/Nvidia.jpeg",
          "AAPL": "/asset/Apple.jpeg",
          "GOOGL": "/asset/Google.jpeg",
          "TSLA": "/asset/Tesla.jpeg",
          "MSFT": "/asset/Microsoft.jpeg",
          "MU": "/asset/MU.jpeg",
          "AVGO": "/asset/AVGO.jpeg",
          "AMD": "/asset/AMD.jpeg",
          "INTC": "/asset/INTC.jpeg",
          "CSCO": "/asset/CSCO.jpeg",
          "ORCL": "/asset/ORCL.jpeg",
          "TXN": "/asset/TXN.jpeg",
        };
        return logos[stockName] || "/asset/SahamkuLogo.png";
    };

    return(
        <main className="bg-white min-h-screen font-monofonto">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Pantau Seluruh <span className="text-rose-800">Pasar Saham</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
                        Dapatkan update harga realtime dan prediksi performa saham harian Anda.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-800"></div>
                        <p className="mt-4 text-gray-500">Memuat data pasar...</p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-10">
                        {/* 
                          Container Grid: 
                          Menggunakan trik border-l dan border-t pada wrapper utama, 
                          lalu border-r dan border-b pada masing-masing item agar garis tidak menumpuk tebal.
                        */}
                        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-200">
                            {market.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="p-10 border-r border-b border-gray-200 flex flex-col bg-white hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
                                >
                                    {/* Logo Saham */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <img 
                                            src={getLogo(item.name)} 
                                            alt={item.name} 
                                            onError={(e) => {
                                                e.target.onerror = null; // Mencegah infinite loop jika logo fallback juga hilang
                                                e.target.src = "/asset/SahamkuLogo.png";
                                            }}
                                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                                        />
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                                            USD
                                        </span>
                                    </div>
                                    
                                    {/* Simbol Saham */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-rose-800 transition-colors">
                                        {item.name}
                                    </h3>
                                    
                                    {/* Detail Harga & Perubahan */}
                                    <div className="mt-4 flex flex-col">
                                        <span className="text-2xl font-extrabold text-gray-900 font-mono">
                                            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                        </span>
                                        <span className={`text-sm font-semibold mt-1.5 flex items-center gap-1 ${item.percentage_change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {item.percentage_change >= 0 ? '▲' : '▼'}{' '}
                                            {typeof item.change === 'number' ? Math.abs(item.change).toFixed(2) : item.change} ({item.percentage_change >= 0 ? '+' : ''}{typeof item.percentage_change === 'number' ? item.percentage_change.toFixed(2) : item.percentage_change}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}