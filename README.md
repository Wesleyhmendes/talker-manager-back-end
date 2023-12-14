# Talker Manager

Neste projeto foi construído uma aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações.
Para isso, foi desenvolvido uma API em um `CRUD`(**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers e alguns endpoints que lêem e escrevem em um arquivo utilizando o módulo fs.

## 🚀 Começando

> - ⚠️ É necessário ter a versão Node 16.14 ou superior instalada localmente.

<br />

<details>
  <summary><strong>🔧 Instalação</strong></summary>
<br />
  
1. Clone o repositório
  * `git clone git@github.com:Wesleyhmendes/talker-manager-back-end.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd talker-manager-back-end`

2. Instale as dependências [**Caso existam**]
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch com o nome desejado

<br />
</details>

<br />

**🐳 Iniciando a aplicação no Docker Compose**

```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev

# em outro terminal, rode os testes
docker exec -it talker_manager bash
npm run lint # roda a verificação do linter
npm test # roda todos os testes
npm test 01 # rodando apenas o teste do requisito 01
```
<br />


**🖥️ Iniciando a aplicação localmente**

> ⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# em um terminal, inicie a aplicação no container
npm install
env $(cat .env) npm start
# ou para iniciar com live-reload
env $(cat .env) npm run dev
```

<details>
  <summary><strong>📋 Requisitos</strong></summary>
<br />

**1 -Crie o endpoint GET `/talker`**
<br />
<br />
**2 - Crie o endpoint GET `/talker/:id**
<br />
<br />
**3 - Crie o endpoint POST `/login**
<br />
<br />
**4 - Adicione as validações para o endpoint `/login`**
<br />
<br />
**5 - Crie o endpoint POST `/talker`**
<br />
<br />
**6 - Crie o endpoint PUT `/talker/:id`**
<br />
<br />
**7 - Crie o endpoint PUT `/talker/:id`**
<br />
<br />
**8 - Crie o endpoint GET `/talker/search` e o parâmetro de consulta `q=searchTerm`**
<br />
<br />
**9 - Crie no endpoint GET `/talker/search` o parâmetro de consulta `rate=rateNumber`**
<br />
<br />
**10 - Crie no endpoint GET `/talker/search` o parâmetro de consulta `date=watchedDate`**
<br />
<br />
**11 - Crie o endpoint PATCH `/talker/rate/:id`**
<br />
<br />
</details>


## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Node.js](https://nodejs.org/docs/latest/api/) - O software usado
* [npm](https://www.npmjs.com/) - Gerente de Dependência

## 📌 Versão

Nós usamos [Docker](https://www.docker.com/) para controle de versão.

## ✒️ Autores

* **Wesley Mendes** - *Trabalho Inicial* - [Wesley Mendes](https://github.com/Wesleyhmendes)
