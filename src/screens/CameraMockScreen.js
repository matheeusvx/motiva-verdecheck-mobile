import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ScreenContainer from '../components/ScreenContainer';
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
      Alert.alert('Aviso', 'Não foi possível abrir a galeria nativa neste dispositivo. Selecione um cenário de teste.');
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
      Alert.alert('Aviso', 'Câmera nativa indisponível neste ambiente. Selecione um cenário de teste.');
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
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color={colors.textMuted} />
          <Text style={styles.backButtonText}>Alterar Dados do Trecho</Text>
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Evidência Fotográfica</Text>
          <Text style={styles.subtitle}>
            Capture a foto da vegetação ou escolha uma imagem para a inteligência artificial analisar.
          </Text>
        </View>

        {/* Resumo do Trecho */}
        <View style={styles.summaryBar}>
          <Ionicons name="navigate-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.summaryText}>
            {draft.road || 'SP-310'} • KM {draft.km || '142'} • {draft.direction || 'Sentido Norte'}
          </Text>
        </View>

        {/* Visor de Visualização */}
        <View style={styles.viewfinder}>
          {selectedImage ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
              <View style={styles.previewBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#34D399" />
                <Text style={styles.previewBadgeText}>IMAGEM PRONTA</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyViewfinder}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="camera-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.emptyTitle}>Nenhuma foto selecionada</Text>
              <Text style={styles.emptySubtitle}>Tire uma foto ou escolha um dos cenários abaixo</Text>
            </View>
          )}
        </View>

        {/* Ações de Captura do Dispositivo */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleTakePhoto} 
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Abrir Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handlePickFromGallery} 
            activeOpacity={0.8}
          >
            <Ionicons name="images" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Abrir Galeria</Text>
          </TouchableOpacity>
        </View>

        {/* Cenários de Demonstração / Banca */}
        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>Cenários Rápidos de Demonstração</Text>
          <Text style={styles.demoSubtitle}>Toque para testar os dois fluxos principais:</Text>

          <View style={styles.presetsGrid}>
            <TouchableOpacity 
              style={[styles.presetItem, selectedImage === MOCK_PRESETS.alto && styles.presetItemActive]}
              onPress={() => handleApplyPreset('alto')}
              activeOpacity={0.8}
            >
              <View style={[styles.presetDot, { backgroundColor: colors.error }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.presetLabel}>Cenário: Mato Alto</Text>
                <Text style={styles.presetDetail}>Altura 120 cm • Exige Corte</Text>
              </View>
              {selectedImage === MOCK_PRESETS.alto && (
                <Ionicons name="checkmark" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.presetItem, selectedImage === MOCK_PRESETS.conforme && styles.presetItemActive]}
              onPress={() => handleApplyPreset('conforme')}
              activeOpacity={0.8}
            >
              <View style={[styles.presetDot, { backgroundColor: colors.success }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.presetLabel}>Cenário: Grama Conforme</Text>
                <Text style={styles.presetDetail}>Altura 18 cm • Regular</Text>
              </View>
              {selectedImage === MOCK_PRESETS.conforme && (
                <Ionicons name="checkmark" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Avanço */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleProceed}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Analisar com Inteligência Artificial</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 40 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  header: { 
    marginBottom: 16 
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 14, 
    color: colors.textMuted, 
    marginTop: 4, 
    lineHeight: 20 
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  viewfinder: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    height: 220,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  previewBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyViewfinder: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  demoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  demoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  demoSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },
  presetsGrid: {
    gap: 10,
  },
  presetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
  },
  presetItemActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  presetDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  presetDetail: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});