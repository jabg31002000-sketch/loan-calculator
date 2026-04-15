import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoanCalculatorRedesign from "./LoanCalculatorRedesign";
import LoanComparePage from "./LoanComparePage";
import OutLoanPage from "./OutLoanPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoanCalculatorRedesign />} />
        <Route path="/loan-compare" element={<LoanComparePage />} />
        <Route path="/out/loan" element={<OutLoanPage />} />
      </Routes>
    </BrowserRouter>
  );
}