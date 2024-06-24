
# Aplicação Gympass

Aplicação desenvolvida para realizar check-ins em academias. Nela foram utilizados **JWT**, **Token de Atualização**, **Middlewares**, **Autenticação**, **SOLID**, **Testes de Integração**, **Docker**, **Padrões de Projeto**, **Prisma**, **Postgres** e **CI/CD**.

## Como executar a aplicação no localhost:

1. Altere o `DATABASE_URL` no seu arquivo `.env` para:

   ```plaintext
   postgresql://POSTGRESQL_USERNAME:POSTGRESQL_PASSWORD@localhost:5432/apisolid?schema=public
   ```

2. Execute o seguinte comando no terminal:

   ```bash
   npm install && npm run dev
   ```

## Como executar a aplicação no Docker:

1. Altere o `DATABASE_URL` no seu arquivo `.env` para:

   ```plaintext
   postgresql://root:root@db:5432/apisolid?schema=public
   ```

2. Execute o seguinte comando no terminal:

   ```bash
   npm install && docker-compose up -d
   ```

3. No terminal, na raiz do projeto, execute os seguintes passos:

   ```bash
   docker exec -it api_gym /bin/sh
   npx prisma migrate deploy
   exit
   ```

## Rotas

### Usuários

- `[POST] /users`
- `[POST] /sessions`
- `[PATCH] /token/refresh`
- `[GET] /me`

### Check-ins

- `[GET] /check-ins/history`
- `[GET] /check-ins/metrics`
- `[POST] /gyms/:gymId/check-ins`
- `[PATCH] /check-ins/:checkInId/validate`

### Academias

- `[GET] /gyms/search`
- `[GET] /gyms/nearby`
- `[POST] /gyms`

## Requisitos Funcionais

- Deve ser possível se cadastrar;
- Deve ser possível se autenticar;
- Deve ser possível obter o perfil do usuário logado;
- Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- Deve ser possível para o usuário obter seu histórico de check-ins;
- Deve ser possível para o usuário buscar academias próximas (dentro de 10KM);
- Deve ser possível para o usuário buscar academias pelo nome;
- Deve ser possível para o usuário fazer check-in em uma academia;
- Deve ser possível validar o check-in de um usuário;
- Deve ser possível registrar uma academia.

## Regras de Negócio

- O usuário não deve poder se registrar com um email duplicado;
- O usuário não pode fazer 2 check-ins no mesmo dia;
- O usuário não pode fazer check-in se não estiver próximo (100m) da academia;
- O check-in só pode ser validado até 20 minutos após ser criado;
- O check-in só pode ser validado por administradores;
- A academia só pode ser registrada por administradores.

## Requisitos Não Funcionais

- A senha do usuário deve ser criptografada;
- Os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL;
- Todas as listas de dados devem ser paginadas com 20 itens por página;
- O usuário deve ser identificado por um JWT (JSON Web Token).
```