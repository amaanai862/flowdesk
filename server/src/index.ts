import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { BinanceFuturesProvider } from './providers/BinanceFuturesProvider.js';

const app = Fastify({ logger: true });
const dataProvider = new BinanceFuturesProvider();

await app.register(cors, { origin: true });
await app.register(websocket);

app.get('/health', async () => ({ ok: true, status: 'FlowDesk backend online' }));

app.get('/api/market', async () => {
  return dataProvider.getMarketState();
});

app.get('/ws/market', { websocket: true }, (connection) => {
  const sendState = () => {
    connection.socket.send(JSON.stringify({ type: 'market', payload: dataProvider.getMarketState() }));
  };

  sendState();
  dataProvider.on('trade', () => sendState());
  dataProvider.on('book', () => sendState());
  dataProvider.on('bar', () => sendState());
});

const start = async () => {
  await dataProvider.start();
  await app.listen({ port: 4000, host: '0.0.0.0' });
  console.log('FlowDesk API running on http://localhost:4000');
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
