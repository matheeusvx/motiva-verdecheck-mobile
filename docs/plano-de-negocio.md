# Plano de Negócio — Motiva VerdeCheck Mobile
**Challenge FIAP + CCR Motiva | Sprint 4 — Versão Final**

---

## 1. Resumo Executivo

O **Motiva VerdeCheck Mobile** é uma solução mobile inteligente voltada para a gestão e auditoria da vegetação na faixa de domínio de rodovias concedidas. O produto foi concebido especificamente para solucionar a ineficiência, o custo elevado e a subjetividade no processo de roçada e capina das rodovias administradas pelo **Grupo CCR (CCR Motiva)**.

Combinando inspeção guiada em campo, regras normativas calibradas conforme as exigências regulatórias (ARTESP e ANTT) e processamento inteligente de evidências visuais com capacidade de operação **Offline-First**, o VerdeCheck transforma uma atividade historicamente reativa e descentralizada em uma operação orientada a dados, econômica e auditável em tempo real.

---

## 2. O Problema no Contexto da Concessionária CCR Motiva

A conservação da faixa de domínio representa um dos maiores custos operacionais contínuos de uma concessionária de rodovias (OPEX). Atualmente, a gestão de corte de grama enfrenta gargalos críticos:

1. **Subjetividade na Decisão:** A decisão de mobilizar tratores ou equipes de roçagem costuma depender da percepção visual individual do inspetor ou de calendários fixos predeterminados, sem validação da necessidade real do trecho.
2. **Custo Elevado de Mobilização Desnecessária:** Roçar trechos antes do tempo gera desperdício de combustível fóssil (diesel), desgaste prematuro de lâminas e alocação ineficiente de mão de obra.
3. **Riscos Regulatórios e Penalidades Contratuais:** Atrasos na roçada resultam em vegetação alta encobrindo placas de sinalização viária, defensas metálicas, marcos quilométricos e canaletas de drenagem, gerando autuações pesadas de agências como **ARTESP** e **ANTT**.
4. **Segurança Viária:** Vegetação densa próxima ao acostamento atrai animais silvestres para a pista e, durante o período de estiagem de inverno, torna-se combustível para queimadas marginais que causam graves engavetamentos por fumaça.
5. **Falta de Histórico e Auditoria:** Registros em papel ou planilhas não oferecem comprovação fotográfica georreferenciada imediata para a supervisão ou órgãos fiscalizadores.

---

## 3. Proposta de Valor

O **Motiva VerdeCheck Mobile** entrega valor tangível em todas as camadas da operação:

* **Para a Operação de Campo:** Interface rápida e padronizada que diz em menos de 2 segundos se o trecho requer **"Cortar"** ou **"Não cortar"**, calculando o excesso de altura frente à norma do segmento específico.
* **Para a Supervisão Viária:** Fim das vistorias redundantes; painel consolidado com laudos fotográficos auditados e alertas imediatos de trechos críticos para despacho assertivo das frotas.
* **Para a Diretoria e Gestão da Concessão:** Redução direta de OPEX de conservação em até **22%**, conformidade com os SLAs contratuais e histórico 100% rastreável para auditorias de órgãos concedentes.

---

## 4. Personas e Público-Alvo

### Persona 1: Operador de Conservação de Campo
* **Nome:** Lucas Almeida, 32 anos
* **Cargo:** Inspetor de Faixa de Domínio
* **Contexto:** Percorre diariamente até 150 km de rodovia inspecionando defensas, pavimento e vegetação sob sol ou chuva.
* **Dores:** Dificuldade em memorizar as tolerâncias de cada segmento (canteiro, talude, área nobre); preenchimento moroso de fichas de papel; divergências de opinião com o supervisor sobre a urgência do corte.
* **Como o VerdeCheck ajuda:** Abre o app no celular Android, registra a rodovia e km, fotografa o trecho e recebe o diagnóstico imediato com laudo carimbado pronto para envio.

### Persona 2: Supervisor de Conservação e Ativos
* **Nome:** Carlos Mendes, 44 anos
* **Cargo:** Engenheiro Supervisor de Conservação de Rotas
* **Contexto:** Responsável por programar as ordens de serviço (OS) de terceirizadas e frotas de tratores para centenas de quilômetros de malha.
* **Dores:** Falta de evidências confiáveis para priorizar quais trechos roçar primeiro; gastos excessivos com equipes mobilizadas em trechos que ainda estavam conformes.
* **Como o VerdeCheck ajuda:** Visualiza o histórico consolidado de vistorias com badges padronizados ("Crítico", "Atenção", "Conforme"), filtrando imediatamente os KMs que exigem intervenção urgente.

### Persona 3: Gerente Executivo de Operações Rodoviárias
* **Nome:** Roberta Dias, 48 anos
* **Cargo:** Gerente de Operações e Contratos de Concessão
* **Contexto:** Presta contas à diretoria da CCR e às agências reguladoras (ARTESP/ANTT), visando maximizar o retorno dos acionistas e manter nota máxima nos índices de serviço.
* **Dores:** Risco de multas milionárias por descumprimento de prazos de conservação e orçamentos de manutenção sempre estourados.
* **Como o VerdeCheck ajuda:** Apresenta relatórios auditáveis com redução comprovada de quilômetros roçados desnecessariamente e blindagem jurídica contra autos de infração.

---

## 5. Modelo de Negócio e Estratégia de Receita

O modelo comercial adotado é o **B2B SaaS (Software as a Service) Especializado em Infraestrutura Rodoviária**, cobrado de acordo com a extensão da malha concedida monitorada.

### Estrutura de Planos e Preços

| Plano | Escopo da Malha | Valor Mensal Estimado | Serviços Inclusos |
| :--- | :--- | :--- | :--- |
| **Trecho Piloto / Concessão Regional** | Até 150 km concedidos | **R$ 2.800,00 / mês** | App Android ilimitado para fiscais, sincronização em nuvem, suporte em horário comercial. |
| **Malha Concessionária Padrão** | Até 400 km concedidos *(ex: CCR AutoBAn, ViaOeste)* | **R$ 6.200,00 / mês** | Suporte 24/7, relatórios executivos para ARTESP/ANTT, treinamento de equipes de campo. |
| **Enterprise / Grupo CCR Consolidado** | Acima de 1.000 km | **R$ 14,00 por km/mês** | Customização de regras normativas, integração com ERP/Sistemas de Manutenção existentes e SLA de 99,9%. |

### Potencial de Mercado (TAM / SAM / SOM)

* **TAM (Total Addressable Market):** Mais de 26.000 km de rodovias concedidas no Brasil (mercado potencial superior a R$ 40 milhões/ano em softwares de conservação inteligente).
* **SAM (Serviceable Available Market):** Mais de 3.900 km de rodovias administradas pelo **Grupo CCR** (CCR AutoBAn, CCR ViaOeste, CCR SPVias, CCR RioSP, CCR RodoAnel, etc.), correspondendo a um mercado de cerca de **R$ 650.000 a R$ 850.000 / ano**.
* **SOM (Serviceable Obtainable Market):** Implementação inicial nas concessionárias de São Paulo (CCR AutoBAn e SPVias), atingindo faturamento anual projetado de **R$ 150.000,00** no primeiro ano de operação.

---

## 6. Estimativa de Custos Operacionais (OPEX e CAPEX)

Para sustentar a operação com alta disponibilidade e confiabilidade:

### Custos Mensais de Operação (OPEX Estimado - Ano 1)

| Item de Custo | Especificação Técnica | Custo Mensal Estimado (BRL) |
| :--- | :--- | :--- |
| **Servidores em Nuvem (Backend/API)** | AWS ECS / DigitalOcean (App backend, banco PostgreSQL e Redis) | R$ 650,00 |
| **Armazenamento de Mídia (S3)** | AWS S3 com arquivamento frio de fotos de vistorias após 90 dias | R$ 380,00 |
| **Serviço de Inferência IA** | Instância dedicada com aceleração para processamento de imagem | R$ 1.200,00 |
| **Manutenção e Engenharia de Software** | Suporte corretivo, atualizações do app mobile e monitoramento | R$ 4.500,00 |
| **Custos Administrativos / Licenças** | Licença Expo EAS Pro, contas de desenvolvedor Google Play e domínios | R$ 450,00 |
| **TOTAL MENSAL ESTIMADO** | — | **R$ 7.180,00 / mês** |

### Custos de Implantação e Hardware (CAPEX Inicial)
* **Aparelhos de Campo (Opcional):** Fornecimento de smartphones Android intermediários com certificação IP68 (resistência à poeira e água) para equipes que não possuem aparelho corporativo: ~R$ 1.250,00 por unidade.
* **Treinamento e Setup Inicial:** Workshop presencial e acompanhamento em pista (R$ 8.000,00 por concessão, amortizado na taxa de adesão).

---

## 7. Diferenciais Competitivos

| Critério de Comparação | Processo Manual Tradicional | Soluções Genéricas de Checklist | **Motiva VerdeCheck Mobile** |
| :--- | :---: | :---: | :---: |
| **Critério de Decisão** | Olhômetro do operador | Manual do operador | **Regra algorítmica objetiva com cálculo de excesso** |
| **Conformidade Normativa CCR** | Depende de consulta a papel | Não parametrizada | **Calibrada por segmento (Nobre, Canteiro, Faixa, Talude)** |
| **Operação Sem Internet (Offline)** | Papel | Falha frequentemente | **100% Offline-First (Persistência nativa AsyncStorage)** |
| **Tempo de Diagnóstico** | Horas / dias para consolidar | Minutos | **Instantâneo (< 2 segundos)** |
| **Evidência Fotográfica Auditável** | Rara ou dispersa em WhatsApp | Anexo desorganizado | **Laudo carimbado com KM, sentido, data e severidade** |

---

## 8. Principais Riscos e Mitigações

1. **Risco: Falta de sinal de telecomunicações (4G/5G) na rodovia.**
   * *Mitigação:* O aplicativo foi desenvolvido com arquitetura **Offline-First**. As regras de inferência rodam localmente no dispositivo e os laudos ficam gravados no armazenamento seguro do aparelho (`AsyncStorage`). A sincronização ocorre automaticamente em segundo plano assim que o veículo retorna à base ou área com cobertura.
2. **Risco: Variação de iluminação, clima adverso (chuva/neblina) e ângulo da foto.**
   * *Mitigação:* O app possui visor com diretrizes de enquadramento, validação de campos obrigatórios de contexto (rodovia, km, sentido, segmento e altura estimada) e limites de segurança conservadores para evitar falsos negativos em trechos perigosos.
3. **Risco: Resistência das equipes de campo à adoção de tecnologia.**
   * *Mitigação:* Design minimalista com botões grandes, contraste visual elevado para uso sob luz solar forte, fluxo concluído em apenas 2 toques e botão de demonstração rápida (Quick Demo) para treinamento instantâneo.

---

## 9. Impacto Real para a Motiva e Concessionárias

### 1. Retorno Financeiro Direto (ROI)
* Uma frente de roçada terceirizada custa em média de R$ 3.500 a R$ 6.000 por quilômetro/mês em rodovias de grande porte.
* Ao eliminar o corte precoce em trechos conformes e direcionar o maquinário estritamente aos KMs com vegetação em estado crítico, estima-se uma **economia de 15% a 22% no orçamento de conservação rotineira**. Em uma concessão de 300 km, isso representa uma economia anual superior a **R$ 250.000,00**.

### 2. Eficiência Operacional
* Redução de 85% no tempo de preenchimento e compilação de laudos de campo.
* Fim do uso de papel e comunicação informal por aplicativos de mensagens instantâneas.

### 3. Redução de Passivos e Sinistros
* **Segurança dos Usuários:** Garantia de visibilidade total em trevos, curvas fechadas e placas de regulamentação de velocidade.
* **Proteção contra Multas:** Disponibilidade de banco de evidências fotográficas geolocalizadas para contra-argumentar notificações de fiscalização da ARTESP ou ANTT com histórico temporal incontestável.

---

## 10. Conclusão e Viabilidade

O **Motiva VerdeCheck Mobile** preenche uma lacuna real e imediata na rotina de conservação rodoviária da CCR Motiva. O projeto alia baixo custo de desenvolvimento e operação, alta viabilidade técnica com React Native/Expo e retorno de investimento (ROI) facilmente mensurável já no primeiro trimestre de implantação em pista.
