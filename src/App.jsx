import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

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

function getResultDescription(result, repaymentType, months, graceMonths) {
  const repaymentLabel =
    REPAYMENT_OPTIONS.find((option) => option.value === repaymentType)?.label ?? "";

  return `선택한 조건은 ${repaymentLabel} 방식이며, 총 ${months}개월 동안 상환합니다. ${
    graceMonths > 0 ? `처음 ${graceMonths}개월은 거치기간으로 이자만 납부합니다. ` : ""
  }총 이자는 ${formatCurrency(result.totalInterest)}이고, 총 상환액은 ${formatCurrency(
    result.totalPayment
  )}입니다.`;
}

function getRepaymentTypeDescription(repaymentType) {
  if (repaymentType === "equal_payment") {
    return "매달 같은 금액을 납부하는 방식입니다. 자금 계획을 세우기 쉽지만, 초반에는 이자 비중이 더 큽니다.";
  }

  if (repaymentType === "equal_principal") {
    return "매달 같은 원금을 갚고, 남은 잔액이 줄수록 이자가 감소하는 방식입니다. 초반 부담은 크지만 총 이자는 적은 편입니다.";
  }

  if (repaymentType === "bullet") {
    return "대출 기간 동안 이자만 내고, 만기에 원금을 한 번에 상환하는 방식입니다. 매달 부담은 작지만 만기 상환 부담이 큽니다.";
  }

  return "";
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

function calcBullet(principal, annualRate, months, graceMonths) {
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
    return calcBullet(principal, annualRate, months, graceMonths);
  }

  return calcEqualPayment(principal, annualRate, months, graceMonths);
}

const generateChartData = (rows) => {
  if (!rows) return [];

  return rows.map((item, index) => ({
    month: index + 1,
    balance: item.balance,
    interest: item.interest,
  }));
};

export default function App() {
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

  useEffect(() => {
  const saved = localStorage.getItem("loanCalculatorInputs");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setBank(parsed.bank ?? "직접입력");
      setPrincipal(parsed.principal ?? "");
      setRate(parsed.rate ?? "");
      setMonths(parsed.months ?? "");
      setGraceMonths(parsed.graceMonths ?? "");
      setHasGracePeriod((parsed.graceMonths ?? 0) > 0 ? "yes" : "no");
      setRepaymentType(parsed.repaymentType ?? "equal_payment");
    } catch (error) {
      console.error("불러오기 실패", error);
    }
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "loanCalculatorInputs",
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
}, [isLoaded, bank, principal, rate, months, graceMonths, repaymentType]);

  const result = useMemo(() => {
    if (!submittedInput) return null;
    return calculateLoan(submittedInput);
  }, [submittedInput]);

  const comparisonResults = useMemo(() => {
  if (!submittedInput) return null;

  return [
    {
      title: "원리금균등상환",
      data: calculateLoan({
        ...submittedInput,
        repaymentType: "equal_payment",
      }),
    },
    {
      title: "원금균등상환",
      data: calculateLoan({
        ...submittedInput,
        repaymentType: "equal_principal",
      }),
    },
    {
      title: "만기일시상환",
      data: calculateLoan({
        ...submittedInput,
        repaymentType: "bullet",
      }),
    },
  ];
}, [submittedInput]);

  const handleBankChange = (event) => {
    const selected = event.target.value;
    setBank(selected);

     if (selected === "직접입력") {
    setRate(""); // ← 여기 핵심 (비워버림)
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

  return (
    <div className="page-shell">
      <div className="calculator">
        <h1>대출 이자 계산기</h1>
        <p className="subtitle">상환방식과 거치기간을 반영해 계산합니다</p>

        <div className="field">
          <label>은행 선택</label>
          <select value={bank} onChange={handleBankChange}>
            {Object.keys(BANK_RATES).map((bankName) => (
              <option key={bankName} value={bankName}>
                {bankName}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>대출금액</label>
          <input
            type="text"
            value={principal}
            onChange={(e) => {
    const raw = e.target.value.replace(/,/g, "");

    if (!/^\d*$/.test(raw)) {
      return;
    }

    setPrincipal(formatInputNumber(raw));
  }}
  placeholder="대출금액을 입력하세요"
/>
        </div>

        <div className="row">
          <div className="field">
            <label>금리 (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="금리를 입력하세요"
            />
          </div>

          <div className="field">
            <label>대출기간 (개월)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="대출기간을 입력하세요"
            />
          </div>
        </div>

        <div className="field">
  <label>거치기간 선택</label>

  <div className="repayment-method-row repayment-method-row--2">
    <label
      className={`repayment-method-option ${hasGracePeriod === "no" ? "active" : ""}`}
    >
      <input
        type="radio"
        name="hasGracePeriod"
        value="no"
        checked={hasGracePeriod === "no"}
        onChange={() => {
          setHasGracePeriod("no");
          setGraceMonths("");
        }}
      />
      <span className="repayment-method-label">없음</span>
    </label>

    <label
      className={`repayment-method-option ${hasGracePeriod === "yes" ? "active" : ""}`}
    >
      <input
        type="radio"
        name="hasGracePeriod"
        value="yes"
        checked={hasGracePeriod === "yes"}
        onChange={() => setHasGracePeriod("yes")}
      />
      <span className="repayment-method-label">있음</span>
    </label>
  </div>

  {hasGracePeriod === "yes" && (
    <>
      <input
        type="number"
        value={graceMonths}
        onChange={(e) => setGraceMonths(e.target.value)}
        placeholder="거치기간(개월)을 입력하세요"
        style={{ marginTop: "10px" }}
      />
      <p className="hint">거치기간 동안은 이자만 납부합니다.</p>
    </>
  )}
</div>

        <div className="field">
  <label>상환방식</label>

  <div className="repayment-method-row repayment-method-row--3">
    {REPAYMENT_OPTIONS.map((option) => (
      <label
        key={option.value}
        className={`repayment-method-option ${
          repaymentType === option.value ? "active" : ""
        }`}
      >
        <input
          type="radio"
          name="repaymentType"
          value={option.value}
          checked={repaymentType === option.value}
          onChange={(e) => setRepaymentType(e.target.value)}
        />

        <span className="repayment-method-label">
          {option.label}
        </span>
      </label>
    ))}
  </div>

  <button
    type="button"
    className="help-toggle-button"
    onClick={() => setShowRepaymentHelp((prev) => !prev)}
  >
    {showRepaymentHelp ? "상환방식 설명 숨기기" : "상환방식 설명 보기"}
  </button>

  {showRepaymentHelp && (
    <div className="repayment-help-box">
      <div className="repayment-help-item">
        <p><strong>[원리금균등상환]</strong> : 매달 같은 금액을 납부하는 방식입니다. 초반에는 이자 비중이 크고, 후반으로 갈수록 원금 비중이 커집니다.</p>
      </div>

      <div className="repayment-help-item">
        <p><strong>[원금균등상환]</strong> : 매달 동일한 원금을 상환하고, 남은 잔액에 따라 이자가 줄어드는 방식입니다. 초반 부담은 크지만 총 이자는 가장 적습니다.</p>
      </div>

      <div className="repayment-help-item">
        <p><strong>[만기일시상환]</strong> : 대출 기간 동안 이자만 납부하다가 만기 시 원금을 한 번에 상환하는 방식입니다. 매달 부담은 적지만 마지막에 큰 금액이 필요합니다.</p>
      </div>
    </div>
  )}
</div>

        <button className="calc-button" type="button" onClick={handleCalculate}>
          계산하기
        </button>

        {error && <div className="error-box">{error}</div>}

        {result && submittedInput && (
          <>
            <div className="result">
              <p className="label">월 상환금</p>
              <p className="amount">
                {formatNumber(result.monthlyPayment)}
                <span className="currency">원</span>
              </p>

              <div className="total-info">
                <div className="info-item">
                  <p className="info-label">총 이자</p>
                  <p className="info-value">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">총 상환액</p>
                  <p className="info-value">{formatCurrency(result.totalPayment)}</p>
                </div>
              </div>
              <div className="result-description">
  {getResultDescription(
    result,
    submittedInput.repaymentType,
    submittedInput.months,
    submittedInput.graceMonths
  )}
</div>
            </div>

<div className="chart-box">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={generateChartData(result.rows)}>
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(value) => formatNumber(value)} />
      <Tooltip formatter={(value) => `${formatNumber(value)}원`} />
      <Legend />

      <Line
        type="monotone"
        dataKey="balance"
        name="남은 원금"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="interest"
        name="이자"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

            <div className="action-row">
  <button
    className="secondary-button"
    type="button"
    onClick={() => setShowComparison((prev) => !prev)}
  >
    {showComparison ? "비교 숨기기" : "상환방식 비교하기"}
  </button>

  <button
    className="secondary-button"
    type="button"
    onClick={handleReset}
  >
    다시 계산하기
  </button>
</div>

{showComparison && comparisonResults && (
  <div className="compare-box">
    <div className="compare-title">상환방식 비교</div>

    <div className="compare-grid">
      {comparisonResults.map((item) => (
        <div className="compare-card" key={item.title}>
          <h3>{item.title}</h3>
          <p>월 상환금: {formatCurrency(item.data?.monthlyPayment ?? 0)}</p>
          <p>총 이자: {formatCurrency(item.data?.totalInterest ?? 0)}</p>
          <p>총 상환액: {formatCurrency(item.data?.totalPayment ?? 0)}</p>
        </div>
      ))}
    </div>
  </div>
)}

            <div className="schedule">
              <h2>상환 스케줄표</h2>

              <div className="summary-chip-wrap">
                <span className="summary-chip">
                  {REPAYMENT_OPTIONS.find((v) => v.value === submittedInput.repaymentType)?.label}
                </span>
                <span className="summary-chip">
                  대출기간 {submittedInput.months}개월
                </span>
                <span className="summary-chip">
  | {submittedInput.graceMonths > 0 ? `거치기간 ${submittedInput.graceMonths}개월` : "거치기간 없음"}
</span>
              </div>

              <div className="schedule-table-wrap">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>회차</th>
                      <th>납입금액(원)</th>
                      <th>이자(원)</th>
                      <th>상환금(원)</th>
                      <th>잔금(원)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.round}>
                        <td>{row.round}</td>
                        <td>{formatNumber(row.paymentAmount)}</td>
                        <td>{formatNumber(row.interest)}</td>
                        <td>{formatNumber(row.principalPayment)}</td>
                        <td>{formatNumber(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="notice">
          본 계산기는 참고용 평균값이며, 실제 대출 조건은 상품별 우대금리,
          수수료, 계산 기준에 따라 달라질 수 있습니다.
        </div>
      </div>
    </div>
  );
}