export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-24">
      <div className="text-center space-y-5">
        <div className="w-12 h-12 border-4 border-rose-100 border-t-[#C81E3D] rounded-full animate-spin mx-auto" />
        <p className="text-sm font-extrabold text-slate-500">Loading programmes and fees</p>
      </div>
    </div>
  );
}
