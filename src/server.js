import { criarApp } from './app.js';
import { prisma } from './lib/prisma.js';

const app = criarApp(prisma);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});