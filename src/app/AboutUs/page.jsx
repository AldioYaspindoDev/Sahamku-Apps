"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─── Animated Counter Hook ─── */
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}

/* ─── Fade In on Scroll Hook ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ─── Section Wrapper ─── */
function FadeSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════════════ HERO BANNER ═══════════════════════ */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-32">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-rose-800/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-rose-800/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeSection>
            <p className="text-rose-400 font-semibold tracking-widest uppercase text-sm mb-4">
              Tentang Kami
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Membangun Masa Depan{" "}
              <span className="text-rose-500">Investasi Cerdas</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Sahamku memanfaatkan kekuatan kecerdasan buatan dan algoritma
              machine learning untuk memprediksi pergerakan harga saham
              Amerika Serikat secara akurat dan real-time.
            </p>
          </FadeSection>
        </div>

        {/* Animated grid lines decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </section>

      {/* ═══════════════════════ STATS BAR ═══════════════════════ */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Saham Terpantau", value: 500, suffix: "+" },
              { label: "Akurasi Prediksi", value: 89, suffix: "%" },
              { label: "Data Historis", value: 10, suffix: " Tahun" },
              { label: "Update Harian", value: 24, suffix: "/7" },
            ].map((stat, i) => {
              const { count, ref } = useCountUp(stat.value);
              return (
                <div
                  key={i}
                  ref={ref}
                  className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="text-3xl md:text-4xl font-bold text-rose-800 mb-1">
                    {count}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-500 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ VISI & MISI ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Visi &amp; <span className="text-rose-800">Misi</span> Kami
              </h2>
              <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
                Kami berkomitmen untuk mendemokratisasi analisis pasar saham melalui teknologi AI terdepan.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeSection delay={0.1}>
              <div className="p-10 rounded-3xl bg-rose-50/50 border border-rose-100 h-full">
                <div className="w-14 h-14 bg-rose-800 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  Menjadi platform prediksi saham berbasis AI terdepan di Indonesia yang membantu setiap investor — dari pemula hingga profesional — mengambil keputusan investasi yang lebih cerdas, tepat, dan berbasis data.
                </p>
              </div>
            </FadeSection>

            <FadeSection delay={0.2}>
              <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 h-full">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                <ul className="space-y-3 text-gray-600 font-light text-lg">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-800 shrink-0"></span>
                    Menyediakan prediksi harga saham yang akurat menggunakan algoritma XGBoost berperforma tinggi.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-800 shrink-0"></span>
                    Memberikan informasi pasar real-time dan analisis berita terkini.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-800 shrink-0"></span>
                    Mengedukasi investor Indonesia tentang pasar saham global.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-800 shrink-0"></span>
                    Membangun tools simulasi investasi yang interaktif dan mudah digunakan.
                  </li>
                </ul>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TEKNOLOGI ═══════════════════════ */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Teknologi <span className="text-rose-800">Di Balik</span> Sahamku
              </h2>
              <p className="mt-4 text-xl text-gray-500 font-light max-w-3xl mx-auto">
                Kami menggunakan stack teknologi modern dan algoritma machine learning canggih untuk memberikan prediksi terbaik.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "XGBoost Algorithm",
                description:
                  "Algoritma gradient boosting yang dilatih pada data historis 10 tahun terakhir untuk memahami pola pergerakan harga saham dengan akurasi tinggi.",
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-rose-800",
              },
              {
                title: "Real-Time Data",
                description:
                  "Integrasi API pasar saham untuk mendapatkan data harga terkini secara real-time, memastikan prediksi selalu berdasarkan informasi terbaru.",
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                color: "bg-gray-900",
              },
              {
                title: "Next.js & Django",
                description:
                  "Frontend modern dengan Next.js dan backend robust dengan Django REST Framework untuk performa optimal dan pengalaman pengguna terbaik.",
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                color: "bg-rose-800",
              },
            ].map((tech, i) => (
              <FadeSection key={i} delay={i * 0.15}>
                <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className={`w-14 h-14 ${tech.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CARA KERJA ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Cara Kerja <span className="text-rose-800">Prediksi</span> Kami
              </h2>
              <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
                Proses sederhana namun canggih di balik setiap prediksi harga saham.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pengumpulan Data",
                desc: "Mengambil data historis harga saham, volume, dan indikator teknikal dari berbagai sumber terpercaya.",
              },
              {
                step: "02",
                title: "Preprocessing",
                desc: "Data dibersihkan, dinormalisasi, dan fitur-fitur penting diekstrak untuk pelatihan model.",
              },
              {
                step: "03",
                title: "Training Model",
                desc: "Algoritma XGBoost dilatih menggunakan data historis untuk mengenali pola pergerakan harga.",
              },
              {
                step: "04",
                title: "Prediksi Akurat",
                desc: "Model yang sudah terlatih memberikan prediksi harga saham dengan tingkat akurasi tinggi.",
              },
            ].map((item, i) => (
              <FadeSection key={i} delay={i * 0.1}>
                <div className="relative p-8 rounded-3xl bg-gray-50 border border-gray-100 h-full group hover:bg-rose-50/50 hover:border-rose-100 transition-all duration-300">
                  <span className="text-5xl font-black text-rose-800/10 group-hover:text-rose-800/20 transition-colors absolute top-4 right-6">
                    {item.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-rose-800 text-white rounded-xl flex items-center justify-center font-bold text-sm mb-5">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DEVELOPER PROFILE ═══════════════════════ */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-800/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-800/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Developer <span className="text-rose-500">Di Balik</span> Sahamku
              </h2>
              <p className="mt-4 text-xl text-gray-400 font-light max-w-2xl mx-auto">
                Proyek ini dikembangkan dengan penuh dedikasi dan semangat untuk membantu investor Indonesia.
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                {/* Avatar placeholder with initials */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-800 to-rose-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-800/20">
                  <span className="text-4xl font-bold text-white">AY</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  Muhammad Aldio Yaspindo
                </h3>
                <p className="text-rose-400 font-medium mb-6">
                  Full-Stack Developer & AI Enthusiast
                </p>
                <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-lg mx-auto">
                  Seorang developer yang passionate terhadap teknologi AI dan machine learning.
                  Membangun Sahamku sebagai proyek untuk mengkombinasikan keahlian
                  full-stack development dengan kecerdasan buatan dalam domain keuangan.
                </p>
                {/* Social links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/AldioYaspindoDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rose-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammad-aldio-yaspindo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rose-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/aldiok__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rose-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:m.aldioyaspindo@gmail.com"
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rose-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══════════════════════ TECH STACK ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Tech <span className="text-rose-800">Stack</span>
              </h2>
              <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
                Teknologi yang kami gunakan untuk membangun Sahamku.
              </p>
            </div>
          </FadeSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Python", category: "Backend" },
              { name: "Django", category: "Backend" },
              { name: "XGBoost", category: "ML" },
              { name: "Next.js", category: "Frontend" },
              { name: "React", category: "Frontend" },
              { name: "TailwindCSS", category: "Styling" },
            ].map((tech, i) => (
              <FadeSection key={i} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:border-rose-200 hover:bg-rose-50/30 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 bg-rose-800/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-rose-800/20 transition-colors">
                    <span className="text-rose-800 font-bold text-lg">
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{tech.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{tech.category}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA SECTION ═══════════════════════ */}
      <section className="py-24 bg-rose-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeSection>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Siap Memulai <span className="text-rose-800">Prediksi</span>?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
              Bergabunglah bersama ribuan investor yang sudah menggunakan Sahamku untuk membuat keputusan investasi yang lebih cerdas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/PrediksiSaham"
                className="px-10 py-4 bg-rose-800 text-white text-lg font-bold rounded-full hover:bg-rose-900 transition-all shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1"
              >
                Mulai Prediksi Sekarang
              </Link>
              <Link
                href="/"
                className="px-10 py-4 bg-white border-2 border-rose-800 text-rose-800 text-lg font-bold rounded-full hover:bg-rose-50 transition-all"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
