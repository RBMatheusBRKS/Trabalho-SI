# Trabalho SI | API de motos

API REST para cadastrar e listar motos. O backend recebe dados em JSON, aplica as regras de cadastro e salva os registros no MySQL.

## Funcionalidades

- Cadastrar uma moto com modelo, marca, placa, ano e status.
- Consultar todas as motos cadastradas.
- Padronizar a placa em maiúsculas e verificar se já existe um cadastro com a mesma placa.
- Criar a tabela `motos` automaticamente na primeira inicialização da API.

**Tecnologias:** Node.js, Express, MySQL 8.4, Docker Compose e Jest.

## Como rodar

Você precisa do Docker com o Compose. No Windows, instale e abra o [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/). Use o terminal na raiz do projeto, onde fica o `compose.yaml`.

### 1. Confira a configuração do backend

Na versão revisada, o servidor está em `backend/src/server.js`. Em [`backend/package.json`](backend/package.json), o script de inicialização deve apontar para esse arquivo:

```json
"start": "node src/server.js"
```

Dentro de `motiva_core_back` no [`compose.yaml`](compose.yaml), declare o nome do arquivo de build conforme ele aparece no repositório:

```yaml
    build:
      context: ./backend
      dockerfile: dockerfile
```

Em [`backend/.dockerignore`](backend/.dockerignore), use as entradas abaixo para excluir os pacotes instalados no computador e o arquivo de configuração local do contexto de build:

```text
node_modules
.env
```

### 2. Crie o arquivo `.env`

Crie um arquivo chamado `.env` na raiz, ao lado de `compose.yaml`. Substitua a senha de exemplo pela sua senha local e mantenha o arquivo fora dos commits.

```dotenv
DB_USER=root
DB_PASSWORD=TroqueEstaSenhaLocal123
DB_DATABASE=locaMoto
```

O Compose configura a API para se conectar a `mysql:3306` dentro da rede dos containers. Se precisar acessar o banco pelo seu computador, use `localhost:3309`.

### 3. Inicie os serviços

```sh
docker compose config -q
docker compose up --build -d
docker compose ps
```

A API fica em <http://localhost:3002/motos>. O MySQL deve aparecer como `healthy` e o backend como `Up`. Para acompanhar o backend e pausar os serviços, use:

```sh
docker compose logs --tail=50 motiva_core_back
docker compose stop
```

Para retomar os mesmos containers, execute `docker compose start`.

## Como usar a API

| Método | Rota | O que faz | Respostas da versão atual |
| --- | --- | --- | --- |
| `POST` | `/motos` | Cadastra uma moto | `201` criada, `400` dados inválidos, `409` placa repetida |
| `GET` | `/motos` | Lista as motos em JSON | `200` lista de motos, `404` quando ainda não há registros |

Para cadastrar e depois consultar uma moto pelo PowerShell:

```powershell
$api = 'http://localhost:3002/motos'

$moto = @{
    modelo = 'CG 160'
    marca  = 'Honda'
    placa  = 'ABC1D23'
    ano    = 2024
    status = 'DISPONIVEL'
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri $api -ContentType 'application/json' -Body $moto
Invoke-RestMethod -Uri $api
```

Envie a placa como texto, com sete caracteres e sem espaços. Os status aceitos no cadastro são `DISPONIVEL`, `ALUGADA` e `MANUTENCAO`. Você também pode abrir a rota no navegador para listar as motos.

## Estrutura do código

| Caminho | Responsabilidade |
| --- | --- |
| [`backend/src/server.js`](backend/src/server.js) | Configura o Express, inicializa o banco e abre a porta da API. |
| [`backend/src/routes/`](backend/src/routes/) | Define as rotas e aponta qual controlador atende cada pedido. |
| [`backend/src/controller/`](backend/src/controller/) | Recebe os dados e envia as respostas HTTP. |
| [`backend/src/services/`](backend/src/services/) | Valida os campos e aplica as regras de cadastro. |
| [`backend/src/repositories/`](backend/src/repositories/) | Executa as consultas e inserções no MySQL. |
| [`backend/src/database/`](backend/src/database/) | Configura as conexões e cria a tabela de motos. |
| [`tests/`](tests/) | Contém os testes automatizados do projeto. |

## Testes

Com Node.js 24 e npm instalados, execute na raiz:

```sh
npm ci
npm exec -- jest --runInBand
```

O teste existente verifica se o serviço rejeita o status `VENDIDA` com código `400`. O repositório é simulado nesse teste, então ele roda com o MySQL desligado.

## Limitações da versão revisada

- A tabela ainda não tem uma coluna de ID. O cadastro retorna `id: 0` e a listagem omite o campo.
- O serviço aceita `MANUTENCAO`, enquanto o banco declara `MANUTENÇÃO`. A grafia pode mudar entre a resposta do cadastro e a listagem.
- A verificação de placa duplicada ocorre no serviço. Uma restrição `UNIQUE` no banco também é necessária para impedir duplicatas em cadastros simultâneos.
- O Compose ainda não declara um volume nomeado para o MySQL. Para pausar a instalação local mantendo os mesmos containers, use `docker compose stop`.
