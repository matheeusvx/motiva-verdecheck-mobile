import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function CameraMockScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();

  const attachMock = (type) => {
    const mockImage = type === 'camera' 
      ? 'https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=600&q=80' 
      : 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80';

    updateDraft({ imageUri: mockImage });
    navigation.navigate('Processing');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.title}>Captura de imagem</Text>
        <Text style={styles.subtitle}>Fotografe ou anexe uma imagem do trecho analisado.</Text>

        <View style={styles.viewfinder}>
          <Text style={styles.cameraIcon}>📸</Text>
          <Text style={styles.cameraTitle}>Visor Simulador Ativo</Text>
          <Text style={styles.cameraText}>O ambiente de mídia nativa integrado carregará neste espaço.</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trecho Selecionado</Text>
          <Text style={styles.summaryText}>Rodovia: {draft.road || '-'} | KM: {draft.km || '-'} | Sentido: {draft.direction || '-'}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton label="Tirar Foto (Simulado)" onPress={() => attachMock('camera')} />
          <View style={{ height: 12 }} /> 
          <PrimaryButton label="Escolher da Galeria" variant="secondary" onPress={() => attachMock('gallery')} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 4 },
  subtitle: { color: colors.textMuted, marginBottom: 20, fontSize: 14 },
  viewfinder: { backgroundColor: '#1F2937', borderRadius: 16, minHeight: 230, padding: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  cameraIcon: { fontSize: 38, marginBottom: 10 },
  cameraTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  cameraText: { textAlign: 'center', color: '#9CA3AF', fontSize: 13, paddingHorizontal: 12 },
  summaryCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, marginBottom: 20 },
  summaryTitle: { fontSize: 12, fontWeight: '700', color: colors.primary, letterSpacing: 0.5, marginBottom: 4 },
  summaryText: { color: colors.text, fontSize: 14, fontWeight: '500' },
  buttonGroup: { marginTop: 4 }
});