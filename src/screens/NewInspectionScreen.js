// src/screens/NewInspectionScreen.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { useInspection } from '../contexts/InspectionContext';
import { colors } from '../utils/theme';

const areaOptions = [
  { key: 'area_nobre', label: 'Área Nobre', desc: 'Perímetros urbanos e trevos' },
  { key: 'faixa_comum', label: 'Faixa Domínio', desc: 'Marginais de escoamento' },
  { key: 'canteiro_central', label: 'Canteiro Central', desc: 'Divisores de fluxo de pista' },
  { key: 'encosta', label: 'Encosta / Talude', desc: 'Áreas de corte e inclinação' }
];

export default function NewInspectionScreen({ navigation }) {
  const { draft, updateDraft } = useInspection();

  const handleContinue = () => {
    if (!draft.road?.trim() || !draft.km?.trim() || !draft.direction?.trim()) {
      Alert.alert('Campos Pendentes', 'Por favor, identifique a rodovia, o quilômetro e o sentido antes de prosseguir.');
      return;
    }
    navigation.navigate('CameraMock');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding} keyboardShouldPersistTaps="handled">
        
        {/* Cabeçalho Técnico Premium */}
        <View style={styles.headerContainer}>
          <View style={styles.badgeEstilizado}>
            <Text style={styles.badgeEstilizadoText}>MÓDULO DE CAPTURA</Text>
          </View>
          <Text style={styles.title}>Nova Inspeção</Text>
          <Text style={styles.subtitle}>Insira as coordenadas e o segmento técnico para validação da rede neural.</Text>
        </View>

        {/* Card 1: Localização em Grid Balanceado */}
        <View style={styles.cardForm}>
          <View style={styles.cardHeaderIndicator}>
            <View style={styles.indicatorLinha} />
            <Text style={styles.cardSectionTitle}>Geolocalização do Trecho</Text>
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 2 }]}>
              <Text style={styles.inputLabel}>RODOVIA</Text>
              <TextInput 
                style={styles.inputInput} 
                placeholder="Ex: SP-310" 
                placeholderTextColor="#94A3B8" 
                value={draft.road} 
                onChangeText={text => updateDraft({ road: text })} 
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1.5 }]}>
              <Text style={styles.inputLabel}>QUILÔMETRO</Text>
              <TextInput 
                style={styles.inputInput} 
                placeholder="Ex: 142" 
                placeholderTextColor="#94A3B8" 
                value={draft.km} 
                onChangeText={text => updateDraft({ km: text })} 
                keyboardType="numeric" 
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { marginBottom: 4 }]}>
            <Text style={styles.inputLabel}>SENTIDO OPERACIONAL</Text>
            <TextInput 
              style={styles.inputInput} 
              placeholder="Ex: Norte (Interior)" 
              placeholderTextColor="#94A3B8" 
              value={draft.direction} 
              onChangeText={text => updateDraft({ direction: text })} 
            />
          </View>
        </View>

        {/* Seção 2: Segmentação por Lista Técnica (Substituindo Chips Soltos) */}
        <Text style={styles.blockTitle}>SEGMENTO DA FAIXA DE DOMÍNIO</Text>
        <View style={styles.listaSegmentos}>
          {areaOptions.map(option => {
            const isSelected = draft.areaType === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                activeOpacity={0.8}
                onPress={() => updateDraft({ areaType: option.key })}
                style={[styles.segmentoLinha, isSelected && styles.segmentoLinhaSelected]}
              >
                <View style={styles.segmentoInfoLeft}>
                  {/* Marcador Geométrico estilo Radio Button profissional */}
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <View>
                    <Text style={[styles.segmentoLabel, isSelected && styles.segmentoLabelSelected]}>
                      {option.label}
                    </Text>
                    <Text style={styles.segmentoDesc}>{option.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Card 3: Parâmetros de Entrada da IA */}
        <View style={styles.cardForm}>
          <View style={styles.cardHeaderIndicator}>
            <View style={[styles.indicatorLinha, { backgroundColor: colors.secondary || '#0EA5E9' }]} />
            <Text style={styles.cardSectionTitle}>Métricas Iniciais</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ALTURA ESTIMADA DA VEGETAÇÃO (CM)</Text>
            <TextInput 
              style={styles.inputInput} 
              placeholder="Ex: 120" 
              placeholderTextColor="#94A3B8" 
              value={draft.estimatedHeight} 
              onChangeText={text => updateDraft({ estimatedHeight: text })} 
              keyboardType="numeric" 
            />
          </View>

          <View style={[styles.inputGroup, { marginBottom: 4 }]}>
            <Text style={styles.inputLabel}>OBSERVAÇÕES DO INSPETOR</Text>
            <TextInput 
              style={[styles.inputInput, styles.textArea]} 
              placeholder="Descreva pontos de referência físicos, condições climáticas ou barreiras visuais..." 
              placeholderTextColor="#94A3B8" 
              value={draft.notes} 
              onChangeText={text => updateDraft({ notes: text })} 
              multiline 
            />
          </View>
        </View>

        <View style={styles.actionContainer}>
          <PrimaryButton label="Ativar Scanner Computacional" onPress={handleContinue} />
        </View>
        
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 50, paddingTop: 8 },
  
  // Cabeçalho de Design Executivo
  headerContainer: { marginBottom: 26 },
  badgeEstilizado: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  badgeEstilizadoText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1
  },
  title: { fontSize: 28, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  subtitle: { color: colors.textMuted, fontSize: 14, marginTop: 4, lineHeight: 22, fontWeight: '500' },
  
  // Cards Estruturais do Formulário
  cardForm: { 
    backgroundColor: colors.surface, 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 22, 
    borderWidth: 1, 
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2
  },
  cardHeaderIndicator: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  indicatorLinha: { width: 4, height: 16, backgroundColor: colors.primary, borderRadius: 2, marginRight: 8 },
  cardSectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  
  // Grid de Inputs Paralelos
  rowInputs: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, marginBottom: 8, letterSpacing: 0.3 },
  inputInput: { 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 15, 
    color: colors.text, 
    fontWeight: '600' 
  },
  textArea: { minHeight: 85, textAlignVertical: 'top', lineHeight: 20 },

  // Listagem Premium de Tipos de Segmento (Substituindo Emojis e Grid Antigo)
  blockTitle: { fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 1.2, marginBottom: 12, marginLeft: 2 },
  listaSegmentos: { marginBottom: 24, gap: 10 },
  segmentoLinha: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1
  },
  segmentoLinhaSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF', // Roxo corporativo ultra leve de fundo
    borderWidth: 1.5
  },
  segmentoInfoLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  
  // Elemento Geométrico do Radio Button Customizado
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioOuterSelected: {
    borderColor: colors.primary
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  segmentoLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  segmentoLabelSelected: { color: colors.primary, fontWeight: '700' },
  segmentoDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2, paddingRight: 10 },

  actionContainer: { marginTop: 4 }
});
