export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  id: string;
  timestamp: number;
  price: number;
  size: number;
  aggressor: 'buy' | 'sell';
}

export interface DepthEntry {
  price: number;
  size: number;
}

export interface Level2Snapshot {
  bids: DepthEntry[];
  asks: DepthEntry[];
  timestamp: number;
}
