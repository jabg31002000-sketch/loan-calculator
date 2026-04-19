import { getDiagnosis } from "../../components/loan-calculator/diagnosisEngine";

/**
 * 신용대출 해석기
 * 기존 getDiagnosis를 래핑하여 interpreter 인터페이스에 맞춤
 */
export default function creditInterpreter(input, result) {
  return getDiagnosis({
    result,
    submittedInput: input,
    savingsAtLowerRate: result.savingsAtLowerRate,
    loanPurpose: null,
    priority: input.priority,
    recommendation: result.recommendation,
  });
}
