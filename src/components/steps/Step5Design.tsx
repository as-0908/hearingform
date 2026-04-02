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
        hint="ご希望の色を選んでください（複数選択可）"
      >
        <div className="flex flex-wrap gap-3 items-center">
          {data.imageColors.map((color, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  const updated = [...data.imageColors];
                  updated[i] = e.target.value;
                  onChange({ imageColors: updated });
                }}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    imageColors: data.imageColors.filter((_, idx) => idx !== i),
                  })
                }
                className="text-gray-400 hover:text-error text-lg leading-none"
                aria-label="削除"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({ imageColors: [...data.imageColors, "#2563eb"] })
            }
            className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
            aria-label="色を追加"
          >
            +
          </button>
        </div>
      </FormField>
    </div>
  );
}
