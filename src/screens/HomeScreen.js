import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

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
            <Text style={styles.greeting}>Olá, {user?.name || 'Inspetor'}</Text>
            <Text style={styles.userRole}>Inspetor Operacional • CCR Motiva</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{(user?.name || 'I').charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {/* Resumo Rápido das Vistorias */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalCount}</Text>
            <Text style={styles.summaryLabel}>Total salvas</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.error }]}>{criticalCount}</Text>
            <Text style={styles.summaryLabel}>Para roçada</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.success }]}>{okCount}</Text>
            <Text style={styles.summaryLabel}>Conformes</Text>
          </View>
        </View>

        {/* Ação Principal: Nova Vistoria */}
        <TouchableOpacity 
          style={styles.heroActionCard}
          onPress={() => navigation.navigate('Nova Análise')}
          activeOpacity={0.9}
        >
          <View style={styles.heroActionHeader}>
            <View style={styles.heroIconCircle}>
              <Ionicons name="camera" size={26} color="#FFFFFF" />
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>INTELIGÊNCIA ARTIFICIAL</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Nova Vistoria de Campo</Text>
          <Text style={styles.heroSubtitle}>
            Fotografe a grama da faixa de domínio e receba a recomendação instantânea de corte.
          </Text>

          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Iniciar Vistoria Agora</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
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
              <Text style={styles.secondaryTitle}>Consultar Histórico</Text>
              <Text style={styles.secondarySubtitle}>Acesse fotos, relatórios e laudos anteriores</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
          </View>
        </TouchableOpacity>

        {/* Botão de Logout Discreto */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout} 
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.textMuted} />
          <Text style={styles.logoutText}>Encerrar Sessão</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  userRole: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  heroActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  heroActionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  secondaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  secondaryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  secondarySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoutText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
});



