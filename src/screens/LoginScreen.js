import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('operador@motiva.com');
  const [password, setPassword] = useState('123456');

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.wrapper}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>MV</Text>
        </View>
        <Text style={styles.title}>Motiva VerdeCheck</Text>
        <Text style={styles.subtitle}>Inspeção de vegetação para apoio à decisão de corte.</Text>

        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor={colors.textMuted} />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor={colors.textMuted} secureTextEntry />

        <PrimaryButton label="Entrar" onPress={() => navigation.replace('Main')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  logoText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 28
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textMuted,
    marginBottom: 28,
    fontSize: 15
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 15,
    color: colors.text
  }
});
