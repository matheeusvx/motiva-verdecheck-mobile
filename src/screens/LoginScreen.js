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
import { useInspection } from '../contexts/InspectionContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useInspection();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha o e-mail institucional e a senha.');
      return;
    }
    
    try {
      await loginUser(email);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível autenticar a sessão.');
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
        <View style={styles.card}>
          <Text style={styles.logo}>🌱 VerdeCheck</Text>
          <Text style={styles.subtitle}>Sessão Operacional CCR Motiva</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail Corporativo</Text>
            <TextInput
              style={styles.input}
              placeholder="lucas.almeida@motiva.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha de Acesso</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Entrar no Painel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.demoButton} onPress={handleQuickDemoLogin} activeOpacity={0.75}>
            <Text style={styles.demoButtonText}>⚡ Acesso Rápido Demo (Lucas Almeida)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#2E1065', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2 },
  logo: { fontSize: 32, fontWeight: '800', color: '#2E1065', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748B', fontWeight: '600', textAlign: 'center', marginBottom: 32 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8, marginLeft: 4 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1E293B' },
  button: { backgroundColor: '#4C1D95', borderRadius: 18, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  demoButton: { marginTop: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE' },
  demoButtonText: { color: '#4C1D95', fontSize: 13, fontWeight: '700' }
});
