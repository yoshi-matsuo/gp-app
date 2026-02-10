"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DF0013] to-[#8B000C] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <div className="mx-auto mb-6">
          <Image
            src="/logo.png"
            alt="Go Panda Logo"
            width={180}
            height={180}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">GP Activity Tracker</h1>
        <p className="text-sm text-gray-500 mb-8">活動量・カロリー管理</p>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="ユーザーID"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF0013] text-sm"
            defaultValue="demo_user"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF0013] text-sm"
            defaultValue="password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#DF0013] text-white font-bold rounded-xl shadow-lg hover:bg-[#b8000f] active:scale-[0.98] transition-all text-base"
        >
          ログイン
        </button>
        <p className="text-xs text-gray-400 mt-4">※ Phase 1: 認証なしモック</p>
      </div>
    </div>
  );
}
