# DEPPI - Aplicação Web

Sistema de boletins e informações do Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação do IFCE Maracanaú.

## 🚀 Executar a Aplicação

### Método Rápido (Recomendado)
```bash
# Executa frontend e backend simultaneamente
./start-app.sh
```

### Método Manual

#### 1. Iniciar Backend
```bash
cd backend
npm run dev
```
Backend disponível em: http://localhost:3000

#### 2. Iniciar Frontend (em outro terminal)
```bash
npm run dev
```
Frontend disponível em: http://localhost:4200

## 🔐 Credenciais de Teste

- **Usuário**: `12345`
- **Senha**: `123456`
- **Área Restrita**: http://localhost:4200/boletins/login

## 📁 Estrutura do Projeto

```
deppi_novo/
├── src/                    # Frontend Angular
├── backend/               # Backend Node.js
├── assets/                # Assets compartilhados
├── cypress/               # Testes E2E
├── docker-compose.yml     # Infraestrutura Docker
└── start-app.sh          # Script de inicialização
```

## 🗄️ Banco de Dados

- **PostgreSQL** configurado automaticamente
- **Migrations** executadas
- **Seeds** populados com dados de teste

## 🧪 Testes

```bash
# Testar API
./test-api.sh

# Testes E2E
npm run e2e
```

## 📊 Monitoramento

- **Health Check**: http://localhost:3000/health
- **API Docs**: http://localhost:3000/api-docs (quando implementado)

## 🛠️ Desenvolvimento

### Configuração Inicial
```bash
# Instalar dependências
npm install
cd backend && npm install

# Configurar banco
./setup-postgres.sh

# Executar migrations
cd backend && npm run migrate && npm run seed
```

### Scripts Disponíveis

#### Frontend
- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run test` - Testes unitários
- `npm run e2e` - Testes E2E

#### Backend
- `npm run dev` - Desenvolvimento com nodemon
- `npm run build` - Compilar TypeScript
- `npm run start` - Produção
- `npm run migrate` - Executar migrations
- `npm run seed` - Popular banco
- `npm run test` - Testes

## 🌟 Funcionalidades

- ✅ **Frontend Angular** com design system modular e temas dinâmicos
- ✅ **Nova interface Premium (Glassmorphism)** com Suporte Nativo ao Modo Escuro
- ✅ **Backend Node.js** com PostgreSQL via Docker
- ✅ **Gerador de Relatórios e Formulários (PIT e RIT) em PDF**
- ✅ **Autenticação JWT & Google Sign-In**
- ✅ **Área restrita de boletins com Editor de Texto Avançado (Quill v2)**
- ✅ **Sistema de Uploads (Arquivos e Imagens) com Nginx Proxy**
- ✅ **API RESTful** segura
- ✅ **Testes automatizados**
- ✅ **CI/CD com GitHub Actions** e Deploy contínuo
- ✅ **Infraestrutura Orquestrada via Docker Compose** (App, DB, Redis, Logs)

## 🆕 Últimas Atualizações
* Formulários PIT/RIT refinados, suportando múltiplos vínculos (ex: Dedicação Exclusiva 40h D.E, 30h, 20h).
* Infraestrutura de Uploads otimizada suportando anexos de grandes formatos (até 50MB) pelo Nginx.
* UI de formulários utilizando Glassmorphism com leitura dinâmica e total suporte ao tema escuro.

## 📚 Documentação

- [README Arquitetura](./README_ARQUITETURA.md) - Documentação técnica completa
- [Design Tokens](./assets/README.md) - Sistema de design
- [API Docs](./backend/README.md) - Documentação da API

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença
GNU GPLv3
Este projeto é mantido pelo IFCE Maracanaú.
