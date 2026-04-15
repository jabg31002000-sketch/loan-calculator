import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} 대출 이자 계산기. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/privacy"
              className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
            >
              개인정보처리방침
            </Link>
            <Link
              to="/terms"
              className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
            >
              이용약관
            </Link>
            <Link
              to="/contact"
              className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
            >
              문의하기
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
