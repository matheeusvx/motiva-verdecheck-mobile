# Handoff para Protótipo Navegável no Figma

## Objetivo
Criar um protótipo de alta fidelidade para o app **Motiva VerdeCheck Mobile**, com foco em inspeção de vegetação e apoio à decisão de corte.

## Estilo visual
- **Formato:** mobile
- **Plataforma visual:** iPhone 14 / frame 390x844 ou equivalente
- **Estética:** profissional, limpa, operacional e tecnológica
- **Cores principais:**
  - Roxo principal: `#6D28D9`
  - Roxo escuro: `#4C1D95`
  - Verde sucesso: `#10B981`
  - Vermelho alerta: `#EF4444`
  - Cinza claro: `#F3F4F6`
  - Texto principal: `#111827`
- **Tipografia sugerida:** Inter / SF Pro / similar
- **Tom:** objetivo, corporativo e fácil de usar em campo

## Fluxo do protótipo
### Tela 1 - Login
Elementos:
- logo do projeto
- título "Motiva VerdeCheck"
- subtítulo curto
- campo e-mail
- campo senha
- botão "Entrar"

### Tela 2 - Home
Elementos:
- saudação ao operador
- card "Nova análise"
- card "Histórico"
- card "Inspeções do dia"
- atalho para "Último resultado"

### Tela 3 - Nova análise
Campos:
- rodovia
- km
- sentido
- tipo de área
- observações
- botão "Continuar"

### Tela 4 - Captura de imagem
Elementos:
- área simulando câmera
- botão "Tirar foto"
- botão "Escolher da galeria"
- indicador do trecho preenchido
- botão "Analisar"

### Tela 5 - Processamento
Elementos:
- loader central
- texto "Analisando vegetação..."
- subtítulo "Aguarde alguns segundos"

### Tela 6 - Resultado
Elementos:
- foto do trecho
- status visual grande: "Cortar" ou "Não cortar"
- indicador de confiança
- justificativa curta
- resumo do trecho (rodovia, km, sentido, tipo de área)
- botão "Salvar inspeção"
- botão "Nova análise"

### Tela 7 - Histórico
Elementos:
- busca
- filtros por status
- cards de inspeção com miniatura, data, rodovia e status

### Tela 8 - Detalhe da inspeção
Elementos:
- imagem
- dados completos do trecho
- resultado
- justificativa
- botão "Compartilhar"

## Componentes reutilizáveis
- header padrão
- cards com sombra suave
- botão principal roxo
- badge de status
- campo de formulário com label
- item de lista para histórico

## Navegação do protótipo
- Login -> Home
- Home -> Nova análise
- Nova análise -> Captura de imagem
- Captura de imagem -> Processamento
- Processamento -> Resultado
- Resultado -> Histórico ou Nova análise
- Histórico -> Detalhe da inspeção

## Critérios de qualidade do protótipo
- todas as telas devem possuir consistência visual;
- os botões principais devem estar prototipados;
- o fluxo deve ser navegável do início ao fim;
- o resultado deve deixar clara a decisão de corte;
- o usuário deve perceber que a solução é mobile e voltada para uso em campo.
