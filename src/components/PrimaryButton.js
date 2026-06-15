// src/components/PrimaryButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ label, onPress, variant = 'primary' }) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      style={[styles.button, isPrimary ? styles.primary : styles.secondary]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: '#4C1D95', // Roxo operacional padrão
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E2E8F0', // Cor cinza suave para bordas
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textPrimary: { 
    color: '#FFFFFF',
  },
  textSecondary: { 
    color: '#64748B', // Cinza muted estável
  },

});
