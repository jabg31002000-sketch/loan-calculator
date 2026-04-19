import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-4 text-center">
          <p className="text-sm font-bold text-slate-700">LoanClock</p>
          <p className="mt-1 text-xs text-slate-400">
            쉽고 빠른 금융 계산 도우미
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy" className="text-xs font-medium text-slate-400 transition hover:text-slate-600">개인정보처리방침</Link>
          <Link to="/terms" className="text-xs font-medium text-slate-400 transition hover:text-slate-600">이용약관</Link>
          <Link to="/contact" className="text-xs font-medium text-slate-400 transition hover:text-slate-600">문의하기</Link>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-300">
          © {new Date().getFullYear()} LoanClock. 본 서비스는 참고용이며, 특정 금융 상품을 판매하거나 중개하지 않습니다.
        </p>
      </div>
    </footer>
  );
}
