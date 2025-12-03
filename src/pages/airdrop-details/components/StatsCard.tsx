type StatsCardProps = {
  value: string | number;
  label: string;
  className?: string;
  children?: any;
};

export function StatsCard({ value, label, children = null, className = "" }: StatsCardProps) {
  return (
    <div className={`bg-white/5 w-1/4 rounded-xl h-[200px] p-6 flex flex-col justify-between border border-white/10 ${className}`}>
      <h1 className="text-4xl font-modernist">{value}</h1>
      { children }
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}