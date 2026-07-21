"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthService } from "../../service/authService";
import Header from "../../components/header";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hashed_password, setHashedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

     if (!username || !email || !hashed_password) {
        setError("semua field harus diisi");
        setLoading(false);
        return;
    }
    setLoading(true);
    setError("");
    try {
      await AuthService.register({
        username,
        email,
        hashed_password,
      });
      router.push("/Login");
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || "gagal registrasi";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Header />
      {/* Background utama: Biru tua gelap dengan overflow-hidden agar terpotong di bawah */}
      <div className="min-h-screen bg-slate-900 flex items-end justify-center px-4 pb-0 font-sans overflow-hidden">
        
        {/* Container bergaya Window Browser Desktop (Lebih lebar, rounded atas, digeser sedikit ke bawah) */}
        <div className="w-full max-w-4xl bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col translate-y-12 transition-all duration-300">
          
          {/* Header/Top Bar Browser (Khas Mac/Desktop) */}
          <div className="bg-gray-200 px-4 py-3 flex items-center gap-2 border-b border-gray-300">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            
            {/* Address Bar Palsu */}
            <div className="mx-auto bg-white px-3 py-1 text-xs text-gray-500 rounded-md font-mono border border-gray-300 shadow-inner w-1/2 text-center truncate">
              https://sahamku.id/register
            </div>
          </div>

          {/* Konten Form Register */}
          <div className="p-8 pb-20">
            <div className="mx-auto max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Daftar Akun Baru</h2>
              <p className="text-sm text-gray-500 text-center mb-6">Silakan buat akun Sahamku Anda</p>

              {/* Menampilkan pesan error jika ada */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleRegister}>
                {/* Input Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>

                {/* Input Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    placeholder="nama@email.com"
                    required
                  />
                </div>

                {/* Input Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={hashed_password}
                    onChange={(e) => setHashedPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Button Register */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-900 disabled:bg-red-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg active:transform active:scale-95 flex items-center justify-center"
                >
                  {loading ? "Mohon Tunggu..." : "Register"}
                </button>
              </form>

              {/* Link Login */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <Link href="/Login" className="text-blue-600 hover:underline font-medium">
                    Masuk Sekarang
                  </Link>
                </span>
              </div>

              {/* Divider untuk opsi OAuth */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500 font-medium">ATAU</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Button Login dengan Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg transition duration-200 shadow-sm active:bg-gray-100"
              >
                {/* SVG Logo Google */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Lanjutkan dengan Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
