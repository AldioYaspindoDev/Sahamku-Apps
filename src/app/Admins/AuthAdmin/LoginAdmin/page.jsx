"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminService } from "../../../../service/adminAuthService";
import Header from "../../../../components/header";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Semua field harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await AdminService.Login({
        email,
        password,
      });

      const token = response.access_token;
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      // Verifikasi payload token untuk memastikan role === 'admin'
      let isRoleAdmin = false;
      try {
        const payloadBase64 = token.split(".")[1];
        if (payloadBase64) {
          const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
          const payload = JSON.parse(payloadJson);
          if (payload.role === "admin") {
            isRoleAdmin = true;
          }
        }
      } catch (err) {
        console.error("Gagal mendecode token:", err);
      }

      // Juga cek role jika dikembalikan langsung di response
      if (response.role === "admin") {
        isRoleAdmin = true;
      }

      // Konfirmasi Role Admin
      if (!isRoleAdmin && response.role && response.role !== "admin") {
        setError("Akses ditolak: Akun Anda tidak memiliki otoritas Role Admin");
        setLoading(false);
        return;
      }

      // Simpan token ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", "admin");

      router.push("/Admins/AdminDashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Gagal melakukan login admin";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Header />
      {/* Background utama: Slate gelap dengan layout window desktop */}
      <div className="min-h-screen bg-slate-900 flex items-end justify-center px-4 pb-0 font-sans overflow-hidden">
        {/* Container Window Desktop */}
        <div className="w-full max-w-4xl bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col translate-y-12 transition-all duration-300">
          {/* Header Bar Desktop */}
          <div className="bg-gray-200 px-4 py-3 flex items-center gap-2 border-b border-gray-300">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>

            {/* Address Bar */}
            <div className="mx-auto bg-white px-3 py-1 text-xs text-gray-500 rounded-md font-mono border border-gray-300 shadow-inner w-1/2 text-center truncate">
              https://sahamku.id/admin/login
            </div>
          </div>

          {/* Konten Form Login Admin */}
          <div className="p-8 pb-20">
            <div className="mx-auto max-w-md w-full">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-semibold rounded-full mb-2 uppercase tracking-wider">
                  Portal Admin
                </span>
                <h2 className="text-2xl font-bold text-gray-800">Login Admin Sahamku</h2>
                <p className="text-sm text-gray-500 mt-1">Silakan masukkan email dan password akun admin Anda</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                {/* Input Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Admin</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-gray-900"
                    placeholder="admin@sahamku.id"
                    required
                  />
                </div>

                {/* Input Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Button Login Admin */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg active:transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? "Memverifikasi Otoritas Admin..." : "Masuk ke Dashboard Admin"}
                </button>
              </form>

              {/* Link ke Register Admin */}
              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  Belum memiliki akun Admin?{" "}
                  <Link href="/Admins/AuthAdmin/Register" className="text-rose-800 hover:underline font-medium">
                    Daftar Admin Baru
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}