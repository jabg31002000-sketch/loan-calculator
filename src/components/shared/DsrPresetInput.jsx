import { useState } from "react";

const PRESETS = [
  { value: "bank", label: "은행권 40%", dsrValue: 40 },
  { value: "secondary", label: "제2금융권 50%", dsrValue: 50 },
  { value: "custom", label: "직접 입력", dsrValue: null },
];

export default function DsrPresetInput({ label, value, onChange, hint }) {
  // value = "bank" | "secondary" | "custom:40" 등
  const parsed = parsePresetValue(value);
  const [customInput, setCustomInput] = useState(parsed.preset === "custom" ? String(parsed.dsrValue || "") : "");
  const [customError, setCustomError] = useState("");

  function handlePresetChange(preset) {
    setCustomError("");
    if (preset === "bank") {
      onChange("bank");
    } else if (preset === "secondary") {
      onChange("secondary");
    } else {
      onChange(`custom:${customInput}`);
    }
  }

  function handleCustomChange(rawVal) {
    setCustomInput(rawVal);
    const num = Number(rawVal);
    if (rawVal === "") {
      setCustomError("");
      onChange("custom:");
      return;
    }
    if (!Number.isFinite(num) || num < 1 || num > 100) {
      setCustomError("DSR 기준은 1~100 사이의 숫자로 입력해주세요.");
      onChange(`custom:${rawVal}`);
      return;
    }
    setCustomError("");
    onChange(`custom:${rawVal}`);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => handlePresetChange(p.value)}
            className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              parsed.preset === p.value
                ? "border-[#10353F] bg-[#10353F]/5 text-[#10353F] ring-2 ring-[#10353F]/10"
                : "border-[#E5E1DA] bg-white text-[#5E6E73] hover:border-[#D5D0C8] hover:bg-[#F6F1EB]/50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {parsed.preset === "custom" && (
        <div className="mt-3">
          <label className="mb-1.5 block text-xs font-medium text-[#5E6E73]">직접 입력 DSR 기준(%)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              value={customInput}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="예: 40"
              className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73] focus:ring-2 focus:ring-[#10353F]/10 ${
                customError ? "border-rose-400 focus:border-rose-400" : "border-[#E5E1DA] focus:border-[#10353F]"
              }`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5E6E73]">
              %
            </span>
          </div>
          {customError && (
            <p className="mt-1.5 text-xs font-medium text-rose-600">{customError}</p>
          )}
        </div>
      )}

      {hint && <p className="mt-2 text-xs leading-relaxed text-[#5E6E73]">{hint}</p>}
    </div>
  );
}

export function parsePresetValue(value) {
  if (!value || value === "bank") return { preset: "bank", dsrValue: 40 };
  if (value === "secondary") return { preset: "secondary", dsrValue: 50 };
  if (typeof value === "string" && value.startsWith("custom:")) {
    const num = Number(value.slice(7));
    return { preset: "custom", dsrValue: Number.isFinite(num) && num >= 1 && num <= 100 ? num : null };
  }
  // legacy: plain number string
  const num = Number(value);
  if (Number.isFinite(num) && num > 0) return { preset: "custom", dsrValue: num };
  return { preset: "bank", dsrValue: 40 };
}
