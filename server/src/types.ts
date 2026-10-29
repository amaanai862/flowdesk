export type TradeSide = 'buy' | 'sell';

export interface TradeTick {
  timestamp: number;
  price: number;
  size: number;
  aggressorSide: TradeSide;
}

export interface DepthEntry {
  price: number;
  size: number;
}

export interface Level2Snapshot {
  symbol: string;
  bids: DepthEntry[];
  asks: DepthEntry[];
  timestamp: number;
}

export interface Candlestick {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketState {
  symbol: string;
  lastPrice: number;
  trades: TradeTick[];
  level2: Level2Snapshot;
  candles: Candlestick[];
  updatedAt: number;
}
