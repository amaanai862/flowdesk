import type { Level2Snapshot } from '../types/market';

interface DOMPanelProps {
  level2: Level2Snapshot;
}

function DOMPanel({ level2 }: DOMPanelProps) {
  const totalBid = level2.bids.reduce((sum, item) => sum + item.size, 0);
  const totalAsk = level2.asks.reduce((sum, item) => sum + item.size, 0);

  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>DOM</span>
        <span>{new Date(level2.timestamp).toLocaleTimeString()}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div className="rounded border border-slate-700 bg-slate-900 p-2">
          <div className="text-emerald-400">Bid</div>
          <div className="mt-2 text-base font-semibold text-emerald-300">{totalBid.toFixed(1)}</div>
        </div>
        <div className="rounded border border-slate-700 bg-slate-900 p-2">
          <div className="text-rose-400">Ask</div>
          <div className="mt-2 text-base font-semibold text-rose-300">{totalAsk.toFixed(1)}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 text-[11px] uppercase tracking-[0.12em] text-slate-400">
        <span>Price</span>
        <span>Size</span>
        <span>Cum</span>
      </div>

      <div className="mt-2 space-y-1">
        {[...level2.asks].slice(0, 8).reverse().map((row, index) => (
          <div key={`ask-${row.price}`} className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 rounded bg-slate-900/60 px-2 py-1 text-xs">
            <span className="text-rose-300">{row.price.toFixed(2)}</span>
            <span>{row.size.toFixed(2)}</span>
            <span>{(row.size * (index + 1)).toFixed(2)}</span>
          </div>
        ))}

        <div className="my-2 flex items-center justify-center rounded bg-sky-500/10 px-2 py-1 text-center text-[11px] uppercase tracking-[0.2em] text-sky-300">
          Last 63541.32
        </div>

        {[...level2.bids].slice(0, 8).map((row, index) => (
          <div key={`bid-${row.price}`} className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 rounded bg-slate-900/60 px-2 py-1 text-xs">
            <span className="text-emerald-300">{row.price.toFixed(2)}</span>
            <span>{row.size.toFixed(2)}</span>
            <span>{(row.size * (index + 1)).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DOMPanel;
