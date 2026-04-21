import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./HomePage";
import LoanComparePage from "./LoanComparePage";
import RefinancePage from "./RefinancePage";
import OutLoanPage from "./OutLoanPage";
import PrivacyPage from "./PrivacyPage";
import TermsPage from "./TermsPage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";
import Header from "./components/Header";
import { CalculatorPage, getConfig } from "./calculators";
import IntroPage from "./calculators/IntroPage";
import CalculatorHub from "./pages/CalculatorHub";
import GuideList from "./pages/guides/GuideList";
import GuideLayout from "./pages/guides/GuideLayout";

// OutLoanPage 를 제외한 모든 페이지에 Header + Footer 적용
function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />

        {/* 설명 페이지 (Intro) */}
        <Route path="/credit-loan"       element={<Layout><IntroPage key="intro-credit" config={getConfig("credit")} /></Layout>} />
        <Route path="/refinance-loan"    element={<Layout><IntroPage key="intro-refinance" config={getConfig("refinance")} /></Layout>} />
        <Route path="/jeonse-vs-rent"    element={<Layout><IntroPage key="intro-jeonse" config={getConfig("jeonse")} /></Layout>} />
        <Route path="/dsr"               element={<Layout><IntroPage key="intro-dsr" config={getConfig("dsr")} /></Layout>} />
        <Route path="/mortgage"          element={<Layout><IntroPage key="intro-mortgage" config={getConfig("mortgage")} /></Layout>} />
        <Route path="/auto-loan"         element={<Layout><IntroPage key="intro-auto" config={getConfig("auto")} /></Layout>} />
        <Route path="/beotimmok-jeonse"     element={<Layout><IntroPage key="intro-beotimmok" config={getConfig("beotimmokJeonse")} /></Layout>} />
        <Route path="/jeonse-loan-interest" element={<Layout><IntroPage key="intro-jeonse-interest" config={getConfig("jeonseLoanInterest")} /></Layout>} />
        <Route path="/didimdol"             element={<Layout><IntroPage key="intro-didimdol" config={getConfig("didimdol")} /></Layout>} />
        <Route path="/bogeumjari"           element={<Layout><IntroPage key="intro-bogeumjari" config={getConfig("bogeumjari")} /></Layout>} />
        <Route path="/monthly-rent-loan"    element={<Layout><IntroPage key="intro-monthly-rent" config={getConfig("monthlyRentLoan")} /></Layout>} />
        <Route path="/first-home"           element={<Layout><IntroPage key="intro-first-home" config={getConfig("firstHome")} /></Layout>} />

        {/* 계산기 허브 */}
        <Route path="/calculator" element={<Layout><CalculatorHub /></Layout>} />

        {/* 계산기 페이지 (Calculator) */}
        <Route path="/credit-loan/calculator"    element={<Layout><CalculatorPage key="credit" config={getConfig("credit")} /></Layout>} />
        <Route path="/refinance-loan/calculator" element={<Layout><CalculatorPage key="refinance" config={getConfig("refinance")} /></Layout>} />
        <Route path="/jeonse-vs-rent/calculator" element={<Layout><CalculatorPage key="jeonse" config={getConfig("jeonse")} /></Layout>} />
        <Route path="/dsr/calculator"            element={<Layout><CalculatorPage key="dsr" config={getConfig("dsr")} /></Layout>} />
        <Route path="/mortgage/calculator"       element={<Layout><CalculatorPage key="mortgage" config={getConfig("mortgage")} /></Layout>} />
        <Route path="/auto-loan/calculator"      element={<Layout><CalculatorPage key="auto" config={getConfig("auto")} /></Layout>} />
        <Route path="/beotimmok-jeonse/calculator"     element={<Layout><CalculatorPage key="beotimmok" config={getConfig("beotimmokJeonse")} /></Layout>} />
        <Route path="/jeonse-loan-interest/calculator" element={<Layout><CalculatorPage key="jeonse-interest" config={getConfig("jeonseLoanInterest")} /></Layout>} />
        <Route path="/didimdol/calculator"             element={<Layout><CalculatorPage key="didimdol" config={getConfig("didimdol")} /></Layout>} />
        <Route path="/bogeumjari/calculator"           element={<Layout><CalculatorPage key="bogeumjari" config={getConfig("bogeumjari")} /></Layout>} />
        <Route path="/monthly-rent-loan/calculator"    element={<Layout><CalculatorPage key="monthly-rent" config={getConfig("monthlyRentLoan")} /></Layout>} />
        <Route path="/first-home/calculator"           element={<Layout><CalculatorPage key="first-home" config={getConfig("firstHome")} /></Layout>} />

        {/* 기존 URL 리다이렉트 (SEO 호환) */}
        <Route path="/loan-interest-calculator"  element={<Navigate to="/credit-loan" replace />} />
        <Route path="/refinance-calculator"      element={<Navigate to="/refinance-loan" replace />} />
        <Route path="/jeonse-vs-rent-calculator" element={<Navigate to="/jeonse-vs-rent" replace />} />
        <Route path="/dsr-calculator"            element={<Navigate to="/dsr" replace />} />
        <Route path="/mortgage-calculator"       element={<Navigate to="/mortgage" replace />} />
        <Route path="/auto-loan-calculator"      element={<Navigate to="/auto-loan" replace />} />

        {/* 브릿지 페이지 (변경 없음) */}
        <Route path="/compare"      element={<Layout><LoanComparePage /></Layout>} />
        <Route path="/refinance"    element={<Layout><RefinancePage /></Layout>} />
        <Route path="/loan-compare" element={<Layout><LoanComparePage /></Layout>} />

        {/* 가이드 */}
        <Route path="/guides"       element={<Layout><GuideList /></Layout>} />
        <Route path="/guides/:slug" element={<Layout><GuideLayout /></Layout>} />

        {/* 기존 가이드 URL 리다이렉트 */}
        <Route path="/guide/interest"  element={<Navigate to="/guides/loan-interest-calculation" replace />} />
        <Route path="/guide/refinance" element={<Navigate to="/guides/refinance-timing" replace />} />
        <Route path="/guide/credit"    element={<Navigate to="/guides/credit-score-guide" replace />} />

        {/* 기타 */}
        <Route path="/privacy"      element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms"        element={<Layout><TermsPage /></Layout>} />
        <Route path="/contact"      element={<Layout><ContactPage /></Layout>} />
        <Route path="/out/loan"     element={<OutLoanPage />} />
      </Routes>
    </BrowserRouter>
  );
}
