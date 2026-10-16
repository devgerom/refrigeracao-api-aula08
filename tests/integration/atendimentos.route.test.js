import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../src/app.js';

describe('Rotas /atendimentos', () => {
  let prismaMock;
  let app;

  beforeEach(() => {
    prismaMock = {
      atendimento: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    };
    app = criarApp(prismaMock);
  });

  it('GET /health deve retornar ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('POST /atendimentos deve criar um novo atendimento (201)', async () => {
    const dados = {
      cliente: 'Ana Souza',
      tipoServico: 'Instalação',
      tipoEquipamento: 'ar-condicionado',
    };
    prismaMock.atendimento.create.mockResolvedValue({ id: 1, ...dados });

    const res = await request(app).post('/atendimentos').send(dados);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(dados);
  });

  it('POST /atendimentos deve retornar 400 para dados inválidos', async () => {
    const res = await request(app)
      .post('/atendimentos')
      .send({ cliente: 'X', tipoServico: '', tipoEquipamento: 'fogao' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('GET /atendimentos deve listar todos', async () => {
    prismaMock.atendimento.findMany.mockResolvedValue([
      {
        id: 1,
        cliente: 'Ana',
        tipoServico: 'Instalação',
        tipoEquipamento: 'geladeira',
      },
    ]);

    const res = await request(app).get('/atendimentos');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(prismaMock.atendimento.findMany).toHaveBeenCalledOnce();
  });

  it('GET /atendimentos/:id deve retornar 404 quando não existir', async () => {
    prismaMock.atendimento.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/atendimentos/999');

    expect(res.status).toBe(404);
    expect(res.body.erro).toBe('Atendimento não encontrado');
  });
});