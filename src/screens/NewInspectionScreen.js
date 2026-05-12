import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

const areaOptions = [
  { key: 'area_nobre', label: 'Área nobre' },
  { key: 'faixa_comum', label: 'Faixa de domínio comum' },
  { key: 'curva_visibilidade', label: 'Curva com visibilidade' },
  { key: 'entorno_operacional', label: 'Entorno operacional' }
];

export default function NewInspectionScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Dados da inspeção</Text>
      <Text style={styles.subtitle}>Preencha o contexto do trecho antes da análise.</Text>

      <TextInput style={styles.input} placeholder="Rodovia (ex.: SP-280)" value={draft.road} onChangeText={text => updateDraft({ road: text })} />
      <TextInput style={styles.input} placeholder="KM (ex.: 145)" value={draft.km} onChangeText={text => updateDraft({ km: text })} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Sentido (capital/interior)" value={draft.direction} onChangeText={text => updateDraft({ direction: text })} />
      <Text style={styles.section}>Tipo de área</Text>
      <View style={styles.chipsWrapper}>
        {areaOptions.map(option => {
          const selected = draft.areaType === option.key;
          return (
            <Text
              key={option.key}
              onPress={() => updateDraft({ areaType: option.key })}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              {option.label}
            </Text>
          );
        })}
      </View>
      <TextInput
        style={[styles.input, styles.notes]}
        placeholder="Observações"
        value={draft.notes}
        onChangeText={text => updateDraft({ notes: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Altura estimada da vegetação (cm)"
        value={draft.estimatedHeight}
        onChangeText={text => updateDraft({ estimatedHeight: text })}
        keyboardType="numeric"
      />

      <PrimaryButton label="Continuar" onPress={() => navigation.navigate('CameraMock')} />
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
  section: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10
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
  },
  notes: {
    minHeight: 94,
    textAlignVertical: 'top'
  },
  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  chip: {
    backgroundColor: '#EDE9FE',
    color: colors.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden'
  },
  chipSelected: {
    backgroundColor: colors.primary,
    color: '#FFFFFF'
  }
});
