"use client";

import { FormData } from "@/types/form";
import { FormField, RadioGroup, TextInput, TextArea } from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step1Request({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField label="ご依頼の内容はなんですか？" required>
        <RadioGroup
          name="requestType"
          value={data.requestType}
          onChange={(value) => onChange({ requestType: value, requestTypeOther: "" })}
          options={[
            { value: "new", label: "新規サイトの制作（一からの作り直しも含む）" },
            { value: "modify", label: "既存サイトの修正" },
            { value: "other", label: "その他" },
          ]}
        />
        {data.requestType === "other" && (
          <div className="mt-3">
            <TextInput
              value={data.requestTypeOther}
              onChange={(value) => onChange({ requestTypeOther: value })}
              placeholder="具体的にご記入ください"
            />
          </div>
        )}
      </FormField>

      <FormField label="制作するサイトの種類" required>
        <RadioGroup
          name="siteType"
          value={data.siteType}
          onChange={(value) => onChange({ siteType: value })}
          options={[
            { value: "lp", label: "LP（ランディングページ）- 1ページ完結" },
            { value: "website", label: "Webサイト（複数ページ）" },
          ]}
        />
        {data.siteType === "website" && (
          <div className="mt-3">
            <TextInput
              value={data.pageCount}
              onChange={(value) => onChange({ pageCount: value })}
              placeholder="想定ページ数（例：5〜10ページ）"
            />
          </div>
        )}
      </FormField>

      <FormField
        label="ご依頼に至るまでの背景を教えてください"
        required
        hint="現在の課題やお悩み、制作を検討されたきっかけなど"
      >
        <TextArea
          value={data.background}
          onChange={(value) => onChange({ background: value })}
          placeholder="例：現在のサイトが古くなり、スマートフォン対応ができていないため..."
          rows={4}
        />
      </FormField>
    </div>
  );
}
