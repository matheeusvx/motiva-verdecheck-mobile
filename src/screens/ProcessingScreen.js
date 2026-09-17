import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { colors } from '../utils/theme';

export default function ProcessingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Result');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Spinner Moderno */}
        <View style={styles.spinnerWrapper}>
          <View style={styles.spinnerOuter}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>

        <Text style={styles.title}>Analisando Vegetação</Text>
        <Text style={styles.subtitle}>
          O modelo de visão computacional está processando a imagem para classificar a conformidade do trecho.
        </Text>

        {/* Etapas Visuais */}
        <View style={styles.stepsCard}>
          <View style={styles.stepItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <Text style={styles.stepTextActive}>Segmentação da imagem realizada</Text>
          </View>
          <View style={styles.stepItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <Text style={styles.stepTextActive}>Altura da vegetação estimada</Text>
          </View>
          <View style={styles.stepItem}>
            <ActivityIndicator size="small" color={colors.primary} style={{ width: 18 }} />
            <Text style={styles.stepTextProcessing}>Comparando com regras de corte CCR...</Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>INTELIGÊNCIA ARTIFICIAL ATIVA</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  spinnerWrapper: {
    marginBottom: 24,
  },
  spinnerOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textMuted,
    lineHeight: 20,
    fontSize: 14,
    marginBottom: 28,
  },
  stepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  stepTextProcessing: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
