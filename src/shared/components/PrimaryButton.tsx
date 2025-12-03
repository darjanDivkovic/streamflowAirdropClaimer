type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
};

export function PrimaryButton({ children, disabled, className = "", type = "button", ...props }: Props) {
  return (
   <button
      {...props}
      disabled={disabled}
      type={type}
      className={`px-8 py-3 bg-[#7D6DF1] hover:bg-[#7D6DF1]/50  transition disabled:bg-gray-800 disabled:text-gray-500 text-white text-base cursor-pointer rounded-full${className}`}
    >
    {children}
  </button>
  );
}