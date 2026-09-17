import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

export default function CameraMockScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();
  const [selectedImage, setSelectedImage] = useState(draft.imageUri || null);

  const MOCK_PRESETS = {
    alto: 'https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=600&q=80',
    conforme: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
  };

  const handlePickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permissão Necessária', 'É necessário permitir o acesso à galeria de fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Aviso', 'Não foi possível abrir a galeria nativa neste dispositivo. Utilize a simulação de foto.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permissão Necessária', 'É necessário permitir o acesso à câmera para fotografar o trecho.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Aviso', 'Câmera nativa indisponível neste ambiente/emulador. Utilize a simulação de foto.');
    }
  };

  const handleApplyPreset = (presetKey) => {
    setSelectedImage(MOCK_PRESETS[presetKey]);
  };

  const handleProceed = () => {
    const finalImage = selectedImage || MOCK_PRESETS.alto;
    updateDraft({ imageUri: finalImage });
    navigation.navigate('Processing');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.backText}>← Voltar aos Dados</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Captura de Imagem</Text>
        <Text style={styles.subtitle}>Fotografe ou selecione uma evidência visual do trecho da rodovia.</Text>

        {/* Visor / Preview */}
        <View style={styles.viewfinder}>
          {selectedImage ? (
            <View style={styles.previewBox}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
              <View style={styles.previewOverlayBadge}>
                <Text style={styles.previewOverlayText}>✓ IMAGEM PRONTA</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyViewfinder}>
              <Text style={styles.cameraIcon}>📸</Text>
              <Text style={styles.cameraTitle}>Nenhuma Foto Capturada</Text>
              <Text style={styles.cameraText}>
                Use a câmera do celular, escolha uma foto da galeria ou selecione um cenário rápido abaixo.
              </Text>
            </View>
          )}
        </View>

        {/* Resumo do Trecho */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trecho em Análise</Text>
          <Text style={styles.summaryText}>
            {draft.road || 'SP-310'} • KM {draft.km || '142'} • {draft.direction || 'Norte'}
          </Text>
        </View>

        {/* Ações de Captura Real */}
        <Text style={styles.sectionLabel}>CAPTURA NATIVA (DISPOSITIVO)</Text>
        <View style={styles.buttonGroup}>
          <PrimaryButton label="📷 Abrir Câmera do Celular" onPress={handleTakePhoto} />
          <View style={{ height: 10 }} />
          <PrimaryButton label="🖼️ Selecionar da Galeria" variant="secondary" onPress={handlePickFromGallery} />
        </View>

        {/* Presets Rápidos de Simulação */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>SIMULAÇÃO RÁPIDA (TESTES E APRESENTAÇÃO)</Text>
        <View style={styles.presetsRow}>
          <TouchableOpacity 
            style={[styles.presetBtn, selectedImage === MOCK_PRESETS.alto && styles.presetBtnActive]} 
            onPress={() => handleApplyPreset('alto')}
            activeOpacity={0.8}
          >
            <Text style={styles.presetEmoji}>⚠️</Text>
            <Text style={styles.presetBtnText}>Cenário: Mato Alto</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.presetBtn, selectedImage === MOCK_PRESETS.conforme && styles.presetBtnActive]} 
            onPress={() => handleApplyPreset('conforme')}
            activeOpacity={0.8}
          >
            <Text style={styles.presetEmoji}>🌱</Text>
            <Text style={styles.presetBtnText}>Cenário: Conforme</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Avanço */}
        <View style={styles.continueSection}>
          <PrimaryButton 
            label="Analisar Imagem com IA ➔" 
            onPress={handleProceed} 
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 50 },
  topBar: { marginBottom: 12 },
  backText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 4 },
  subtitle: { color: colors.textMuted, marginBottom: 18, fontSize: 14, lineHeight: 20 },
  viewfinder: { 
    backgroundColor: '#0F172A', 
    borderRadius: 20, 
    minHeight: 220, 
    overflow: 'hidden',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  previewBox: { width: '100%', height: 220, position: 'relative' },
  previewImage: { width: '100%', height: '100%' },
  previewOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(22, 163, 74, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  previewOverlayText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  emptyViewfinder: { padding: 24, alignItems: 'center' },
  cameraIcon: { fontSize: 40, marginBottom: 10 },
  cameraTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  cameraText: { textAlign: 'center', color: '#94A3B8', fontSize: 13, lineHeight: 18, paddingHorizontal: 16 },
  summaryCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, marginBottom: 20 },
  summaryTitle: { fontSize: 11, fontWeight: '800', color: colors.primary, letterSpacing: 0.5, marginBottom: 4 },
  summaryText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 1, marginBottom: 10, marginLeft: 2 },
  buttonGroup: { marginBottom: 8 },
  presetsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  presetBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  presetBtnActive: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF'
  },
  presetEmoji: { fontSize: 18, marginBottom: 4 },
  presetBtnText: { fontSize: 12, fontWeight: '700', color: colors.text },
  continueSection: { marginTop: 4 }
});