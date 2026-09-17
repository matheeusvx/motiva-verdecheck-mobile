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
import { colors } from '../utils/theme';

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
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color={colors.textMuted} />
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
            <Text style={styles.imageBadgeText}>EVIDÊNCIA EM CAMPO</Text>
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
            <Ionicons name="analytics-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Diagnóstico Computacional</Text>
          </View>
          
          <Text style={styles.justificationText}>
            {item.justification || 'Análise de conformidade operacional realizada com base nas normas CCR.'}
          </Text>

          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>Confiança da Inferência</Text>
            <Text style={styles.confidenceValue}>{confidencePercent}%</Text>
          </View>
        </View>

        {/* Card: Dados Técnicos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="list-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Parâmetros do Trecho</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sentido da Via</Text>
            <Text style={styles.detailValue}>{item.direction || '-'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Segmento Viário</Text>
            <Text style={styles.detailValue}>{item.areaLabel || item.areaType || '-'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Altura Registrada</Text>
            <Text style={[styles.detailValue, { fontWeight: '800' }]}>
              {item.estimatedHeight ? `${item.estimatedHeight} cm` : '-'}
            </Text>
          </View>
        </View>

        {/* Card: Observações */}
        {item.notes ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="document-text-outline" size={18} color={colors.primary} />
              <Text style={styles.cardTitle}>Observações do Inspetor</Text>
            </View>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        ) : null}

        {/* Botão Compartilhar */}
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={handleShare}
          activeOpacity={0.85}
        >
          <Ionicons name="share-social-outline" size={18} color={colors.primary} />
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
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
  imageBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  justificationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 12,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  confidenceLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  confidenceValue: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '800',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  notesText: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 6,
  },
  shareButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
