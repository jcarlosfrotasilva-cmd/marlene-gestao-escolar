# Marlene Gestão Escolar

Sistema web profissional para gestão de servidores da EE Profa. Marlene Frattini.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Excel import support

## Estrutura inicial

- `app/` — telas e rotas da aplicação
- `components/` — componentes reutilizáveis
- `lib/` — utilitários e configurações
- `prisma/` — schema do banco e modelos

## Como iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o banco PostgreSQL e o arquivo `.env` com `DATABASE_URL`.
3. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
4. Inicie o servidor local:
   ```bash
   npm run dev
   ```

A aplicação ficará disponível em `http://localhost:3000`.
