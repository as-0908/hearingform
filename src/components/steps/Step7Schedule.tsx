"use client";

import { FormData } from "@/types/form";
import {
  FormField,
  RadioGroup,
  TextInput,
  TextArea,
} from "@/components/ui/FormField";

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export function Step7Schedule({ data, onChange }: Props) {
  return (
    <div className="space-y-2">
      <FormField
        label="納品形式について"
        required
        hint="完成したサイトデータのお届け方法をお選びください"
      >
        <RadioGroup
          name="deliveryMethod"
          value={data.deliveryMethod}
          onChange={(value) => onChange({ deliveryMethod: value })}
          options={[
            { value: "file", label: "ファイル納品（zip等）- お客様側でサーバーにアップロード" },
            { value: "deploy", label: "サーバーへの公開まで対応してほしい" },
            { value: "consult", label: "分からないので相談したい" },
          ]}
        />
      </FormField>

      {data.deliveryMethod === "deploy" && (
        <>
          <FormField
            label="サーバーの設定はお済みですか？"
            required
          >
            <RadioGroup
              name="serverHelp"
              value={data.serverHelp}
              onChange={(value) => onChange({ serverHelp: value })}
              options={[
                { value: "yes", label: "サーバーの用意・設定をお願いしたい" },
                { value: "no", label: "サーバーは用意済み" },
                { value: "consult", label: "分からないので相談したい" },
              ]}
            />
            {data.serverHelp === "no" && (
              <div className="mt-3">
                <TextInput
                  value={data.serverInfo}
                  onChange={(value) => onChange({ serverInfo: value })}
                  placeholder="サーバー情報をご入力ください（例：エックスサーバー、さくらサーバー等）"
                />
              </div>
            )}
          </FormField>

          <FormField
            label="ドメインの設定はお済みですか？"
            required
          >
            <RadioGroup
              name="domainHelp"
              value={data.domainHelp}
              onChange={(value) => onChange({ domainHelp: value })}
              options={[
                { value: "yes", label: "ドメインの取得・設定をお願いしたい" },
                { value: "no", label: "ドメインは取得済み" },
                { value: "consult", label: "分からないので相談したい" },
              ]}
            />
            {data.domainHelp === "no" && (
              <div className="mt-3">
                <TextInput
                  value={data.domainInfo}
                  onChange={(value) => onChange({ domainInfo: value })}
                  placeholder="ドメイン情報をご入力ください（例：example.com）"
                />
              </div>
            )}
          </FormField>
        </>
      )}

      <FormField
        label="スケジュール感を教えてください"
        required
        hint="納品までの希望期間や、リリース予定日があれば教えてください"
      >
        <TextInput
          value={data.schedule}
          onChange={(value) => onChange({ schedule: value })}
          placeholder="例：2ヶ月以内、2024年6月までに公開したい..."
        />
      </FormField>

      <FormField label="その他の気になる点・ご質問">
        <TextArea
          value={data.otherQuestions}
          onChange={(value) => onChange({ otherQuestions: value })}
          placeholder="ご不明な点やご要望など、何でもお気軽にどうぞ"
          rows={4}
        />
      </FormField>

      <div className="border-t border-gray-100 pt-6 mt-6">
        <p className="text-sm font-medium text-gray-700 mb-4">
          ご連絡先 <span className="text-error">*</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="会社名・屋号" required>
            <TextInput
              value={data.companyName}
              onChange={(value) => onChange({ companyName: value })}
              placeholder="株式会社〇〇"
            />
          </FormField>

          <FormField label="ご担当者名" required>
            <TextInput
              value={data.contactName}
              onChange={(value) => onChange({ contactName: value })}
              placeholder="山田 太郎"
            />
          </FormField>

          <FormField label="メールアドレス" required>
            <TextInput
              value={data.email}
              onChange={(value) => onChange({ email: value })}
              placeholder="info@example.com"
              type="email"
            />
          </FormField>

          <FormField label="電話番号">
            <TextInput
              value={data.phone}
              onChange={(value) => onChange({ phone: value })}
              placeholder="090-1234-5678"
              type="tel"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
