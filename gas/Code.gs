/**
 * Google Apps Script - ヒアリングフォーム スプレッドシート連携
 *
 * 使い方:
 * 1. Google スプレッドシートを開く
 * 2. 拡張機能 > Apps Script を選択
 * 3. このコードを貼り付けて保存
 * 4. デプロイ > 新しいデプロイ を選択
 * 5. 種類: ウェブアプリ
 * 6. アクセス: 全員 を選択
 * 7. デプロイ後に表示されるURLを NEXT_PUBLIC_GAS_URL に設定
 */

var HEADERS = [
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
  "電話番号"
];

function getRequestTypeLabel(data) {
  switch (data.requestType) {
    case "new": return "新規サイトの制作";
    case "modify": return "既存サイトの修正";
    case "other": return "その他: " + (data.requestTypeOther || "");
    default: return "";
  }
}

function getSiteTypeLabel(data) {
  if (data.siteType === "lp") return "LP（ランディングページ）";
  if (data.siteType === "website") return "Webサイト（" + (data.pageCount || "ページ数未定") + "）";
  return "";
}

function getHelpLabel(value) {
  switch (value) {
    case "yes": return "必要";
    case "no": return "必要でない";
    case "consult": return "分からないので相談したい";
    default: return "";
  }
}

function joinArray(arr, extra) {
  var items = (arr || []).slice();
  if (extra) items.push(extra);
  return items.join("、");
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // ヘッダーがなければ追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // ヘッダー行の書式設定
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#e8eaf6");
    }

    var now = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

    var row = [
      now,
      getRequestTypeLabel(data),
      getSiteTypeLabel(data),
      data.background || "",
      data.companyPhilosophy || "",
      data.strengths || "",
      data.competitors || "",
      joinArray(data.purposes, data.purposeOther),
      data.targetAudience || "",
      data.siteOverview || "",
      joinArray(data.features, data.featureOther),
      joinArray(data.impressions, data.impressionOther),
      joinArray(data.designTaste, data.designTasteOther),
      data.imageColor || "",
      (data.materials || []).join("、"),
      data.referenceUrls || "",
      data.existingSiteUrl || "",
      getHelpLabel(data.serverHelp),
      data.serverInfo || "",
      getHelpLabel(data.domainHelp),
      data.domainInfo || "",
      data.schedule || "",
      data.otherQuestions || "",
      data.companyName || "",
      data.contactName || "",
      data.email || "",
      data.phone || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
