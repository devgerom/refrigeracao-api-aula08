import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  validarAtendimento,
  criarAtendimentoService,
} from '../../src/services/atendimentoService.js';

describe('validarAtendimento', () => {
  it('deve aceitar dados válidos', () => {
    expect(() =>
      validarAtendimento({
        cliente: 'João Silva',
        tipoServico: 'Instalação',
        tipoEquipamento: 'ar-condicionado',
      })
    ).not.toThrow();
  });

  it('deve rejeitar cliente com nome curto', () => {
    expect(() =>
      validarAtendimento({
        cliente: 'Jo',
        tipoServico: 'Instalação',
        tipoEquipamento: 'geladeira',
      })
    ).toThrow('Nome do cliente deve ter ao menos 3 caracteres');
  });

  it('deve rejeitar equipamento inválido', () => {
    expect(() =>
      validarAtendimento({
        cliente: 'Maria',
        tipoServico: 'Conserto',
        tipoEquipamento: 'micro-ondas',
      })
    ).toThrow('Tipo de equipamento inválido');
  });
});

describe('AtendimentoService (com mock do Prisma)', () => {
  let prismaMock;
  let service;

  beforeEach(() => {
    prismaMock = {
      atendimento: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    };
    service = criarAtendimentoService(prismaMock);
  });

  it('deve criar atendimento quando dados forem válidos', async () => {
    const dados = {
      cliente: 'Carlos',
      tipoServico: 'Manutenção',
      tipoEquipamento: 'freezer',
    };
    prismaMock.atendimento.create.mockResolvedValue({ id: 1, ...dados });

    const resultado = await service.criar(dados);

    expect(resultado).toEqual({ id: 1, ...dados });
    expect(prismaMock.atendimento.create).toHaveBeenCalledWith({ data: dados });
  });

  it('NÃO deve chamar o prisma se os dados forem inválidos', async () => {
    await expect(
      service.criar({
        cliente: 'A',
        tipoServico: 'X',
        tipoEquipamento: 'geladeira',
      })
    ).rejects.toThrow('Nome do cliente deve ter ao menos 3 caracteres');

    expect(prismaMock.atendimento.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro ao buscar atendimento inexistente', async () => {
    prismaMock.atendimento.findUnique.mockResolvedValue(null);

    await expect(service.buscarPorId(99)).rejects.toThrow(
      'Atendimento não encontrado'
    );
  });
});