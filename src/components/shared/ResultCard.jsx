export default function ResultCard({ title, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ${className}`}>
      {title && <h3 className="mb-3 text-sm font-bold text-slate-800">{title}</h3>}
      {children}
    </section>
  );
}
