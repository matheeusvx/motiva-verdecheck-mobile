import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { useInspection } from '../contexts/InspectionContext';
import { evaluateInspection } from '../utils/mockAnalysis';
import { colors } from '../utils/theme';

export default function ResultScreen({ navigation }) {
  const { draft, saveInspection, resetDraft } = useInspection();

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
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Diagnóstico da IA</Text>
          <Text style={styles.subtitle}>
            Resultado da inferência visual e verificação dos parâmetros da CCR.
          </Text>
        </View>

        {/* Card Principal de Veredito */}
        <View style={[
          styles.verdictCard, 
          isCut ? styles.verdictCardCut : styles.verdictCardOk
        ]}>
          <View style={styles.verdictHeader}>
            <View style={[
              styles.verdictBadge,
              isCut ? styles.verdictBadgeCut : styles.verdictBadgeOk
            ]}>
              <Text style={[
                styles.verdictBadgeText,
                isCut ? styles.verdictBadgeTextCut : styles.verdictBadgeTextOk
              ]}>
                {isCut ? 'RECOMENDAÇÃO: CORTAR' : 'RECOMENDAÇÃO: NÃO CORTAR'}
              </Text>
            </View>
            <Ionicons 
              name={isCut ? 'warning' : 'checkmark-circle'} 
              size={24} 
              color={isCut ? colors.error : colors.success} 
            />
          </View>

          <Text style={[
            styles.verdictTitle,
            { color: isCut ? '#991B1B' : '#166534' }
          ]}>
            {isCut ? 'Intervenção Necessária' : 'Vegetação Conforme'}
          </Text>

          <Text style={[
            styles.verdictDesc,
            { color: isCut ? '#7F1D1D' : '#14532D' }
          ]}>
            {evaluation.justification}
          </Text>
        </View>

        {/* Evidência Fotográfica Avaliada */}
        {draft.imageUri ? (
          <View style={styles.evidenceCard}>
            <Image source={{ uri: draft.imageUri }} style={styles.evidenceThumb} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={styles.evidenceTitle}>Evidência Analisada</Text>
              <Text style={styles.evidenceSubtitle}>
                Confiança do modelo: <Text style={{ fontWeight: '700', color: colors.primary }}>{confidenceFormatted}</Text>
              </Text>
            </View>
            <Ionicons name="shield-checkmark" size={22} color={colors.primary} />
          </View>
        ) : null}

        {/* Tabela de Parâmetros Técnicos */}
        <View style={styles.paramsCard}>
          <Text style={styles.paramsTitle}>Parâmetros Verificados</Text>

          <View style={styles.paramRow}>
            <Text style={styles.paramLabel}>Rodovia / KM</Text>
            <Text style={styles.paramValue}>{draft.road} — KM {draft.km}</Text>
          </View>

          <View style={styles.paramRow}>
            <Text style={styles.paramLabel}>Sentido Operacional</Text>
            <Text style={styles.paramValue}>{draft.direction}</Text>
          </View>

          <View style={styles.paramRow}>
            <Text style={styles.paramLabel}>Segmento Viário</Text>
            <Text style={styles.paramValue}>{evaluation.label}</Text>
          </View>

          <View style={styles.paramRow}>
            <Text style={styles.paramLabel}>Altura Medida</Text>
            <Text style={[
              styles.paramValue, 
              { color: isCut ? colors.error : colors.success, fontWeight: '800' }
            ]}>
              {evaluation.height} cm
            </Text>
          </View>

          <View style={[styles.paramRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.paramLabel}>Tolerância Máxima</Text>
            <Text style={styles.paramValue}>Até {evaluation.limit} cm</Text>
          </View>
        </View>

        {/* Botão Finalizar */}
        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={handleFinish}
          activeOpacity={0.85}
        >
          <Text style={styles.finishButtonText}>Salvar no Histórico e Concluir</Text>
          <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 40 
  },
  header: { 
    marginBottom: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 14, 
    color: colors.textMuted, 
    marginTop: 4, 
    lineHeight: 20 
  },
  verdictCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
  },
  verdictCardCut: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  verdictCardOk: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  verdictHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verdictBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verdictBadgeCut: {
    backgroundColor: '#FEE2E2',
  },
  verdictBadgeOk: {
    backgroundColor: '#DCFCE7',
  },
  verdictBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verdictBadgeTextCut: {
    color: '#991B1B',
  },
  verdictBadgeTextOk: {
    color: '#166534',
  },
  verdictTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  verdictDesc: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  evidenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  evidenceThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  evidenceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  evidenceSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  paramsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paramsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  paramLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  paramValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
