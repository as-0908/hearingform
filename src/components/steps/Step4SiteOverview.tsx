"use client";

import { FormData, FEATURE_OPTIONS } from "@/types/form";
import {
  FormField,
  CheckboxGroup,
  TextInput,
  TextArea,
} from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step4SiteOverview({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="サイトの概要"
        hint="主な内容、情報、必要なページ（商品紹介・会社概要など）を思いつくものを挙げてください"
      >
        <TextArea
          value={data.siteOverview}
          onChange={(value) => onChange({ siteOverview: value })}
          placeholder="例：トップページ、サービス紹介、料金プラン、お客様の声、会社概要、お問い合わせ..."
          rows={5}
        />
      </FormField>

      <FormField
        label="サイトに追加したい機能"
        hint="複数選択可"
      >
        <CheckboxGroup
          options={FEATURE_OPTIONS}
          selected={data.features}
          onChange={(features) => onChange({ features })}
        />
        <div className="mt-3">
          <TextInput
            value={data.featureOther}
            onChange={(value) => onChange({ featureOther: value })}
            placeholder="その他の機能があればご記入ください"
          />
        </div>
      </FormField>
    </div>
  );
}
