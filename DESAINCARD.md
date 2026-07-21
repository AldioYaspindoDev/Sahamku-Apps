# Spesifikasi Desain Feature Card Grid (Minimalis)

Dokumen ini berisi rincian desain antarmuka (UI) untuk komponen *Feature Card* bergaya minimalis, di mana setiap elemen dipisahkan murni menggunakan garis (border), tanpa ada bayangan (shadow) atau jarak (gap) kosong antar kartu.

## 1. Analisis Visual & Struktur
Berdasarkan referensi desain, berikut adalah komposisi utama:
*   **Layout:** *Grid system* dengan 3 kolom pada desktop.
*   **Separasi:** Tidak menggunakan `gap` tradisional. Pemisahan dilakukan menggunakan garis batas (border) tipis berwarna abu-abu sangat muda.
*   **Background:** Putih solid (`#ffffff`). Tidak ada perbedaan warna antara background halaman dan background card.
*   **Padding:** Area dalam (padding) yang luas (sekitar `p-10` atau 40px) memberikan ruang napas (*white space*) yang elegan.
*   **Tipografi:**
    *   **Judul:** Rata kiri, ukuran agak besar (`text-xl`), font medium, warna gelap.
    *   **Deskripsi:** Rata kiri, ukuran standar (`text-sm` atau `text-base`), warna abu-abu *muted* (`text-gray-500`), jarak antar baris (*leading*) santai.
*   **Ikon:** Ikon *outline* (garis luar) tipis di kiri atas, berwarna gelap (hitam/abu-abu gelap).

## 2. Trik CSS untuk "Borders Only" Grid
Untuk mendapatkan tampilan garis pemisah yang sempurna di Tailwind CSS tanpa *double border* (garis ganda yang menumpuk), kita menggunakan teknik membungkus container dengan `border-l` dan `border-t`, lalu setiap item (card) diberi `border-r` dan `border-b`.

## 3. Implementasi Kode (React.js + Tailwind CSS)

Berikut adalah komponen React lengkap yang bisa langsung digunakan:

```jsx
import React from 'react';

// Data statis untuk mengisi konten card
const featuresData = [
  {
    title: "Unmatched accuracy",
    description: "LlamaParse is purpose-built for complex documents with charts and tables.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    title: "Explainability",
    description: "Citations, traceability, and confidence scores on every field.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Developer-ready",
    description: "Python and Typescript SDKs, APIs, and fine-tuned control.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "Enterprise-scale",
    description: "Handle thousands of reports with parallel pipelines.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Compliant & auditable",
    description: "For use in high-governance environments.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Complete solution",
    description: "Bring together document intelligence and agent workflows for end-to-end automation.",
    icon: (
      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

const FeatureGrid = () => {
  return (
    <div className="bg-white min-h-screen p-8 md:p-12 font-sans flex justify-center items-center">
      {/* 
        Container Grid: 
        Menggunakan trik border-l dan border-t pada wrapper utama, 
        lalu border-r dan border-b pada masing-masing item agar garis tidak menumpuk tebal.
      */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-200">
        
        {featuresData.map((feature, index) => (
          <div 
            key={index} 
            className="p-10 border-r border-b border-gray-200 flex flex-col bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Wrapper Ikon */}
            <div className="mb-8">
              {feature.icon}
            </div>
            
            {/* Judul Konten */}
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              {feature.title}
            </h3>
            
            {/* Deskripsi Konten */}
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FeatureGrid;
```
