interface VolumeProfileProps {
  profile: Array<{ label: string; value: number; }>
}

function VolumeProfilePanel({ profile }: VolumeProfileProps) {
  const max = Math.max(...profile.map((p) => p.value));

  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>Volume Profile</span>
        <span>Session</span>
      </div>

      <div className="flex h-[150px] items-end gap-2">
        {profile.map((row) => (
          <div key={row.label} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div
              className="w-full rounded-t bg-gradient-to-t from-sky-500 to-cyan-300"
              style={{ height: `${(row.value / max) * 100}%` }}
            />
            <span className="text-[10px] uppercase text-slate-400">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VolumeProfilePanel;
