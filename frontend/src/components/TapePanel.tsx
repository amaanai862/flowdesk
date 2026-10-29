import type { Trade } from '../types/market';

interface TapePanelProps {
  trades: Trade[];
}

function TapePanel({ trades }: TapePanelProps) {
  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>Time & Sales</span>
        <span>Large trade filter: 0.5 BTC</span>
      </div>

      <div className="grid grid-cols-[0.8fr_1.1fr_0.8fr_0.8fr] gap-2 border-b border-slate-700 pb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
        <span>Time</span>
        <span>Price</span>
        <span>Size</span>
        <span>Side</span>
      </div>

      <div className="mt-2 grid max-h-[140px] gap-2 overflow-auto pr-1">
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-[0.8fr_1.1fr_0.8fr_0.8fr] gap-2 rounded bg-slate-900/70 px-2 py-1 text-xs">
            <span>{new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className={trade.aggressor === 'buy' ? 'text-emerald-300' : 'text-rose-300'}>{trade.price.toFixed(2)}</span>
            <span>{trade.size.toFixed(3)}</span>
            <span className={trade.aggressor === 'buy' ? 'text-emerald-300' : 'text-rose-300'}>{trade.aggressor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TapePanel;
