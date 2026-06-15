// src/screens/ResultScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';

import { useInspection } from '../contexts/InspectionContext';

import { colors } from '../utils/theme';



export default function ResultScreen({ navigation }) {
  const { draft, saveInspection, resetDraft } = useInspection();


  const handleFinish = async () => {
    const record = {
    
    
    
  id: String(Date.now()),
      road: draft.road,
      km: draft.km,
      direction: draft.direction,
      status: 'Crítico', // Simulado
      estimatedHeight: draft.estimatedHeight + 'cm',
      date: new Date().toLocaleDateString('pt-BR'),
    };
    await saveInspection(record);
    resetDraft();
    navigation.navigate('Início');
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.title}>Diagnóstico</Text>
        <Text style={styles.subtitle}>Resultado da análise de imagem.</Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>STATUS DETECTADO</Text>
          <Text style={[styles.resultValue, { color: colors.error }]}>Nível Crítico</Text>
          <View style={styles.divider} />
          <Text style={styles.resultDesc}>
            Detectamos vegetação com altura média de <Text style={styles.bold}>{draft.estimatedHeight}cm</Text>. 
            O trecho requer intervenção imediata da equipe de roçada.
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Detalhes do Trecho</Text>
          <View style={styles.detailRow}><Text style={styles.dL}>Rodovia</Text><Text style={styles.dV}>{draft.road}</Text></View>
          <View style={styles.detailRow}><Text style={styles.dL}>Quilômetro</Text><Text style={styles.dV}>{draft.km}</Text></View>
          <View style={styles.detailRow}><Text style={styles.dL}>Confiança IA</Text><Text style={styles.dV}>94.2%</Text></View>
        </View>

        <PrimaryButton label="Salvar e Finalizar" onPress={handleFinish} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollPadding: { paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 24 },
  resultCard: { backgroundColor: '#FEF2F2', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: '#FCA5A5', marginBottom: 16 },
  resultLabel: { fontSize: 10, fontWeight: '800', color: '#991B1B', letterSpacing: 1 },
  resultValue: { fontSize: 32, fontWeight: '800', marginVertical: 8 },
  divider: { height: 1, backgroundColor: '#FCA5A5', opacity: 0.3, marginVertical: 16 },
  resultDesc: { fontSize: 15, color: '#7F1D1D', lineHeight: 22 },
  bold: { fontWeight: '700' },
  detailsCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.border, marginBottom: 24 },
  detailsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  dL: { color: colors.textMuted, fontSize: 14 },
  dV: { fontWeight: '600', color: colors.text, fontSize: 14 }
});
