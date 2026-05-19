# Arquitetura DEPPI - IFCE Campus Maracanaú

## Visão Geral

Este documento detalha a arquitetura técnica, os padrões de projeto, a organização modular e as decisões de infraestrutura adotadas no portal do **Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação (DEPPI)** do IFCE Campus Maracanaú.

A aplicação foi projetada sob o paradigma de Single Page Application (SPA) modular no frontend, apoiada por uma API RESTful robusta e conteinerizada no backend.

---

## 🏗️ Estrutura do Projeto e Ecossistema

O repositório adota uma organização de monorepo lógico, separando claramente as responsabilidades do cliente (Frontend Angular) e do servidor (Backend Node.js):

```text
deppi_novo/
├── src/                        # Frontend Angular (SPA)
│   ├── app/
│   │   ├── core/               # Singleton services (Auth, Theme, i18n, Interceptors, Guards)
│   │   ├── features/           # Módulos lazy-loaded (Boletins, Laboratórios, PIT/RIT, Home)
│   │   ├── layout/             # Estrutura global (Header, Footer, Navigation)
│   │   ├── shared/             # UI Components, Glassmorphism cards, Pipes, Diretivas
│   │   └── store/              # Gerenciamento de estado global (NgRx)
│   ├── assets/
│   │   ├── styles/             # Design tokens, utilitários e temas (Claro/Escuro)
│   │   ├── i18n/               # Arquivos de tradução (pt-br.json)
│   │   └── icons/              # Ícones SVG e logotipos
│   └── environments/           # Configurações de ambiente (Dev/Prod)
├── backend/                    # Backend Node.js / Express / TypeScript
│   ├── src/
│   │   ├── config/             # Configurações de ambiente e chaves
│   │   ├── controllers/        # Controladores REST (Boletins, Laboratórios, Auth, Uploads)
│   │   ├── database/           # Knex.js configuração, Migrations e Seeds
│   │   ├── middleware/         # Autenticação JWT, Rate Limiter, Error Handler
│   │   ├── models/             # Interfaces TypeScript e Schemas de validação
│   │   ├── routes/             # Roteamento centralizado da API
│   │   └── utils/              # Serviços utilitários (Logger Winston, Sentry)
│   ├── uploads/                # Armazenamento de arquivos e anexos locais
│   └── logs/                   # Arquivos de log de execução
├── cypress/                    # Testes automatizados End-to-End (Cypress)
├── nginx.conf                  # Configuração de Proxy Reverso, Gzip e Cache
├── docker-compose.yml          # Orquestração de infraestrutura (App, DB, Redis, Monitoramento)
├── start-app.sh                # Script de inicialização para desenvolvimento local
└── deploy-ubuntu.sh            # Script automatizado de deploy para produção
```

---

## 🎨 Design Tokens e Glassmorphism

### O que são Design Tokens?
Design Tokens são variáveis semânticas que centralizam as decisões visuais (cores, tipografia, espaçamento, sombras e bordas). Isso garante consistência, escalabilidade e facilita a manutenção do *Design System*.

### Arquivos Principais

#### `src/assets/styles/tokens.css`
Define as propriedades customizadas (variáveis CSS) e as paletas dinâmicas para suporte nativo ao modo claro e escuro:

```css
:root {
  /* Cores Institucionais e Primárias */
  --color-ifce-blue: #0066b3;
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-accent: #00d97e;
  
  /* Tipografia Modernizada */
  --font-family-primary: 'Poppins', 'Inter', sans-serif;
  --font-size-base: 1rem;
  
  /* Efeitos Glassmorphism e Superfícies */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --glass-bg: rgba(18, 18, 18, 0.75);
  --glass-border: rgba(255, 255, 255, 0.05);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

---

## 🌍 Internacionalização (i18n)

O portal conta com suporte completo à internacionalização através da biblioteca `@ngx-translate/core`, permitindo a expansão futura para múltiplos idiomas.

### Estrutura do Arquivo de Tradução (`src/assets/i18n/pt-br.json`)
```json
{
  "COMMON": {
    "LOADING": "Carregando...",
    "SUCCESS": "Operação realizada com sucesso!",
    "ERROR": "Ocorreu um erro inesperado."
  },
  "NAVIGATION": {
    "HOME": "Início",
    "VITRINE": "Vitrine",
    "BOLETINS": "Boletins",
    "PIT_RIT": "PIT/RIT"
  },
  "BOLETINS": {
    "TITLE": "Boletins Informativos DEPPI",
    "LOGIN_PROMPT": "Acesso Restrito"
  }
}
```

---

## 🔐 Segurança e Autenticação (Área Restrita)

A proteção de rotas administrativas e a gestão de boletins utilizam uma arquitetura de segurança baseada em tokens JWT e boas práticas de proteção de APIs:

- **Autenticação JWT com Refresh Tokens**: Tokens de acesso de curta duração associados a tokens de atualização rotacionáveis.
- **Proteção de Cabeçalhos (Helmet)**: Mitigação de ataques XSS, Clickjacking e injeção de pacotes.
- **Rate Limiting**: Bloqueio automático de requisições abusivas (DDoS/Brute Force) por IP.
- **CORS Estrito**: Configuração rigorosa de origens permitidas (`CORS_ORIGIN`).
- **Validação de Entrada**: Sanitização e validação de esquemas via Joi / Express-Validator no backend.

---

## 🎯 Módulos e Componentes Principais

### 1. Vitrine Tecnológica (`LaboratoriosModule`)
Módulo dedicado à exposição dos laboratórios do campus. Apresenta um catálogo dinâmico com detalhes de pesquisas, produções acadêmicas, serviços prestados e infraestrutura disponível.

### 2. Gestão de PIT e RIT (`PitRitModule`)
Módulo avançado de relatórios docentes. Permite o preenchimento interativo do Plano Individual de Trabalho (PIT) e Relatório Individual de Trabalho (RIT), validação automática da carga horária com base no regime de trabalho (20h, 30h, 40h, 40h D.E.) e **geração nativa de relatórios em PDF** com qualidade de impressão.

### 3. Boletins Informativos (`BoletinsModule`)
Área pública de leitura e área restrita de publicação. Integra o editor de texto rico **Quill v2** para formatação avançada e upload direto de imagens e anexos.

---

## 📱 Responsividade e Mobile-First

O layout foi concebido utilizando a abordagem *Mobile-First*, garantindo que a experiência em smartphones e tablets seja tão fluida quanto no desktop.

### Breakpoints Padrão
```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

---

## ♿ Acessibilidade (WCAG 2.1 AA)

A aplicação cumpre com diretrizes rigorosas de acessibilidade:
- **Semântica HTML5**: Navegação por `landmarks` (`<header>`, `<main>`, `<nav>`, `<footer>`).
- **Navegação por Teclado**: Ordem de tabulação lógica (`tabindex`) e foco visível em todos os elementos interativos.
- **Leitores de Tela**: Atributos `aria-label`, `aria-expanded` e textos alternativos (`alt`) descritivos em imagens.
- **Contraste Visual**: Cores testadas para conformidade com a taxa de contraste WCAG AA.

---

## 🚀 Performance e Otimizações

- **Lazy Loading de Módulos Angular**: Os pacotes JavaScript das rotas só são carregados quando o usuário navega até elas.
- **Compressão Gzip e Brotli via Nginx**: Redução drástica do tamanho dos arquivos transferidos pela rede.
- **Service Worker e PWA**: Configuração nativa via `@angular/service-worker` para cache de recursos estáticos e suporte a navegação offline.
- **Otimização de Imagens**: Conversão e redimensionamento de uploads utilizando a biblioteca de alta performance **Sharp**.

---

## 🌐 Infraestrutura, Orquestração e Deploy

A infraestrutura foi desenhada para suportar tanto a execução local quanto o deploy em nuvem através de orquestração de containers ou gerenciamento direto de processos.

### Fluxo de Comunicação (Nginx Proxy Reverso)
Em ambiente de produção, o Nginx atua como ponto único de entrada (Porta 80/443):
1. Requisições estáticas (`/`, `/home`, arquivos JS/CSS) são servidas diretamente da pasta de build do Angular (`dist/deppi/browser`).
2. Requisições para `/api/*` são repassadas via proxy reverso para o processo Node.js rodando na porta `3000`.
3. Requisições para `/uploads/*` são servidas diretamente do disco pelo Nginx, garantindo altíssimo desempenho no download de anexos.

```text
[ Cliente (Navegador) ]
          │
          ▼  (HTTP / HTTPS)
   [ Servidor Nginx ]
     ├── Rotas Estáticas ──► [ Build Angular (dist/) ]
     ├── Rotas /api/*    ──► [ Backend Node.js (Porta 3000) ] ──► [ PostgreSQL / Redis ]
     └── Rotas /uploads/ ──► [ Disco (/uploads) ]
```

---

## 🎯 Estado Atual e Próximas Metas

A arquitetura do projeto encontra-se em estágio maduro de produção, tendo consolidado com sucesso diversas metas estruturais:
- ✅ **API REST Real Integrada**: Autenticação, boletins e laboratórios totalmente dinâmicos e conectados ao PostgreSQL.
- ✅ **Sistema de Upload de Arquivos**: Infraestrutura de armazenamento e proxy Nginx configurados para arquivos de até 50MB.
- ✅ **Editor de Texto Avançado**: Integração completa do Quill v2 na gestão de boletins.
- ✅ **Geração de PDF (PIT/RIT)**: Exportação de relatórios complexos diretamente pelo navegador.
- ✅ **PWA & Service Worker**: Cache inteligente habilitado para produção.

### Metas Futuras para Evolução Contínua
- [ ] Implementação de métricas avançadas de uso e telemetria customizada.
- [ ] Sistema de notificações push (Web Push Notifications via PWA).
- [ ] Integração com sistema acadêmico institucional para importação automática de turmas e horários no PIT/RIT.