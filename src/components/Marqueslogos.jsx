import Image from 'next/image';

const logos = [
  { name: 'Apple', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
  { name: 'Google', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
  { name: 'Microsoft', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
  { name: 'Amazon', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'NVIDIA', src: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
  { name: 'Tesla', src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
  { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
];

export default function MarquesLogos() {
  return (
    <div>
    <h2 className="text-black text-center font-bold tracking-wide uppercase text-xl mb-4">Temukan Lebih dari 100 
      <span className="text-rose-800 ms-2">Saham US</span></h2>
    <div className="relative w-full overflow-hidden bg-white py-12 border-y border-gray-50">
      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {/* First set of logos */}
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
        {/* Second set of logos for seamless loop */}
        {logos.map((logo, idx) => (
          <div key={`dup-${idx}`} className="mx-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
