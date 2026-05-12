# Documento de Requisitos - Sprint 1

## 1. Contexto do Challenge
A solução foi definida a partir do recorte mais viável para a primeira fase do projeto: criar um aplicativo mobile que ajude a equipe de conservação a responder objetivamente se um trecho de vegetação **deve ou não ser cortado**.

O foco desta sprint não é automatizar toda a operação de conservação, mas entregar uma base sólida para o MVP, com documentação, protótipo navegável e estrutura de repositório.

## 2. Problema Específico
A equipe de conservação precisa tomar decisões rápidas em campo sobre a necessidade de corte da vegetação. Sem um apoio digital, a inspeção pode se tornar subjetiva, lenta e pouco padronizada.

## 3. Persona Principal
### 3.1 Dados gerais
- **Nome:** Lucas Almeida
- **Idade:** 32 anos
- **Função:** Operador de Conservação de Faixa de Domínio
- **Escolaridade:** Ensino técnico / curso operacional
- **Ambiente de uso:** rodovias concedidas, áreas externas, uso em deslocamento e em condições variadas de luminosidade

### 3.2 Responsabilidades
- vistoriar trechos da faixa de domínio;
- registrar situações de vegetação alta;
- apoiar priorização de roçada e capina;
- fornecer evidências para supervisão;
- executar ou acionar equipes de manutenção.

### 3.3 Dores
- falta de padronização na decisão de corte;
- necessidade de registrar rapidamente o trecho analisado;
- dificuldade em consolidar histórico de inspeções;
- possibilidade de retrabalho entre campo e supervisão;
- dificuldade em comprovar o motivo da intervenção apenas verbalmente.

### 3.4 Objetivo da persona
Utilizar um aplicativo rápido e simples para registrar o trecho e receber uma recomendação clara: **cortar** ou **não cortar**.

## 4. Objetivo do Sistema
Apoiar a inspeção de vegetação em rodovias, permitindo que o usuário registre o contexto do trecho, capture evidência visual e obtenha uma recomendação padronizada de intervenção.

## 5. Requisitos Funcionais (RF)
### RF01 - Autenticação
O sistema deve permitir acesso do usuário por login institucional ou protótipo equivalente.

### RF02 - Iniciar nova análise
O sistema deve permitir que o usuário inicie uma nova inspeção de vegetação.

### RF03 - Registrar metadados do trecho
O sistema deve permitir registrar:
- rodovia;
- km;
- sentido;
- tipo de área;
- observações.

### RF04 - Capturar ou anexar foto
O sistema deve permitir que o usuário tire uma foto ou anexe uma imagem do trecho inspecionado.

### RF05 - Identificar contexto da área
O sistema deve permitir selecionar o tipo de área analisada, por exemplo:
- área nobre;
- faixa de domínio comum;
- curva com necessidade de visibilidade;
- entorno operacional.

### RF06 - Enviar imagem para análise
O sistema deve permitir envio dos dados e da imagem para um serviço de análise.

### RF07 - Exibir recomendação
O sistema deve exibir o resultado da análise com status:
- Cortar
- Não cortar

### RF08 - Exibir justificativa
O sistema deve exibir uma justificativa resumida para a recomendação, com base em regra operacional ou resultado do modelo.

### RF09 - Salvar histórico local
O sistema deve armazenar localmente inspeções realizadas no protótipo.

### RF10 - Consultar histórico
O sistema deve permitir que o usuário visualize uma lista de inspeções anteriores.

### RF11 - Visualizar detalhe da inspeção
O sistema deve permitir abrir uma inspeção para ver foto, localização, metadados e resultado.

### RF12 - Compartilhar ou encaminhar análise
O sistema deve permitir encaminhar o resultado para supervisão em versão futura.

## 6. Requisitos Não Funcionais (RNF)
### RNF01 - Usabilidade
A interface deve ser simples, intuitiva e adequada para uso rápido em campo.

### RNF02 - Performance
A navegação entre as telas deve ocorrer sem travamentos perceptíveis.

### RNF03 - Compatibilidade
A solução deve funcionar em Android e iOS.

### RNF04 - Disponibilidade offline parcial
O protótipo deve prever armazenamento local de registros quando não houver conectividade.

### RNF05 - Segurança
A solução deve prever autenticação e proteção mínima de dados em versões posteriores.

### RNF06 - Escalabilidade
A arquitetura deve permitir futura integração com API e modelo de IA.

### RNF07 - Auditabilidade
Cada análise deve manter evidência mínima: imagem, data, contexto do trecho e recomendação.

### RNF08 - Manutenibilidade
O projeto deve possuir estrutura de código organizada e documentação clara.

## 7. Regras de Negócio do Recorte
### RN01
A recomendação deve considerar o tipo de área analisada.

### RN02
O aplicativo não executa corte automaticamente; ele apoia a tomada de decisão.

### RN03
O resultado deve ser apresentado com clareza para facilitar validação por operador e supervisor.

### RN04
O histórico deve preservar evidências mínimas da inspeção.

## 8. Restrições Técnicas Identificadas
- o modelo de IA ainda não estará integrado nesta sprint;
- o protótipo navegável pode utilizar simulação de análise para validar fluxo;
- o uso de câmera e localização depende de permissões do dispositivo;
- a precisão do classificador futuro dependerá da qualidade do dataset;
- para o MVP, pode ser necessário restringir a análise a um tipo de área mais controlado.

## 9. Critérios de Aceite da Sprint 1
A sprint será considerada concluída se houver:
- README completo no repositório;
- documento de requisitos;
- persona definida;
- stack tecnológica justificada;
- protótipo navegável cobrindo as telas principais;
- estrutura de repositório pronta para evolução.

## 10. Decisão de Escopo
Para reduzir risco e aumentar a chance de entrega dentro do prazo acadêmico, o app focará inicialmente em **apoio à decisão de corte**, e não em automação operacional completa.
