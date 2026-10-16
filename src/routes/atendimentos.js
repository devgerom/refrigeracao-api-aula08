import { Router } from 'express';
import { criarAtendimentoService } from '../services/atendimentoService.js';

export function criarAtendimentoRouter(prisma) {
  const router = Router();
  const service = criarAtendimentoService(prisma);

  router.post('/', async (req, res) => {
    try {
      const atendimento = await service.criar(req.body);
      return res.status(201).json(atendimento);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  });

  router.get('/', async (_req, res) => {
    const atendimentos = await service.listar();
    return res.json(atendimentos);
  });

  router.get('/:id', async (req, res) => {
    try {
      const atendimento = await service.buscarPorId(req.params.id);
      return res.json(atendimento);
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
  });

  return router;
}