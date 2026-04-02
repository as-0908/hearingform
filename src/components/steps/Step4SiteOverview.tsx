"use client";

import { FormData } from "@/types/form";
import { FormField, TextArea } from "@/components/ui/FormField";

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
    </div>
  );
}
