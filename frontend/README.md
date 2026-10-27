# Motiva — Frontend da locadora

Interface acadêmica para cadastrar e consultar motocicletas.

## Arquivos

- `index.html`: estrutura da página, tabela e formulário.
- `styles.css`: cores, espaçamentos e adaptação para celular.
- `app.js`: dados de exemplo, cadastro, validações, busca, filtros e contadores.

## Funcionalidades

- Resumo da frota por situação.
- Listagem com modelo, marca, placa, ano e situação.
- Busca por modelo, marca ou placa.
- Filtros: disponíveis, alugadas e em manutenção.
- Cadastro com campos obrigatórios e validação de placa.
- Bloqueio de placas duplicadas.
- Janela de cadastro com suporte à tecla Escape.

## Dados de demonstração

A primeira abertura carrega seis motos fictícias. Os cadastros ficam no armazenamento local do navegador (localStorage), quando permitido. Esses dados não são compartilhados entre computadores ou navegadores. O comportamento do armazenamento ao abrir arquivos diretamente pode variar por navegador; Live Server oferece um endereço local estável.

Esta versão não está conectada a uma API e não implementa um backend. As validações do frontend ajudam o usuário, mas também deverão ser feitas no backend.

## Integração futura

No arquivo `app.js`, o objeto `repo` contém o adaptador de demonstração. Ao integrar a API, será necessário substituir as operações por requisições assíncronas e adaptar seus consumidores:

- `GET /motos`: carregar a lista da API.
- `POST /motos`: enviar o novo cadastro em JSON.

Formato sugerido para o cadastro:

```json
{
  "modelo": "CG 160 Fan",
  "marca": "Honda",
  "placa": "ABC1D23",
  "ano": 2024,
  "status": "DISPONIVEL"
}
```

Situações: `DISPONIVEL`, `ALUGADA`, `MANUTENCAO`.
O `id` deverá ser gerado pelo backend. Se a API estiver em outra origem, será preciso configurar o CORS no backend.

O armazenamento local desta demonstração é independente do armazenamento em memória exigido para a API acadêmica.

## Personalização

O nome Motiva é provisório. As cores principais estão no início de `styles.css`, dentro de `:root`.

Tecnologias: HTML, CSS e JavaScript, sem framework e sem dependências externas.
