import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, shadows } from '../utils/theme';

export default function PrimaryButton({ 
  label, 
  onPress, 
  variant = 'primary', 
  icon = null, 
  style, 
  textStyle,
  disabled = false 
}) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isSubtle = variant === 'subtle';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary && styles.primary,
        variant === 'secondary' && styles.secondary,
        isOutline && styles.outline,
        isSubtle && styles.subtle,
        disabled && styles.disabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
    >
      <View style={styles.contentRow}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={[
          styles.text, 
          isPrimary && styles.textPrimary,
          variant === 'secondary' && styles.textSecondary,
          isOutline && styles.textOutline,
          isSubtle && styles.textSubtle,
          disabled && styles.textDisabled,
          textStyle
        ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrapper: {
    marginRight: 2,
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.primary,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  subtle: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  disabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  textPrimary: { 
    color: '#FFFFFF',
  },
  textSecondary: { 
    color: colors.text,
  },
  textOutline: {
    color: colors.primary,
  },
  textSubtle: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.textLight,
  }
});


