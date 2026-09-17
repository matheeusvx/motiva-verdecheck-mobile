// src/screens/HistoryScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import StatusBadge from '../components/StatusBadge';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const { history, clearHistory, resetDefaultHistory } = useInspection();

  const handleClearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Deseja apagar todos os registros locais de inspeção? Esta ação permite testar o estado vazio.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: () => clearHistory() }
      ]
    );
  };

  const handleResetMocks = () => {
    resetDefaultHistory();
    Alert.alert('Dados Restaurados', 'O histórico foi recarregado com os registros de teste padrão.');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {/* Cabeçalho */}
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.subtitle}>Registros de auditoria salvos no dispositivo.</Text>
          </View>
          {history && history.length > 0 ? (
            <TouchableOpacity onPress={handleClearHistory} style={styles.clearBtn} activeOpacity={0.7}>
              <Text style={styles.clearBtnText}>Limpar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleResetMocks} style={styles.restoreBtn} activeOpacity={0.7}>
              <Text style={styles.restoreBtnText}>Restaurar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Empty State se lista estiver vazia */}
        {(!history || history.length === 0) && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>📂</Text>
            </View>
            <Text style={styles.emptyTitle}>Nenhuma inspeção encontrada</Text>
            <Text style={styles.emptyMessage}>
              Você não possui vistorias salvas no momento. Inicie uma nova análise ou restaure os registros de demonstração.
            </Text>
            <TouchableOpacity 
              style={styles.emptyActionButton} 
              onPress={handleResetMocks}
              activeOpacity={0.85}
            >
              <Text style={styles.emptyActionButtonText}>Restaurar Registros Mock</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de Registros */}
        {history && history.map((item) => {
          return (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('InspectionDetail', { item })}
            >
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roadText}>{item.road} — KM {item.km}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <StatusBadge status={item.status} severity={item.severity} />
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>ALTURA</Text>
                  <Text style={styles.infoValue}>{item.estimatedHeight} cm</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>SENTIDO</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>{item.direction}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>SEGMENTO</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>{item.areaLabel || item.areaType || '-'}</Text>
                </View>
              </View>

              {item.notes ? (
                <Text style={styles.notes} numberOfLines={1}>Obs: {item.notes}</Text>
              ) : null}

              <View style={styles.footerRow}>
                <Text style={styles.clickHint}>Toque para ver relatório e fotos</Text>
                <Text style={styles.chevron}>➔</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 40, paddingTop: 10 },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 2 },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  clearBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700'
  },
  restoreBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  restoreBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700'
  },
  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  emptyIcon: { fontSize: 32 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center'
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24
  },
  emptyActionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14
  },
  emptyActionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 14 
  },
  roadText: { fontSize: 17, fontWeight: '800', color: colors.text },
  dateText: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  infoRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  infoBox: { flex: 1, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 10 },
  infoLabel: { fontSize: 9, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 13, fontWeight: '700', color: colors.text },
  notes: { 
    marginTop: 10, 
    fontSize: 12, 
    color: colors.textMuted, 
    fontStyle: 'italic', 
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', 
    paddingTop: 8 
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC'
  },
  clickHint: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600'
  },
  chevron: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '800'
  }
});

