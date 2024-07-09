---

# API RESTful para Gestão de Vendas

## Descrição

Esta API permite gerenciar usuários, clientes, produtos e vendas. Foi desenvolvida usando AdonisJS, um framework Node.js, e conecta-se a um banco de dados MySQL.

## Requisitos

- Node.js v14 ou superior
- MySQL
- AdonisJS

## Instalação

### Passo 1: Clonar o Repositório

```sh
git clone git@github.com:elderkampbell/beTest.git
cd beTest
```

### Passo 2: Instalar Dependências

```sh
npm install
```

### Passo 3: Configurar o Banco de Dados

Renomeie o arquivo `.env.example` para `.env` e configure suas credenciais do MySQL:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco_de_dados
```

### Passo 4: Executar Migrações

```sh
node ace migration:run
```

### Passo 5: Iniciar o Servidor

```sh
node ace serve --watch
```

## Rotas

### Usuários

- **Cadastro de Usuário**
  - **Endpoint**: `POST /signup`
  - **Descrição**: Cria um novo usuário.
  - **Body**:
    ```json
    {
      "email": "string",
      "senha": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "message": "Usuario criado com sucesso",
      "user": {
        "id": 1,
        "email": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
    ```

- **Login de Usuário**
  - **Endpoint**: `POST /login`
  - **Descrição**: Faz login de um usuário e retorna um token.
  - **Body**:
    ```json
    {
      "email": "string",
      "senha": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "message": "Login bem sucedido",
      "token": "string"
    }
    ```

### Clientes

- **Listar Todos os Clientes**
  - **Endpoint**: `GET /clients`
  - **Descrição**: Lista todos os clientes cadastrados.
  - **Resposta**:
    ```json
    [
      {
        "id": 1,
        "name": "string",
        "cpf": "string"
      }
    ]
    ```

- **Detalhar um Cliente**
  - **Endpoint**: `GET /clients/:id`
  - **Descrição**: Retorna os detalhes de um cliente e suas vendas.
  - **Resposta**:
    ```json
    {
      "id": 1,
      "nome": "string",
      "cpf": "string",
      "vendas": [
        {
          "id": 1,
          "produto": "string",
          "quantidade": "number",
          "preco_total": "number",
          "data_venda": "datetime"
        }
      ]
    }
    ```

- **Adicionar um Cliente**
  - **Endpoint**: `POST /clients`
  - **Descrição**: Adiciona um novo cliente.
  - **Body**:
    ```json
    {
      "nome": "string",
      "cpf": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "message": "Client created successfully",
      "cliente": {
        "id": 1,
        "nome": "string",
        "cpf": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
    ```

- **Editar um Cliente**
  - **Endpoint**: `PUT /clients/:id`
  - **Descrição**: Edita os dados de um cliente.
  - **Body**:
    ```json
    {
      "nome": "string",
      "cpf": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "message": "Client updated successfully",
      "client": {
        "id": 1,
        "nome": "string",
        "cpf": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
    ```

- **Excluir um Cliente**
  - **Endpoint**: `DELETE /clients/:id`
  - **Descrição**: Exclui um cliente.
  - **Resposta**:
    ```json
    {
      "message": "Cliente excluido com sucesso"
    }
    ```

### Produtos

- **Listar Todos os Produtos**
  - **Endpoint**: `GET /products`
  - **Descrição**: Lista todos os produtos cadastrados.
  - **Resposta**:
    ```json
    [
      {
        "id": 1,
        "nome": "string",
        "descricao": "string",
        "preco": "number"
      }
    ]
    ```

- **Detalhar um Produto**
  - **Endpoint**: `GET /products/:id`
  - **Descrição**: Retorna os detalhes de um produto.
  - **Resposta**:
    ```json
    {
      "id": 1,
      "nome": "string",
      "descricao": "string",
      "preco": "number"
    }
    ```

- **Adicionar um Produto**
  - **Endpoint**: `POST /products`
  - **Descrição**: Adiciona um novo produto.
  - **Body**:
    ```json
    {
      "nome": "string",
      "descricao": "string",
      "preco": "number"
    }
    ```
  - **Resposta**:
    ```json
    {
      "produto": {
        "id": 1,
        "nome": "string",
        "descricao": "string",
        "preco": "number",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
    ```

- **Editar um Produto**
  - **Endpoint**: `PUT /products/:id`
  - **Descrição**: Edita os dados de um produto.
  - **Body**:
    ```json
    {
      "nome": "string",
      "descricao": "string",
      "preco": "number"
    }
    ```
  - **Resposta**:
    ```json
    {
      "produto": {
        "id": 1,
        "nome": "string",
        "descricao": "string",
        "preco": "number",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
    ```

- **Excluir um Produto (Soft Delete)**
  - **Endpoint**: `DELETE /products/:id`
  - **Descrição**: Exclui um produto.
  - **Resposta**:
    ```json
    {
      "message": "Produto excluido com sucesso"
    }
    ```

### Vendas

- **Registrar uma Venda**
  - **Endpoint**: `POST /sales`
  - **Descrição**: Registra a venda de um produto para um cliente.
  - **Body**:
    ```json
    {
      "cliente_id": "number",
      "produto_id": "number",
      "quantidade": "number"
    }
    ```
  - **Resposta**:
    ```json
    {
      "venda": {
        "id": 1,
        "client_id": "number",
        "product_id": "number",
        "quantidade": "number",
        "preco_unit": "number",
        "preco_total": "number",
        "data_venda": "datetime"
      }
    }
    ```
    
## Problemas Conhecidos

- As rotas de clientes e vendas não estão completamente finalizadas.
- Bugs na users_controller mais especificamente no metodo login.
