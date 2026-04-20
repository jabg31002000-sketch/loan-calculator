export default function ResultCard({ title, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8 ${className}`}>
      {title && <h3 className="mb-4 text-base font-semibold text-[#0E2A3A]">{title}</h3>}
      {children}
    </section>
  );
}
