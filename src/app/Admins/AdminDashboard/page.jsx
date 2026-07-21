"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/componentsAdmin/sidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminDashboard() {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
        <span>Memverifikasi Sesi Admin...</span>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        {/* Header Bar Dashboard Admin */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white transition-[width,height] ease-linear">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-gray-200" />
            <h1 className="text-base font-semibold text-gray-800">
              Dashboard Utama Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold bg-rose-100 text-rose-800 rounded-full">
              Role: Admin
            </span>
          </div>
        </header>

        {/* Dynamic Main Dashboard Content */}
        <main className="flex-1 p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Saham Dipantau</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">1,248</p>
                <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">↑ 12 saham baru minggu ini</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Akurasi Prediksi XGBoost</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">94.2%</p>
                <span className="text-xs text-gray-500 font-medium mt-1 inline-block">Model V2.4 Active</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Admin Aktif</p>
                <p className="text-3xl font-bold text-rose-800 mt-2">5</p>
                <span className="text-xs text-gray-500 font-medium mt-1 inline-block">Semua terverifikasi</span>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Selamat Datang di Panel Kontrol Sahamku</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Anda berada di halaman utama Dashboard Admin. Gunakan menu sidebar di sebelah kiri untuk mengelola data saham, analisis prediksi, artikel berita, serta pengaturan pengguna platform.
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}