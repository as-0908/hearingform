import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ヒアリングフォーム | Web制作お問い合わせ",
  description:
    "Web制作のご依頼に関するヒアリングフォームです。サイトの目的やデザインのご要望をお聞かせください。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        {children}
      </body>
    </html>
  );
}
