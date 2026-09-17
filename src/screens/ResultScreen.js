// src/screens/ResultScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { evaluateInspection } from '../utils/mockAnalysis';
import { colors } from '../utils/theme';

export default function ResultScreen({ navigation }) {
  const { draft, saveInspection, resetDraft } = useInspection();

  // Avaliação baseada no segmento e na altura informada
  const evaluation = evaluateInspection(draft);
  const isCut = evaluation.shouldCut;
  const confidenceFormatted = `${Math.round(evaluation.confidence * 100)}%`;

  const handleFinish = async () => {
    const record = {
      id: String(Date.now()),
      road: draft.road,
      km: draft.km,
      direction: draft.direction,
      areaType: draft.areaType,
      areaLabel: evaluation.label,
      status: evaluation.status,
      severity: evaluation.severity,
      estimatedHeight: String(evaluation.height),
      confidence: evaluation.confidence,
      justification: evaluation.justification,
      notes: draft.notes,
      imageUri: draft.imageUri,
      date: new Date().toLocaleDateString('pt-BR'),
    };

    await saveInspection(record);
    resetDraft();
    navigation.navigate('Início');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.title}>Diagnóstico</Text>
        <Text style={styles.subtitle}>Resultado da inferência de visão computacional.</Text>

        {/* Card de Resultado Dinâmico (Cortar / Não Cortar) */}
        <View style={[
          styles.resultCard, 
          isCut ? styles.resultCardCut : styles.resultCardOk
        ]}>
          <View style={styles.badgeRow}>
            <View style={[
              styles.statusBadge, 
              isCut ? styles.statusBadgeCut : styles.statusBadgeOk
            ]}>
              <Text style={[
                styles.statusBadgeText,
                isCut ? styles.statusBadgeTextCut : styles.statusBadgeTextOk
              ]}>
                {isCut ? `RECOMENDAÇÃO: ${evaluation.status.toUpperCase()}` : `RECOMENDAÇÃO: ${evaluation.status.toUpperCase()}`}
              </Text>
            </View>
            <Text style={styles.severityTag}>
              {evaluation.severity.toUpperCase()}
            </Text>
          </View>

          <Text style={[
            styles.resultValue, 
            { color: isCut ? (colors.error || '#DC2626') : (colors.success || '#16A34A') }
          ]}>
            {isCut ? 'Intervenção Exigida' : 'Vegetação Conforme'}
          </Text>

          <View style={[
            styles.divider, 
            { backgroundColor: isCut ? '#FCA5A5' : '#86EFAC' }
          ]} />

          <Text style={[
            styles.resultDesc, 
            { color: isCut ? '#7F1D1D' : '#14532D' }
          ]}>
            {evaluation.justification}
          </Text>
        </View>

        {/* Mini Preview da Foto Analisada */}
        {draft.imageUri ? (
          <View style={styles.photoPreviewCard}>
            <Image source={{ uri: draft.imageUri }} style={styles.previewThumb} resizeMode="cover" />
            <View style={styles.previewInfo}>
              <Text style={styles.previewInfoTitle}>Evidência Fotográfica</Text>
              <Text style={styles.previewInfoSubtitle}>Processada pela rede neural</Text>
            </View>
            <Text style={styles.previewCheck}>✓</Text>
          </View>
        ) : null}

        {/* Detalhes Técnicos */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Parâmetros da Análise</Text>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Rodovia e KM</Text>
            <Text style={styles.dV}>{draft.road} — KM {draft.km}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Sentido</Text>
            <Text style={styles.dV}>{draft.direction}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Segmento Viário</Text>
            <Text style={styles.dV}>{evaluation.label}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Altura Detectada</Text>
            <Text style={styles.dV}>{evaluation.height} cm</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Limite Operacional</Text>
            <Text style={styles.dV}>Até {evaluation.limit} cm</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.dL}>Confiança do Diagnóstico</Text>
            <Text style={[styles.dV, { color: colors.primary }]}>{confidenceFormatted}</Text>
          </View>
        </View>

        <PrimaryButton label="Salvar e Concluir Inspeção" onPress={handleFinish} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 50 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 20 },
  resultCard: { 
    padding: 22, 
    borderRadius: 22, 
    borderWidth: 1.5, 
    marginBottom: 16 
  },
  resultCardCut: { 
    backgroundColor: '#FEF2F2', 
    borderColor: '#FCA5A5' 
  },
  resultCardOk: { 
    backgroundColor: '#F0FDF4', 
    borderColor: '#86EFAC' 
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusBadgeCut: { backgroundColor: '#FEE2E2' },
  statusBadgeOk: { backgroundColor: '#DCFCE7' },
  statusBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  statusBadgeTextCut: { color: '#991B1B' },
  statusBadgeTextOk: { color: '#166534' },
  severityTag: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  resultValue: { fontSize: 28, fontWeight: '800', marginTop: 12, marginBottom: 4 },
  divider: { height: 1, opacity: 0.4, marginVertical: 14 },
  resultDesc: { fontSize: 14, lineHeight: 22, fontWeight: '500' },
  photoPreviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16
  },
  previewThumb: { width: 54, height: 54, borderRadius: 10 },
  previewInfo: { flex: 1 },
  previewInfoTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  previewInfoSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  previewCheck: { fontSize: 18, color: colors.success, fontWeight: '800', marginRight: 8 },
  detailsCard: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: colors.border, 
    marginBottom: 24 
  },
  detailsTitle: { fontSize: 15, fontWeight: '800', marginBottom: 14, color: colors.text },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F8FAFC' 
  },
  dL: { color: colors.textMuted, fontSize: 13, fontWeight: '500' },
  dV: { fontWeight: '700', color: colors.text, fontSize: 13 }
});

