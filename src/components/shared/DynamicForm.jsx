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
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const basicFields = fields.filter((f) => f.group === "basic");
  const advancedFields = fields.filter((f) => f.group === "advanced");

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
    <section ref={inputRef} className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-0.5 text-base font-bold text-slate-900">{formTitle}</h2>
      <p className="mb-5 text-[13px] text-slate-400">
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
              className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 transition hover:text-slate-600"
            >
              <Settings className="h-3.5 w-3.5" />
              {showAdvanced ? "고급 설정 닫기" : "고급 설정"}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
            </button>

            {showAdvanced && (
              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                {renderFieldGroup(advancedFields)}
              </div>
            )}
          </>
        )}

        {/* 계산하기 + 초기화 */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-[0.95rem] font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-150 hover:bg-emerald-500 hover:shadow-xl active:scale-[0.98]"
          >
            {submitLabel}
          </button>
          {hasResult && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-400 transition hover:text-slate-600"
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
