"use client";

import { FormData, MATERIAL_OPTIONS } from "@/types/form";
import {
  FormField,
  CheckboxGroup,
  TextArea,
  TextInput,
} from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step6Materials({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="ご提供可能な素材はありますか？"
        hint="複数選択可"
      >
        <CheckboxGroup
          options={MATERIAL_OPTIONS}
          selected={data.materials}
          onChange={(materials) => onChange({ materials })}
        />
      </FormField>

      <FormField
        label="参考にしたいサイトのURL"
        required
        hint="デザインや構成で参考にしたいサイトがあれば教えてください（複数可）"
      >
        <TextArea
          value={data.referenceUrls}
          onChange={(value) => onChange({ referenceUrls: value })}
          placeholder={"例：\nhttps://example.com（デザインが好み）\nhttps://example2.com（機能が参考になる）"}
          rows={4}
        />
      </FormField>

      {data.requestType === "modify" && (
        <FormField
          label="既存サイトのURL"
          hint="修正対象のサイトURLを貼ってください"
        >
          <TextInput
            value={data.existingSiteUrl}
            onChange={(value) => onChange({ existingSiteUrl: value })}
            placeholder="https://your-current-site.com"
          />
        </FormField>
      )}
    </div>
  );
}
