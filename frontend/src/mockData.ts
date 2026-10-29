import type { Candle, Level2Snapshot, Trade } from './types/market';

const base = 63520 + Math.random() * 100;

function generateCandles(): Candle[] {
  const arr: Candle[] = [];
  let current = base;
  for (let i = 0; i < 60; i += 1) {
    const open = current;
    const drift = (Math.random() - 0.48) * 80;
    const close = Math.max(62000, open + drift);
    const high = Math.max(open, close) + Math.random() * 40;
    const low = Math.min(open, close) - Math.random() * 40;
    const volume = 20 + Math.random() * 35;
    current = close;
    arr.push({
      time: Date.now() - (60 - i) * 1000,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(2)),
    });
  }
  return arr;
}

function generateLevel2(): Level2Snapshot {
  const bids = Array.from({ length: 8 }, (_, index) => ({
    price: 63520 + index * 2,
    size: 0.6 + index * 0.25 + Math.random() * 0.4,
  }));
  const asks = Array.from({ length: 8 }, (_, index) => ({
    price: 63522 + index * 2,
    size: 0.8 + index * 0.2 + Math.random() * 0.5,
  }));

  return {
    bids: bids.sort((a, b) => b.price - a.price),
    asks: asks.sort((a, b) => a.price - b.price),
    timestamp: Date.now(),
  };
}

function generateTrades(): Trade[] {
  return Array.from({ length: 12 }, (_, index) => ({
    id: `trade-${index}`,
    timestamp: Date.now() - (12 - index) * 1000,
    price: 63520 + (Math.random() * 65 - 25),
    size: 0.15 + Math.random() * 0.8,
    aggressor: index % 2 === 0 ? 'buy' : 'sell',
  }));
}

export const mockCandles = generateCandles();
export const mockLevel2 = generateLevel2();
export const mockTrades = generateTrades();

export const mockHeatmap = Array.from({ length: 12 }, () =>
  Array.from({ length: 24 }, () => Math.random() * 100),
);

export const mockVolumeProfile = [
  { label: 'V1', value: 74 },
  { label: 'V2', value: 98 },
  { label: 'V3', value: 86 },
  { label: 'V4', value: 64 },
  { label: 'V5', value: 40 },
  { label: 'V6', value: 58 },
  { label: 'V7', value: 72 },
  { label: 'V8', value: 92 },
];
