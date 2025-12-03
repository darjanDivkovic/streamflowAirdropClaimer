type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  errorMessage?: string;
};

export function TextInput({ error, errorMessage, className = "", ...props }: Props) {
  return (
    <div className="relative w-1/2">
      <input
        {...props}
        className={`w-full px-6 py-4 text-xl border-b-1 placeholder-white/40 text-white focus:outline-none transition-all duration-300 text-center
          ${error ? "border-red-500" : "border-white/20 focus:border-[#7D6DF1]"}
          ${className}`}
      />
      {error && errorMessage && (
        <p className="absolute -bottom-7 left-[50%] translate-x-[-50%] text-red-400 text-sm font-medium animate-fade-in">
          {errorMessage}
        </p>
      )}
    </div>
  );
}