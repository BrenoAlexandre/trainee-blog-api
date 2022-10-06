# Pré-requisitos

Digite o comando:

`$ yarn install`

Ter o Docker instalado e rodar o seguinte comando

`$ yarn docker:up`

Copiar as variáveis do .env.example para um arquivo .env

# Criar Tabelas

Digite os comandos:

`$ yarn typeorm:run`

`$ yarn typeorm:run:test`

# Seed

`$ yarn seed:run`

`$ yarn seed:test:run`

Isso criará os primeiros registros no banco

## Registros criados

### Admin

- name: admin
- email: admin@mail.com
- password: admin123
- role: admin

### Usuário

- name: John Doe
- email: user@mail.com
- password: 123123
- role: user

# Start

Digite o comando:

`$ yarn dev`

# Test

Digite o comando:

`$ yarn test`
