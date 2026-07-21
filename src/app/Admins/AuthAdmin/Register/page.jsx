"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminService } from "../../../../service/adminAuthService";
import Header from "../../../../components/header";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !role) {
      setError("Semua field harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await AdminService.Register({
        username,
        email,
        password,
        role,
      });

      router.push("/Admins/AuthAdmin/LoginAdmin");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Gagal melakukan registrasi admin";
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
              https://sahamku.id/admin/register
            </div>
          </div>

          {/* Konten Form Register Admin */}
          <div className="p-8 pb-20">
            <div className="mx-auto max-w-md w-full">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-semibold rounded-full mb-2 uppercase tracking-wider">
                  Registrasi Administrator
                </span>
                <h2 className="text-2xl font-bold text-gray-800">Daftar Akun Admin</h2>
                <p className="text-sm text-gray-500 mt-1">Buat akun baru untuk mengelola platform Sahamku</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleRegister}>
                {/* Input Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-gray-900"
                    placeholder="Masukkan Username"
                    required
                  />
                </div>

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

                {/* Input Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Akun</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-gray-900 bg-white"
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
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

                {/* Button Register */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg active:transform active:scale-95 flex items-center justify-center mt-2"
                >
                  {loading ? "Mendaftarkan Admin..." : "Daftar Akun Admin"}
                </button>
              </form>

              {/* Link ke Login Admin */}
              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  Sudah memiliki akun Admin?{" "}
                  <Link href="/Admins/AuthAdmin/LoginAdmin" className="text-rose-800 hover:underline font-medium">
                    Masuk Sekarang
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