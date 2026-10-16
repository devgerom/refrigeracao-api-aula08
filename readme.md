# ❄️ Refrigeração API

Sistema simples de gestão de atendimentos para serviços de refrigeração, desenvolvido para praticar **testes de software** com Vitest, Prisma e Express.

## 🎯 Sobre o projeto

Cadastro de atendimentos com:
- Nome do cliente
- Tipo de serviço (Instalação, Manutenção, Conserto...)
- Tipo de equipamento (ar-condicionado, geladeira, freezer)
- Data de criação (automática)

## 🛠 Tecnologias

- **Node.js** + **Express 5**
- **Prisma 6** + **SQLite**
- **Vitest** (testes unitários e de integração)
- **Supertest** (testes HTTP)

## 📁 Estrutura

```
src/
├── app.js                 # Configuração do Express
├── server.js              # Bootstrap do servidor
├── lib/prisma.js          # Cliente Prisma
├── services/              # Regras de negócio
└── routes/                # Rotas HTTP

tests/
├── unit/                  # Testes unitários com mock
└── integration/           # Testes de rota com Supertest
```

## 🚀 Como rodar

```bash
npm install
npx prisma migrate dev
npm run dev
```

Servidor em `http://localhost:3000`.

## 🧪 Testes

```bash
npm test              # roda os testes
npm run test:watch    # modo watch
npm run test:coverage # com cobertura
```

## 📡 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/atendimentos` | Criar atendimento |
| GET | `/atendimentos` | Listar todos |
| GET | `/atendimentos/:id` | Buscar por ID |

### Exemplo de payload

```json
{
  "cliente": "João Silva",
  "tipoServico": "Instalação",
  "tipoEquipamento": "ar-condicionado"
}
```

## 🧠 O que aprendi

- **Dependency Injection**: injetar o `prisma` no service/rotas permite trocá-lo por um *mock* (`vi.fn()`) nos testes, sem precisar de banco real.
- **Testes unitários** isolam a unidade (validação + service) e são rápidos.
- **Testes de integração** com Supertest validam o comportamento HTTP (status 201, 400, 404).
- Diferença entre **mock**, **stub** e **spy** — usei `vi.fn()` e `mockResolvedValue`.