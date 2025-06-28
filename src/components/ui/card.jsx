export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/10 border border-white/20 rounded-xl shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}