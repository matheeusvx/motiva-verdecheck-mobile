import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

export default function StatusBadge({ status, severity }) {
  const normStatus = (status || '').toLowerCase();
  const normSeverity = (severity || '').toLowerCase();

  let bg = colors.successBg || '#DCFCE7';
  let textColor = colors.success || '#16A34A';
  let label = status || severity || 'Conforme';

  if (normStatus === 'cortar' || normSeverity === 'crítico' || normStatus === 'crítico') {
    if (normSeverity === 'atenção') {
      bg = colors.warningBg || '#FEF3C7';
      textColor = colors.warning || '#D97706';
      label = status ? `${status.toUpperCase()} (ATENÇÃO)` : 'ATENÇÃO';
    } else {
      bg = colors.errorBg || '#FEE2E2';
      textColor = colors.error || '#DC2626';
      label = status ? `${status.toUpperCase()} (CRÍTICO)` : 'CRÍTICO';
    }
  } else if (normStatus === 'não cortar' || normSeverity === 'conforme') {
    bg = colors.successBg || '#DCFCE7';
    textColor = colors.success || '#16A34A';
    label = status ? `${status.toUpperCase()}` : 'CONFORME';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  }
});

