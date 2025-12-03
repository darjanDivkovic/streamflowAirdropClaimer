export function Subtext({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mt-4 text-sm text-white/60 text-center ${className}`}>
      {children}
    </p>
  );
}