import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../utils/theme';

export default function InspectionDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <ScreenContainer>
      <View style={styles.imageMock}>
        <Text style={styles.imageMockText}>Imagem da inspeção</Text>
      </View>

      <StatusBadge status={item.status} />
      <Text style={styles.title}>{item.road} km {item.km}</Text>
      <Text style={styles.subtitle}>{new Date(item.createdAt).toLocaleString('pt-BR')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados do trecho</Text>
        <Text style={styles.cardText}>Sentido: {item.direction || '-'}</Text>
        <Text style={styles.cardText}>Área: {item.areaLabel}</Text>
        <Text style={styles.cardText}>Altura estimada: {item.estimatedHeight || '-'} cm</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Justificativa</Text>
        <Text style={styles.cardText}>{item.justification}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Observações</Text>
        <Text style={styles.cardText}>{item.notes || 'Sem observações registradas.'}</Text>
      </View>

      <PrimaryButton label="Compartilhar (futuro)" variant="secondary" onPress={() => {}} />
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
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4
  },
  subtitle: {
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
