export default function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}