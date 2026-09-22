# Marlene Gestão Escolar

Sistema web profissional para gestão de servidores da EE Profa. Marlene Frattini.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Suporte a importação de Excel

## Estrutura inicial

- `app/` — rotas e páginas do sistema
- `components/` — layout e interface reutilizável
- `lib/` — utilitários, validações e conexão com o banco
- `prisma/` — schema e modelos do Prisma

## Como executar em ambiente local

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie o arquivo `.env` com base no `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Ajuste a variável `DATABASE_URL` para seu PostgreSQL local.
4. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
5. Aplique o schema no banco:
   ```bash
   npx prisma db push
   ```
6. Inicie a aplicação:
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Funcionalidades base implementadas

- Dashboard administrativo
- Tela de login
- Cadastro e listagem de servidores
- Importação e validação de planilha Excel
- Detecção de CPF duplicado
- Identificação de campos vazios e avisos
- Layout responsivo

## Próximos passos

- autenticação real com sessão
- cadastro/admin de usuários
- regras de vantagem e benefícios
- relatórios avançados e exportação
- banco de dados completo com históricos e auditoria
