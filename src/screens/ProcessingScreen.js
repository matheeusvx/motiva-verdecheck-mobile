// src/screens/ProcessingScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

import { colors } from '../utils/theme';

export default function ProcessingScreen({ navigation }) {
  
  useEffect(() => {
    setTimeout(() => navigation.replace('Result'), 2500);
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
        <Text style={styles.title}>Analisando...</Text>
        <Text style={styles.description}>
          A IA está processando as texturas e padrões de crescimento da vegetação para gerar o diagnóstico.
        </Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>VISÃO COMPUTACIONAL ATIVA</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  iconContainer: { marginBottom: 24, padding: 20, backgroundColor: '#EEF2FF', borderRadius: 100 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 8 },
  description: { textAlign: 'center', color: colors.textMuted, lineHeight: 22, fontSize: 15 },
  tag: { marginTop: 32, backgroundColor: colors.text, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  tagText: { color: '#FFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }
});
