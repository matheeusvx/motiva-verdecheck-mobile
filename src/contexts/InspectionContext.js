import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@motiva_verdecheck_history';
const USER_KEY = '@motiva_verdecheck_user';
const InspectionContext = createContext(null);

const MOCK_INICIAL = [
  {
    id: 'mock-1',
    road: 'SP-310',
    km: '142',
    direction: 'Norte (Interior)',
    areaType: 'canteiro_central',
    notes: 'Mato alto cobrindo placas de sinalização.',
    estimatedHeight: '120cm',
    status: 'Crítico',
    date: '15/06/2026',
    imageUri: 'https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=600&q=80'
  }
];

export function InspectionProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({ name: 'Inspetor' });
  const [draft, setDraft] = useState({
    road: '', km: '', direction: '', areaType: 'faixa_comum', notes: '', estimatedHeight: '', imageUri: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const rawHistory = await AsyncStorage.getItem(STORAGE_KEY);
      if (rawHistory) setHistory(JSON.parse(rawHistory));
      else {
        setHistory(MOCK_INICIAL);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INICIAL));
      }

      const rawUser = await AsyncStorage.getItem(USER_KEY);
      if (rawUser) setUser(JSON.parse(rawUser));
    } catch (error) {
      console.warn('Erro ao carregar dados', error);
    }
  }

  async function loginUser(email) {
    // Extrai o nome do email (ex: munizcaua@gmail.com vira Munizcaua)
    const rawName = email.split('@')[0];
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const userData = { name: formattedName };
    
    setUser(userData);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  async function logoutUser() {
    setUser({ name: 'Inspetor' });
    await AsyncStorage.removeItem(USER_KEY);
  }

  function updateDraft(partial) {
    setDraft(prev => ({ ...prev, ...partial }));
  }

  function resetDraft() {
    setDraft({ road: '', km: '', direction: '', areaType: 'faixa_comum', notes: '', estimatedHeight: '', imageUri: '' });
  }

  async function saveInspection(record) {
    const next = [record, ...history];
    setHistory(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const value = useMemo(
    () => ({ history, user, draft, loginUser, logoutUser, updateDraft, resetDraft, saveInspection }),
    [history, user, draft]
  );

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspection() {
  const context = useContext(InspectionContext);
  if (!context) throw new Error('useInspection deve ser usado com InspectionProvider');
  return context;
}
