# Access Control System

Sistema completo de controle de acesso de veículos com API REST em Spring Boot e interface web em React com TypeScript.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [API - Backend](#api---backend)
- [App - Frontend](#app---frontend)
- [Funcionalidades](#funcionalidades)
- [Endpoints da API](#endpoints-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O Access Control System é uma solução completa para controle e monitoramento de frota de veículos. O sistema permite gerenciar veículos, funcionários e registros de viagem, fornecendo uma interface intuitiva para controle de acesso e relatórios em tempo real.

### Principais Características

- **Gestão de Veículos**: Cadastro e controle de status dos veículos
- **Gestão de Funcionários**: Controle de motoristas habilitados
- **Registros de Viagem**: Controle de saída e retorno de veículos
- **Dashboard em Tempo Real**: Estatísticas e métricas atualizadas
- **Interface Responsiva**: Acesso via web em diferentes dispositivos

## 🏗️ Arquitetura

O projeto segue uma arquitetura de microsserviços com separação clara entre backend e frontend.

## 🚀 Tecnologias

### Backend (acs_api)
- **Java 24**
- **Spring Boot 3.5.3**
- **Spring Data JPA**
- **Spring Web**
- **Maven** (gerenciamento de dependências)

### Frontend (acs_app)
- **React 18**
- **TypeScript**
- **Vite** (build tool)
- **TailwindCSS** (estilização)
- **Radix UI** (componentes)
- **Tanstack React Query** (gerenciamento de estado)
- **React Router** (roteamento)
- **Lucide React** (ícones)

## 📁 Estrutura do Projeto

```
access_control_system/
├── acs_api/                    # Backend - Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/vieira/acs_api/
│   │   │   │       ├── config/         # Configurações
│   │   │   │       ├── controller/     # Controllers REST
│   │   │   │       ├── dto/            # Data Transfer Objects
│   │   │   │       ├── exception/      # Tratamento de exceções
│   │   │   │       ├── model/          # Entidades JPA
│   │   │   │       ├── repository/     # Repositórios
│   │   │   │       └── service/        # Regras de negócio
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                       # Testes unitários ()
│   └── pom.xml                         # Configuração Maven
├── acs_app/                    # Frontend - React App
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── contexts/           # Context API
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilitários
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── services/           # Serviços API
│   │   └── types/              # Tipos TypeScript
│   ├── public/                 # Arquivos estáticos
│   └── package.json            # Dependências npm
└── README.md                   # Documentação do projeto
```

## ⚡ Instalação e Execução

### Pré-requisitos

- **Java 24+**
- **Node.js 18+**
- **npm** ou **yarn**
- **Maven 3.6+**

### 🔧 Configuração do Backend

1. Navegue até o diretório da API:
```powershell
cd acs_api
```

2. Execute a aplicação Spring Boot:
```powershell
.\mvnw.cmd spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

### 🎨 Configuração do Frontend

1. Navegue até o diretório da aplicação:
```powershell
cd acs_app
```

2. Instale as dependências:
```powershell
npm install
```

3. Execute em modo de desenvolvimento:
```powershell
npm run dev
```

A aplicação web estará disponível em: `http://localhost:8081`

## 🛠️ API - Backend

### Características Técnicas

- **Framework**: Spring Boot 3.5.3
- **Java Version**: 24
- **Database**: H2 (em memória para desenvolvimento)
- **ORM**: Spring Data JPA
- **Arquitetura**: REST API com padrão MVC

### Principais Pacotes

- **Controllers**: Endpoints REST para veículos, funcionários e registros
- **Services**: Lógica de negócio e validações
- **Repositories**: Acesso a dados com Spring Data JPA
- **Models**: Entidades do banco de dados
- **DTOs**: Objetos de transferência de dados
- **Config**: Configurações de CORS e segurança

## 🎨 App - Frontend

### Características Técnicas

- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite para desenvolvimento rápido
- **Styling**: TailwindCSS para estilização utilitária
- **Components**: Radix UI para componentes consistentes
- **State Management**: Tanstack React Query para cache e sincronização
- **Routing**: React Router para navegação SPA

### Estrutura de Componentes

- **DashboardStats**: Métricas em tempo real
- **VehicleTable**: Lista e gerenciamento de veículos
- **EmployeeList**: Cadastro de funcionários
- **HistoryTable**: Histórico de viagens
- **Navigation**: Menu de navegação
- **QuickAccessPanel**: Ações rápidas

## 🔧 Funcionalidades

### 📊 Home/Dashboard
- Estatísticas em tempo real
- Resumo de veículos (total, em viagem, no pátio)
- Métricas diárias (saídas e retornos)

### 🚗 Gestão de Veículos
- Cadastro de veículos
- Controle de status (No Pátio / Em Viagem)
- Visualização em tabela com badges de status

### 👤 Gestão de Funcionários
- Cadastro de funcionários
- Lista de funcionários

### 📝 Registros de Viagem
- Registro de saída de veículos
- Controle de destino e passageiros
- Registro de retorno
- Histórico completo de viagens

### 🎯 Acesso Rápido
- Botões para ações frequentes
- Dialogs para registro rápido de saída/retorno
- Interface intuitiva e responsiva

## 📡 Endpoints da API

### Status
```
GET    /api/status                # Verificar status da API
```

### Veículos
```
GET    /api/veiculos?status=      # Listar todos os veículos (com filtro opcional por status)
POST   /api/veiculos              # Criar novo veículo
PUT    /api/veiculos/{id}/status  # Atualizar status do veículo
DELETE /api/veiculos/{id}         # Deletar veículo
```

### Funcionários
```
GET    /api/funcionarios          # Listar funcionários
POST   /api/funcionarios          # Criar funcionário
PUT    /api/funcionarios/{id}     # Atualizar funcionário
DELETE /api/funcionarios/{id}     # Deletar funcionário
```

### Registros de Viagem
```
GET    /api/registros             # Listar registros
POST   /api/veiculos/saida        # Criar registro de saída
POST   /api/veiculos/retorno      # Registrar retorno
```

### Padrões de Código

- **Backend**: Seguir convenções Java e Spring Boot
- **Frontend**: Seguir ESLint e Prettier configurados
- **Commits**: Usar conventional commits

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Guilherme Vieira**
- GitHub: [@viieiiragui](https://github.com/viieiiragui)
- Email: guii_vieira@outlook.com.br

---

## 🔍 Status do Projeto

- ✅ API REST funcional
- ✅ Interface web responsiva
- ✅ CRUD de veículos e funcionários
- ✅ Sistema de controle de acesso
- ✅ Dashboard com métricas

## 📈 Próximas Funcionalidades

- [ ] Autenticação e autorização
- [ ] Relatórios em PDF
- [ ] Adicionar testes
