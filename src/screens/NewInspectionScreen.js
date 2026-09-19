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
import { colors, shadows } from '../utils/theme';

const areaOptions = [
  { key: 'area_nobre', label: 'Área Nobre', limit: 'Máx. 30 cm', icon: 'star' },
  { key: 'faixa_comum', label: 'Faixa de Domínio', limit: 'Máx. 40 cm', icon: 'git-commit' },
  { key: 'canteiro_central', label: 'Canteiro Central', limit: 'Máx. 30 cm', icon: 'git-compare' },
  { key: 'encosta', label: 'Encosta / Talude', limit: 'Máx. 60 cm', icon: 'trending-up' },
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
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>ETAPA 1 DE 2 • DADOS DO TRECHO</Text>
          </View>
          <Text style={styles.title}>Nova Vistoria</Text>
          <Text style={styles.subtitle}>
            Informe a localização e características da vegetação no trecho da rodovia.
          </Text>
        </View>

        {/* Card 1: Identificação do Trecho */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Ionicons name="location" size={17} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Localização da Rodovia</Text>
              <Text style={styles.cardSubtitle}>Identificação do ponto de vistoria</Text>
            </View>
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
            <Text style={styles.label}>Sentido Operacional da Pista</Text>
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
            <View style={styles.cardIconCircle}>
              <Ionicons name="layers" size={17} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Segmento Viário</Text>
              <Text style={styles.cardSubtitle}>Regras normativas de altura da CCR</Text>
            </View>
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
                    <View style={[styles.areaIconMini, isSelected && styles.areaIconMiniSelected]}>
                      <Ionicons 
                        name={option.icon} 
                        size={17} 
                        color={isSelected ? colors.primary : colors.textMuted} 
                      />
                    </View>
                    {isSelected ? (
                      <Ionicons name="checkmark-circle" size={19} color={colors.primary} />
                    ) : (
                      <View style={styles.emptyCircle} />
                    )}
                  </View>
                  <Text style={[styles.areaLabel, isSelected && styles.areaLabelSelected]}>
                    {option.label}
                  </Text>
                  <View style={[styles.limitBadge, isSelected && styles.limitBadgeSelected]}>
                    <Text style={[styles.areaLimit, isSelected && styles.areaLimitSelected]}>
                      {option.limit}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Card 3: Estimativa e Observações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Ionicons name="speedometer" size={17} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Altura & Observações</Text>
              <Text style={styles.cardSubtitle}>Medição visual preliminar do inspetor</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura Estimada de Campo</Text>
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
              placeholder="Ex: Próximo à curva, mato encroado na barreira de proteção..."
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
          activeOpacity={0.88}
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  cardIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
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
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14.5,
    color: colors.text,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 74,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  areaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  areaOption: {
    width: '48.2%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
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
    marginBottom: 10,
  },
  areaIconMini: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaIconMiniSelected: {
    backgroundColor: '#FFFFFF',
  },
  emptyCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  areaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  areaLabelSelected: {
    color: colors.primaryDark,
  },
  limitBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  limitBadgeSelected: {
    backgroundColor: colors.successBorder,
  },
  areaLimit: {
    fontSize: 10.5,
    color: colors.textMuted,
    fontWeight: '700',
  },
  areaLimitSelected: {
    color: colors.primaryDark,
  },
  heightInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 4,
  },
  heightInput: {
    flex: 1,
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    paddingVertical: 8,
  },
  unitBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  unitBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 6,
    ...shadows.primary,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

