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
import { colors, shadows } from '../utils/theme';

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
          <View style={styles.badgeSuccess}>
            <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
            <Text style={styles.badgeSuccessText}>INSPEÇÃO CONCLUÍDA</Text>
          </View>
          <Text style={styles.title}>Diagnóstico da IA</Text>
          <Text style={styles.subtitle}>
            Resultado da inferência visual e verificação dos parâmetros técnicos da CCR.
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
              <View style={[styles.verdictDot, { backgroundColor: isCut ? colors.error : colors.success }]} />
              <Text style={[
                styles.verdictBadgeText,
                isCut ? styles.verdictBadgeTextCut : styles.verdictBadgeTextOk
              ]}>
                {isCut ? 'RECOMENDAÇÃO: CORTAR' : 'RECOMENDAÇÃO: NÃO CORTAR'}
              </Text>
            </View>
            <View style={[styles.verdictIconCircle, { backgroundColor: isCut ? colors.errorBg : colors.successBg }]}>
              <Ionicons 
                name={isCut ? 'alert-circle' : 'checkmark-circle'} 
                size={22} 
                color={isCut ? colors.error : colors.success} 
              />
            </View>
          </View>

          <Text style={[
            styles.verdictTitle,
            { color: isCut ? '#991B1B' : '#065F46' }
          ]}>
            {isCut ? 'Intervenção Necessária' : 'Vegetação em Conformidade'}
          </Text>

          <Text style={[
            styles.verdictDesc,
            { color: isCut ? '#7F1D1D' : '#047857' }
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
              <View style={styles.confidenceRow}>
                <Ionicons name="sparkles" size={13} color={colors.primary} />
                <Text style={styles.evidenceSubtitle}>
                  Confiança do modelo: <Text style={{ fontWeight: '800', color: colors.primaryDark }}>{confidenceFormatted}</Text>
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Tabela de Parâmetros Técnicos */}
        <View style={styles.paramsCard}>
          <View style={styles.paramsHeader}>
            <Ionicons name="receipt-outline" size={18} color={colors.primary} />
            <Text style={styles.paramsTitle}>Parâmetros Verificados</Text>
          </View>

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
            <Text style={styles.paramLabel}>Altura Calculada</Text>
            <View style={[styles.heightBadge, { backgroundColor: isCut ? colors.errorBg : colors.successBg }]}>
              <Text style={[
                styles.heightBadgeText, 
                { color: isCut ? colors.error : colors.success }
              ]}>
                {evaluation.height} cm
              </Text>
            </View>
          </View>

          <View style={[styles.paramRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.paramLabel}>Tolerância Máxima CCR</Text>
            <Text style={styles.paramValue}>Até {evaluation.limit} cm</Text>
          </View>
        </View>

        {/* Botão Finalizar */}
        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={handleFinish}
          activeOpacity={0.88}
        >
          <Text style={styles.finishButtonText}>Salvar no Histórico e Concluir</Text>
          <Ionicons name="checkmark-circle" size={19} color="#FFFFFF" />
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
    marginBottom: 18 
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.successBorder,
    gap: 5,
    marginBottom: 8,
  },
  badgeSuccessText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 13.5, 
    color: colors.textMuted, 
    marginTop: 4, 
    lineHeight: 19 
  },
  verdictCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    ...shadows.sm,
  },
  verdictCardOk: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  verdictCardCut: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  verdictHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    gap: 6,
  },
  verdictBadgeOk: {
    backgroundColor: '#DCFCE7',
  },
  verdictBadgeCut: {
    backgroundColor: '#FEE2E2',
  },
  verdictDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  verdictBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verdictBadgeTextOk: {
    color: '#166534',
  },
  verdictBadgeTextCut: {
    color: '#991B1B',
  },
  verdictIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verdictTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  verdictDesc: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
  },
  evidenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 14,
    ...shadows.sm,
  },
  evidenceThumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#0F172A',
  },
  evidenceTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  evidenceSubtitle: {
    fontSize: 12.5,
    color: colors.textMuted,
  },
  paramsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  paramsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  paramsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  paramLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  paramValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.text,
  },
  heightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  heightBadgeText: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    ...shadows.primary,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

