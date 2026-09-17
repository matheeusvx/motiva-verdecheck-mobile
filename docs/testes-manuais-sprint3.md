# Documento de Testes Manuais — Sprint 3 (Protótipo Funcional Completo)

**Projeto:** Motiva VerdeCheck Mobile  
**Challenge:** FIAP + CCR Motiva  
**Disciplina:** Cross-Platform Mobile Application Development  
**Versão do Protótipo:** 3.0.0 (Sprint 3)  
**Ambiente de Execução:** Emulador Android (Pixel 7 / API 34) & Expo Go em Dispositivo Físico (Samsung Galaxy S22 / Android 14 & iPhone 13 / iOS 17.5)  
**Data da Execução:** Setembro / 2026  

---

## 1. Visão Geral dos Testes

Este documento consolida os resultados dos testes manuais de ponta a ponta executados sobre todos os fluxos principais e secundários do aplicativo **Motiva VerdeCheck Mobile**. O objetivo é certificar a estabilidade de navegação, a integridade da camada de mock de dados (cobrindo sucesso, erro, lista vazia e fluxos alternativos) e a ausência de travamentos ou crashes durante a operação.

---

## 2. Matriz dos 5 Fluxos Principais Testados

Abaixo está o registro detalhado de execução conforme os critérios avaliativos da Sprint 3:

| ID | Fluxo / Funcionalidade | Cenário Testado | Pré-condição | Passos Executados | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **CT01** | **Autenticação e Sessão Operacional** | Login institucional com credenciais válidas e encerramento de sessão (Logout). | Aplicativo aberto na tela de Login com usuário desautenticado. | 1. Informar `lucas.almeida@motiva.com` e senha.<br>2. Clicar em "Entrar no Painel" (ou usar o atalho de Acesso Rápido).<br>3. Verificar redirecionamento automático para a Home.<br>4. Rolar até o fim da Home e acionar "Encerrar Sessão Operacional". | Sessão persistida em `AsyncStorage`, exibição do nome formatado na Home ("Olá, Lucas") e retorno seguro à tela de login ao deslogar, sem erros de navegação. | O usuário foi autenticado, a Home carregou o nome "Lucas" no topo e o logout restaurou o estado com sucesso. | **PASSOU** |
| **CT02** | **Inspeção de Campo: Recomendação "Cortar" (Cenário Crítico)** | Cadastro de trecho com vegetação que ultrapassa a tolerância máxima da norma CCR. | Usuário autenticado na aba "Nova Análise". | 1. Inserir Rodovia `SP-310`, KM `142`, Sentido `Norte (Interior)`.<br>2. Selecionar segmento "Canteiro Central" (limite de 20 cm).<br>3. Informar altura de `120` cm e notas de campo.<br>4. Avançar para captura e selecionar foto de mato alto.<br>5. Confirmar análise na tela de processamento. | Diagnóstico exibido em card vermelho/coral com status **"Cortar"**, severidade **"Crítico"**, justificativa detalhada e evidência fotográfica com tag de auditoria. | O sistema calculou o excesso de altura (+100 cm acima do limite de 20 cm), recomendou o corte imediato e salvou o laudo. | **PASSOU** |
| **CT03** | **Inspeção de Campo: Recomendação "Não Cortar" (Fluxo Alternativo / Conforme)** | Cadastro de trecho com vegetação rasteira dentro dos limites operacionais. | Usuário autenticado na aba "Nova Análise". | 1. Inserir Rodovia `SP-348`, KM `45`, Sentido `Sul (Capital)`.<br>2. Selecionar segmento "Faixa de Domínio Comum" (limite de 30 cm).<br>3. Informar altura de `18` cm.<br>4. Avançar para captura e selecionar foto de vegetação rasteira/conforme.<br>5. Confirmar análise. | Diagnóstico exibido em card verde esmeralda com status **"Não cortar"**, severidade **"Conforme"**, justificativa de que a altura está dentro da norma operacional de 30 cm. | O app exibiu a recomendação "Não cortar", card verde e justificativa de conformidade, permitindo salvar no histórico. | **PASSOU** |
| **CT04** | **Histórico de Evidências e Detalhamento da Inspeção** | Abertura do histórico local, navegação profunda para os detalhes do trecho e exportação de laudo. | Existência de inspeções gravadas localmente no dispositivo. | 1. Navegar para a aba "Histórico".<br>2. Localizar o registro da SP-310.<br>3. Tocar no card da inspeção para abrir o detalhe.<br>4. Validar visualização da foto real/auditada, metadados (km, sentido, área, notas e confiança).<br>5. Acionar "Encaminhar para Supervisão".<br>6. Tocar em "Voltar ao Histórico". | A tela de detalhes abre de forma suave, sem erros de rota, renderiza a imagem real capturada, exibe badge uniforme e permite retorno rápido. | Card interativo abriu `InspectionDetailScreen` com renderização correta de fotos e dados, com feedback nativo de envio. | **PASSOU** |
| **CT05** | **Tratamento de Exceções, Validação de Formulário e Lista Vazia (Empty State)** | Tentativa de submissão com campos em branco e verificação do comportamento sem registros. | Aba "Nova Análise" e aba "Histórico". | 1. Na tela Nova Análise, tentar clicar em avançar sem preencher rodovia.<br>2. Preencher letras no campo de altura ou valor menor/igual a zero.<br>3. No Histórico, acionar o botão "Limpar Histórico" e confirmar.<br>4. Verificar renderização do Empty State.<br>5. Clicar no botão "Restaurar Registros Mock". | O app exibe `Alert` nativo amigável impedindo avanço com dados inconsistentes; o histórico vazio exibe mensagem ilustrada convidando a agir ou restaurar. | Todas as validações impediram entradas inválidas e o Empty State funcionou perfeitamente com restauração em 1 toque. | **PASSOU** |

---

## 3. Testes dos Fluxos Secundários e Recursos Complementares

| Funcionalidade | Cenário Testado | Resultado | Status |
| :--- | :--- | :--- | :---: |
| **Alerta Dinâmico na Home** | Presença de trechos críticos na malha dispara o banner vermelho de intervenção com atalho direto para o Histórico. | Banner exibido apenas quando há trecho crítico registrado; clique navega direto para o Histórico. | **PASSOU** |
| **Dashboard de Métricas** | Contador de vistorias do dia sincronizado com as datas gravadas no dispositivo. | O valor reflete o total de inspeções salvas no dia atual. | **PASSOU** |
| **Integração Nativa de Câmera e Galeria (`expo-image-picker`)** | Solicitação de permissões e abertura de galeria/câmera real em smartphone físico. | Câmera e galeria abriram normalmente nos aparelhos testados com preview em tempo real no visor. | **PASSOU** |
| **Fallbacks de Simulação Rápida** | Uso dos botões de preset de imagem em emuladores sem webcam/câmera. | Permite concluir a vistoria sem depender de periféricos físicos, ideal para bancas avaliadoras. | **PASSOU** |

---

## 4. Análise de Desempenho e Estabilidade

- **Crashes ou Travamentos:** 0 ocorrências durante todos os ciclos de testes.
- **Tempo de Resposta nas Transições:** Instantâneo (< 200ms entre telas com React Navigation).
- **Tempo de Inferência Simulado (IA):** 2,0 segundos com indicador animado de progresso (`ActivityIndicator`).
- **Persistência de Dados:** Todos os registros persistem mesmo após encerrar e reabrir o aplicativo via Expo Go.

---

## 5. Pendências Identificadas e Plano de Ajustes para a Sprint 4

Embora o protótipo funcional atenda integralmente os requisitos da Sprint 3 com mock robusto, foram identificados os seguintes pontos de evolução para a Sprint 4 (Entrega Final):

1. **Substituição do Mock de IA por API REST Real em Python:**
   - *Situação Atual:* O cálculo é executado pelo módulo local `mockAnalysis.js` baseado nas regras operacionais CCR.
   - *Ajuste Sprint 4:* Conectar a tela `ProcessingScreen.js` ao back-end em FastAPI/Flask que executa o modelo de visão computacional treinado (YOLO/ResNet) para inferência direta da imagem enviada via `multipart/form-data`.

2. **Geolocalização Automática via GPS (`expo-location`):**
   - *Situação Atual:* O operador digita a rodovia, o km e o sentido manualmente.
   - *Ajuste Sprint 4:* Integrar preenchimento automático de coordenadas e aproximação de quilometragem por GPS nativo.

3. **Sincronização em Nuvem (Cloud Sync):**
   - *Situação Atual:* O armazenamento é mantido localmente no aparelho via `@react-native-async-storage/async-storage`.
   - *Ajuste Sprint 4:* Implementar fila offline com sincronização bidirecional quando houver conectividade Wi-Fi/4G.
