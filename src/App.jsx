import { useMemo, useState } from "react";
import "./App.css";

const BANK_RATES = {
  "국민은행": 4.5,
  "신한은행": 4.3,
  "우리은행": 4.4,
  "하나은행": 4.4,
  "카카오뱅크": 3.9,
  "토스뱅크": 3.8,
};

function formatNumber(num) {
  return Math.round(num).toLocaleString("ko-KR");
}

function calculateMonthlyPayment(principal, annualRate, loanYears) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(loanYears) ||
    principal <= 0 ||
    loanYears <= 0
  ) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = loanYears * 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  return (
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months))
  );
}

export default function App() {
  const [amount, setAmount] = useState(100000000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(30);
  const [selectedBank, setSelectedBank] = useState("");

  const handleBankChange = (bank) => {
    setSelectedBank(bank);
    if (bank && BANK_RATES[bank] !== undefined) {
      setRate(BANK_RATES[bank]);
    }
  };

  const monthlyPayment = useMemo(
    () => calculateMonthlyPayment(Number(amount), Number(rate), Number(years)),
    [amount, rate, years]
  );

  const totalPayment = monthlyPayment * Number(years) * 12;
  const totalInterest = totalPayment - Number(amount);

  return (
    <div className="calculator">
      <h1>대출 이자 계산기</h1>
      <p className="subtitle">원리금균등상환 기준으로 계산합니다</p>

      <div className="field">
        <label htmlFor="bank">은행 선택</label>
        <select
          id="bank"
          value={selectedBank}
          onChange={(e) => handleBankChange(e.target.value)}
        >
          <option value="">직접 입력</option>
          {Object.entries(BANK_RATES).map(([bank, bankRate]) => (
            <option key={bank} value={bank}>
              {bank} (평균 {bankRate}%)
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="amount">대출금액</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="대출금액을 입력하세요"
          min="0"
        />
        <p className="unit">{Number(amount) > 0 ? `${formatNumber(Number(amount) / 10000)}만원` : ""}</p>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="rate">금리 (%)</label>
          <input
            id="rate"
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => {
              setRate(e.target.value);
              setSelectedBank("");
            }}
            min="0"
            max="30"
          />
        </div>

        <div className="field">
          <label htmlFor="years">대출기간 (년)</label>
          <input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="1"
            max="40"
          />
        </div>
      </div>

      <div className="result">
        <p className="label">월 상환금</p>
        <p className="amount">
          {formatNumber(monthlyPayment)}
          <span className="currency">원</span>
        </p>
        {monthlyPayment > 0 && (
          <div className="total-info">
            <div className="info-item">
              <p className="info-label">총 상환금</p>
              <p className="info-value">{formatNumber(totalPayment / 10000)}만</p>
            </div>
            <div className="info-item">
              <p className="info-label">총 이자</p>
              <p className="info-value">{formatNumber(totalInterest / 10000)}만</p>
            </div>
          </div>
        )}
      </div>

      <div className="notice">
        본 계산기의 금리는 참고용 평균값이며, 실제 대출 금리는 개인 신용도, 대출 조건 등에 따라 달라질 수 있습니다.
        정확한 금리는 해당 은행에 문의해 주세요.
      </div>
    </div>
  );
}
