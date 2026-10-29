import { useEffect, useRef } from 'react';
import { createChart, ColorType, UTCTimestamp } from 'lightweight-charts';
import type { Candle } from './types/market';

interface ChartPanelProps {
  candles: Candle[];
}

function ChartPanel({ candles }: ChartPanelProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0b1220' },
        textColor: '#cbd5e1',
      },
      grid: {
        vertLines: { color: 'rgba(148,163,184,0.10)' },
        horzLines: { color: 'rgba(148,163,184,0.10)' },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: 'rgba(148,163,184,0.25)' },
      timeScale: { borderColor: 'rgba(148,163,184,0.25)', timeVisible: true, secondsVisible: true },
      width: chartContainerRef.current.clientWidth,
      height: 340,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#f97316',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#f97316',
    });

    candlestickSeries.setData(
      candles.map((c) => ({
        time: (c.time / 1000) as UTCTimestamp,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    );

    chart.timeScale().fitContent();

    const resize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.remove();
    };
  }, [candles]);

  return (
    <div className="h-full w-full">
      <div className="mb-2 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>BTCUSDT</span>
        <span>1s · 5s · 1m · 5m · 15m · 1h</span>
      </div>
      <div ref={chartContainerRef} className="h-[340px] w-full" />
    </div>
  );
}

export default ChartPanel;
