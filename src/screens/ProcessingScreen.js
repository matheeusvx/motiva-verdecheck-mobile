import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function ProcessingScreen({ navigation }) {
  const { draft } = useInspection();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Result');
    }, 1300);

    return () => clearTimeout(timeout);
  }, [navigation, draft]);

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.title}>Analisando vegetação...</Text>
        <Text style={styles.subtitle}>Gerando recomendação para o trecho informado.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center'
  }
});
