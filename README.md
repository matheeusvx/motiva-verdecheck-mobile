# Motiva VerdeCheck Mobile

![status](https://img.shields.io/badge/status-finalizado-orange)
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

## Como executar
# clonar o repositório
git clone <url-do-repositorio>

# acessar a pasta
cd verdecheck-mobile

# instalar dependências
npm install

# iniciar o projeto
npx expo start

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

## 11. Status da Sprint 1
### Entregas previstas
- [x] README completo
- [x] documento de requisitos
- [x] definição de persona
- [x] justificativa de stack
- [x] protótipo navegável em código base
- [x] handoff detalhado para Figma

## 12. Próximos Passos
### Sprint 2
- validar dataset inicial;
- definir formato da API de análise;
- criar fluxo de envio de imagem real;
- iniciar integração com serviço de classificação.

### Sprint 3+
- integrar modelo de visão computacional;
- adicionar geolocalização automática;
- adicionar sincronização com back-end;
- gerar dashboard operacional e priorização.
