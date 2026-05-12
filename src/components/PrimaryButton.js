import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/theme';

export default function PrimaryButton({ label, onPress, variant = 'primary' }) {
  const inverted = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        inverted ? styles.secondary : styles.primary,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.text, inverted ? styles.secondaryText : styles.primaryText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary
  },
  text: {
    fontSize: 16,
    fontWeight: '700'
  },
  primaryText: {
    color: '#FFFFFF'
  },
  secondaryText: {
    color: colors.primary
  },
  pressed: {
    opacity: 0.9
  }
});
