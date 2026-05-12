import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const { history } = useInspection();
  const todayCount = history.filter(item => {
    const today = new Date().toDateString();
    return new Date(item.createdAt).toDateString() === today;
  }).length;

  const last = history[0];

  return (
    <ScreenContainer>
      <Text style={styles.title}>Olá, Lucas</Text>
      <Text style={styles.subtitle}>Acompanhe inspeções e registre novas análises em campo.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Inspeções do dia</Text>
        <Text style={styles.heroValue}>{todayCount}</Text>
        <Text style={styles.heroHint}>Use o app para padronizar a decisão de corte.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nova análise</Text>
        <Text style={styles.cardText}>Registre rodovia, km, tipo de área e foto do trecho.</Text>
        <PrimaryButton label="Iniciar" onPress={() => navigation.navigate('Análise', { screen: 'NewInspection' })} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico</Text>
        <Text style={styles.cardText}>Consulte inspeções anteriores e evidências salvas.</Text>
        <PrimaryButton label="Abrir histórico" variant="secondary" onPress={() => navigation.navigate('Histórico', { screen: 'HistoryList' })} />
      </View>

      {last ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Último resultado</Text>
          <Text style={styles.cardText}>{last.status} - {last.road} km {last.km}</Text>
          <Text style={styles.small}>Área: {last.areaLabel}</Text>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginBottom: 20
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18
  },
  heroLabel: {
    color: '#DDD6FE',
    fontSize: 14
  },
  heroValue: {
    color: '#FFF',
    fontSize: 38,
    fontWeight: '800',
    marginVertical: 8
  },
  heroHint: {
    color: '#F5F3FF'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6
  },
  cardText: {
    color: colors.textMuted,
    lineHeight: 20
  },
  small: {
    marginTop: 10,
    color: colors.textMuted
  }
});
