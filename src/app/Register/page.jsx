"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hashed_password, setHashedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/users/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          hashed_password,
        }),
      });

      if (!username || !email || !hashed_password) {
        setError("semua field harus diisi");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "gagal registrasi");
      }

      router.push("/Login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-20">
      <div className="shadow-2xl mx-auto p-20 w-140 rounded-2xl">
        <h1 className="text-center font-bold mb-9 text-2xl">CREATE ACCOUNT</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-5">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full h-10 border p-2 border-gray-700 rounded-sm "
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email @"
              className="w-full h-10 border p-2 border-gray-700 rounded-sm "
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2">Password</label>
            <input
              type="text"
              value={hashed_password}
              onChange={(e) => setHashedPassword(e.target.value)}
              placeholder="Password Must be 8 Character"
              className="w-full h-10 border p-2 border-gray-700 rounded-sm "
            />
          </div>

          <button
            type="submit"
            className="mb-3 bg-rose-800 text-white w-full p-2 rounded"
            disabled={loading}
          >
            REGISTER
          </button>

          <span className="">
            Alredy have Account ?
            <Link href="/Login" className="text-blue-600 hover:text-gray-700">
              Click Me
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
