import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

export default function StatusBadge({ status }) {
  const isCut = status === 'Cortar';
  return (
    <View style={[styles.badge, { backgroundColor: isCut ? colors.danger : colors.success }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  }
});
