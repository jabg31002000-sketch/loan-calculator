import { useEffect } from "react";

/**
 * /out/loan 경로로 진입 시 계산기 허브로 안내합니다.
 * 기존에 이 경로를 사용하던 링크들의 하위 호환을 유지합니다.
 */
export default function OutLoanPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/calculator";
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F1EB]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#E5E1DA] border-t-[#D97852]" />
        <p className="text-sm font-semibold text-[#0E2A3A]">대출 계산기로 이동 중입니다...</p>
        <p className="mt-1 text-xs text-[#5E6E73]">잠시 후 자동으로 이동합니다</p>
      </div>
    </div>
  );
}
