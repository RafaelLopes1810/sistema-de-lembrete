# Sistema de Lembretes

Este projeto é um **sistema de lembretes** desenvolvido com **React (frontend)** e **.NET 9 (backend)**.  
O objetivo é permitir o cadastro, listagem e exclusão de lembretes de forma simples e intuitiva.  

## 📂 Estrutura do Código

O projeto está dividido assim:
```
sistema-de-lembrete/
│
├── backend/
│ ├── Controllers/
| | └── LembreteController.cs
│ ├── Data/
| | └── AppDbContext.cs
│ ├── DTOs/
| | └── CriarLembreteDto.cs
│ ├── Interfaces/
| | └── ILembreteRepository.cs
│ ├── Migrations/
│ ├── Models/
| | └── Lembrete.cs
│ ├── Repositories/
| | └── LembreteRepository.cs
│ ├── Program.cs
│ ├── appsettings.json
│ └── backend.csproj
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Footer.jsx
│ │ │ ├── Modal.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── ReminderList.jsx
│ │ ├── imgs/
│ │ │ ├── mais.png
│ │ │ └── sino.png
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── index.html
| ├── README.md
| ├── package.json
| ├── vite.config.js
| └── .gitignore
│
└── README.md # Documentação do projeto
```

### **Frontend (React)**
- Construído em React com componentes funcionais.
- Estilo aplicado com CSS.
- Comunicação com a API backend via chamadas HTTP (fetch/axios).
- Funcionalidades principais:
  - Criar lembrete
  - Listar lembretes
  - Excluir lembrete

### **Backend (.NET 9 API - pasta `backend`)**
Estrutura de pastas:
- `/Models` → Modelos das entidades (ex: `Lembrete.cs`).
- `/DTOs` → Objetos de transferência de dados (ex: `CriarLembreteDto.cs`).
- `/Interfaces` → Definição de contratos (ex: `ILembreteRepositorio.cs`).
- `/Repositories` → Implementação da persistência em memória.
- `/Controllers` → Controladores da API (ex: `LembretesController.cs`).

## 📌 Premissas Assumidas

- O backend utiliza banco de dados SQLEXPRESS.
- Cada lembrete possui:
  - **Id** (gerado automaticamente pelo banco)
  - **Título**
  - **Data de criação**
- Não há sistema de login/autenticação neste MVP.

## 🛠️ Decisões de Projeto

- Toda a nomenclatura do **backend** foi feita em **português** para maior clareza e entendimento.
- O projeto segue a separação em **camadas (DTO, Repositório, Controller)** para manter boa organização e facilitar futuras expansões.
- Uso do **Swagger** no backend para documentação da API.
- Frontend construído em React para permitir interatividade e escalabilidade.

## ▶️ Instruções de Execução

Antes de rodar o projeto, é necessário ter instalados:

- **.NET 9 SDK**
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **SQL Server Express (SQLEXPRESS)**

---

### 1. Verificar se já possui os requisitos instalados

No terminal, execute os seguintes comandos:

```bash
dotnet -v
node -v
npm -v
```
Se aparecer a versão do .NET, Node e npm, significa que já estão instalados.

### 2. Instalar caso não tenha

- .NET 9 SDK
No terminal (Windows com winget):

```
winget install Microsoft.DotNet.SDK.9
```

- Node.js + npm
No terminal (Windows com winget):

```
winget install OpenJS.NodeJS
```

- SQL Server Express
Escolha a opção mais à esquerda "SQL Server 2022 Express". Durante a instalação, escolha a edição Express e habilite o serviço SQLEXPRESS.
```
https://www.microsoft.com/pt-br/sql-server/sql-server-downloads
```

### 3. Configuração do Banco de Dados
- Crie o banco de dados e aplique as migrações:
```
cd backend
dotnet ef database update
```
Isso criará automaticamente o banco LembretesDb no SQL Server Express com as tabelas necessárias (nome de acordo com a string de conexão no arquivo backend/appsettings.json).

### 4. Rodar o Backend
No diretório backend (cd backend):
```
dotnet run
```

A API iniciará em http://localhost:5157, a documentação Swagger estará em http://localhost:5157/swagger.

### 5. Rodar o Frontend
No diretório frontend (cd frontend):

```
npm install
npm start
```

O frontend iniciará em http://localhost:3000.

✅ Assim você poderá acessar a aplicação completa, com o frontend React consumindo a API do backend em .NET 9 conectada ao SQL Server Express.