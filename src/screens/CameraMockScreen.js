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
import { colors, shadows } from '../utils/theme';

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
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={17} color={colors.textMuted} />
          <Text style={styles.backButtonText}>Alterar Dados do Trecho</Text>
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>ETAPA 2 DE 2 • REGISTRO FOTOGRÁFICO</Text>
          </View>
          <Text style={styles.title}>Evidência em Campo</Text>
          <Text style={styles.subtitle}>
            Capture a foto da vegetação para a inteligência artificial realizar o diagnóstico.
          </Text>
        </View>

        {/* Resumo do Trecho */}
        <View style={styles.summaryBar}>
          <View style={styles.summaryIconCircle}>
            <Ionicons name="navigate" size={15} color={colors.primary} />
          </View>
          <Text style={styles.summaryText}>
            {draft.road || 'SP-310'} • KM {draft.km || '142'} • {draft.direction || 'Sentido Norte'}
          </Text>
        </View>

        {/* Visor de Visualização / Scanner */}
        <View style={styles.viewfinder}>
          {selectedImage ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
              <View style={styles.scanOverlay}>
                <View style={[styles.cornerBox, styles.cornerTL]} />
                <View style={[styles.cornerBox, styles.cornerTR]} />
                <View style={[styles.cornerBox, styles.cornerBL]} />
                <View style={[styles.cornerBox, styles.cornerBR]} />
              </View>
              <View style={styles.previewBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#34D399" />
                <Text style={styles.previewBadgeText}>EVIDÊNCIA CARREGADA</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyViewfinder}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="camera" size={30} color="#FFFFFF" />
              </View>
              <Text style={styles.emptyTitle}>Nenhuma foto selecionada</Text>
              <Text style={styles.emptySubtitle}>Tire uma foto ou escolha um cenário abaixo</Text>
            </View>
          )}
        </View>

        {/* Ações de Captura do Dispositivo */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleTakePhoto} 
            activeOpacity={0.82}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="camera" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionButtonText}>Abrir Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handlePickFromGallery} 
            activeOpacity={0.82}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="images" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionButtonText}>Abrir Galeria</Text>
          </TouchableOpacity>
        </View>

        {/* Cenários Rápidos de Demonstração / Banca */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeaderRow}>
            <Ionicons name="flask-outline" size={17} color={colors.secondary} />
            <Text style={styles.demoTitle}>Cenários Rápidos de Demonstração</Text>
          </View>
          <Text style={styles.demoSubtitle}>Toque para testar os dois fluxos principais da banca:</Text>

          <View style={styles.presetsGrid}>
            <TouchableOpacity 
              style={[styles.presetItem, selectedImage === MOCK_PRESETS.alto && styles.presetItemActive]}
              onPress={() => handleApplyPreset('alto')}
              activeOpacity={0.82}
            >
              <View style={[styles.presetDot, { backgroundColor: colors.error }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.presetLabel}>Cenário: Mato Alto</Text>
                <Text style={styles.presetDetail}>Altura 120 cm • Exige Roçada</Text>
              </View>
              {selectedImage === MOCK_PRESETS.alto && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.presetItem, selectedImage === MOCK_PRESETS.conforme && styles.presetItemActive]}
              onPress={() => handleApplyPreset('conforme')}
              activeOpacity={0.82}
            >
              <View style={[styles.presetDot, { backgroundColor: colors.success }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.presetLabel}>Cenário: Grama Conforme</Text>
                <Text style={styles.presetDetail}>Altura 18 cm • Regular</Text>
              </View>
              {selectedImage === MOCK_PRESETS.conforme && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Avanço */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleProceed}
          activeOpacity={0.88}
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
    marginBottom: 12,
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
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.successBorder,
    marginBottom: 8,
  },
  stepBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 13.5, 
    color: colors.textMuted, 
    marginTop: 4, 
    lineHeight: 19 
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 16,
    ...shadows.sm,
  },
  summaryIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
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
    ...shadows.md,
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
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  cornerBox: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#34D399',
  },
  cornerTL: {
    top: 16,
    left: 16,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  cornerTR: {
    top: 16,
    right: 16,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
  },
  cornerBL: {
    bottom: 16,
    left: 16,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  cornerBR: {
    bottom: 16,
    right: 16,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
  previewBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  previewBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  emptyViewfinder: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySubtitle: {
    color: '#94A3B8',
    fontSize: 12.5,
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
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    ...shadows.sm,
  },
  actionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '700',
  },
  demoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 16,
    ...shadows.sm,
  },
  demoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  demoSubtitle: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginBottom: 14,
  },
  presetsGrid: {
    gap: 10,
  },
  presetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    gap: 12,
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
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  presetDetail: {
    fontSize: 11.5,
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
    ...shadows.primary,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});