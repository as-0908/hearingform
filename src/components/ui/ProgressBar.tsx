"use client";

import { STEP_TITLES } from "@/types/form";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          STEP {currentStep + 1} / {totalSteps}
        </span>
        <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mt-4">
        {STEP_TITLES[currentStep]}
      </h2>
    </div>
  );
}
