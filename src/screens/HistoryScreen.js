import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import StatusBadge from '../components/StatusBadge';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const { history } = useInspection();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Histórico de inspeções</Text>
      <Text style={styles.subtitle}>Consulte análises registradas pela equipe.</Text>

      {history.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhuma inspeção salva</Text>
          <Text style={styles.emptyText}>Salve uma análise para visualizar o histórico.</Text>
        </View>
      ) : (
        history.map(item => (
          <Pressable key={item.id} style={styles.card} onPress={() => navigation.navigate('InspectionDetail', { item })}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardTitle}>{item.road} km {item.km}</Text>
                <Text style={styles.cardSubtitle}>{item.areaLabel}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
            <Text style={styles.meta}>Sentido: {item.direction || '-'}</Text>
            <Text style={styles.meta}>Data: {new Date(item.createdAt).toLocaleString('pt-BR')}</Text>
          </Pressable>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4
  },
  subtitle: {
    color: colors.textMuted,
    marginBottom: 20
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6
  },
  emptyText: {
    color: colors.textMuted
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text
  },
  cardSubtitle: {
    color: colors.textMuted,
    marginTop: 4
  },
  meta: {
    color: colors.textMuted,
    marginTop: 4
  }
});
