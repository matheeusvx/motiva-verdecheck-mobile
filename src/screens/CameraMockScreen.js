import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function CameraMockScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();

  const attachMock = () => {
    updateDraft({ imageUri: 'mock://vegetation-image' });
    navigation.navigate('Processing');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Captura de imagem</Text>
      <Text style={styles.subtitle}>Use a câmera ou uma foto existente do trecho analisado.</Text>

      <View style={styles.cameraCard}>
        <Text style={styles.cameraIcon}>▣</Text>
        <Text style={styles.cameraTitle}>Área simulada da câmera</Text>
        <Text style={styles.cameraText}>No protótipo, a captura está representada por uma imagem mock.</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo do trecho</Text>
        <Text style={styles.summaryText}>Rodovia: {draft.road || '-'} </Text>
        <Text style={styles.summaryText}>KM: {draft.km || '-'} </Text>
        <Text style={styles.summaryText}>Sentido: {draft.direction || '-'} </Text>
      </View>

      <PrimaryButton label="Tirar foto" onPress={attachMock} />
      <PrimaryButton label="Escolher da galeria" variant="secondary" onPress={attachMock} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4
  },
  subtitle: {
    color: colors.textMuted,
    marginBottom: 20
  },
  cameraCard: {
    backgroundColor: '#DDD6FE',
    borderRadius: 20,
    minHeight: 260,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  cameraIcon: {
    fontSize: 46,
    color: colors.primaryDark,
    marginBottom: 12
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 6
  },
  cameraText: {
    textAlign: 'center',
    color: colors.primaryDark
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16
  },
  summaryTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8
  },
  summaryText: {
    color: colors.textMuted,
    marginBottom: 4
  }
});
