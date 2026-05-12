import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import StatusBadge from '../components/StatusBadge';
import { useInspection } from '../contexts/InspectionContext';
import { evaluateInspection } from '../utils/mockAnalysis';
import { colors } from '../utils/theme';

const areaLabels = {
  area_nobre: 'Área nobre',
  faixa_comum: 'Faixa de domínio comum',
  curva_visibilidade: 'Curva com visibilidade',
  entorno_operacional: 'Entorno operacional'
};

export default function ResultScreen({ navigation }) {
  const { draft, saveInspection, resetDraft } = useInspection();
  const result = evaluateInspection(draft);
  const status = result.shouldCut ? 'Cortar' : 'Não cortar';

  const handleSave = async () => {
    await saveInspection({
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      road: draft.road,
      km: draft.km,
      direction: draft.direction,
      areaType: draft.areaType,
      areaLabel: areaLabels[draft.areaType] ?? 'Área não informada',
      notes: draft.notes,
      estimatedHeight: draft.estimatedHeight,
      status,
      confidence: result.confidence,
      justification: result.justification,
      imageUri: draft.imageUri || 'mock://vegetation-image'
    });
    resetDraft();
    navigation.navigate('Histórico', { screen: 'HistoryList' });
  };

  return (
    <ScreenContainer>
      <View style={styles.imageMock}>
        <Text style={styles.imageMockText}>Imagem do trecho</Text>
      </View>

      <StatusBadge status={status} />
      <Text style={styles.title}>{status}</Text>
      <Text style={styles.confidence}>Confiança estimada: {(result.confidence * 100).toFixed(0)}%</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Justificativa</Text>
        <Text style={styles.cardText}>{result.justification}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo do trecho</Text>
        <Text style={styles.cardText}>Rodovia: {draft.road || '-'}</Text>
        <Text style={styles.cardText}>KM: {draft.km || '-'}</Text>
        <Text style={styles.cardText}>Sentido: {draft.direction || '-'}</Text>
        <Text style={styles.cardText}>Área: {areaLabels[draft.areaType] ?? '-'}</Text>
      </View>

      <PrimaryButton label="Salvar inspeção" onPress={handleSave} />
      <PrimaryButton label="Nova análise" variant="secondary" onPress={() => navigation.popToTop()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  imageMock: {
    backgroundColor: '#DDD6FE',
    height: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  imageMockText: {
    color: colors.primaryDark,
    fontWeight: '700'
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4
  },
  confidence: {
    color: colors.textMuted,
    marginBottom: 18
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  cardTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    fontSize: 16
  },
  cardText: {
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 4
  }
});
