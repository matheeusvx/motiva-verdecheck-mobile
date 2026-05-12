export function evaluateInspection({ areaType, estimatedHeight }) {
  const height = Number(estimatedHeight || 0);

  const limits = {
    area_nobre: 10,
    faixa_comum: 30,
    curva_visibilidade: 20,
    entorno_operacional: 10
  };

  const labels = {
    area_nobre: 'Área nobre',
    faixa_comum: 'Faixa de domínio comum',
    curva_visibilidade: 'Curva com atenção à visibilidade',
    entorno_operacional: 'Entorno operacional'
  };

  const limit = limits[areaType] ?? 30;
  const shouldCut = height > limit;
  const confidence = shouldCut ? 0.91 : 0.87;

  return {
    shouldCut,
    limit,
    confidence,
    label: labels[areaType] ?? 'Área não informada',
    justification: shouldCut
      ? `A altura informada (${height} cm) ultrapassa o limite de ${limit} cm para ${labels[areaType] ?? 'a área selecionada'}.`
      : `A altura informada (${height} cm) está dentro do limite operacional de ${limit} cm para ${labels[areaType] ?? 'a área selecionada'}.`
  };
}
