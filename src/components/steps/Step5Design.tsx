"use client";

import {
  FormData,
  IMPRESSION_OPTIONS,
  DESIGN_TASTE_OPTIONS,
} from "@/types/form";
import {
  FormField,
  CheckboxGroup,
  TextInput,
} from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step5Design({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="与えたい印象"
        required
        hint="複数選択可 - サイトを見た人にどんな印象を持ってほしいですか？"
      >
        <CheckboxGroup
          options={IMPRESSION_OPTIONS}
          selected={data.impressions}
          onChange={(impressions) => onChange({ impressions })}
        />
        <div className="mt-3">
          <TextInput
            value={data.impressionOther}
            onChange={(value) => onChange({ impressionOther: value })}
            placeholder="その他の印象があればご記入ください"
          />
        </div>
      </FormField>

      <FormField
        label="デザインテイスト"
        required
        hint="複数選択可 - お好みのデザインの方向性を教えてください"
      >
        <CheckboxGroup
          options={DESIGN_TASTE_OPTIONS}
          selected={data.designTaste}
          onChange={(designTaste) => onChange({ designTaste })}
        />
        <div className="mt-3">
          <TextInput
            value={data.designTasteOther}
            onChange={(value) => onChange({ designTasteOther: value })}
            placeholder="その他のテイストがあればご記入ください"
          />
        </div>
      </FormField>

      <FormField
        label="サイトのイメージカラー"
        hint="ブランドカラーやご希望の色があれば教えてください"
      >
        <TextInput
          value={data.imageColor}
          onChange={(value) => onChange({ imageColor: value })}
          placeholder="例：ネイビー × ホワイト、暖色系、企業ロゴのブルーに合わせたい..."
        />
      </FormField>
    </div>
  );
}
