// src/screens/HistoryScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function HistoryScreen() {
  const { history } = useInspection();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>Registros de auditoria salvos no dispositivo.</Text>

        {history.map((item) => {
          const isCritico = item.status === 'Crítico';
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.roadText}>{item.road} — KM {item.km}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: isCritico ? '#FEF2F2' : '#F0FDF4' }]}>
                  <Text style={[styles.badgeText, { color: isCritico ? colors.error : colors.success }]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>ALTURA</Text>
                  <Text style={styles.infoValue}>{item.estimatedHeight}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>SENTIDO</Text>
                  <Text style={styles.infoValue}>{item.direction}</Text>
                </View>
              </View>

              {item.notes ? (
                <Text style={styles.notes} numberOfLines={1}>Obs: {item.notes}</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 40, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  roadText: { fontSize: 18, fontWeight: '700', color: colors.text },
  dateText: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  infoRow: { flexDirection: 'row', gap: 12 },
  infoBox: { flex: 1, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 10 },
  infoLabel: { fontSize: 9, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  notes: { marginTop: 12, fontSize: 12, color: colors.textMuted, fontStyle: 'italic', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 }
});
