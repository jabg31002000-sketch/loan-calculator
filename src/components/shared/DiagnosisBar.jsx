import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";

const TONE_CONFIG = {
  warning: {
    icon: AlertTriangle,
    border: "border-amber-200",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    textColor: "text-amber-900",
    detailColor: "text-amber-700/70",
  },
  caution: {
    icon: AlertCircle,
    border: "border-slate-200",
    bg: "bg-slate-50",
    iconColor: "text-slate-500",
    textColor: "text-slate-800",
    detailColor: "text-slate-500",
  },
  info: {
    icon: Info,
    border: "border-sky-200",
    bg: "bg-sky-50",
    iconColor: "text-sky-500",
    textColor: "text-sky-900",
    detailColor: "text-sky-700/70",
  },
  good: {
    icon: CheckCircle2,
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    textColor: "text-emerald-900",
    detailColor: "text-emerald-700/70",
  },
};

export default function DiagnosisBar({ interpretation }) {
  if (!interpretation) return null;

  const tone = TONE_CONFIG[interpretation.tone] ?? TONE_CONFIG.caution;
  const Icon = tone.icon;

  return (
    <section className={`rounded-2xl border ${tone.border} ${tone.bg} px-5 py-4`}>
      <div className="flex gap-3">
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${tone.iconColor}`} />
        <div className="min-w-0">
          <p className={`text-[0.9rem] font-bold leading-snug ${tone.textColor}`}>
            {interpretation.text}
          </p>
          {interpretation.details?.length > 0 && (
            <ul className="mt-2 space-y-0.5">
              {interpretation.details.map((detail, i) => (
                <li key={i} className={`text-xs leading-5 ${tone.detailColor}`}>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
