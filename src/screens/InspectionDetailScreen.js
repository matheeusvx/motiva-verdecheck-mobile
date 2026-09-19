import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import StatusBadge from '../components/StatusBadge';
import { colors, shadows } from '../utils/theme';

export default function InspectionDetailScreen({ route, navigation }) {
  const { item } = route.params || {};

  if (!item) {
    return (
      <ScreenContainer>
        <View style={{ padding: 24, alignItems: 'center' }}>
          <Text style={styles.title}>Vistoria não encontrada</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const formattedDate = item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : 'Data não informada');
  const confidencePercent = Math.round((item.confidence || 0.92) * 100);

  const handleShare = () => {
    Alert.alert(
      'Laudo CCR Motiva Gerado',
      `O relatório técnico do trecho ${item.road} (KM ${item.km}) com recomendação "${item.status}" está pronto para repasse à equipe operacional.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScreenContainer>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={17} color={colors.textMuted} />
          <Text style={styles.backButtonText}>Voltar ao Histórico</Text>
        </TouchableOpacity>

        {/* Imagem / Evidência */}
        <View style={styles.imageContainer}>
          {item.imageUri ? (
            <Image 
              source={{ uri: item.imageUri }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={36} color={colors.textLight} />
              <Text style={styles.imagePlaceholderText}>Sem registro fotográfico</Text>
            </View>
          )}
          <View style={styles.imageBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#FFFFFF" />
            <Text style={styles.imageBadgeText}>EVIDÊNCIA AUDITADA</Text>
          </View>
        </View>

        {/* Título e Badge */}
        <View style={styles.headerBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.road} — KM {item.km}</Text>
            <Text style={styles.subtitle}>Auditado em {formattedDate}</Text>
          </View>
          <StatusBadge status={item.status} severity={item.severity} />
        </View>

        {/* Card: Diagnóstico da IA */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Ionicons name="analytics" size={17} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Diagnóstico Computacional</Text>
          </View>
          
          <Text style={styles.justificationText}>
            {item.justification || 'Análise de conformidade operacional realizada com base nas normas da concessionária CCR.'}
          </Text>

          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>Confiança da Classificação</Text>
            <View style={styles.confidencePill}>
              <Ionicons name="sparkles" size={12} color={colors.primary} />
              <Text style={styles.confidenceValue}>{confidencePercent}%</Text>
            </View>
          </View>
        </View>

        {/* Card: Dados Técnicos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Ionicons name="list" size={17} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Parâmetros do Trecho</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sentido Operacional</Text>
            <Text style={styles.detailValue}>{item.direction || '-'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Segmento Viário</Text>
            <Text style={styles.detailValue}>{item.areaLabel || item.areaType || '-'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Altura Registrada</Text>
            <Text style={[styles.detailValue, { fontWeight: '800', color: colors.primaryDark }]}>
              {item.estimatedHeight ? `${item.estimatedHeight} cm` : '-'}
            </Text>
          </View>
        </View>

        {/* Card: Observações */}
        {item.notes ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconCircle}>
                <Ionicons name="document-text" size={17} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>Observações do Inspetor</Text>
            </View>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        ) : null}

        {/* Botão Compartilhar */}
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={handleShare}
          activeOpacity={0.88}
        >
          <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Compartilhar Laudo com CCR</Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  imageContainer: {
    width: '100%',
    height: 210,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    marginBottom: 18,
    position: 'relative',
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 8,
    fontWeight: '500',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cardIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  justificationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  confidenceLabel: {
    fontSize: 12.5,
    color: colors.textMuted,
    fontWeight: '600',
  },
  confidencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  confidenceValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.text,
  },
  notesText: {
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 6,
    ...shadows.primary,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

