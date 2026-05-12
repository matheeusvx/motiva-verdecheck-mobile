import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@motiva_verdecheck_history';
const InspectionContext = createContext(null);

export function InspectionProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState({
    road: '',
    km: '',
    direction: '',
    areaType: 'faixa_comum',
    notes: '',
    estimatedHeight: '',
    imageUri: ''
  });

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch (error) {
      console.warn('Erro ao carregar histórico', error);
    }
  }

  async function persistHistory(next) {
    setHistory(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('Erro ao salvar histórico', error);
    }
  }

  function updateDraft(partial) {
    setDraft(prev => ({ ...prev, ...partial }));
  }

  function resetDraft() {
    setDraft({
      road: '',
      km: '',
      direction: '',
      areaType: 'faixa_comum',
      notes: '',
      estimatedHeight: '',
      imageUri: ''
    });
  }

  async function saveInspection(record) {
    const next = [record, ...history];
    await persistHistory(next);
  }

  const value = useMemo(
    () => ({ history, draft, updateDraft, resetDraft, saveInspection }),
    [history, draft]
  );

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspection() {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection precisa ser usado dentro de InspectionProvider');
  }
  return context;
}
