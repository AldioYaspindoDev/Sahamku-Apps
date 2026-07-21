"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      router.replace("/Admins/AuthAdmin/LoginAdmin");
      return;
    }

    // Optional payload verification
    try {
      const payloadBase64 = token.split(".")[1];
      if (payloadBase64) {
        const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(payloadJson);
        
        // Check if token expired
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }
      }
    } catch (err) {
      console.warn("Token tidak valid atau kadaluarsa:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAuthenticated(false);
      setLoading(false);
      router.replace("/Admins/AuthAdmin/LoginAdmin");
      return;
    }

    setIsAuthenticated(true);
    setLoading(false);
  }, [router]);

  return { isAuthenticated, loading };
}
