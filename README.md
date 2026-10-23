# Motiva VerdeCheck Mobile

![status](https://img.shields.io/badge/status-sprint4_versao_final-22C55E?style=for-the-badge)
![versao](https://img.shields.io/badge/versao-4.0.0-059669?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-51.0-000020?style=for-the-badge&logo=expo)
![Android APK](https://img.shields.io/badge/Android-APK_Disponível-3DDC84?style=for-the-badge&logo=android)

> **Challenge FIAP + CCR Motiva — Cross-Platform Mobile Application Development**  
> Solução inteligente para inspeção, auditoria e apoio à decisão de roçada na faixa de domínio de rodovias concedidas.

---

## 📌 Acessos Rápidos da Entrega Final (Sprint 4)

| Recurso | Descrição | Link de Acesso |
| :--- | :--- | :---: |
| 📱 **Download do APK Final** | Binário instalável pronto para qualquer smartphone Android | [👉 Baixar APK Android (Google Drive)](https://drive.google.com/file/d/1-uEWAiEO1xUo_AeLz3LoHA-9eiJdD3Cg/view?usp=sharing) |
| 🎬 **Vídeo de Pitch & Demonstração** | Apresentação do grupo, problema, demo do app no aparelho e plano de negócio (< 5 min) | [👉 Assistir Pitch no YouTube(https://www.youtube.com/watch?v=iWxXlFs4acU) |
| 📑 **Plano de Negócio Completo** | Análise de viabilidade comercial, custos, receita B2B, personas e impacto CCR | [👉 Acessar docs/plano-de-negocio.md](docs/plano-de-negocio.md) |
| 🧪 **Documento de Testes Manuais** | Matriz com os fluxos principais e secundários testados de ponta a ponta | [👉 Acessar docs/testes-manuais-sprint3.md](docs/testes-manuais-sprint3.md) |

---

## 📥 Guia Passo a Passo: Como Instalar o APK no Android

Para instalar o **Motiva VerdeCheck Mobile** em qualquer dispositivo Android (versão 8.0 ou superior):

1. **Baixar o arquivo APK:**
   * Acesse o link de download disponibilizado acima pelo navegador do seu smartphone Android.
   * Toque em **Fazer o download mesmo assim**.
2. **Autorizar a instalação:**
   * Ao término do download, abra a notificação ou vá até a pasta **Downloads** do celular e toque no arquivo `motiva-verdecheck.apk`.
   * Caso o sistema solicite, selecione **Configurações** e ative a opção **Permitir desta fonte** para o navegador ou gerenciador de arquivos.
3. **Verificação do Google Play Protect:**
   * Como se trata de um pacote acadêmico gerado em ambiente de homologação (fora da Google Play Store), o Google Play Protect pode exibir uma mensagem preventiva.
   * Toque em **Mais detalhes** e em seguida selecione **Instalar assim mesmo**.
4. **Abrir a Aplicação:**
   * Após a conclusão, toque em **Abrir**.
   * Na tela inicial, utilize o botão **"Acesso Rápido Demo (Lucas Almeida)"** para entrar instantaneamente com dados pré-configurados da CCR Motiva.

---

## ⚙️ Como Gerar o Build do APK a partir deste Repositório

Caso deseje compilar um novo APK diretamente a partir do código-fonte:

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão LTS recomendada: 18 ou 20)
* Conta criada no [Expo](https://expo.dev/)
* EAS CLI instalado globalmente:
  ```bash
  npm install -g eas-cli
  ```

### Passo a Passo de Compilação
1. **Clonar e instalar dependências:**
   ```bash
   git clone https://github.com/matheeusvx/motiva-verdecheck-mobile.git
   cd motiva-verdecheck-mobile
   npm install
   ```

2. **Autenticar na conta Expo:**
   ```bash
   npx eas login
   ```

3. **Disparar o build do APK (Android Standalone):**
   ```bash
   npm run build:apk
   # ou diretamente:
   npx eas build -p android --profile preview
   ```
   *O Expo compilará o pacote na nuvem e fornecerá o link direto com o `.apk` gerado.*

---

## 💡 Visão Geral da Solução e Problema Abordado

### O Desafio CCR Motiva
Nas rodovias concedidas administradas pela CCR, a conservação da vegetação da faixa de domínio (roçada e capina) é crítica para a segurança e para o cumprimento de contratos com órgãos reguladores (**ARTESP / ANTT**). Historicamente, a decisão de roçar depende de inspeção visual humana subjetiva ou de cronogramas fixos desvinculados da real taxa de crescimento da grama, gerando:

* **Desperdício Financeiro:** Roçadas precoces geram gastos desnecessários com combustível fóssil de tratores e desgaste de implementos.
* **Riscos Regulatórios:** Vegetação alta que encobre placas de sinalização viária, defensas ou canaletas pluviais gera multas pesadas.
* **Perigo de Sinistros:** Mato alto atrai animais para a pista e propicia queimadas às margens das rodovias no período seco.

### A Proposta do Motiva VerdeCheck
Um aplicativo mobile com arquitetura **Offline-First** que orienta o operador de campo em uma vistoria ágil:
1. Registra a rodovia, quilômetro, sentido e o **segmento viário específico** (Área Nobre, Canteiro Central, Faixa de Domínio ou Encosta);
2. Captura a foto real do trecho com diretrizes de enquadramento;
3. Processa a evidência fotográfica cruzando com os limites normativos da concessionária;
4. Emite na hora a recomendação objetiva: **"Cortar"** (com indicação do excesso de altura) ou **"Não cortar"** (conforme a norma);
5. Armazena um laudo auditável com foto carimbada e metadados para auditoria da supervisão.

---

## 💼 Resumo Executivo do Plano de Negócio

O plano de negócio detalhado encontra-se no documento formal [docs/plano-de-negocio.md](docs/plano-de-negocio.md). Abaixo estão os pilares fundamentais:

* **Proposta de Valor:** Redução de até **22% nos custos operacionais (OPEX)** de roçada nas rodovias concessionadas, eliminação de 100% das multas de órgãos fiscalizadores por mato alto e agilização do ciclo de laudos de campo em 85%.
* **Público-Alvo e Personas:** Operadores de campo da CCR Motiva (uso diário na pista), Supervisores de Conservação e Ativos (gestão de rotas e priorização de ordens de serviço) e Gerentes de Concessão (acompanhamento de SLAs regulatórios).
* **Modelo de Receita (B2B SaaS):** Cobrança mensal escalonada por quilômetro de malha concedida monitorada (em média **R$ 14 a R$ 18 por km/mês**), com potencial de receita anual superior a **R$ 650 mil** no universo das rodovias do Grupo CCR.
* **Custos Operacionais Estimados:** Custo mensal de infraestrutura e suporte em nuvem estimado em **R$ 7.180,00/mês** no primeiro ano, garantindo margem bruta operacional atrativa e retorno sobre investimento (ROI) já nos primeiros meses de implantação.
* **Diferenciais Competitivos:** Funcionamento **100% Offline-First** (essencial em trechos sem sinal 4G), parâmetros técnicos nativos das normas CCR (tolerâncias de 10cm, 20cm, 30cm e 60cm) e geração imediata de evidências fotográficas auditáveis.

---

## 🛠️ Stack Tecnológica e Justificativa de Continuidade

O projeto foi construído utilizando a seguinte arquitetura técnica:

* **Linguagem & Core:** JavaScript (ES6+), React Native (v0.74.5) e Expo SDK (v51.0).
* **Navegação:** React Navigation v6 (`@react-navigation/native-stack` e `@react-navigation/bottom-tabs`).
* **Hardware & Mídia:** `expo-image-picker` para integração com a câmera nativa e galeria de fotos do smartphone, com pré-visualização em alta resolução e fallbacks de teste para emuladores.
* **Persistência Offline-First:** `@react-native-async-storage/async-storage` para armazenamento local seguro de credenciais, histórico de vistorias e laudos fotográficos.
* **Design & Estilo:** Vanilla StyleSheet com Design System corporativo exclusivo (`src/utils/theme.js`), tipografia modular e cores adaptadas à identidade institucional da CCR Motiva.

### Justificativa da Continuidade em React Native (Decisão de Arquitetura)
O grupo optou conscientemente por **manter a base em React Native com Expo**, sem migrar para Flutter, pelos seguintes fatores:
1. **Velocidade de Entrega e Maturidade do Código:** A base em React Native atingiu estabilidade completa na Sprint 3, com zero erros críticos e cobertura de todos os fluxos normativos. Uma migração para Flutter nesta etapa geraria riscos desnecessários de regressão sem ganhos de performance perceptíveis para o escopo do operador.
2. **Independência de Plataforma e Arquitetura Desacoplada:** O cliente mobile consome regras operacionais locais e está estruturado para integração via REST API com o backend de visão computacional em Python/FastAPI, preservando a modularidade recomendada em microsserviços.

---

## 📱 Telas e Fluxos Implementados

A aplicação contempla todos os fluxos operacionais de ponta a ponta:

1. **Autenticação Segura (`LoginScreen`):** Acesso com e-mail corporativo, persistência da sessão e atalho "Acesso Rápido Demo" para bancas avaliadoras.
2. **Dashboard Operacional (`HomeScreen`):** Indicador de status de conexão, saudação personalizada, métricas sincronizadas em tempo real (total de vistorias, trechos críticos e conformes) e banner de alerta inteligente.
3. **Formulário de Nova Vistoria (`NewInspectionScreen`):** Identificação completa do trecho (rodovia, KM, sentido da via, seleção visual de segmento viário e altura estimada em cm) com validação de campos.
4. **Captura Fotográfica (`CameraMockScreen`):** Abertura de câmera real, galeria do aparelho ou aplicação de cenários predefinidos para testes sem periféricos.
5. **Processamento Inteligente (`ProcessingScreen`):** Tela de transição com anel de carregamento estilizado e checklist visual das etapas de inferência.
6. **Veredito da IA (`ResultScreen`):** Apresentação do diagnóstico técnico em card colorido com justificativa detalhada, cálculo da tolerância da CCR e botão para gravação no histórico.
7. **Histórico e Auditoria (`HistoryScreen`):** Listagem completa de inspeções com filtros rápidos ("Todos", "Cortar", "Conforme"), suporte a estado vazio (*Empty State*) e botão para restaurar dados padrão.
8. **Detalhamento da Inspeção (`InspectionDetailScreen`):** Visualização aprofundada com a foto auditada, métricas de confiança, data da vistoria e opção de compartilhamento/encaminhamento do laudo à supervisão.

---

## 🏆 Histórico de Evolução do Projeto (Sprints 1 a 4)

| Sprint | Foco Principal | Entregas Realizadas |
| :--- | :--- | :--- |
| **Sprint 1** | Exploração, Requisitos e Arquitetura | Levantamento de regras de negócio da CCR, definição de personas, arquitetura mobile inicial e protótipo navegável em baixa fidelidade. |
| **Sprint 2** | Refinamento de Navegação e Estado | Implementação do fluxo completo de autenticação com guarda de rotas (`AppNavigator.js`), gestão de estado global com Context API e persistência via `AsyncStorage`. |
| **Sprint 3** | Protótipo Funcional Completo | Implementação de todos os fluxos com cenários de "Cortar" vs "Não cortar", suporte a mídia nativa (`expo-image-picker`), empty states e relatório formal de testes manuais com zero erros críticos. |
| **Sprint 4** | Versão Final, APK e Negócio | Geração do build final instalável em formato APK para Android via Expo EAS, elaboração do Plano de Negócio B2B para a Motiva, gravação do pitch em vídeo e consolidação do README final. |

---

## 👥 Integrantes do Projeto

* **Matheus Morelli** — RM: 562765
* **Rafael Ferreira** — RM: 563285
* **Cauã Muniz** — RM: 566527
* **Henrique Mortari** — RM: 564699
* **Victor Mortari** — RM: 564804
* **Lucas Eiki** — RM: 561607
