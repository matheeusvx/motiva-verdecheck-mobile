import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInspection } from '../contexts/InspectionContext';
import { colors, shadows } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const { history, user, logoutUser } = useInspection();

  const totalCount = history ? history.length : 0;
  const criticalCount = history ? history.filter(item => 
    item.status === 'Cortar' || item.status === 'Crítico' || item.severity === 'Crítico'
  ).length : 0;
  const okCount = totalCount - criticalCount;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn('Erro ao deslogar', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho do Inspetor */}
        <View style={styles.header}>
          <View>
            <View style={styles.statusOnlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>OPERACIONAL • CONECTADO</Text>
            </View>
            <Text style={styles.greeting}>Olá, {user?.name || 'Inspetor'}</Text>
            <Text style={styles.userRole}>Supervisão CCR Motiva</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{(user?.name || 'I').charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {/* Resumo Rápido das Vistorias - Dashboard Micro-tiles */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconDot, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="folder-outline" size={15} color={colors.textSecondary} />
            </View>
            <Text style={styles.summaryNumber}>{totalCount}</Text>
            <Text style={styles.summaryLabel}>Total salvas</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconDot, { backgroundColor: colors.errorBg }]}>
              <Ionicons name="alert-circle-outline" size={15} color={colors.error} />
            </View>
            <Text style={[styles.summaryNumber, { color: colors.error }]}>{criticalCount}</Text>
            <Text style={styles.summaryLabel}>Requer corte</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconDot, { backgroundColor: colors.successBg }]}>
              <Ionicons name="checkmark-circle-outline" size={15} color={colors.success} />
            </View>
            <Text style={[styles.summaryNumber, { color: colors.success }]}>{okCount}</Text>
            <Text style={styles.summaryLabel}>Conformes</Text>
          </View>
        </View>

        {/* Seção de Ação Principal */}
        <Text style={styles.sectionHeader}>AÇÕES RÁPIDAS DE CAMPO</Text>

        {/* Hero Card: Nova Vistoria com IA */}
        <TouchableOpacity 
          style={styles.heroActionCard}
          onPress={() => navigation.navigate('Nova Análise')}
          activeOpacity={0.9}
        >
          <View style={styles.heroActionTop}>
            <View style={styles.heroIconCircle}>
              <Ionicons name="scan" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>IA COMPUTACIONAL</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Nova Vistoria de Campo</Text>
          <Text style={styles.heroSubtitle}>
            Fotografe a grama na faixa de domínio e receba o diagnóstico instantâneo de roçada.
          </Text>

          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Iniciar Vistoria Agora</Text>
            <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Ação Secundária: Histórico */}
        <TouchableOpacity 
          style={styles.secondaryCard}
          onPress={() => navigation.navigate('Histórico')}
          activeOpacity={0.85}
        >
          <View style={styles.secondaryHeader}>
            <View style={styles.secondaryIconCircle}>
              <Ionicons name="document-text-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secondaryTitle}>Histórico de Vistorias</Text>
              <Text style={styles.secondarySubtitle}>Consulte laudos, imagens e dados salvos</Text>
            </View>
            <View style={styles.chevronCircle}>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Card Informativo de Conformidade CCR */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={colors.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoCardTitle}>Padrão Normativo CCR</Text>
            <Text style={styles.infoCardText}>
              Áreas nobres: máx 30cm • Faixa comum: máx 40cm • Encostas: máx 60cm.
            </Text>
          </View>
        </View>

        {/* Botão de Logout Discreto */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout} 
          activeOpacity={0.75}
        >
          <Ionicons name="log-out-outline" size={17} color={colors.textMuted} />
          <Text style={styles.logoutText}>Encerrar Sessão do Inspetor</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  statusOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.6,
  },
  userRole: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 1,
    fontWeight: '500',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  avatarLetter: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '800',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryIconDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  summaryDivider: {
    width: 1,
    height: '65%',
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 2,
  },
  heroActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: colors.successBorder,
    ...shadows.md,
  },
  heroActionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.successBorder,
    gap: 5,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  heroBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 19,
    marginBottom: 18,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    ...shadows.primary,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  secondaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  secondaryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: colors.text,
  },
  secondarySubtitle: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.secondaryLight,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  infoCardTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 2,
  },
  infoCardText: {
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 17,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
});




