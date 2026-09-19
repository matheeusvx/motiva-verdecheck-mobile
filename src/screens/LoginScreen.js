import React, { useState } from 'react';
import { 
   StyleSheet, 
   Text, 
   View, 
   TextInput, 
   TouchableOpacity, 
   KeyboardAvoidingView, 
   Platform,
   ScrollView,
   Alert
 } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInspection } from '../contexts/InspectionContext';
import { colors, shadows } from '../utils/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const { loginUser } = useInspection();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o seu e-mail e senha.');
      return;
    }
    try {
      await loginUser(email);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível entrar no momento.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('lucas.almeida@motiva.com');
    setPassword('motiva2026');
    await loginUser('lucas.almeida@motiva.com');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Marca e Identidade Visual Premium */}
        <View style={styles.brandContainer}>
          <View style={styles.logoGlowWrapper}>
            <View style={styles.logoCircle}>
              <Ionicons name="leaf" size={32} color={colors.primary} />
            </View>
          </View>
          <Text style={styles.logoTitle}>VerdeCheck</Text>
          <Text style={styles.logoSubtitle}>Inspeção e Conservação de Rodovias</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.pillBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.pillBadgeText}>CCR MOTIVA</Text>
            </View>
            <View style={[styles.pillBadge, styles.pillBadgeSecondary]}>
              <Text style={styles.pillBadgeSecondaryText}>SISTEMA OPERACIONAL</Text>
            </View>
          </View>
        </View>

        {/* Formulário Limpo e Sofisticado */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Acesse sua conta</Text>
          <Text style={styles.formSubtitle}>Entre com suas credenciais corporativas</Text>

          {/* Campo E-mail */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>E-mail institucional</Text>
            <View style={[styles.inputBox, isFocusedEmail && styles.inputBoxFocused]}>
              <Ionicons 
                name="mail-outline" 
                size={19} 
                color={isFocusedEmail ? colors.primary : colors.textLight} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.textInput}
                placeholder="nome@motiva.com"
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Campo Senha */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Senha de acesso</Text>
            <View style={[styles.inputBox, isFocusedPassword && styles.inputBoxFocused]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={19} 
                color={isFocusedPassword ? colors.primary : colors.textLight} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.textInput}
                placeholder="Sua senha corporativa"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                secureTextEntry
              />
            </View>
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.88}>
            <Text style={styles.primaryButtonText}>Entrar no Aplicativo</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Atalho Demo Amigável */}
          <TouchableOpacity style={styles.demoButton} onPress={handleQuickDemoLogin} activeOpacity={0.8}>
            <Ionicons name="flash" size={15} color={colors.primary} />
            <Text style={styles.demoButtonText}>Acessar como Inspetor Demo</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé Corporativo */}
        <View style={styles.footerContainer}>
          <Text style={styles.copyright}>Desenvolvido para o Challenge FIAP • CCR Motiva</Text>
          <Text style={styles.versionTag}>Versão 1.0.0 (Build 2026)</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoGlowWrapper: {
    marginBottom: 14,
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.successBorder,
    ...shadows.md,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.6,
  },
  logoSubtitle: {
    fontSize: 13.5,
    color: colors.textMuted,
    marginTop: 3,
    fontWeight: '500',
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.successBorder,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  pillBadgeSecondary: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.border,
  },
  pillBadgeSecondaryText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.md,
  },
  formTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  formSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 7,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputBoxFocused: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14.5,
    color: colors.text,
    fontWeight: '500',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 8,
    ...shadows.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
    borderRadius: 14,
    paddingVertical: 12.5,
    marginTop: 12,
  },
  demoButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  footerContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 11.5,
    color: colors.textMuted,
  },
  versionTag: {
    fontSize: 10.5,
    color: colors.textLight,
    marginTop: 3,
    fontWeight: '500',
  }
});


