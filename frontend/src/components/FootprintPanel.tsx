interface FootprintPanelProps {
  candles: { open: number; high: number; low: number; close: number; volume: number; time: number }[];
}

function FootprintPanel({ candles }: FootprintPanelProps) {
  const current = candles[candles.length - 1];
  const delta = current.close - current.open;

  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>Footprint</span>
        <span className={delta >= 0 ? 'text-emerald-300' : 'text-rose-300'}>Delta {delta.toFixed(2)}</span>
      </div>

      <div className="grid h-[180px] grid-cols-8 gap-1 rounded bg-slate-900 p-2">
        {Array.from({ length: 32 }).map((_, index) => {
          const bid = index % 2 === 0;
          const height = 18 + ((index * 11) % 56);
          return (
            <div key={index} className="flex items-end justify-center">
              <div
                className={`w-full rounded-t ${bid ? 'bg-emerald-500/80' : 'bg-rose-500/80'}`}
                style={{ height: `${height}px` }}
                title={bid ? 'bid' : 'ask'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FootprintPanel;
