import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";
import {
  Calculator,
  Landmark,
  Wallet,
  Percent,
  CalendarDays,
  CircleHelp,
  BarChart3,
  LineChart as LineChartIcon,
  Bookmark,
  Trash2,
  CheckCircle2,
  Copy,
  Sparkles,
  ChevronRight,
  BadgeDollarSign,
} from "lucide-react";

function trackCalculateEvent({ repaymentType, months, graceMonths }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "loan_calculate", {
    event_category: "calculator",
    event_label: repaymentType,
    months,
    grace_months: graceMonths,
  });
}

function trackSaveScenarioEvent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "loan_save_scenario", {
    event_category: "calculator",
  });
}

function trackCtaClick(label) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: label,
  });
}

function formatInputNumber(value) {
  const number = value.replace(/,/g, "");
  if (number === "") return "";
  return Number(number).toLocaleString("ko-KR");
}

const BANK_RATES = {
  직접입력: "",
  국민은행: 4.5,
  신한은행: 4.3,
  우리은행: 4.4,
  하나은행: 4.4,
  카카오뱅크: 3.9,
  토스뱅크: 3.8,
};

const REPAYMENT_OPTIONS = [
  { value: "equal_payment", label: "원리금균등상환" },
  { value: "equal_principal", label: "원금균등상환" },
  { value: "bullet", label: "만기일시상환" },
];

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("ko-KR");
}

function formatCurrency(value) {
  return `${formatNumber(value)}원`;
}

function formatRate(value) {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(1)}%`;
}

function getRepaymentLabel(value) {
  return REPAYMENT_OPTIONS.find((option) => option.value === value)?.label ?? "-";
}

function getResultDescription(result, repaymentType, months, graceMonths) {
  const repaymentLabel = getRepaymentLabel(repaymentType);

  return `선택한 조건은 ${repaymentLabel} 방식이며, 총 ${months}개월 동안 상환합니다. ${
    graceMonths > 0 ? `처음 ${graceMonths}개월은 거치기간으로 이자만 납부합니다. ` : ""
  }총 이자는 ${formatCurrency(result.totalInterest)}이고, 총 상환액은 ${formatCurrency(
    result.totalPayment
  )}입니다.`;
}

function calcEqualPayment(principal, annualRate, months, graceMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;

  const safeGraceMonths = Math.min(graceMonths, months);
  const repaymentMonths = months - safeGraceMonths;

  for (let i = 1; i <= safeGraceMonths; i += 1) {
    const interest = balance * monthlyRate;
    rows.push({
      round: i,
      paymentAmount: interest,
      interest,
      principalPayment: 0,
      balance,
    });
    totalInterest += interest;
  }

  if (repaymentMonths <= 0) {
    return {
      monthlyPayment: safeGraceMonths > 0 ? rows[0]?.paymentAmount ?? 0 : 0,
      totalInterest,
      totalPayment: principal + totalInterest,
      rows,
    };
  }

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = balance / repaymentMonths;
  } else {
    monthlyPayment =
      (balance * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
  }

  for (let i = 1; i <= repaymentMonths; i += 1) {
    const interest = balance * monthlyRate;
    let principalPayment = monthlyPayment - interest;

    if (i === repaymentMonths) {
      principalPayment = balance;
    }

    const paymentAmount = principalPayment + interest;
    balance = Math.max(0, balance - principalPayment);

    rows.push({
      round: safeGraceMonths + i,
      paymentAmount,
      interest,
      principalPayment,
      balance,
    });

    totalInterest += interest;
  }

  return {
    monthlyPayment,
    totalInterest,
    totalPayment: principal + totalInterest,
    rows,
  };
}

function calcEqualPrincipal(principal, annualRate, months, graceMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;

  const safeGraceMonths = Math.min(graceMonths, months);
  const repaymentMonths = months - safeGraceMonths;

  for (let i = 1; i <= safeGraceMonths; i += 1) {
    const interest = balance * monthlyRate;
    rows.push({
      round: i,
      paymentAmount: interest,
      interest,
      principalPayment: 0,
      balance,
    });
    totalInterest += interest;
  }

  if (repaymentMonths <= 0) {
    return {
      monthlyPayment: safeGraceMonths > 0 ? rows[0]?.paymentAmount ?? 0 : 0,
      totalInterest,
      totalPayment: principal + totalInterest,
      rows,
    };
  }

  const monthlyPrincipal = principal / repaymentMonths;

  for (let i = 1; i <= repaymentMonths; i += 1) {
    const interest = balance * monthlyRate;
    let principalPayment = monthlyPrincipal;

    if (i === repaymentMonths) {
      principalPayment = balance;
    }

    const paymentAmount = principalPayment + interest;
    balance = Math.max(0, balance - principalPayment);

    rows.push({
      round: safeGraceMonths + i,
      paymentAmount,
      interest,
      principalPayment,
      balance,
    });

    totalInterest += interest;
  }

  return {
    monthlyPayment: rows[safeGraceMonths]?.paymentAmount ?? 0,
    totalInterest,
    totalPayment: principal + totalInterest,
    rows,
  };
}

function calcBullet(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;

  for (let i = 1; i <= months; i += 1) {
    const interest = balance * monthlyRate;
    const isLast = i === months;
    const principalPayment = isLast ? balance : 0;
    const paymentAmount = interest + principalPayment;

    if (isLast) {
      balance = 0;
    }

    rows.push({
      round: i,
      paymentAmount,
      interest,
      principalPayment,
      balance,
    });

    totalInterest += interest;
  }

  return {
    monthlyPayment: rows[0]?.paymentAmount ?? 0,
    totalInterest,
    totalPayment: principal + totalInterest,
    rows,
  };
}

function calculateLoan({ principal, annualRate, months, graceMonths, repaymentType }) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(months) ||
    !Number.isFinite(graceMonths) ||
    principal <= 0 ||
    annualRate < 0 ||
    months <= 0 ||
    graceMonths < 0 ||
    graceMonths > months
  ) {
    return null;
  }

  if (repaymentType === "equal_principal") {
    return calcEqualPrincipal(principal, annualRate, months, graceMonths);
  }

  if (repaymentType === "bullet") {
    return calcBullet(principal, annualRate, months);
  }

  return calcEqualPayment(principal, annualRate, months, graceMonths);
}

const generateChartData = (rows) => {
  if (!rows) return [];

  return rows.map((item, index) => ({
    month: index + 1,
    balance: Math.max(0, item.balance),
    interest: item.interest,
    paymentAmount: item.paymentAmount,
  }));
};

const formatChartMoney = (value) => {
  if (!Number.isFinite(value)) return "0원";
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
  if (value >= 10000) return `${Math.round(value / 10000)}만`;
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
};

const getHalfPaidMonth = (rows, principal) => {
  if (!rows?.length || !principal) return null;
  return rows.find((row) => row.balance <= principal / 2)?.round ?? null;
};

const getPeakInterestMonth = (rows) => {
  if (!rows?.length) return null;
  return rows.reduce((max, row) => (row.interest > max.interest ? row : max), rows[0]);
};

const getBestRepaymentOption = (comparisonResults) => {
  if (!comparisonResults?.length) return null;

  return comparisonResults.reduce((best, current) => {
    const bestInterest = best?.data?.totalInterest ?? Infinity;
    const currentInterest = current?.data?.totalInterest ?? Infinity;
    return currentInterest < bestInterest ? current : best;
  }, comparisonResults[0]);
};

const getWorstRepaymentOption = (comparisonResults) => {
  if (!comparisonResults?.length) return null;

  return comparisonResults.reduce((worst, current) => {
    const worstInterest = worst?.data?.totalInterest ?? -Infinity;
    const currentInterest = current?.data?.totalInterest ?? -Infinity;
    return currentInterest > worstInterest ? current : worst;
  }, comparisonResults[0]);
};

const getMaxInterestValue = (comparisonResults) => {
  if (!comparisonResults?.length) return 0;
  return Math.max(...comparisonResults.map((item) => item.data?.totalInterest ?? 0));
};

function buildScenarioSummary(input, result) {
  return [
    `대출금액 ${formatCurrency(input.principal)}`,
    `금리 ${formatRate(input.annualRate)}`,
    `대출기간 ${input.months}개월`,
    input.graceMonths > 0 ? `거치기간 ${input.graceMonths}개월` : "거치기간 없음",
    getRepaymentLabel(input.repaymentType),
    `총 이자 ${formatCurrency(result.totalInterest)}`,
    `총 상환액 ${formatCurrency(result.totalPayment)}`,
  ].join(" / ");
}

function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const balance = payload.find((item) => item.dataKey === "balance")?.value ?? 0;
  const interest = payload.find((item) => item.dataKey === "interest")?.value ?? 0;
  const paymentAmount = payload.find((item) => item.dataKey === "paymentAmount")?.value ?? 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-xl">
      <div className="mb-1 font-bold text-slate-900">{label}개월차</div>
      <div className="text-slate-600">남은 원금: {formatChartMoney(balance)}</div>
      <div className="text-slate-600">이자: {formatChartMoney(interest)}</div>
      <div className="text-slate-600">납입금: {formatChartMoney(paymentAmount)}</div>
    </div>
  );
}

function ComparisonTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0]?.value ?? 0;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-3 text-sm shadow-2xl backdrop-blur">
      <div className="mb-1 font-bold text-white">{label}</div>
      <div className="text-slate-300">총 이자: {formatCurrency(value)}</div>
    </div>
  );
}

function StatCard({ label, value, accent = false, subValue = "" }) {
  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm ${
        accent
          ? "border-sky-200 bg-gradient-to-br from-sky-50 to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p
        className={`mt-2 break-keep text-2xl font-bold tracking-tight md:text-3xl ${
          accent ? "text-sky-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {subValue ? <p className="mt-2 text-xs text-slate-500">{subValue}</p> : null}
    </div>
  );
}

function FieldLabel({ icon, children }) {
  return (
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span className="text-slate-400">{icon}</span>
      {children}
    </label>
  );
}

function ScenarioCompareTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const monthlyPayment = payload.find((item) => item.dataKey === "monthlyPayment")?.value ?? 0;
  const totalInterest = payload.find((item) => item.dataKey === "totalInterest")?.value ?? 0;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-3 text-sm shadow-2xl backdrop-blur">
      <div className="mb-1 font-bold text-white">{label}</div>
      <div className="text-slate-300">월 상환금: {formatCurrency(monthlyPayment)}</div>
      <div className="text-slate-300">총 이자: {formatCurrency(totalInterest)}</div>
    </div>
  );
}

// 원본 파일 (실제 사용)
export default function LoanCalculatorRedesign() {
  const [bank, setBank] = useState("직접입력");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [graceMonths, setGraceMonths] = useState("");
  const [repaymentType, setRepaymentType] = useState("equal_payment");
  const [submittedInput, setSubmittedInput] = useState(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showRepaymentHelp, setShowRepaymentHelp] = useState(false);
  const [hasGracePeriod, setHasGracePeriod] = useState("no");
  const [savedScenarios, setSavedScenarios] = useState([]);
  const repaymentColors = ["#0f172a", "#334155", "#64748b"];
  const scenarioCardThemes = [
  {
    accent: "#334155",
    ring: "border-slate-300",
    badgeBg: "bg-slate-700/10",
    badgeText: "text-slate-700",
    link: "text-slate-700 hover:text-slate-900",
  },
  {
    accent: "#7c3aed",
    ring: "border-violet-200",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-700",
    link: "text-violet-700 hover:text-violet-800",
  },
  {
    accent: "#d97706",
    ring: "border-amber-200",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-700",
    link: "text-amber-700 hover:text-amber-800",
  },
  {
    accent: "#0f766e",
    ring: "border-teal-200",
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-700",
    link: "text-teal-700 hover:text-teal-800",
  },
  {
    accent: "#475569",
    ring: "border-slate-300",
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-700",
    link: "text-slate-700 hover:text-slate-900",
  },
  {
    accent: "#1e293b",
    ring: "border-slate-300",
    badgeBg: "bg-slate-800/10",
    badgeText: "text-slate-800",
    link: "text-slate-800 hover:text-slate-950",
  },
];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedInputs = localStorage.getItem("loanCalculatorInputsV4");
    const savedScenarioList = localStorage.getItem("loanCalculatorSavedScenariosV4");

    if (savedInputs) {
      try {
        const parsed = JSON.parse(savedInputs);
        setBank(parsed.bank ?? "직접입력");
        setPrincipal(parsed.principal ?? "");
        setRate(parsed.rate ?? "");
        setMonths(parsed.months ?? "");
        setGraceMonths(parsed.graceMonths ?? "");
        setHasGracePeriod((parsed.graceMonths ?? 0) > 0 ? "yes" : "no");
        setRepaymentType(parsed.repaymentType ?? "equal_payment");
      } catch (err) {
        console.error("불러오기 실패", err);
      }
    }

    if (savedScenarioList) {
      try {
        setSavedScenarios(JSON.parse(savedScenarioList));
      } catch (err) {
        console.error("시나리오 불러오기 실패", err);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "loanCalculatorInputsV4",
      JSON.stringify({
        bank,
        principal,
        rate,
        months,
        graceMonths,
        hasGracePeriod,
        repaymentType,
      })
    );
  }, [isLoaded, bank, principal, rate, months, graceMonths, hasGracePeriod, repaymentType]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("loanCalculatorSavedScenariosV4", JSON.stringify(savedScenarios));
  }, [isLoaded, savedScenarios]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const result = useMemo(() => {
    if (!submittedInput) return null;
    return calculateLoan(submittedInput);
  }, [submittedInput]);

  const comparisonResults = useMemo(() => {
    if (!submittedInput) return null;

    return [
      {
        title: "원리금균등상환",
        key: "equal_payment",
        data: calculateLoan({
          ...submittedInput,
          repaymentType: "equal_payment",
        }),
      },
      {
        title: "원금균등상환",
        key: "equal_principal",
        data: calculateLoan({
          ...submittedInput,
          repaymentType: "equal_principal",
        }),
      },
      {
        title: "만기일시상환",
        key: "bullet",
        data: calculateLoan({
          ...submittedInput,
          repaymentType: "bullet",
        }),
      },
    ];
  }, [submittedInput]);

  const recommendation = useMemo(() => {
    if (!comparisonResults?.length || !submittedInput || !result) return null;

    const best = getBestRepaymentOption(comparisonResults);
    const worst = getWorstRepaymentOption(comparisonResults);
    const saving = Math.max(0, (worst?.data?.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0));
    const currentVsBest = Math.max(
      0,
      (result?.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0)
    );

    return {
      best,
      worst,
      saving,
      currentVsBest,
      shouldChange: submittedInput.repaymentType !== best?.key,
    };
  }, [comparisonResults, submittedInput, result]);

  const comparisonChartData =
    comparisonResults?.map((item) => ({
      name: item.title.replace("상환", ""),
      totalInterest: item.data?.totalInterest ?? 0,
    })) ?? [];

    const displaySavedScenarios = [...savedScenarios]
  .reverse()
  .map((item, index) => ({
    ...item,
    displayName: `비교안 ${index + 1}`,
  }));

  const savedScenarioChartData = displaySavedScenarios.map((item) => ({
  name: item.displayName,
  monthlyPayment: item.result.monthlyPayment,
  totalInterest: item.result.totalInterest,
}));

  const handleBankChange = (event) => {
    const selected = event.target.value;
    setBank(selected);

    if (selected === "직접입력") {
      setRate("");
    } else {
      setRate(String(BANK_RATES[selected]));
    }
  };

  const handleCalculate = () => {
    const parsedPrincipal = Number(principal.replace(/,/g, ""));
    const parsedRate = Number(rate);
    const parsedMonths = Number(months);
    const parsedGraceMonths = hasGracePeriod === "yes" ? Number(graceMonths) : 0;

    if (!parsedPrincipal || parsedPrincipal <= 0) {
      setError("대출금액을 입력해주세요.");
      return;
    }

    if (!Number.isFinite(parsedRate) || parsedRate < 0) {
      setError("금리를 올바르게 입력해주세요.");
      return;
    }

    if (!parsedMonths || parsedMonths <= 0) {
      setError("대출기간(개월)을 입력해주세요.");
      return;
    }

    if (
      hasGracePeriod === "yes" &&
      (!Number.isFinite(parsedGraceMonths) || parsedGraceMonths < 0)
    ) {
      setError("거치기간을 올바르게 입력해주세요.");
      return;
    }

    if (parsedGraceMonths > parsedMonths) {
      setError("거치기간은 전체 대출기간보다 클 수 없습니다.");
      return;
    }

    setError("");

    trackCalculateEvent({
      repaymentType,
      months: parsedMonths,
      graceMonths: parsedGraceMonths,
    });

    setSubmittedInput({
      principal: parsedPrincipal,
      annualRate: parsedRate,
      months: parsedMonths,
      graceMonths: parsedGraceMonths,
      repaymentType,
    });
  };

  const handleReset = () => {
    setSubmittedInput(null);
    setError("");
    setShowComparison(false);
    setHasGracePeriod("no");
    setGraceMonths("");
  };

  const handleSaveScenario = () => {
    if (!submittedInput || !result) return;

    const nextIndex = savedScenarios.length + 1;
    const scenario = {
      id: `${Date.now()}`,
      name: `비교안 ${nextIndex}`,
      bank,
      input: submittedInput,
      result,
      createdAt: new Date().toISOString(),
    };

    setSavedScenarios((prev) => [scenario, ...prev].slice(0, 6));
    trackSaveScenarioEvent();
  };

  const handleDeleteScenario = (id) => {
    setSavedScenarios((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoadScenario = (scenario) => {
    setBank(scenario.bank ?? "직접입력");
    setPrincipal(formatInputNumber(String(scenario.input.principal)));
    setRate(String(scenario.input.annualRate));
    setMonths(String(scenario.input.months));
    setGraceMonths(scenario.input.graceMonths > 0 ? String(scenario.input.graceMonths) : "");
    setHasGracePeriod(scenario.input.graceMonths > 0 ? "yes" : "no");
    setRepaymentType(scenario.input.repaymentType);
    setSubmittedInput(scenario.input);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopySummary = async () => {
    if (!submittedInput || !result) return;

    const text = buildScenarioSummary(submittedInput, result);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  const currentRateNumber = Number(rate);
  const ratePreviewResults = useMemo(() => {
    const parsedPrincipal = Number(principal.replace(/,/g, ""));
    const parsedMonths = Number(months);
    const parsedGraceMonths = hasGracePeriod === "yes" ? Number(graceMonths || 0) : 0;

    if (!parsedPrincipal || !parsedMonths || !Number.isFinite(currentRateNumber)) return [];

    return [-1, 0, 1]
      .map((diff) => {
        const previewRate = Math.max(0, currentRateNumber + diff);
        const preview = calculateLoan({
          principal: parsedPrincipal,
          annualRate: previewRate,
          months: parsedMonths,
          graceMonths: parsedGraceMonths,
          repaymentType,
        });

        return {
          label: `${previewRate.toFixed(1)}%`,
          diff,
          preview,
        };
      })
      .filter((item) => item.preview);
  }, [principal, months, graceMonths, hasGracePeriod, currentRateNumber, repaymentType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
       <div className="mb-6 rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-xl lg:mb-8 lg:p-8">
  <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
    
    <div className="max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
        <Calculator className="h-3.5 w-3.5" />
        스마트 대출 계산기 v4
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl leading-snug">
        계산만 하지 말고,<br />
        <span className="text-sky-400">조건별로 저장하고 비교하세요</span>
      </h1>

      <p className="mt-4 text-sm leading-6 text-slate-300 lg:text-base">
        상환방식·거치기간·금리 변화에 따른 차이를 한 화면에서 보고,<br />
        유리한 안을 저장해 비교할 수 있어요.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[560px]">
      
      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
        <p className="text-xs font-medium text-slate-300">현재 상환방식</p>
        <p className="mt-1 text-lg font-bold text-white">
          {getRepaymentLabel(repaymentType)}
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
        <p className="text-xs font-medium text-slate-300">거치기간</p>
        <p className="mt-1 text-lg font-bold text-white">
          {hasGracePeriod === "yes" && graceMonths ? `${graceMonths}개월` : "없음"}
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
        <p className="text-xs font-medium text-slate-300">저장된 비교안</p>
        <p className="mt-1 text-lg font-bold text-white">
          {savedScenarios.length}개
        </p>
      </div>

    </div>
  </div>
</div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <aside className="xl:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">대출 정보 입력</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    값을 입력한 뒤 계산하기를 눌러 결과를 확인하세요.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <FieldLabel icon={<Landmark className="h-4 w-4" />}>은행 선택</FieldLabel>
                    <select
                      value={bank}
                      onChange={handleBankChange}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    >
                      {Object.keys(BANK_RATES).map((bankName) => (
                        <option key={bankName} value={bankName}>
                          {bankName}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
  ※ 본 계산은 참고용으로 제공되며, 실제 대출 금리 및 상환 조건은 금융기관의 심사 기준과 상품 조건에 따라 달라질 수 있습니다. 정확한 내용은 해당 은행 또는 공식 홈페이지를 통해 확인해 주세요.
</p>
                  </div>

                  <div>
                    <FieldLabel icon={<Wallet className="h-4 w-4" />}>대출금액</FieldLabel>
                    <div className="relative">
                      <input
                        type="text"
                        value={principal}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, "");
                          if (!/^\d*$/.test(raw)) return;
                          setPrincipal(raw === "" ? "" : formatInputNumber(raw));
                        }}
                        placeholder="대출금액을 입력하세요"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                        원
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                    <div>
                      <FieldLabel icon={<Percent className="h-4 w-4" />}>금리 (%)</FieldLabel>
                      <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="금리를 입력하세요"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                    </div>

                    <div>
                      <FieldLabel icon={<CalendarDays className="h-4 w-4" />}>
                        대출기간 (개월)
                      </FieldLabel>
                      <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        placeholder="대출기간을 입력하세요"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel icon={<CircleHelp className="h-4 w-4" />}>거치기간 선택</FieldLabel>

                    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setHasGracePeriod("no");
                          setGraceMonths("");
                        }}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          hasGracePeriod === "no"
                            ? "bg-slate-900 text-white shadow-sm"
                            : "text-slate-600"
                        }`}
                      >
                        없음
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasGracePeriod("yes")}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          hasGracePeriod === "yes"
                            ? "bg-slate-900 text-white shadow-sm"
                            : "text-slate-600"
                        }`}
                      >
                        있음
                      </button>
                    </div>

                    {hasGracePeriod === "yes" && (
                      <div className="mt-3">
                        <input
                          type="number"
                          value={graceMonths}
                          onChange={(e) => setGraceMonths(e.target.value)}
                          placeholder="거치기간(개월)을 입력하세요"
                          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                        <p className="mt-2 text-xs text-slate-500">
                          거치기간 동안은 이자만 납부합니다.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <FieldLabel icon={<BarChart3 className="h-4 w-4" />}>상환방식</FieldLabel>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                      {REPAYMENT_OPTIONS.map((option) => {
                        const active = repaymentType === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setRepaymentType(option.value)}
                            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                              active
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowRepaymentHelp((prev) => !prev)}
                      className="mt-3 text-sm font-semibold text-sky-700 hover:text-sky-800"
                    >
                      {showRepaymentHelp ? "상환방식 설명 숨기기" : "상환방식 설명 보기"}
                    </button>

                    {showRepaymentHelp && (
                      <div className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                        <p>
                          <strong>[원리금균등상환]</strong> : 매달 같은 금액을 납부하는 방식입니다.
                          초반에는 이자 비중이 크고, 후반으로 갈수록 원금 비중이 커집니다.
                        </p>
                        <p>
                          <strong>[원금균등상환]</strong> : 매달 동일한 원금을 상환하고, 남은 잔액에
                          따라 이자가 줄어드는 방식입니다. 초반 부담은 크지만 총 이자는 가장 적습니다.
                        </p>
                        <p>
                          <strong>[만기일시상환]</strong> : 대출 기간 동안 이자만 납부하다가 만기 시
                          원금을 한 번에 상환하는 방식입니다. 매달 부담은 적지만 마지막에 큰 금액이
                          필요합니다.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleCalculate}
                      className="rounded-2xl bg-slate-900 px-4 py-3 text-base font-bold text-white shadow-sm transition duration-150 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
                    >
                      계산하기
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-700 transition duration-150 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
                    >
                      초기화
                    </button>
                  </div>

<div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
  <div className="mb-3 flex items-center gap-2">
    <span className="inline-flex rounded-full bg-sky-600 px-2.5 py-1 text-[11px] font-bold text-white">
      추천
    </span>
    <p className="text-sm font-semibold text-slate-900">
      계산 전에도 바로 확인할 수 있어요
    </p>
  </div>

  <p className="mb-4 text-xs leading-5 text-slate-600">
    금리 비교나 대환 가능 여부가 궁금하다면 계산 전에 먼저 확인해보세요.
  </p>

  <div className="grid grid-cols-1 gap-3">
    <a
      href="/loan-compare"
      onClick={() => trackCtaClick("rate_compare_precalc")}
      className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition duration-150 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
    >
      금리 낮은 상품 먼저 확인하기
    </a>

    <a
      href="/refinance-guide"
      onClick={() => trackCtaClick("refinance_saving_precalc")}
      className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition duration-150 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
    >
      대환하면 얼마나 줄어드는지 보기
    </a>
  </div>
</div>

                  {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  <h3 className="text-base font-bold text-slate-900">금리 민감도 미리보기</h3>
                </div>
                <div className="space-y-3">
                  {ratePreviewResults.length > 0 ? (
                    ratePreviewResults.map((item) => (
                      <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">금리 {item.label}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              월 상환금 {formatCurrency(item.preview?.monthlyPayment ?? 0)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">
                              총 이자 {formatCurrency(item.preview?.totalInterest ?? 0)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.diff === 0 ? "현재 금리" : item.diff > 0 ? "+1.0%p 가정" : "-1.0%p 가정"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                      금리, 대출금액, 대출기간을 입력하면 금리 변화에 따른 부담 차이를 미리 볼 수 있어요.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6 xl:col-span-8">
            {!result || !submittedInput ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
                    <Calculator className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">계산 결과가 여기에 표시됩니다</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    왼쪽에서 대출 조건을 입력한 뒤 <strong>계산하기</strong> 버튼을 눌러주세요.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {recommendation && (
                  <section className="rounded-[28px] border border-emerald-300 bg-gradient-to-br from-emerald-100 to-white p-5 shadow-sm lg:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          추천 결과
                        </div>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                          {recommendation.best?.title ?? "-"}이 가장 유리해요
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          현재 조건 기준으로 가장 불리한 방식과 비교하면 총 이자를
                          <strong className="mx-1 text-emerald-700">{formatCurrency(recommendation.saving)}</strong>
                          줄일 수 있어요.
                          {recommendation.shouldChange
                            ? ` 지금 선택한 ${getRepaymentLabel(submittedInput.repaymentType)}보다 ${formatCurrency(
                                recommendation.currentVsBest
                              )} 절약됩니다.`
                            : " 현재 선택한 방식이 이미 총 이자 기준 가장 유리합니다."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="text-xs font-medium text-slate-500">추천 방식 총 이자</p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {formatCurrency(recommendation.best?.data?.totalInterest ?? 0)}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="text-xs font-medium text-slate-500">현재 방식 총 이자</p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {formatCurrency(result.totalInterest)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <StatCard
                    label="월 상환금"
                    value={formatCurrency(result.monthlyPayment)}
                    accent
                    subValue="첫 기준 월 납입금입니다. 방식에 따라 이후 감소할 수 있어요."
                  />
                  <StatCard label="총 이자" value={formatCurrency(result.totalInterest)} />
                  <StatCard label="총 상환액" value={formatCurrency(result.totalPayment)} />
                </section>

                <section className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">예상 월 납입 결과</p>
                      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {formatCurrency(result.monthlyPayment)}
                      </p>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        {getResultDescription(
                          result,
                          submittedInput.repaymentType,
                          submittedInput.months,
                          submittedInput.graceMonths
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleSaveScenario}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition duration-150 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
                      >
                        <Bookmark className="h-4 w-4" />
                        비교안 저장
                      </button>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition duration-150 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "복사 완료" : "요약 복사"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:col-span-3">
                      <div className="mb-4 flex items-center gap-2">
                        <LineChartIcon className="h-4 w-4 text-sky-600" />
                        <h3 className="text-base font-bold text-slate-900">월별 상환 흐름</h3>
                      </div>

                      <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={generateChartData(result.rows)}>
                            <defs>
                              <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.04} />
                              </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                              dataKey="month"
                              tick={{ fontSize: 12, fill: "#64748b" }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              tickFormatter={formatChartMoney}
                              tick={{ fontSize: 12, fill: "#64748b" }}
                              tickLine={false}
                              axisLine={false}
                              width={60}
                            />
                            <Tooltip content={<CustomChartTooltip />} />

                            {getHalfPaidMonth(result.rows, submittedInput.principal) && (
                              <ReferenceLine
                                x={getHalfPaidMonth(result.rows, submittedInput.principal)}
                                stroke="#94a3b8"
                                strokeDasharray="4 4"
                              />
                            )}

                            <Area
                              type="monotone"
                              dataKey="balance"
                              name="남은 원금"
                              stroke="#0ea5e9"
                              fill="url(#balanceFill)"
                              strokeWidth={2.5}
                            />

                            <Area
                              type="monotone"
                              dataKey="interest"
                              name="월 이자"
                              stroke="#1e293b"
                              fillOpacity={0}
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                        {submittedInput.repaymentType === "equal_principal"
                          ? "원금균등상환은 초반 부담이 크지만 시간이 지날수록 이자와 납입 부담이 줄어드는 흐름이 뚜렷하게 보입니다."
                          : submittedInput.repaymentType === "bullet"
                          ? "만기일시상환은 대출 기간 동안 원금이 줄지 않다가 마지막에 한 번에 상환되는 구조입니다."
                          : "원리금균등상환은 월 납입액이 비교적 일정하지만, 초반에는 이자 비중이 더 큽니다."}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:col-span-2">
                      <div className="mb-4 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-sky-600" />
                        <h3 className="text-base font-bold text-slate-900">상환 비중</h3>
                      </div>

                      <div className="rounded-2xl bg-white p-4 transition duration-200 ease-out hover:shadow-lg hover:-translate-y-[4px]">
                        <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="flex h-full w-full">
                            <div
                              className="h-full bg-sky-500"
                              style={{
                                width: `${
                                  ((submittedInput.principal || 0) /
                                    Math.max(result.totalPayment || 1, 1)) *
                                  100
                                }%`,
                              }}
                            />
                            <div
                              className="h-full bg-slate-300"
                              style={{
                                width: `${(result.totalInterest / Math.max(result.totalPayment || 1, 1)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">원금</p>
                            <p className="mt-1 text-base font-bold text-slate-900">
                              {formatCurrency(submittedInput.principal)}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">이자</p>
                            <p className="mt-1 text-base font-bold text-slate-900">
                              {formatCurrency(result.totalInterest)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-600">
                          총 상환액 기준으로 원금과 이자가 어느 정도 비중을 차지하는지 보여줍니다.
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-sky-50 p-4">
                            <p className="text-xs font-medium text-sky-700">이자 최고 시점</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">
                              {getPeakInterestMonth(result.rows)?.round ?? "-"}개월차
                            </p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">원금 절반 이하</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">
                              {getHalfPaidMonth(result.rows, submittedInput.principal) ?? "-"}개월차
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">상환방식 비교</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        총 이자 기준으로 어떤 방식이 더 유리한지 비교할 수 있어요.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowComparison((prev) => !prev)}
                        className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        {showComparison ? "비교 숨기기" : "상환방식 비교하기"}
                      </button>
                    </div>
                  </div>

                  {showComparison && comparisonResults && (
                    <div className="mt-5 space-y-5">
                      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <p className="text-sm font-semibold text-sky-700">
                          추천 상환방식: {getBestRepaymentOption(comparisonResults)?.title ?? "-"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          총 이자가 가장 적은 방식 기준으로 보면{" "}
                          <strong>{getBestRepaymentOption(comparisonResults)?.title ?? "-"}</strong>이
                          가장 유리합니다.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 xl:col-span-3">
                          <div className="mb-4 text-base font-bold text-slate-900">총 이자 막대 비교</div>
                          <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
  data={comparisonChartData}
  barCategoryGap="18%"
>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                  dataKey="name"
                                  tick={{ fontSize: 12, fill: "#64748b" }}
                                  tickLine={false}
                                  axisLine={false}
                                />
                                <YAxis
                                  tickFormatter={formatChartMoney}
                                  tick={{ fontSize: 12, fill: "#64748b" }}
                                  tickLine={false}
                                  axisLine={false}
                                  width={60}
                                />
                                <Tooltip content={<ComparisonTooltip />} />
                                <Bar
  dataKey="totalInterest"
  barSize={24}
  radius={[8, 8, 0, 0]}
  animationDuration={700}
  animationEasing="ease-out"
>

                                  {comparisonChartData.map((_, index) => (
  <Cell key={index} fill={repaymentColors[index % repaymentColors.length]} />
))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="space-y-3 xl:col-span-2">
                          {comparisonResults.map((item, index) => {
                            const maxInterest = getMaxInterestValue(comparisonResults);
                            const interest = item.data?.totalInterest ?? 0;
                            const widthPercent = maxInterest > 0 ? (interest / maxInterest) * 100 : 0;

                            return (
                              <div
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                              >
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                  <div className="text-sm font-bold text-slate-700">
                                    {formatCurrency(interest)}
                                  </div>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                  <div
  className="h-full rounded-full"
  style={{
    width: `${widthPercent}%`,
    backgroundColor: repaymentColors[index % repaymentColors.length],
  }}
/>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                                  <span>월 상환금 {formatCurrency(item.data?.monthlyPayment ?? 0)}</span>
                                  <span>총 상환액 {formatCurrency(item.data?.totalPayment ?? 0)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

<section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
  <h3 className="text-xl font-bold text-slate-900 mb-4">
    원리금균등 vs 원금균등, 뭐가 더 유리할까?
  </h3>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h4 className="text-base font-bold text-slate-900 mb-2">원리금균등상환</h4>
      <p className="text-sm leading-6 text-slate-600">
        매달 같은 금액을 납부해서 월 상환 계획을 세우기 쉽습니다.
        대신 초반에는 이자 비중이 높아 총 이자가 더 커질 수 있습니다.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h4 className="text-base font-bold text-slate-900 mb-2">원금균등상환</h4>
      <p className="text-sm leading-6 text-slate-600">
        초반 월 납입금은 더 크지만, 시간이 갈수록 부담이 줄고
        전체적으로 총 이자가 더 적은 경우가 많습니다.
      </p>
    </div>
  </div>

  <div className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-slate-700">
    👉 월 부담을 낮추고 싶다면 원리금균등, 총 이자를 줄이고 싶다면 원금균등을 먼저 비교해보세요.
  </div>
</section>

                <section className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">저장한 비교안</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        서로 다른 조건을 저장해 두고 월 상환금과 총 이자를 비교할 수 있어요.
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      최대 6개 저장
                    </div>
                  </div>

                  {savedScenarios.length > 0 ? (
                    <div className="space-y-5">
                      <div className="h-[280px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
  data={savedScenarioChartData}
  barCategoryGap="22%"
>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 12, fill: "#64748b" }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              tickFormatter={formatChartMoney}
                              tick={{ fontSize: 12, fill: "#64748b" }}
                              tickLine={false}
                              axisLine={false}
                              width={60}
                            />
                            <Tooltip content={<ScenarioCompareTooltip />} />
                            <Bar
  dataKey="monthlyPayment"
  barSize={26}
  radius={[8, 8, 0, 0]}
  animationDuration={700}
  animationEasing="ease-out"
>
  {savedScenarioChartData.map((_, index) => (
  <Cell
    key={index}
    fill={scenarioCardThemes[index % scenarioCardThemes.length].accent}
  />
))}
</Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        {displaySavedScenarios.map((item, index) => {
  const theme = scenarioCardThemes[index % scenarioCardThemes.length];

  return (
    <div
      key={item.id}
      className={`relative overflow-hidden rounded-3xl border bg-slate-50 p-4 ${theme.ring}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: theme.accent }}
      />
                            <div className="flex items-start justify-between gap-3">
                              <div>
  <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${theme.badgeBg} ${theme.badgeText}`}>
    {item.displayName}
  </div>
  <p className="mt-2 text-sm text-slate-600">
    {getRepaymentLabel(item.input.repaymentType)} / 금리 {formatRate(item.input.annualRate)}
  </p>
</div>
                              <button
                                type="button"
                                onClick={() => handleDeleteScenario(item.id)}
                                className="rounded-xl border border-slate-300 bg-white p-2 text-slate-500 transition hover:bg-slate-50"
                                aria-label="시나리오 삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-2xl bg-white p-4">
                                <p className="text-xs font-medium text-slate-500">월 상환금</p>
                                <p className="mt-1 text-base font-bold text-slate-900">
                                  {formatCurrency(item.result.monthlyPayment)}
                                </p>
                              </div>
                              <div className="rounded-2xl bg-white p-4">
                                <p className="text-xs font-medium text-slate-500">총 이자</p>
                                <p className="mt-1 text-base font-bold text-slate-900">
                                  {formatCurrency(item.result.totalInterest)}
                                </p>
                              </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-slate-600">
                              {buildScenarioSummary(item.input, item.result)}
                            </p>

                            <button
                              type="button"
                              onClick={() => handleLoadScenario(item)}
                              className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${theme.link}`}
                            >
                              이 조건 다시 불러오기
                              <ChevronRight className="h-4 w-4" />
                            </button>
                              </div>
  );
})}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <Bookmark className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="mt-3 text-base font-bold text-slate-900">아직 저장한 비교안이 없어요</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        계산 후 <strong>비교안 저장</strong> 버튼을 누르면 조건별 비교가 쉬워집니다.
                      </p>
                    </div>
                  )}
                </section>

                <section className="rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6 transition duration-200 ease-out hover:shadow-xl hover:-translate-y-[4px]">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">상환 스케줄표</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        {getRepaymentLabel(submittedInput.repaymentType)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        대출기간 {submittedInput.months}개월
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {submittedInput.graceMonths > 0
                          ? `거치기간 ${submittedInput.graceMonths}개월`
                          : "거치기간 없음"}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-3xl border border-slate-200">
                    <table className="min-w-[760px] w-full border-collapse">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600">회차</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                            납입금액(원)
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                            이자(원)
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                            상환금(원)
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                            잔금(원)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((row, index) => (
                          <tr
                            key={row.round}
                            className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                          >
                            <td className="px-4 py-3 text-center text-sm font-semibold text-slate-900">
                              {row.round}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-slate-700">
                              {formatNumber(row.paymentAmount)}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-slate-700">
                              {formatNumber(row.interest)}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-slate-700">
                              {formatNumber(row.principalPayment)}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-slate-700">
                              {formatNumber(row.balance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm lg:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
                        <BadgeDollarSign className="h-3.5 w-3.5" />
                        맞춤 안내 영역
                      </div>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight">
                        다음 단계까지 이어지는 구조로 바꿨습니다
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        계산 결과를 확인했다면, 이제 실제 금리 비교와 대환 가능 여부를 확인해보세요.
  조건에 따라 월 납입금과 총 이자를 더 줄일 수 있습니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                      <a
  href="/loan-compare"
  onClick={() => trackCtaClick("rate_compare_result")}
  className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-bold text-white transition duration-150 hover:bg-sky-400 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
>
  내 조건에 맞는 금리 비교하기
</a>
                      <a
  href="/refinance-guide"
  onClick={() => trackCtaClick("refinance_result")}
  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white transition duration-150 hover:bg-white/10 hover:shadow-md active:scale-[0.98] active:translate-y-[1px]"
>
  대환 시 절약 금액 확인하기
</a>
                    </div>
                  </div>
                </section>

                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-500">
                  본 계산기는 참고용 평균값이며, 실제 대출 조건은 상품별 우대금리, 수수료,
                  계산 기준에 따라 달라질 수 있습니다.
                </div>

                <div className="mt-24 max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <h1 className="text-2xl font-bold text-slate-900 mb-6">
    대출 이자 계산기 | 원리금·원금균등 비교
  </h1>

  <p className="mb-6 text-slate-600">
    대출 이자 계산기는 대출 금액, 금리, 기간을 입력하면 월 상환금과 총 이자를 자동으로 계산해주는 도구입니다.
    특히 상환 방식에 따라 이자 부담이 크게 달라질 수 있기 때문에 사전에 비교하는 것이 매우 중요합니다.
  </p>

  <h2 className="text-lg font-bold text-slate-900 mb-2">
    대출 이자 계산 방법
  </h2>
  <p className="mb-6 text-slate-600">
    대출 이자는 기본적으로 대출 금액 × 금리 × 기간을 기준으로 계산됩니다.
    하지만 실제 부담은 상환 방식에 따라 크게 달라집니다.
  </p>

  <ul className="mb-6 space-y-2 text-slate-600">
    <li>✔ 원리금균등상환: 매달 같은 금액 납부</li>
    <li>✔ 원금균등상환: 초기 부담 ↑ 총 이자 ↓</li>
    <li>✔ 만기일시상환: 이자만 내다가 마지막에 원금 상환</li>
  </ul>

  <h2 className="text-lg font-bold text-slate-900 mb-2">
    어떤 방식이 유리할까?
  </h2>
  <p className="mb-6 text-slate-600">
    총 이자 기준으로는 원금균등상환이 가장 유리하지만,
    월 납입 부담을 줄이고 싶다면 원리금균등상환이 더 적합합니다.
  </p>

  <div className="rounded-2xl bg-sky-50 p-4 text-sm text-slate-700">
    👉 팁: 여러 조건을 저장해서 비교하면 가장 유리한 대출을 쉽게 찾을 수 있어요.
  </div>
</div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
