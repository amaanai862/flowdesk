import ChartPanel from './components/ChartPanel';
import DOMPanel from './components/DOMPanel';
import TapePanel from './components/TapePanel';
import FootprintPanel from './components/FootprintPanel';
import HeatmapPanel from './components/HeatmapPanel';
import VolumeProfilePanel from './components/VolumeProfilePanel';
import { mockCandles, mockLevel2, mockTrades, mockHeatmap, mockVolumeProfile } from './mockData';

function App() {
  return (
    <div className="h-screen w-full bg-slate-950 p-3 text-slate-100">
      <div className="flex h-full flex-col gap-3">
        <header className="panel flex items-center justify-between px-5 py-3">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-sky-400">FlowDesk</div>
            <div className="mt-1 text-xl font-semibold">BTCUSDT · Paper Trading</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">Live</div>
            <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300">1s</div>
            <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300">Binance Futures</div>
          </div>
        </header>

        <div className="flex flex-1 gap-3 overflow-hidden">
          <main className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden">
            <div className="flex min-h-0 flex-1 gap-3">
              <section className="panel min-w-0 flex-1 p-2">
                <ChartPanel candles={mockCandles} />
              </section>
              <aside className="panel w-[370px] p-2">
                <DOMPanel level2={mockLevel2} />
              </aside>
            </div>

            <div className="grid min-h-[260px] grid-cols-2 gap-3">
              <div className="panel p-2">
                <FootprintPanel candles={mockCandles} />
              </div>
              <div className="panel p-2">
                <HeatmapPanel cells={mockHeatmap} />
              </div>
            </div>
          </main>
        </div>

        <div className="grid grid-cols-[1.3fr_0.7fr] gap-3">
          <section className="panel min-h-[200px] p-2">
            <TapePanel trades={mockTrades} />
          </section>
          <section className="panel p-2">
            <VolumeProfilePanel profile={mockVolumeProfile} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
