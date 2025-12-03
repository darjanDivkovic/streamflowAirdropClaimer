type Props = { onBack?: () => void; message?: string };

export function NotFoundPage({ onBack, message = "Wrong ID, clawed back, or doesn't exist yet." }: Props) {
  return (
    <div className="min-h-screen bg-[#0f0a1f] text-white flex flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-5xl font-bold">Airdrop Not Found</h1>
      <p className="text-xl text-gray-400 max-w-lg">{message}</p>
      <button
        onClick={onBack || (() => window.history.back())}
        className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-xl text-xl font-semibold transition"
      >
        Back to Search
      </button>
    </div>
  );
}