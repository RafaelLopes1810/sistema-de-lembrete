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
│ │ ├── index.scss
│ │ └── main.jsx
│ ├── index.html
| ├── README.md
| ├── package.json
| ├── vite.config.js
| └── .gitignore
│
├── tests/
| ├── backend/Backend.Tests
| | ├── Backend.Tests.csproj
| | ├── LembreteControllerTests.cs
| | ├── LembreteRepositoryTests.cs
| | └── LembreteTests.cs
│ ├── frontend/
└── README.md # Documentação do projeto
```

### **Frontend (React)**
- Construído em React com componentes funcionais.
- Estilo aplicado com SCSS para uso de pré-processador de CSS (Sass).
- Comunicação com a API backend via chamadas HTTP (fetch/axios).
- Funcionalidades principais:
  - Criar lembrete
  - Listar lembretes
  - Excluir lembrete

### **Backend (.NET 9 API - pasta `backend`)**
Estrutura de pastas:
- `/Models` → Modelos das entidades (`Lembrete.cs`).
- `/DTOs` → Objetos de transferência de dados (`CriarLembreteDto.cs`).
- `/Interfaces` → Definição de contratos (`ILembreteRepository.cs`).
- `/Repositories` → Implementação da persistência em memória (`LembreteRepository.cs`).
- `/Controllers` → Controladores da API (`LembretesController.cs`).


## 📌 Premissas Assumidas

- O backend utiliza banco de dados SQLEXPRESS.
- Cada lembrete possui:
  - **Id** (gerado automaticamente pelo banco)
  - **Título**
  - **Data de criação**
- Não há sistema de login/autenticação neste MVP.

## 🛠️ Decisões de Projeto

- Toda a nomenclatura do **backend** e **frontend** foi feita em **português** para maior clareza e entendimento.
- O projeto segue a separação em **camadas (DTO, Repositório, Controller)** para manter boa organização e facilitar futuras expansões.
- Uso do **Swagger** no backend para documentação da API.
- Frontend construído em **React** para permitir interatividade e escalabilidade.
- O **SCSS** foi utilizado no frontend para melhorar a organização e manutenção do código de estilo. 

## ✅ Testes Automatizados

### Backend
- Os testes do **backend** foram implementados utilizando o **xUnit**.
- Para simulação do banco de dados nos testes, foi utilizado o **Entity Framework Core InMemory**, evitando a dependência de um banco real e garantindo maior rapidez e isolamento nos cenários de teste.
- Foram criados testes para:
  - **Controllers**: validação das respostas HTTP (200, 201, 404, 204) e do fluxo completo das ações da API.
  - **Models**: verificação das anotações de validação e regras de negócio (ex.: data do lembrete precisa ser futura).
  - **Repositórios**: simulação de operações de CRUD em memória, assegurando que consultas e persistência funcionem conforme esperado.
- Os testes podem ser executados com:
  ```bash
  cd tests/backend/Backend.Tests
  dotnet test
  ```

### Frontend

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

```bash
winget install Microsoft.DotNet.SDK.9
```

- Node.js + npm
No terminal (Windows com winget):

```bash
winget install OpenJS.NodeJS
```

- SQL Server Express
Escolha a opção "SQL Server 2022 Express". Durante a instalação, escolha a edição Express e habilite o serviço SQLEXPRESS.
```
https://www.microsoft.com/pt-br/sql-server/sql-server-downloads
```

### 3. Configuração do Banco de Dados
- Crie o banco de dados e aplique as migrações:
```bash
cd backend
dotnet ef database update
```
Isso criará automaticamente o banco LembretesDb no SQL Server Express com as tabelas necessárias (nome de acordo com a string de conexão no arquivo backend/appsettings.json).

### 4. Rodar o Backend
No diretório backend `(cd backend)`:
```bash
dotnet run
```

A API iniciará em http://localhost:5157, a documentação Swagger estará em http://localhost:5157/swagger.

### 5. Rodar o Frontend
No diretório frontend `(cd frontend)`:

```bash
npm install
npm run dev
```

O frontend iniciará em http://localhost:5173/.

---

✅ Assim você poderá acessar a aplicação completa, com o frontend React consumindo a API do backend em .NET 9 conectada ao SQL Server Express.
