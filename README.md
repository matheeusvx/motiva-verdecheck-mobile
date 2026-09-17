

# Motiva VerdeCheck Mobile

![status](https://img.shields.io/badge/status-sprint3_completa-22C55E)
![React Native](https://img.shields.io/badge/React%20Native-mobile-61DAFB)
![Expo](https://img.shields.io/badge/Expo-router-000020)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-persist%C3%AAncia-7CB342)
![REST API](https://img.shields.io/badge/REST%20API-integra%C3%A7%C3%A3o-8E24AA)

Protótipo cross-platform em **JavaScript** para o Challenge FIAP + CCR Motiva.

## 1. Visão Geral
O **Motiva VerdeCheck Mobile** é uma proposta de aplicativo mobile para apoiar equipes de conservação na decisão operacional sobre **cortar ou não cortar a grama** em trechos de rodovia.

O app foi desenhado para o recorte mais viável do projeto neste momento: **inspeção em campo + recomendação objetiva de intervenção** com base em foto, contexto do trecho e regras operacionais derivadas do desafio.

## 2. Problema Escolhido
Hoje, a decisão de roçada pode depender de inspeção visual em campo, registro manual, leitura subjetiva do trecho e posterior repasse para supervisão. Isso gera:

- subjetividade na decisão de corte;
- retrabalho entre operador e supervisor;
- dificuldade de padronizar inspeções;
- dificuldade de gerar evidência rápida da necessidade de intervenção;
- dificuldade de consolidar histórico de inspeções por rodovia, km e tipo de área.

## 3. Recorte da Solução
O grupo escolheu atacar o seguinte problema:

> **Como apoiar a equipe de conservação a decidir, de forma mais rápida e padronizada, se a grama de um trecho deve ou não ser cortada?**

### Escopo do MVP
- registrar uma nova inspeção;
- informar rodovia, km, sentido e tipo de área;
- capturar foto do trecho;
- enviar dados para um serviço de análise;
- retornar recomendação **"Cortar"** ou **"Não cortar"**;
- armazenar histórico de inspeções;
- disponibilizar evidência para consulta do supervisor.

## 4. Persona Principal
**Nome:** Lucas Almeida  
**Cargo:** Operador de Conservação de Faixa de Domínio  
**Idade:** 32 anos  
**Contexto:** atua em inspeções e apoio à execução de conservação em rodovias concedidas, com foco em roçada, capina, limpeza e observação de risco operacional.

### Dores
- precisa decidir rápido em campo;
- nem sempre tem um critério visual padronizado;
- pode haver divergência entre o que ele observa e o que o supervisor entende como prioridade;
- registrar informação manualmente consome tempo;
- falta histórico organizado por trecho.

### Objetivo
Ter um aplicativo simples, rápido e confiável que ajude a registrar o trecho e indicar se há necessidade de corte.

## 5. Proposta de Solução
Aplicativo mobile em **React Native + Expo** com foco em uso por operador de campo.

## Como executar o projeto

### Pré-requisitos
Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/)
- npm ou yarn
- [Expo Go](https://expo.dev/go) no celular **ou** emulador Android/iOS
- Git

### 1. Clonar o repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

### 2. Acessar a pasta do projeto
```bash
cd <NOME_DA_PASTA_DO_PROJETO>
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Iniciar o projeto
```bash
npx expo start
```

### 5. Rodar no dispositivo
Após iniciar o Expo, você terá algumas opções:

- pressionar `a` para abrir no emulador Android
- pressionar `i` para abrir no simulador iOS
- escanear o QR Code com o app **Expo Go** no celular

---

## Scripts úteis

```bash
npx expo start
```
Inicia o servidor de desenvolvimento do Expo.

```bash
npx expo start --clear
```
Inicia o projeto limpando o cache.

```bash
npm install
```
Instala todas as dependências do projeto.

---

## Observações
- Certifique-se de estar na mesma rede Wi-Fi do computador ao testar no celular com Expo Go.
- Caso ocorra erro de dependências, tente reinstalar os pacotes com:
```bash
npm install
```
- Caso o cache cause problemas, execute:
```bash
npx expo start --clear
```

### Fluxo resumido
1. operador abre o app;
2. inicia uma nova análise;
3. informa contexto do trecho (rodovia, km, sentido e tipo de área);
4. captura ou anexa uma foto;
5. recebe uma recomendação: **Cortar** ou **Não cortar**;
6. salva a inspeção no histórico;
7. o supervisor pode consultar o registro e a evidência visual.

## 6. Stack Tecnológica
### Frontend mobile
- **React Native**
- **Expo**
- **JavaScript**

### Navegação
- **React Navigation**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`

### Recursos do dispositivo
- **expo-location** para geolocalização do trecho
- **expo-camera** ou **expo-image-picker** para captura de imagem

### Armazenamento
- **AsyncStorage** para persistência local de inspeções no protótipo

### Integração futura com IA
- API REST para enviar imagem e metadados do trecho
- serviço Python com modelo de visão computacional para classificação da vegetação

## 7. Justificativa da Stack
### React Native
Permite desenvolvimento cross-platform com uma base única de código e boa produtividade para prototipação.

### Expo
Acelera setup, testes e acesso a funcionalidades nativas relevantes para o projeto, como câmera e localização.

### React Navigation
Resolve bem a navegação entre telas do fluxo de inspeção, histórico e resultado.

### AsyncStorage
É suficiente para o Sprint 1, pois o foco está em protótipo navegável e prova de conceito.

### Integração futura com Python
O back-end/modelo de IA poderá ser desenvolvido separadamente em Python, preservando o app como cliente mobile.

## 8. Estrutura do Repositório
```bash
motiva-verdecheck-mobile/
├── assets/
├── docs/
│   ├── documento-requisitos.md
│   ├── prototipo-figma-handoff.md
│   ├── prompt-figma.txt
│   ├── sprint1-checklist.md
│   └── arquitetura-mobile.md
├── src/
│   ├── components/
│   ├── contexts/
│   ├── navigation/
│   ├── screens/
│   └── utils/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

## 9. Protótipo Contemplado
O protótipo cobre as telas principais:
- Login
- Home
- Nova análise
- Captura/seleção de imagem
- Processamento
- Resultado da análise
- Histórico
- Detalhe da inspeção

## 10. Integrantes
- Matheus Morelli
- Rafael Ferreira
- Cauã Muniz
- Henrique Mortari
- Victor Mortari
- Lucas Eiki

## 11. Status das Sprints e Entregas

### Histórico de Evolução
- **Sprint 1 — Exploração e Requisitos:** [x] Documento de requisitos, personas, justificativa de stack e protótipo base navegável.
- **Sprint 2 — Refinamento e Hotfixes:** [x] Guarda de rotas dinâmica (`AppNavigator.js`), gestão global com Context API e persistência de sessão com `AsyncStorage`.
- **Sprint 3 — Protótipo Funcional Completo:** [x] Todos os fluxos principais e secundários implementados, camada de mock completa (sucesso, erro, listas vazias e fluxos alternativos "Cortar" vs "Não cortar"), documento formal de testes manuais e consistência visual padronizada.

---

## 12. Matriz de Status das Funcionalidades (Sprint 3)

| Funcionalidade / Fluxo | Estado Atual | Cobertura do Mock / Implementação |
| :--- | :---: | :--- |
| **Autenticação de Usuário** | Concluído | Login corporativo persistente via `AsyncStorage` com botão de acesso rápido demo e logout seguro. |
| **Painel Operacional (Home)** | Concluído | Dashboard com métricas diárias sincronizadas, avatar dinâmico e banner inteligente de alerta para trechos críticos. |
| **Formulário de Nova Inspeção** | Concluído | Geolocalização (rodovia, km, sentido), seleção técnica de segmento da faixa e validação completa de campos e altura. |
| **Captura de Evidência Fotográfica** | Concluído | Suporte a câmera real e galeria nativa via `expo-image-picker` com visor preview e botões de simulação rápida para emuladores. |
| **Inferência e Diagnóstico IA** | Concluído | Processamento simulado com regras CCR completas via `mockAnalysis.js`, cobrindo tanto recomendação **"Cortar"** (excesso de altura) quanto **"Não cortar"** (conforme). |
| **Histórico de Auditoria** | Concluído | Listagem com `StatusBadge` padronizado, suporte a **Empty State** (lista vazia), limpeza e restauração de dados para demonstração. |
| **Detalhe da Inspeção** | Concluído | Exibição de evidência fotográfica auditada, justificativa técnica da IA, percentual de confiança e ação de encaminhamento para supervisão. |

---

## 13. Justificativa da Continuidade da Stack (React Native + Expo)

O grupo optou conscientemente por **manter a stack em React Native com Expo** (não migrando para Flutter). Os motivos técnicos que respaldam essa decisão são:
1. **Velocidade de Prototipação e Ciclo de Feedback:** O ecossistema Expo com Fast Refresh permitiu iterar rapidamente e consolidar todos os fluxos com alta fidelidade sem fricção de compilação nativa.
2. **Integração Fluida de Mídia Nativa:** O uso de `expo-image-picker` atendeu prontamente a necessidade de acesso à câmera e galeria em Android e iOS mantendo fallbacks robustos.
3. **Harmonia com Arquitetura Futura de IA:** A separação clara entre cliente mobile (JavaScript/React Native) e microsserviço de Visão Computacional (Python/FastAPI) garante modularidade sem necessidade de reescrita em Dart/Flutter.

---

## 14. Documento de Testes Manuais

O documento com os 5 fluxos principais testados, resultados obtidos e evidências de conformidade está disponível em:
👉 **[docs/testes-manuais-sprint3.md](docs/testes-manuais-sprint3.md)**

---

## 15. Pendências Identificadas e Plano de Ajustes para a Sprint 4

Conforme preconizado nas diretrizes da Sprint 3, foram mapeadas as pendências e o plano de ação para a entrega final:

1. **Integração Real do Modelo de IA (Visão Computacional):**
   - *Pendência:* As decisões de corte atualmente utilizam o motor de regras operacionais em `mockAnalysis.js`.
   - *Plano Sprint 4:* Integrar chamada HTTP `multipart/form-data` conectando o mobile à API REST em Python (FastAPI) executando o classificador convolucional treinado com o dataset de vegetação.
2. **Geolocalização Automática via GPS (`expo-location`):**
   - *Pendência:* Rodovia, quilômetro e sentido são selecionados manualmente.
   - *Plano Sprint 4:* Adicionar botão "Obter Localização Atual" para preenchimento automático das coordenadas e cálculo aproximado do KM.
3. **Sincronização em Nuvem (Sync Online/Offline):**
   - *Pendência:* As vistorias ficam gravadas exclusivamente na memória local do celular (`AsyncStorage`).
   - *Plano Sprint 4:* Implementar sincronização com banco de dados centralizado em nuvem quando houver conexão de rede.

