# Design Doc: Refatoração, Padronização e Correções DEPPI

**Data:** 2026-03-04
**Status:** Aprovado
**Tópico:** Limpeza e Otimização da Aplicação (Frontend/Build)

## 1. Visão Geral
A análise inicial identificou bugs de compilação no módulo de contato, inconsistências na gestão de temas e redundância nos sistemas de tradução. Além disso, o build de produção apresenta avisos de arquivos não utilizados e excesso de tamanho em estilos inline.

## 2. Abordagem de Design

### Parte 1: Correções Críticas e Build
- **Erro de Referência:** Corrigir a falta do import `inject` no `ContactComponent`.
- **Compatibilidade Safari:** Corrigir a ordem e prefixação da propriedade `backdrop-filter` no `main.scss`.
- **Configuração de Ambiente:** Habilitar corretamente o `fileReplacements` para `environment.prod.ts` no `angular.json` para garantir que o build de produção use as URLs de API corretas.

### Parte 2: Padronização Arquitetural
- **Gestão de Temas:**
    - Centralizar a lógica de persistência e detecção de sistema no `ThemeService`.
    - Refatorar `HeaderComponent` para consumir o estado do `ThemeService` em vez de manipular o DOM/Storage diretamente.
- **Internacionalização (I18n):**
    - Consolidar o uso do `I18nService` customizado (conforme `README_ARQUITETURA.md`).
    - Avaliar a remoção do `TranslateModule` (ngx-translate) se não houver dependências críticas, para reduzir o bundle size.
- **Modularização de Estilos:**
    - Extrair o CSS do `HeaderComponent` (atualmente > 2KB inline) para um arquivo SCSS dedicado ou integrá-lo melhor ao sistema de tokens.

### Parte 3: Performance e Refino Técnico
- **Otimização de Budgets:** Ajustar os limites de aviso/erro no `angular.json` para evitar logs ruidosos durante o desenvolvimento/CI.
- **UX Feedback:** Garantir que as notificações globais e o overlay de loading tenham prioridade visual absoluta via `z-index` e variáveis de elevação.

## 3. Arquitetura e Fluxo de Dados
- O `ThemeService` servirá como a única fonte de verdade para o estado visual.
- O `I18nService` gerenciará o carregamento sob demanda de arquivos JSON de tradução.

## 4. Impacto e Riscos
- **Baixo Risco:** Atualmente a aplicação já apresenta erros; as correções tendem a estabilizar o ambiente.
- **Compatibilidade:** O uso de `-webkit-backdrop-filter` garante que o design inovador (glassmorphism) funcione em dispositivos Apple.

## 5. Plano de Testes
1. Executar `npm run build:prod` e verificar se não há avisos de arquivos unused ou erros de budget.
2. Testar troca de tema (Dark/Light) e verificar persistência após reload.
3. Validar envio do formulário de contato (agora compilável).
