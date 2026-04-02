"use client";

import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  error?: string;
}

export function FormField({
  label,
  required,
  hint,
  children,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {children}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white placeholder-gray-300 hover:border-gray-300"
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white placeholder-gray-300 hover:border-gray-300 resize-none"
    />
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all text-sm ${
            value === option.value
              ? "border-primary bg-primary-light/50 text-primary-dark"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              value === option.value ? "border-primary" : "border-gray-300"
            }`}
          >
            {value === option.value && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </span>
          {option.label}
        </label>
      ))}
    </div>
  );
}

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxGroup({
  options,
  selected,
  onChange,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl cursor-pointer transition-all text-sm ${
            selected.includes(option)
              ? "border-primary bg-primary-light/50 text-primary-dark"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="sr-only"
          />
          <span
            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              selected.includes(option)
                ? "border-primary bg-primary"
                : "border-gray-300"
            }`}
          >
            {selected.includes(option) && (
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
          <span className="leading-tight">{option}</span>
        </label>
      ))}
    </div>
  );
}
