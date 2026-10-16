export function validarAtendimento({ cliente, tipoServico, tipoEquipamento }) {
  const equipamentosValidos = ['ar-condicionado', 'geladeira', 'freezer'];

  if (!cliente || cliente.trim().length < 3) {
    throw new Error('Nome do cliente deve ter ao menos 3 caracteres');
  }
  if (!tipoServico || tipoServico.trim() === '') {
    throw new Error('Tipo de serviço é obrigatório');
  }
  if (!equipamentosValidos.includes(tipoEquipamento)) {
    throw new Error(
      `Tipo de equipamento inválido. Use: ${equipamentosValidos.join(', ')}`
    );
  }
  return true;
}

export function criarAtendimentoService(prisma) {
  return {
    async criar(dados) {
      validarAtendimento(dados);
      return prisma.atendimento.create({ data: dados });
    },

    async listar() {
      return prisma.atendimento.findMany({
        orderBy: { criadoEm: 'desc' },
      });
    },

    async buscarPorId(id) {
      const atendimento = await prisma.atendimento.findUnique({
        where: { id: Number(id) },
      });
      if (!atendimento) {
        throw new Error('Atendimento não encontrado');
      }
      return atendimento;
    },
  };
}