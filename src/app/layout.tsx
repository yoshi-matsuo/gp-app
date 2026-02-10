import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GP Activity Tracker",
  description: "スポーツクラブ会員向け 活動量・カロリー管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg text-gray-900">{children}</body>
    </html>
  );
}
