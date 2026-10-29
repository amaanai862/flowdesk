interface HeatmapProps {
  cells: Array<Array<number>>;
}

function HeatmapPanel({ cells }: HeatmapProps) {
  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>Liquidity Heatmap</span>
        <span>Contrast 0.72</span>
      </div>

      <div className="grid h-[180px] gap-[2px] rounded bg-slate-900 p-2" style={{ gridTemplateColumns: `repeat(${cells[0].length}, minmax(0, 1fr))` }}>
        {cells.flat().map((value, index) => {
          const alpha = Math.min(1, Math.max(0.05, value / 100));
          const color = value > 70 ? '#38bdf8' : value > 40 ? '#60a5fa' : '#334155';
          return <div key={index} style={{ background: `${color}${Math.round(alpha * 255).toString(16).padStart(2,'0')}` }} className="rounded-[2px]" />;
        })}
      </div>
    </div>
  );
}

export default HeatmapPanel;
