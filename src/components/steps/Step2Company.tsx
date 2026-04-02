"use client";

import { FormData } from "@/types/form";
import { FormField, TextArea } from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step2Company({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="企業理念やコンセプト"
        required
        hint="お客様に伝えたい想いやビジョンを教えてください"
      >
        <TextArea
          value={data.companyPhilosophy}
          onChange={(value) => onChange({ companyPhilosophy: value })}
          placeholder="例：お客様の暮らしに寄り添い、快適な住空間を提供する..."
          rows={4}
        />
      </FormField>

      <FormField
        label="他社と比べた時の強み・特徴"
        required
        hint="自慢できるポイント、サービスや商品の特徴など"
      >
        <TextArea
          value={data.strengths}
          onChange={(value) => onChange({ strengths: value })}
          placeholder="例：創業30年の実績、業界最安値の価格設定、24時間対応のサポート体制..."
          rows={4}
        />
      </FormField>

      <FormField
        label="競合他社について"
        required
        hint="競合となる企業名やサービス、競合ポイントを教えてください"
      >
        <TextArea
          value={data.competitors}
          onChange={(value) => onChange({ competitors: value })}
          placeholder="例：株式会社〇〇（価格帯が近い）、△△サービス（同エリアで展開）..."
          rows={4}
        />
      </FormField>
    </div>
  );
}
