"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormData, initialFormData, STEP_TITLES } from "@/types/form";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Step1Request } from "@/components/steps/Step1Request";
import { Step3Purpose } from "@/components/steps/Step3Purpose";
import { Step4SiteOverview } from "@/components/steps/Step4SiteOverview";
import { Step5Design } from "@/components/steps/Step5Design";
import { Step6Materials } from "@/components/steps/Step6Materials";
import { Step7Schedule } from "@/components/steps/Step7Schedule";

function validateStep(step: number, data: FormData): string | null {
  switch (step) {
    case 0:
      if (!data.requestType) return "ご依頼の内容を選択してください";
      if (data.requestType === "other" && !data.requestTypeOther)
        return "その他の内容をご記入ください";
      if (!data.siteType) return "サイトの種類を選択してください";
      if (!data.background) return "ご依頼の背景をご記入ください";
      return null;
    case 1:
      if (data.purposes.length === 0) return "目的を1つ以上選択してください";
      if (!data.targetAudience) return "ターゲット層をご記入ください";
      return null;
    case 2:
      return null;
    case 3:
      if (data.impressions.length === 0)
        return "与えたい印象を1つ以上選択してください";
      if (data.designTaste.length === 0)
        return "デザインテイストを1つ以上選択してください";
      return null;
    case 4:
      if (!data.referenceUrls) return "参考サイトのURLをご記入ください";
      return null;
    case 5:
      if (!data.serverHelp) return "サーバー設定について選択してください";
      if (!data.domainHelp) return "ドメイン設定について選択してください";
      if (!data.schedule) return "スケジュールをご記入ください";
      if (!data.companyName) return "会社名をご記入ください";
      if (!data.contactName) return "ご担当者名をご記入ください";
      if (!data.email) return "メールアドレスをご記入ください";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        return "正しいメールアドレスをご入力ください";
      return null;
    default:
      return null;
  }
}

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = STEP_TITLES.length;

  const handleChange = useCallback((partial: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
    setError(null);
  }, []);

  const handleNext = () => {
    const validationError = validateStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const validationError = validateStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GAS_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(formData),
        });
      } else {
        console.log("NEXT_PUBLIC_GAS_URL is not set. Form data:", formData);
      }

      router.push("/complete");
    } catch {
      setError("送信中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const props = { data: formData, onChange: handleChange };
    switch (currentStep) {
      case 0:
        return <Step1Request {...props} />;
      case 1:
        return <Step3Purpose {...props} />;
      case 2:
        return <Step4SiteOverview {...props} />;
      case 3:
        return <Step5Design {...props} />;
      case 4:
        return <Step6Materials {...props} />;
      case 5:
        return <Step7Schedule {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ヒアリングフォーム
          </h1>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 mb-12">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 text-sm font-medium rounded-xl transition-all ${
              currentStep === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            戻る
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow"
            >
              次へ進む
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-success hover:bg-emerald-600"
              }`}
            >
              {isSubmitting ? "送信中..." : "送信する"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
