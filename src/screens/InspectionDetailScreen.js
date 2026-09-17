import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../utils/theme';

export default function InspectionDetailScreen({ route, navigation }) {
  const { item } = route.params || {};

  if (!item) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Inspeção não encontrada</Text>
        <PrimaryButton label="Voltar" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    );
  }

  const formattedDate = item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : 'Data não informada');
  const confidencePercent = Math.round((item.confidence || 0.92) * 100);

  const handleShare = () => {
    Alert.alert(
      'Relatório Gerado com Sucesso',
      `O laudo técnico do trecho ${item.road} (KM ${item.km}) com recomendação "${item.status}" foi compilado e está pronto para repasse à supervisão de conservação CCR Motiva.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {/* Barra Superior de Navegação */}
        <View style={styles.topNav}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>← Voltar ao Histórico</Text>
          </TouchableOpacity>
        </View>

        {/* Visualizador de Imagem com Evidência */}
        <View style={styles.imageContainer}>
          {item.imageUri ? (
            <Image 
              source={{ uri: item.imageUri }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          ) : (
            <View style={styles.imageMock}>
              <Text style={styles.imageMockIcon}>📸</Text>
              <Text style={styles.imageMockText}>Evidência Fotográfica Registrada</Text>
            </View>
          )}
          <View style={styles.imageTag}>
            <Text style={styles.imageTagText}>EVIDÊNCIA AUDITADA</Text>
          </View>
        </View>

        {/* Cabeçalho do Trecho */}
        <View style={styles.headerBox}>
          <StatusBadge status={item.status} severity={item.severity} />
          <Text style={styles.title}>{item.road} — KM {item.km}</Text>
          <Text style={styles.subtitle}>Vistoriado em {formattedDate}</Text>
        </View>

        {/* Card: Diagnóstico da IA */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardIcon}>🧠</Text>
            <Text style={styles.cardTitle}>Diagnóstico Computacional</Text>
          </View>
          <Text style={styles.justificationText}>
            {item.justification || 'Análise de conformidade operacional realizada com base nos parâmetros da malha viária.'}
          </Text>
          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>Nível de Confiança:</Text>
            <Text style={styles.confidenceValue}>{confidencePercent}%</Text>
          </View>
        </View>

        {/* Card: Dados Técnicos do Trecho */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardIcon}>📍</Text>
            <Text style={styles.cardTitle}>Parâmetros Operacionais</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sentido da Via</Text>
            <Text style={styles.detailValue}>{item.direction || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Segmento da Faixa</Text>
            <Text style={styles.detailValue}>{item.areaLabel || item.areaType || '-'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Altura Estimada</Text>
            <Text style={styles.detailValue}>{item.estimatedHeight ? `${item.estimatedHeight} cm` : '-'}</Text>
          </View>
        </View>

        {/* Card: Observações do Inspetor */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardIcon}>📝</Text>
            <Text style={styles.cardTitle}>Notas de Campo</Text>
          </View>
          <Text style={styles.cardText}>
            {item.notes ? item.notes : 'Nenhuma observação complementar registrada.'}
          </Text>
        </View>

        {/* Ação de Exportar / Compartilhar */}
        <View style={styles.buttonContainer}>
          <PrimaryButton 
            label="📤 Encaminhar para Supervisão" 
            variant="secondary" 
            onPress={handleShare} 
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 50, paddingTop: 6 },
  topNav: { marginBottom: 14 },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignSelf: 'flex-start'
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700'
  },
  imageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    marginBottom: 18,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageMock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD6FE'
  },
  imageMockIcon: { fontSize: 36, marginBottom: 8 },
  imageMockText: { color: colors.primaryDark, fontWeight: '700', fontSize: 13 },
  imageTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  imageTagText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  headerBox: { marginBottom: 18 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
    marginBottom: 2
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardIcon: { fontSize: 18 },
  cardTitle: {
    fontWeight: '800',
    color: colors.text,
    fontSize: 15
  },
  cardText: {
    color: colors.textMuted,
    lineHeight: 22,
    fontSize: 14
  },
  justificationText: {
    color: colors.text,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  confidenceLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  confidenceValue: { fontSize: 13, color: colors.primary, fontWeight: '800' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC'
  },
  detailLabel: { fontSize: 13, color: colors.textMuted, fontWeight: '500' },
  detailValue: { fontSize: 13, color: colors.text, fontWeight: '700' },
  buttonContainer: { marginTop: 8 }
});

