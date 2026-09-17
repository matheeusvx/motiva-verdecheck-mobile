import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  Alert, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

const areaOptions = [
  { key: 'area_nobre', label: 'Área Nobre', limit: 'Máx. 30 cm', icon: 'star-outline' },
  { key: 'faixa_comum', label: 'Faixa de Domínio', limit: 'Máx. 40 cm', icon: 'git-commit-outline' },
  { key: 'canteiro_central', label: 'Canteiro Central', limit: 'Máx. 30 cm', icon: 'git-compare-outline' },
  { key: 'encosta', label: 'Encosta / Talude', limit: 'Máx. 60 cm', icon: 'trending-up-outline' },
];

export default function NewInspectionScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();

  const handleContinue = () => {
    if (!draft.road?.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe a identificação da rodovia (ex: SP-310).');
      return;
    }
    if (!draft.km?.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe o quilômetro do trecho (ex: 142).');
      return;
    }
    if (!draft.direction?.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe o sentido operacional da via (ex: Norte / Interior).');
      return;
    }
    const heightNum = Number(draft.estimatedHeight);
    if (!draft.estimatedHeight || isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Altura Inválida', 'Por favor, insira uma altura estimada válida em centímetros (maior que zero).');
      return;
    }
    navigation.navigate('CameraMock');
  };

  return (
    <ScreenContainer>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding} 
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Nova Vistoria</Text>
          <Text style={styles.subtitle}>
            Informe a localização e características da vegetação no trecho da rodovia.
          </Text>
        </View>

        {/* Card 1: Identificação do Trecho */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Localização da Rodovia</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1.3 }]}>
              <Text style={styles.label}>Rodovia</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: SP-310"
                placeholderTextColor={colors.textLight}
                value={draft.road}
                onChangeText={text => updateDraft({ road: text })}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Quilômetro</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 142"
                placeholderTextColor={colors.textLight}
                value={draft.km}
                onChangeText={text => updateDraft({ km: text })}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sentido da Pista</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Norte (Interior) ou Sul (Capital)"
              placeholderTextColor={colors.textLight}
              value={draft.direction}
              onChangeText={text => updateDraft({ direction: text })}
            />
          </View>
        </View>

        {/* Card 2: Segmento Viário (Tipo de Área) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="layers-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Tipo de Segmento Viário</Text>
          </View>

          <View style={styles.areaGrid}>
            {areaOptions.map(option => {
              const isSelected = draft.areaType === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[styles.areaOption, isSelected && styles.areaOptionSelected]}
                  onPress={() => updateDraft({ areaType: option.key })}
                  activeOpacity={0.8}
                >
                  <View style={styles.areaTopRow}>
                    <Ionicons 
                      name={option.icon} 
                      size={20} 
                      color={isSelected ? colors.primary : colors.textMuted} 
                    />
                    {isSelected ? (
                      <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    ) : (
                      <View style={styles.emptyCircle} />
                    )}
                  </View>
                  <Text style={[styles.areaLabel, isSelected && styles.areaLabelSelected]}>
                    {option.label}
                  </Text>
                  <Text style={styles.areaLimit}>{option.limit}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Card 3: Estimativa e Observações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="speedometer-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Altura da Vegetação</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura Estimada (em centímetros)</Text>
            <View style={styles.heightInputBox}>
              <TextInput
                style={styles.heightInput}
                placeholder="Ex: 85"
                placeholderTextColor={colors.textLight}
                value={draft.estimatedHeight}
                onChangeText={text => updateDraft({ estimatedHeight: text })}
                keyboardType="numeric"
              />
              <View style={styles.unitBadge}>
                <Text style={styles.unitBadgeText}>cm</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Observações de Campo (Opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Trecho próximo a curva, mato encroado na mureta..."
              placeholderTextColor={colors.textLight}
              value={draft.notes}
              onChangeText={text => updateDraft({ notes: text })}
              multiline
            />
          </View>
        </View>

        {/* Botão de Avanço */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Avançar para Fotografia</Text>
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
  header: { 
    marginBottom: 20 
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  areaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  areaOption: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
  },
  areaOptionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  areaTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  areaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  areaLabelSelected: {
    color: colors.primary,
  },
  areaLimit: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  heightInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 4,
  },
  heightInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingVertical: 8,
  },
  unitBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  unitBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 4,
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
