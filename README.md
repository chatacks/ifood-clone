# iFood Clone

Este é um projeto de clone do iFood desenvolvido utilizando as seguintes tecnologias:
- [Next.js 14](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [TailWind CSS](https://tailwindcss.com/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)

## Visão Geral

Este projeto visa replicar as principais funcionalidades do iFood, incluindo navegação de restaurantes, exibição de menus e processamento de pedidos.

## Requisitos

Certifique-se de ter os seguintes softwares instalados em seu ambiente de desenvolvimento:
- [Node.js](https://nodejs.org/) (v14)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)

## Configuração do Projeto

Siga as etapas abaixo para configurar e executar o projeto localmente.

### 1. Clone o repositório

- git clone https://github.com/seu-usuario/seu-repositorio.git
- cd seu-repositorio

## 2. Instale as dependências
- npm install

## 3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias:

- DATABASE_URL=postgresql://seu_login:sua_senha@localhost:5432/seu_banco_de_dados

- GOOGLE_CLIENT_ID=seu_client_id

- GOOGLE_CLIENT_SECRET=sua_client_secret

- NEXTAUTH_SECRET=seu_nextauth_secret

## 4. Configure o Prisma
Execute as migrações do Prisma para configurar o banco de dados:

- npx prisma migrate dev --name init

## 5. Inicie o Docker-Compose
Inicie os containers do Docker (incluindo o PostgreSQL) com o Docker-Compose:

- docker-compose up -d

## 6. Inicie o servidor de desenvolvimento
Acesse o projeto em http://localhost:3000.

- npm run dev

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.