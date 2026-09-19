import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { colors, shadows } from '../utils/theme';

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
        
        {/* Anel de Processamento Moderno com Glow */}
        <View style={styles.spinnerOuterRing}>
          <View style={styles.spinnerMiddleRing}>
            <View style={styles.spinnerCore}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Analisando Vegetação</Text>
        <Text style={styles.subtitle}>
          O modelo de visão computacional está processando a imagem e calculando a altura média em campo.
        </Text>

        {/* Etapas Visuais de Auditoria CCR */}
        <View style={styles.stepsCard}>
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircleDone}>
              <Ionicons name="checkmark" size={14} color={colors.primary} />
            </View>
            <Text style={styles.stepTextActive}>Segmentação e detecção da vegetação</Text>
          </View>

          <View style={styles.stepDivider} />

          <View style={styles.stepItem}>
            <View style={styles.stepIconCircleDone}>
              <Ionicons name="checkmark" size={14} color={colors.primary} />
            </View>
            <Text style={styles.stepTextActive}>Estimativa de altura calculada</Text>
          </View>

          <View style={styles.stepDivider} />

          <View style={styles.stepItem}>
            <View style={styles.stepIconCirclePending}>
              <ActivityIndicator size="small" color={colors.primary} style={{ transform: [{ scale: 0.75 }] }} />
            </View>
            <Text style={styles.stepTextProcessing}>Verificando limites normativos CCR...</Text>
          </View>
        </View>

        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>INFERÊNCIA NEURAL CCR MOTIVA</Text>
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
  spinnerOuterRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(5, 150, 105, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  spinnerMiddleRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  spinnerCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textMuted,
    lineHeight: 20,
    fontSize: 13.5,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  stepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 24,
    ...shadows.sm,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIconCircleDone: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconCirclePending: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDivider: {
    height: 14,
    width: 1.5,
    backgroundColor: colors.borderLight,
    marginLeft: 11,
    marginVertical: 2,
  },
  stepTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  stepTextProcessing: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
});

