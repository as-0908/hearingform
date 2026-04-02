import Link from "next/link";

export default function CompletePage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          送信が完了しました
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          ヒアリング内容をお送りいただきありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          通常2〜3営業日以内にご返信いたします。
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          フォームに戻る
        </Link>
      </div>
    </main>
  );
}
