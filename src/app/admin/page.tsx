"use client";

import { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/lib/admin-data";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("travel_admin_logged_in");
    if (loggedIn === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("travel_admin_logged_in", "true");
      setLoginError("");
      router.push("/admin/dashboard");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#071d1a] via-[#0f3d2e] to-[#153f35] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden flex-col justify-between bg-gradient-to-br from-[#0d5c46] to-[#0b2d22] p-10 lg:flex">
            <div>
              <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
                Admin Portal
              </p>
              <h1 className="max-w-md text-4xl font-bold leading-tight">
                Manage travel packages and blogs in one place
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                This is a UI-only admin panel for your travel website. Login is
                hardcoded for now just for testing and design preview.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-white/70">Demo username</p>
                <p className="mt-1 text-lg font-semibold">admin</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-white/70">Demo password</p>
                <p className="mt-1 text-lg font-semibold">admin123</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 text-[#123128] sm:p-10">
            <div className="mx-auto max-w-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#0d5c46]">
                Welcome Back
              </p>
              <h2 className="text-3xl font-bold">Admin Login</h2>
              <p className="mt-3 text-sm leading-6 text-[#4d6b62]">
                Enter the admin credentials to access the dashboard.
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Username
                  </label>
                  <div className="flex items-center rounded-2xl border border-[#d7e5df] bg-[#f6fbf9] px-4">
                    <User className="h-4 w-4 text-[#5f7d74]" />
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>
                  <div className="flex items-center rounded-2xl border border-[#d7e5df] bg-[#f6fbf9] px-4">
                    <Lock className="h-4 w-4 text-[#5f7d74]" />
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#0d5c46] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#094735]"
                >
                  Login to Admin Panel
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-[#e3efe9] bg-[#f8fcfa] p-4 text-sm text-[#47655c] lg:hidden">
                <p>
                  <span className="font-semibold text-[#123128]">
                    Username:
                  </span>{" "}
                  admin
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-[#123128]">
                    Password:
                  </span>{" "}
                  admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}