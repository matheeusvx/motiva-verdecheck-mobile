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
import { colors } from '../utils/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        
        {/* Marca e Identidade */}
        <View style={styles.brandContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={32} color={colors.primary} />
          </View>
          <Text style={styles.logoTitle}>VerdeCheck</Text>
          <Text style={styles.logoSubtitle}>Inspeção e Conservação de Rodovias</Text>
          <View style={styles.pillBadge}>
            <Text style={styles.pillBadgeText}>CCR MOTIVA</Text>
          </View>
        </View>

        {/* Formulário Limpo */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Acesse sua conta</Text>

          {/* Campo E-mail */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>E-mail institucional</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="nome@motiva.com"
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Campo Senha */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Sua senha de acesso"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Entrar no Aplicativo</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Atalho Demo Amigável */}
          <TouchableOpacity style={styles.demoButton} onPress={handleQuickDemoLogin} activeOpacity={0.75}>
            <Ionicons name="flash-outline" size={16} color={colors.primary} />
            <Text style={styles.demoButtonText}>Preencher com Usuário Demo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>Desenvolvido para o Challenge FIAP + CCR Motiva</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  pillBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingVertical: 13,
    marginTop: 12,
  },
  demoButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 28,
  },
});

