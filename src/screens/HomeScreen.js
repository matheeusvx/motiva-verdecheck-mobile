// src/screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useInspection } from '../contexts/InspectionContext';


export default function HomeScreen({ navigation }) {
  // Consumindo os dados e funções reais do seu arquivo de contexto
  const { history, user, logoutUser } = useInspection();

  // Lógica de filtragem baseada nos dados do Context
  const todayCount = history ? history.filter(item => {
    const hojeString = new Date().toLocaleDateString('pt-BR');
    return item.date === hojeString;
  }).length : 0;

  const temTrechoCritico = history ? history.some(item => 
    item.status === 'Cortar' || item.status === 'Crítico' || item.severity === 'Crítico'
  ) : false;

  const handleLogout = async () => {
    try {
      // Apenas limpa o estado global. O AppNavigator vai detectar 
      // que o nome voltou a ser 'Inspetor' e mudará para a tela de Login sozinho.
      await logoutUser();
    } catch (error) {
      console.warn('Erro ao deslogar', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        
        {/* Topo Operacional */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeText}>Painel Operacional</Text>
            <Text style={styles.title}>Olá, {user?.name || 'Inspetor'}</Text>
          </View>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>
              {(user?.name || 'I').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Card de Alerta de Intervenção */}
        {temTrechoCritico && (
          <TouchableOpacity 
            style={styles.alertBanner} 
            onPress={() => navigation.navigate('Histórico')}
            activeOpacity={0.9}
          >
            <View style={styles.alertContentRow}>
              <View style={styles.shieldMock}>
                <Text style={styles.alertIcon}>⚠️</Text>
              </View>
              <View style={styles.alertTexts}>
                <Text style={styles.alertTitle}>Intervenção Necessária</Text>
                <Text style={styles.alertMessage}>Trechos críticos detectados na malha viária. Toque para agir.</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Card Dashboard de Métricas */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroLabel}>INSPEÇÕES DE HOJE</Text>
            <Text style={styles.heroValue}>{todayCount}</Text>
            <Text style={styles.heroStatus}>Sincronizado com a Nuvem</Text>
          </View>
          
          <View style={styles.glassGraphicMock}>
            <View style={[styles.mockBar, { height: '35%' }]} />
            <View style={[styles.mockBar, { height: '55%', backgroundColor: '#C084FC', opacity: 0.9 }]} />
            <View style={[styles.mockBar, { height: '85%' }]} />
          </View>
        </View>

        <Text style={styles.sectionDivider}>AÇÕES DISPONÍVEIS</Text>

        {/* Bloco 1: Nova Análise */}
        <View style={styles.card}>
          <View style={styles.cardHeaderIconRow}>
            <View style={styles.iconCircleWrapper}>
              <Text style={styles.cardActionIcon}>🌱</Text>
            </View>
            <Text style={styles.cardTitle}>Nova Análise de Trecho</Text>
          </View>
          
          <Text style={styles.cardText}>
            Abra a câmera inteligente para escanear e classificar a altura da vegetação na faixa de domínio.
          </Text>
          
          <View style={styles.buttonSpacer}>
            <TouchableOpacity 
              style={styles.nativePrimaryButton}
              onPress={() => navigation.navigate('Nova Análise')}
              activeOpacity={0.85}
            >
              <Text style={styles.nativePrimaryButtonText}>Abrir Scanner IA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bloco 2: Histórico */}
        <View style={styles.card}>
          <View style={styles.cardHeaderIconRow}>
            <View style={[styles.iconCircleWrapper, { backgroundColor: '#FAE8FF' }]}>
              <Text style={styles.cardActionIcon}>📂</Text>
            </View>
            <Text style={styles.cardTitle}>Histórico de Evidências</Text>
          </View>
          
          <Text style={styles.cardText}>
            Verifique os relatórios, fotos salvas e status de conformidade das vistorias anteriores.
          </Text>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Histórico')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Ver Registros</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Logout Corporativo */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout} 
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>🚪 Encerrar Sessão Operacional</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 20 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  welcomeText: { fontSize: 14, color: '#94A3B8', fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', color: '#2E1065', marginTop: 2 },
  userAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4C1D95', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  alertBanner: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, marginBottom: 24, borderWidth: 1.5, borderColor: '#FEE2E2', borderLeftWidth: 5, borderLeftColor: '#EF4444', shadowColor: '#1E293B', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 15, elevation: 3 },
  alertContentRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  shieldMock: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center' },
  alertIcon: { fontSize: 18 },
  alertTexts: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: '700', color: '#991B1B' },
  alertMessage: { fontSize: 13, color: '#991B1B', marginTop: 2, lineHeight: 18, opacity: 0.8 },
  heroCard: { backgroundColor: '#2E1065', borderRadius: 28, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, shadowColor: '#2E1065', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 6 },
  heroLeft: { flex: 1 },
  heroLabel: { color: '#E9D5FF', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  heroValue: { color: '#FFFFFF', fontSize: 58, fontWeight: '800', marginVertical: 2 },
  heroStatus: { color: '#DDD6FE', fontSize: 12, fontWeight: '500', marginTop: 2 },
  glassGraphicMock: { width: 64, height: 64, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.15)', flexDirection: 'row', gap: 6, alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 },
  mockBar: { width: 8, borderRadius: 3, backgroundColor: '#FFFFFF', opacity: 0.4 },
  sectionDivider: { fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, marginBottom: 16, marginLeft: 6 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#3B0764', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.04, shadowRadius: 24, elevation: 4 },
  cardHeaderIconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  iconCircleWrapper: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center' },
  cardActionIcon: { fontSize: 20 },
  cardTitle: { fontSize: 19, fontWeight: '800', color: '#2E1065', letterSpacing: -0.3 },
  cardText: { color: '#64748B', fontSize: 14, lineHeight: 22, fontWeight: '500', paddingRight: 4 },
  buttonSpacer: { marginTop: 20 },
  nativePrimaryButton: { backgroundColor: '#4C1D95', borderRadius: 18, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  nativePrimaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#DDD6FE', borderRadius: 18, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  secondaryButtonText: { color: '#4C1D95', fontSize: 15, fontWeight: '700' },
  logoutButton: { marginTop: 12, alignItems: 'center', paddingVertical: 16, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  logoutText: { color: '#64748B', fontWeight: '700', fontSize: 14 }
});
