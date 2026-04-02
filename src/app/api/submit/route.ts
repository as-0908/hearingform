import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { FormData } from "@/types/form";

function getRequestTypeLabel(data: FormData): string {
  switch (data.requestType) {
    case "new":
      return "新規サイトの制作";
    case "modify":
      return "既存サイトの修正";
    case "other":
      return `その他: ${data.requestTypeOther}`;
    default:
      return "";
  }
}

function getSiteTypeLabel(data: FormData): string {
  if (data.siteType === "lp") return "LP（ランディングページ）";
  if (data.siteType === "website")
    return `Webサイト（${data.pageCount || "ページ数未定"}）`;
  return "";
}

function getHelpLabel(value: string): string {
  switch (value) {
    case "yes":
      return "必要";
    case "no":
      return "必要でない";
    case "consult":
      return "分からないので相談したい";
    default:
      return "";
  }
}

function formatRow(data: FormData): string[] {
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  return [
    now,
    // 依頼内容
    getRequestTypeLabel(data),
    getSiteTypeLabel(data),
    data.background,
    // 企業情報
    data.companyPhilosophy,
    data.strengths,
    data.competitors,
    // 目的・ターゲット
    [...data.purposes, data.purposeOther].filter(Boolean).join("、"),
    data.targetAudience,
    // サイト概要
    data.siteOverview,
    [...data.features, data.featureOther].filter(Boolean).join("、"),
    // デザイン
    [...data.impressions, data.impressionOther].filter(Boolean).join("、"),
    [...data.designTaste, data.designTasteOther].filter(Boolean).join("、"),
    data.imageColor,
    // 素材・参考
    data.materials.join("、"),
    data.referenceUrls,
    data.existingSiteUrl,
    // サーバー・ドメイン
    getHelpLabel(data.serverHelp),
    data.serverInfo,
    getHelpLabel(data.domainHelp),
    data.domainInfo,
    // スケジュール
    data.schedule,
    data.otherQuestions,
    // 連絡先
    data.companyName,
    data.contactName,
    data.email,
    data.phone,
  ];
}

const HEADERS = [
  "送信日時",
  "ご依頼の内容",
  "サイトの種類",
  "ご依頼の背景",
  "企業理念・コンセプト",
  "強み・特徴",
  "競合他社",
  "目的・期待する効果",
  "ターゲット層",
  "サイト概要",
  "追加機能",
  "与えたい印象",
  "デザインテイスト",
  "イメージカラー",
  "提供可能な素材",
  "参考サイトURL",
  "既存サイトURL",
  "サーバー設定",
  "サーバー情報",
  "ドメイン設定",
  "ドメイン情報",
  "スケジュール",
  "その他",
  "会社名",
  "担当者名",
  "メールアドレス",
  "電話番号",
];

async function getAuthClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!credentials) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set");
  }

  const parsed = JSON.parse(credentials);
  const auth = new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

async function appendToSheet(data: FormData) {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is not set");
  }

  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  // Check if headers exist, if not add them
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:AA1",
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }

  // Append the data row
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:AA",
    valueInputOption: "RAW",
    requestBody: { values: [formatRow(data)] },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Try to save to Google Sheets if configured
    const hasGoogleConfig =
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID;

    if (hasGoogleConfig) {
      await appendToSheet(data);
    } else {
      // Fallback: log to console for development
      console.log("=== New Hearing Form Submission ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("===================================");
      console.log(
        "To save to Google Sheets, set GOOGLE_SERVICE_ACCOUNT_KEY and GOOGLE_SPREADSHEET_ID environment variables."
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
