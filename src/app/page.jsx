import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import MarquesLogos from "../components/Marqueslogos";
import XGBoost from "../components/XGBoost";
import Cta from "../components/Cta";
import Demo from "../components/Demo";
import StockMarket from "../components/StockMarket";
import StockList from "../components/StockList";
import Footer from "../components/Footer";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroImage />
      <MarquesLogos/>
      <XGBoost />
      <Cta /> 
      <Demo />
      <StockMarket />
      <StockList />
      <Footer />
    </div>
  );
}


