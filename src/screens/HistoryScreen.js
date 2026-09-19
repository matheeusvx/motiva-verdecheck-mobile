import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import StatusBadge from '../components/StatusBadge';
import { useInspection } from '../contexts/InspectionContext';
import { colors, shadows } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const { history, clearHistory, resetDefaultHistory } = useInspection();
  const [filter, setFilter] = useState('todos'); // 'todos', 'cortar', 'conforme'

  const handleClearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Deseja apagar todos os registros salvos? Isso permite visualizar o estado vazio.',
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

  const filteredHistory = (history || []).filter(item => {
    if (filter === 'cortar') return item.status === 'Cortar' || item.severity === 'Crítico';
    if (filter === 'conforme') return item.status === 'Não cortar' || item.severity === 'Conforme';
    return true;
  });

  return (
    <ScreenContainer>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Histórico de Vistorias</Text>
            <Text style={styles.subtitle}>Relatórios e registros salvos no dispositivo.</Text>
          </View>

          {history && history.length > 0 ? (
            <TouchableOpacity 
              onPress={handleClearHistory} 
              style={styles.clearBtn} 
              activeOpacity={0.75}
            >
              <Ionicons name="trash-outline" size={14} color={colors.error} />
              <Text style={styles.clearBtnText}>Limpar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={handleResetMocks} 
              style={styles.restoreBtn} 
              activeOpacity={0.75}
            >
              <Ionicons name="refresh-outline" size={14} color={colors.primary} />
              <Text style={styles.restoreBtnText}>Restaurar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filtros em Pílula */}
        {history && history.length > 0 && (
          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={[styles.filterPill, filter === 'todos' && styles.filterPillActive]} 
              onPress={() => setFilter('todos')}
              activeOpacity={0.82}
            >
              <Text style={[styles.filterText, filter === 'todos' && styles.filterTextActive]}>
                Todas ({history.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterPill, filter === 'cortar' && styles.filterPillActive]} 
              onPress={() => setFilter('cortar')}
              activeOpacity={0.82}
            >
              <Text style={[styles.filterText, filter === 'cortar' && styles.filterTextActive]}>
                Requer Corte
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterPill, filter === 'conforme' && styles.filterPillActive]} 
              onPress={() => setFilter('conforme')}
              activeOpacity={0.82}
            >
              <Text style={[styles.filterText, filter === 'conforme' && styles.filterTextActive]}>
                Conformes
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Estado Vazio */}
        {(!history || history.length === 0) && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="document-text-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma vistoria encontrada</Text>
            <Text style={styles.emptyMessage}>
              Você ainda não realizou vistorias ou limpou os dados locais. Restaure os exemplos para testar o fluxo.
            </Text>
            <TouchableOpacity 
              style={styles.emptyActionButton} 
              onPress={handleResetMocks}
              activeOpacity={0.88}
            >
              <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
              <Text style={styles.emptyActionButtonText}>Restaurar Exemplos da Banca</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de Vistorias */}
        {filteredHistory.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('InspectionDetail', { item })}
          >
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.roadTitle}>{item.road} — KM {item.km}</Text>
                <Text style={styles.dateSubtitle}>{item.date}</Text>
              </View>
              <StatusBadge status={item.status} severity={item.severity} />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>ALTURA</Text>
                <Text style={[
                  styles.statValue, 
                  item.status === 'Cortar' || item.severity === 'Crítico' 
                    ? { color: colors.error, fontWeight: '800' } 
                    : { color: colors.success, fontWeight: '800' }
                ]}>
                  {item.estimatedHeight} cm
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>SENTIDO</Text>
                <Text style={styles.statValue} numberOfLines={1}>{item.direction}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>SEGMENTO</Text>
                <Text style={styles.statValue} numberOfLines={1}>
                  {item.areaLabel || item.areaType || 'Padrão'}
                </Text>
              </View>
            </View>

            {item.notes ? (
              <Text style={styles.notesText} numberOfLines={1}>
                Obs: {item.notes}
              </Text>
            ) : null}

            <View style={styles.cardFooter}>
              <Text style={styles.footerLink}>Visualizar laudo completo</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 40 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 13, 
    color: colors.textMuted, 
    marginTop: 2 
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  clearBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
  restoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  restoreBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginTop: 20,
    ...shadows.sm,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 16,
    ...shadows.primary,
  },
  emptyActionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  roadTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.2,
  },
  dateSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 10,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  notesText: {
    fontSize: 12.5,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerLink: {
    fontSize: 12.5,
    color: colors.primary,
    fontWeight: '700',
  },
});

