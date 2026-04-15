import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoanCalculatorRedesign from "./LoanCalculatorRedesign";
import LoanComparePage from "./LoanComparePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoanCalculatorRedesign />} />
        <Route path="/loan-compare" element={<LoanComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}