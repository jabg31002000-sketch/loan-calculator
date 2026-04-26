import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E1DA]/60 bg-[#F6F1EB]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="text-base font-bold tracking-[-0.02em] text-[#0E2A3A]">LoanClock</p>
            <p className="mt-1 text-[13px] text-[#5E6E73]">
              쉽고 빠른 금융 계산 도우미
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link to="/privacy" className="text-[13px] font-medium text-[#5E6E73] transition hover:text-[#0E2A3A]">개인정보처리방침</Link>
            <Link to="/terms" className="text-[13px] font-medium text-[#5E6E73] transition hover:text-[#0E2A3A]">이용약관</Link>
            <Link to="/contact" className="text-[13px] font-medium text-[#5E6E73] transition hover:text-[#0E2A3A]">문의하기</Link>
            <Link to="/feedback" className="text-[13px] font-medium text-[#5E6E73] transition hover:text-[#0E2A3A]">문의/기능요청</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E1DA]/60 pt-6">
          <p className="text-center text-[11px] leading-relaxed text-[#7A868B]">
            © {new Date().getFullYear()} LoanClock. 본 서비스는 참고용이며, 특정 금융 상품을 판매하거나 중개하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
