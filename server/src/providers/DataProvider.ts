import type { Candlestick, Level2Snapshot, MarketState, TradeTick } from '../types.js';

export interface DataProvider {
  start(): Promise<void>;
  stop(): Promise<void>;
  getMarketState(): MarketState;
  on(event: 'trade' | 'book' | 'bar', callback: (payload: any) => void): void;
}

export abstract class BaseDataProvider implements DataProvider {
  protected listeners: Map<string, Array<(payload: any) => void>> = new Map();

  protected emit(event: 'trade' | 'book' | 'bar', payload: any) {
    const callbacks = this.listeners.get(event) ?? [];
    callbacks.forEach((callback) => callback(payload));
  }

  on(event: 'trade' | 'book' | 'bar', callback: (payload: any) => void): void {
    const existing = this.listeners.get(event) ?? [];
    existing.push(callback);
    this.listeners.set(event, existing);
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract getMarketState(): MarketState;
}
