import Image from "next/image";
import Link from "next/link";
import { signup } from "@/app/login/actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  const errorMap: { [key: string]: string } = {
    "User already registered": "すでに登録されているメールアドレスです。",
    "Password should be at least 6 characters":
      "パスワードは6文字以上で設定してください。",
    "Unable to validate email address: invalid format":
      "メールアドレスの形式が正しくありません。",
  };

  const translatedError = error
    ? errorMap[error] || error
    : null;

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
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          新規登録
        </h1>
        <p className="text-sm text-gray-500 mb-8">アカウントを作成</p>

        <form action={signup} className="space-y-4 mb-6">
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF0013] text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード（6文字以上）"
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF0013] text-sm"
          />
          <input
            type="text"
            name="accessCode"
            placeholder="ジム専用アクセスコード（合言葉）"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF0013] text-sm"
          />

          {translatedError && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg p-2">
              {translatedError}
            </p>
          )}
          {message && (
            <p className="text-green-600 text-sm bg-green-50 rounded-lg p-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#DF0013] text-white font-bold rounded-xl shadow-lg hover:bg-[#b8000f] active:scale-[0.98] transition-all text-base"
          >
            新規登録
          </button>
        </form>

        <p className="mt-4 text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            すでに登録済みの方はこちら（ログイン）
          </Link>
        </p>
      </div>
    </div>
  );
}
