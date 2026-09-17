export function evaluateInspection({ areaType, estimatedHeight }) {
  const height = Number(estimatedHeight || 0);

  const limits = {
    area_nobre: 10,
    canteiro_central: 20,
    curva_visibilidade: 20,
    faixa_comum: 30,
    encosta: 40,
    entorno_operacional: 10
  };

  const labels = {
    area_nobre: 'Área Nobre (Trevos e Acessos)',
    canteiro_central: 'Canteiro Central',
    curva_visibilidade: 'Curva / Visibilidade',
    faixa_comum: 'Faixa de Domínio Comum',
    encosta: 'Encosta / Talude',
    entorno_operacional: 'Entorno Operacional'
  };

  const limit = limits[areaType] ?? 30;
  const shouldCut = height > limit;
  const label = labels[areaType] ?? 'Faixa de Domínio';
  
  // Nível de severidade e status padronizado
  let severity = 'Conforme';
  if (shouldCut) {
    severity = height > limit * 1.8 ? 'Crítico' : 'Atenção';
  }

  const confidence = shouldCut ? (severity === 'Crítico' ? 0.94 : 0.89) : 0.92;

  const status = shouldCut ? 'Cortar' : 'Não cortar';

  return {
    shouldCut,
    status,
    severity,
    limit,
    height,
    confidence,
    label,
    justification: shouldCut
      ? `A altura detectada (${height} cm) ultrapassa a tolerância máxima de ${limit} cm para ${label}. Necessária intervenção de roçada.`
      : `A altura detectada (${height} cm) está dentro da tolerância de até ${limit} cm para ${label}. Vegetação em conformidade.`
  };
}

