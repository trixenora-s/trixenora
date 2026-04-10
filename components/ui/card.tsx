export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-slate-800 border border-slate-700 rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}
