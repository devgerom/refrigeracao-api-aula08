import express from 'express';
import { criarAtendimentoRouter } from './routes/atendimentos.js';

export function criarApp(prisma) {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/atendimentos', criarAtendimentoRouter(prisma));

  return app;
}