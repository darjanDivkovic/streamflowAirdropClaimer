export function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`text-2xl font-bold text-white text-left ${className}`}>
      {children}
    </h1>
  );
}