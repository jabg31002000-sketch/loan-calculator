import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoanCalculatorRedesign from "./LoanCalculatorRedesign";
import LoanComparePage from "./LoanComparePage";
import RefinancePage from "./RefinancePage";
import OutLoanPage from "./OutLoanPage";
import PrivacyPage from "./PrivacyPage";
import TermsPage from "./TermsPage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";

// OutLoanPage 를 제외한 모든 페이지에 Footer 적용
function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Layout><LoanCalculatorRedesign /></Layout>} />
        <Route path="/compare"      element={<Layout><LoanComparePage /></Layout>} />
        <Route path="/refinance"    element={<Layout><RefinancePage /></Layout>} />
        <Route path="/loan-compare" element={<Layout><LoanComparePage /></Layout>} />
        <Route path="/privacy"      element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms"        element={<Layout><TermsPage /></Layout>} />
        <Route path="/contact"      element={<Layout><ContactPage /></Layout>} />
        <Route path="/out/loan"     element={<OutLoanPage />} />
      </Routes>
    </BrowserRouter>
  );
}