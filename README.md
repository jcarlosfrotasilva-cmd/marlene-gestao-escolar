# Marlene Gestão Escolar

Sistema administrativo para gestão de servidores e regras funcionais da escola.

## Visão geral

A aplicação foi pensada para apoiar a gestão escolar com foco em:

- cadastro de servidores;
- importação de dados em planilha;
- validação de registros;
- diferenciação por categoria e vínculo;
- regras e benefícios funcionais;
- histórico funcional por servidor;
- painel executivo e relatórios;
- autenticação básica para uso institucional.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- xlsx para importação de planilhas Excel

## Requisitos

- Node.js 18+
- PostgreSQL
- npm ou pnpm

## Configuração inicial

1. Clone o projeto.
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

4. Configure a variável `DATABASE_URL` no arquivo `.env`.
5. Gere o Prisma Client:

```bash
npm run db:generate
```

6. Sincronize o banco:

```bash
npm run db:push
```

7. Inicie o ambiente local:

```bash
npm run dev
```

## Scripts disponibilizados

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:push
npm run db:studio
```

## Funcionalidades principais

- Dashboard executivo com indicadores gerais;
- Cadastro completo de servidores;
- Importação de planilha para validação inicial;
- Cadastro de categorias, lotações e regras;
- Gerenciamento de benefícios e histórico funcional;
- Painel de configurações administrativas;
- Fluxo de login e administração inicial.

## Estrutura principal

- `app/` — rotas e páginas da aplicação
- `components/` — componentes reutilizáveis da interface
- `lib/` — utilitários e configurações gerais
- `prisma/` — schema e infraestrutura do banco
- `app/api/` — APIs internas do sistema

## Observações

Este projeto está em evolução como solução institucional de gestão escolar e foi estruturado para permitir extensões futuras, como:

- permissões por perfil;
- documentos e anexos;
- exportação para PDF/Excel;
- relatórios mais detalhados por categoria, cargo e lotação;
- regras normativas específicas da unidade escolar.

## Licença

MIT
