import { EventEmitter } from 'node:events';
import type { Candlestick, DepthEntry, Level2Snapshot, MarketState, TradeTick } from '../types.js';
import { BaseDataProvider } from './DataProvider.js';

const BINANCE_WS_BASE = 'wss://fstream.binance.com/ws';

export class BinanceFuturesProvider extends BaseDataProvider {
  private tradeSocket?: WebSocket;
  private bookSocket?: WebSocket;
  private symbol = 'btcusdt';
  private lastPrice = 63540;
  private trades: TradeTick[] = [];
  private bids = new Map<number, number>();
  private asks = new Map<number, number>();
  private candles: Candlestick[] = [];

  public async start(): Promise<void> {
    this.tradeSocket = new WebSocket(`${BINANCE_WS_BASE}/${this.symbol}@aggTrade`);
    this.bookSocket = new WebSocket(`${BINANCE_WS_BASE}/${this.symbol}@depth@100ms`);

    this.tradeSocket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(String(event.data));
        const trade: TradeTick = {
          timestamp: payload.T ?? Date.now(),
          price: Number(payload.p),
          size: Number(payload.q),
          aggressorSide: payload.m ? 'sell' : 'buy',
        };

        this.lastPrice = trade.price;
        this.trades = [{ ...trade }, ...this.trades].slice(0, 200);
        this.emit('trade', trade);
        this.pushCandle(trade);
      } catch (error) {
        console.error('Failed to parse aggTrade payload', error);
      }
    });

    this.bookSocket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(String(event.data));
        const snapshot: Level2Snapshot = {
          symbol: this.symbol.toUpperCase(),
          bids: Object.entries(payload.bids ?? {}).map(([price, size]) => ({
            price: Number(price),
            size: Number(size),
          })),
          asks: Object.entries(payload.asks ?? {}).map(([price, size]) => ({
            price: Number(price),
            size: Number(size),
          })),
          timestamp: payload.E ?? Date.now(),
        };

        this.bids = new Map(snapshot.bids.map((entry) => [entry.price, entry.size]));
        this.asks = new Map(snapshot.asks.map((entry) => [entry.price, entry.size]));
        this.emit('book', snapshot);
      } catch (error) {
        console.error('Failed to parse depth payload', error);
      }
    });
  }

  public async stop(): Promise<void> {
    this.tradeSocket?.close();
    this.bookSocket?.close();
  }

  public getMarketState(): MarketState {
    const level2: Level2Snapshot = {
      symbol: this.symbol.toUpperCase(),
      bids: Array.from(this.bids.entries())
        .map(([price, size]) => ({ price, size }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 20),
      asks: Array.from(this.asks.entries())
        .map(([price, size]) => ({ price, size }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 20),
      timestamp: Date.now(),
    };

    return {
      symbol: 'BTCUSDT',
      lastPrice: this.lastPrice,
      trades: this.trades,
      level2,
      candles: this.candles,
      updatedAt: Date.now(),
    };
  }

  private pushCandle(trade: TradeTick) {
    const currentTime = Math.floor(trade.timestamp / 1000) * 1000;
    const latest = this.candles[this.candles.length - 1];

    if (!latest || latest.time !== currentTime) {
      this.candles = [
        ...this.candles,
        {
          time: currentTime,
          open: trade.price,
          high: trade.price,
          low: trade.price,
          close: trade.price,
          volume: trade.size,
        },
      ].slice(-120);
      this.emit('bar', this.candles[this.candles.length - 1]);
      return;
    }

    latest.high = Math.max(latest.high, trade.price);
    latest.low = Math.min(latest.low, trade.price);
    latest.close = trade.price;
    latest.volume += trade.size;
    this.emit('bar', latest);
  }
}
