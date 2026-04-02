export interface FormData {
  // Step 1: ご依頼の内容
  requestType: string;
  requestTypeOther: string;
  siteType: string; // "lp" | "website" | ""
  pageCount: string;
  background: string;

  // Step 2: 目的・ターゲット
  purposes: string[];
  purposeOther: string;
  targetAudience: string;

  // Step 3: サイト概要
  siteOverview: string;

  // Step 4: デザイン
  impressions: string[];
  impressionOther: string;
  designTaste: string[];
  designTasteOther: string;
  imageColors: string[];

  // Step 6: 素材・参考サイト
  materials: string[];
  referenceUrls: string;
  existingSiteUrl: string;

  // Step 7: 納品・サーバー・スケジュール
  deliveryMethod: string;
  serverHelp: string;
  serverInfo: string;
  domainHelp: string;
  domainInfo: string;
  schedule: string;
  otherQuestions: string;

  // 連絡先
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export const initialFormData: FormData = {
  requestType: "",
  requestTypeOther: "",
  siteType: "",
  pageCount: "",
  background: "",
  purposes: [],
  purposeOther: "",
  targetAudience: "",
  siteOverview: "",
  impressions: [],
  impressionOther: "",
  designTaste: [],
  designTasteOther: "",
  imageColors: [],
  materials: [],
  referenceUrls: "",
  existingSiteUrl: "",
  deliveryMethod: "",
  serverHelp: "",
  serverInfo: "",
  domainHelp: "",
  domainInfo: "",
  schedule: "",
  otherQuestions: "",
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
};

export const STEP_TITLES = [
  "ご依頼の内容",
  "目的・ターゲット",
  "サイト概要",
  "デザイン",
  "素材・参考サイト",
  "サーバー・スケジュール・連絡先",
];

export const PURPOSE_OPTIONS = [
  "ブランディング",
  "認知拡大",
  "お問い合わせを増やしたい",
  "予約数・販売数を増やしたい",
];

export const IMPRESSION_OPTIONS = [
  "信頼",
  "堅実",
  "親しみ",
  "若々しい",
  "高級感",
  "大衆的",
  "モダン",
  "鮮やか",
  "清潔感",
  "老舗",
  "知的",
  "可愛い",
];

export const DESIGN_TASTE_OPTIONS = [
  "ポップ",
  "カラフル",
  "ナチュラル",
  "シンプル",
  "ミニマル",
  "クール",
  "重厚",
  "フォーマル",
  "ゴージャス",
  "エレガント",
];

export const MATERIAL_OPTIONS = [
  "ロゴマーク",
  "写真データ",
  "サイトの文章原稿",
  "特に無い",
  "分からないので相談したい",
];
