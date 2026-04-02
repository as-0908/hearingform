"use client";

import { FormData, PURPOSE_OPTIONS } from "@/types/form";
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

export function Step3Purpose({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="サイト制作（修正）の目的・期待する効果"
        required
        hint="複数選択可"
      >
        <CheckboxGroup
          options={PURPOSE_OPTIONS}
          selected={data.purposes}
          onChange={(purposes) => onChange({ purposes })}
        />
        <div className="mt-3">
          <TextInput
            value={data.purposeOther}
            onChange={(value) => onChange({ purposeOther: value })}
            placeholder="その他の目的があればご記入ください"
          />
        </div>
      </FormField>

      <FormField
        label="ターゲット層を教えてください"
        required
        hint="性別・年齢・職業など、なるべく詳細にお願いします"
      >
        <TextArea
          value={data.targetAudience}
          onChange={(value) => onChange({ targetAudience: value })}
          placeholder="例：30〜40代の女性、子育て中の主婦層、健康に関心の高い方..."
          rows={4}
        />
      </FormField>
    </div>
  );
}
