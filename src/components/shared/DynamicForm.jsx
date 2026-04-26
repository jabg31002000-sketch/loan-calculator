import { useState } from "react";
import { ChevronDown, RotateCcw, Settings } from "lucide-react";
import CurrencyInput from "./CurrencyInput";
import RateInput from "./RateInput";
import MonthsInput from "./MonthsInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import ToggleInput from "./ToggleInput";
import RadioInput from "./RadioInput";
import DebtListInput from "./DebtListInput";
import DsrPresetInput from "./DsrPresetInput";
import DsrDebtListInput from "./DsrDebtListInput";

function renderField(field, values, onFieldChange, bankState) {
  // 조건부 렌더링
  if (field.showWhen) {
    if (values[field.showWhen.key] !== field.showWhen.value) return null;
  }

  const val = values[field.key] ?? "";

  switch (field.type) {
    case "currency":
      return (
        <CurrencyInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          placeholder={field.placeholder}
          suffix={field.suffix}
          hint={field.hint}
        />
      );
    case "rate":
      return (
        <RateInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          placeholder={field.placeholder}
          bankPreset={field.bankPreset}
          bank={bankState?.bank}
          onBankChange={bankState?.onBankChange}
        />
      );
    case "months":
      return (
        <MonthsInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          placeholder={field.placeholder}
          hint={field.hint}
        />
      );
    case "number":
      return (
        <NumberInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          placeholder={field.placeholder}
          suffix={field.suffix}
          hint={field.hint}
          step={field.step}
        />
      );
    case "select":
      return (
        <SelectInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          options={field.options}
          hint={field.hint}
        />
      );
    case "toggle":
      return (
        <ToggleInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          options={field.toggleOptions}
        />
      );
    case "radio":
      return (
        <RadioInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          options={field.options}
        />
      );
    case "debtList":
      return (
        <DebtListInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          hint={field.hint}
        />
      );
    case "dsrDebtList":
      return (
        <DsrDebtListInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          hint={field.hint}
        />
      );
    case "dsrPreset":
      return (
        <DsrPresetInput
          key={field.key}
          label={field.label}
          value={val}
          onChange={(v) => onFieldChange(field.key, v)}
          hint={field.hint}
        />
      );
    default:
      return null;
  }
}

export default function DynamicForm({
  fields,
  values,
  onFieldChange,
  onSubmit,
  onReset,
  error,
  hasResult,
  inputRef,
  bankState,
  formTitle = "기본 정보 입력",
  formSubtitle,
  submitLabel = "계산하기",
  advancedSubtitle,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const basicFields = fields.filter((f) => f.group === "basic");
  const advancedFields = fields.filter((f) => f.group === "advanced");
  const debtFields = fields.filter((f) => f.group === "debt");

  // grid 레이아웃: 필드에 gridCol 지정 시 같은 행에 배치
  const renderFieldGroup = (fieldList) => {
    const rows = [];
    let i = 0;
    while (i < fieldList.length) {
      const field = fieldList[i];
      if (field.gridCol) {
        // 연속된 gridCol 필드를 한 행에 묶기
        const gridFields = [field];
        while (i + 1 < fieldList.length && fieldList[i + 1].gridCol) {
          i++;
          gridFields.push(fieldList[i]);
        }
        const cols = gridFields.reduce((sum, f) => sum + (f.gridCol ?? 1), 0);
        rows.push(
          <div key={gridFields.map((f) => f.key).join("-")} className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {gridFields.map((gf) => renderField(gf, values, onFieldChange, bankState))}
          </div>
        );
      } else {
        const rendered = renderField(field, values, onFieldChange, bankState);
        if (rendered) rows.push(<div key={field.key}>{rendered}</div>);
      }
      i++;
    }
    return rows;
  };

  return (
    <section ref={inputRef} className="mb-8 rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-1 text-lg font-semibold text-[#0E2A3A]">{formTitle}</h2>
      <p className="mb-6 text-[14px] text-[#5E6E73]">
        {formSubtitle || "필요한 정보만 입력하면 바로 계산됩니다."}
      </p>

      <div className="space-y-4">
        {renderFieldGroup(basicFields)}

        {/* 고급 설정 토글 */}
        {advancedFields.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5E6E73] transition hover:text-[#0E2A3A]"
            >
              <Settings className="h-3.5 w-3.5" />
              {showAdvanced ? "고급 설정 닫기" : "고급 설정"}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
            </button>

            {showAdvanced && (
              <div className="space-y-4 rounded-2xl border border-[#E5E1DA] bg-[#F6F1EB]/50 p-4">
                {advancedSubtitle && (
                  <p className="text-[13px] text-[#5E6E73] -mt-1 mb-1">{advancedSubtitle}</p>
                )}
                {renderFieldGroup(advancedFields)}
              </div>
            )}
          </>
        )}

        {/* 부채 섹션 */}
        {debtFields.length > 0 && (
          <div className="space-y-4">
            {renderFieldGroup(debtFields)}
          </div>
        )}

        {/* 계산하기 + 초기화 */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-xl bg-[#D97852] px-8 py-[18px] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          >
            {submitLabel}
          </button>
          {hasResult && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#5E6E73] transition hover:text-[#0E2A3A]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              초기화
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
