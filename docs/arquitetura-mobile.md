# Arquitetura Mobile Proposta

## 1. Visão Geral
A arquitetura proposta separa claramente:
- **cliente mobile** em React Native + Expo;
- **serviço de análise** futuro em Python;
- **armazenamento local** para funcionamento inicial do protótipo.

## 2. Camadas
### 2.1 Camada de apresentação
Telas do aplicativo e componentes reutilizáveis.

### 2.2 Camada de fluxo
Responsável pela navegação entre telas e estado da inspeção atual.

### 2.3 Camada de persistência local
Armazena histórico de inspeções em AsyncStorage.

### 2.4 Camada de serviços
Responsável por integrar, futuramente, com câmera, geolocalização e API de análise.

## 3. Estrutura sugerida
- `src/screens`: telas do aplicativo
- `src/navigation`: stacks e tabs
- `src/components`: componentes reutilizáveis
- `src/contexts`: contexto global da inspeção
- `src/utils`: regras utilitárias e mock de resultado

## 4. Fluxo técnico da inspeção
1. usuário preenche contexto do trecho;
2. usuário captura ou escolhe imagem;
3. dados são enviados para função de análise;
4. resultado é exibido na tela;
5. inspeção é salva no histórico.

## 5. Evolução futura
- integração com API REST externa;
- autenticação real;
- armazenamento em nuvem;
- geolocalização automática;
- classificação de vegetação com modelo de visão computacional.
