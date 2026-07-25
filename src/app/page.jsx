"use client";
import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import MarquesLogos from "../components/Marqueslogos";
import XGBoost from "../components/XGBoost";
import Cta from "../components/Cta";
import Demo from "../components/Article";
import StockMarket from "../components/StockMarket";
import StockList from "../components/StockList";
import Footer from "../components/Footer";
import FadeSection from "../components/FadeSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <FadeSection delay={0.1}>
        <HeroImage />
      </FadeSection>
      
      <FadeSection delay={0.15}>
        <MarquesLogos />
      </FadeSection>
      
      <FadeSection delay={0.2}>
        <XGBoost />
      </FadeSection>
      
      <FadeSection delay={0.2}>
        <Cta /> 
      </FadeSection>
      
      <FadeSection delay={0.2}>
        <Demo />
      </FadeSection>
      
      <FadeSection delay={0.2}>
        <StockMarket />
      </FadeSection>
      
      <FadeSection delay={0.2}>
        <StockList />
      </FadeSection>
      
      <Footer />
    </div>
  );
}
