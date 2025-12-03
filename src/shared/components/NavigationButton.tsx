import { useNavigate } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export function NavigationButton({ to, children, className }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={
        `px-3 py-0 rounded-xl border text-sm border-[1px] text-[#7D6DF1] font-bold bg-transparent ` + 
        (className ?? "")
      }
    >
      {children}
    </button>
  );
}