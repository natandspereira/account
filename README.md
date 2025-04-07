# 💰 Projeto: Account CLI (Gerenciador de Contas Bancárias no Terminal)

Este é um projeto desenvolvido em **Node.js**, utilizando as bibliotecas **Inquirer** e **Chalk**, que simula um sistema bancário simples através da linha de comando (CLI).  
Com ele, você pode criar contas, consultar saldos, realizar depósitos e saques, de forma prática e interativa no terminal.

## 🚀 Funcionalidades

✅ Criar uma nova conta bancária<br>
✅ Consultar o saldo de uma conta existente<br>
✅ Depositar valores na conta<br>
✅ Realizar saques da conta<br>
✅ Persistência dos dados usando arquivos `.json<br>`
✅ Interface amigável com mensagens coloridas via **Chalk**

## 🛠️ Tecnologias utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **Inquirer** — Biblioteca para interações no terminal
- **Chalk** — Estilização das mensagens do terminal
- **File System (fs)** — Para salvar e ler os dados das contas em arquivos

## 📂 Estrutura do Projeto
* ├── accounts/ # Pasta onde ficam armazenadas as contas (arquivos JSON) 
* ├── index.js # Arquivo principal da aplicação 
* ├── package.json # Configurações do projeto e dependências

## Cada conta criada será salva dentro da pasta `accounts/` como um arquivo `.json` contendo o nome da conta e o saldo atual. Exemplo de estrutura de um arquivo de conta:
```json
{
  "balance": 1500
}
```
## ⚙️ Como usar
1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências

2. Instale as dependências
npm install

3. Execute o projeto
node index.js

4. Siga as instruções no terminal
Você verá um menu interativo onde poderá escolher as operações desejadas.

## 📌 Observações
Os dados das contas são salvos localmente, usando arquivos JSON na pasta accounts/.

O projeto foi criado com o objetivo de praticar manipulação de arquivos, fluxos de entrada e saída no terminal, e construção de aplicações CLI com Node.js.
