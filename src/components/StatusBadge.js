import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

export default function StatusBadge({ status, severity, style }) {
  const normStatus = (status || '').toLowerCase();
  const normSeverity = (severity || '').toLowerCase();

  let bg = colors.successBg;
  let textColor = colors.success;
  let borderColor = colors.successBorder;
  let dotColor = colors.success;
  let label = status || severity || 'Conforme';

  if (normStatus === 'cortar' || normSeverity === 'crítico' || normStatus === 'crítico') {
    if (normSeverity === 'atenção') {
      bg = colors.warningBg;
      textColor = colors.warning;
      borderColor = colors.warningBorder;
      dotColor = colors.warning;
      label = status ? `${status.toUpperCase()} • ATENÇÃO` : 'ATENÇÃO';
    } else {
      bg = colors.errorBg;
      textColor = colors.error;
      borderColor = colors.errorBorder;
      dotColor = colors.error;
      label = status ? `${status.toUpperCase()} • CRÍTICO` : 'CRÍTICO';
    }
  } else if (normStatus === 'não cortar' || normSeverity === 'conforme' || normStatus === 'conforme') {
    bg = colors.successBg;
    textColor = colors.success;
    borderColor = colors.successBorder;
    dotColor = colors.success;
    label = status ? `${status.toUpperCase()}` : 'CONFORME';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: borderColor }, style]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  }
});


