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
    areaLabel: 'Canteiro Central',
    notes: 'Mato alto cobrindo placas de sinalização e canaleta.',
    estimatedHeight: '120',
    status: 'Cortar',
    severity: 'Crítico',
    confidence: 0.94,
    date: '15/06/2026',
    justification: 'A altura informada (120 cm) ultrapassa a tolerância máxima de 20 cm para Canteiro Central.',
    imageUri: 'https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mock-2',
    road: 'SP-348',
    km: '45',
    direction: 'Sul (Capital)',
    areaType: 'faixa_comum',
    areaLabel: 'Faixa de Domínio Comum',
    notes: 'Vegetação rasteira uniforme, sem interferência em defensas metálicas.',
    estimatedHeight: '18',
    status: 'Não cortar',
    severity: 'Conforme',
    confidence: 0.92,
    date: '16/06/2026',
    justification: 'A altura informada (18 cm) está dentro da tolerância de até 30 cm para Faixa de Domínio Comum.',
    imageUri: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mock-3',
    road: 'SP-330',
    km: '98',
    direction: 'Norte (Interior)',
    areaType: 'area_nobre',
    areaLabel: 'Área Nobre (Trevos e Acessos)',
    notes: 'Trevo de acesso ao distrito industrial, exige padrão visual alto.',
    estimatedHeight: '16',
    status: 'Cortar',
    severity: 'Atenção',
    confidence: 0.89,
    date: '17/06/2026',
    justification: 'A altura informada (16 cm) ultrapassa a tolerância máxima de 10 cm para Área Nobre.',
    imageUri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
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
      if (rawHistory) {
        setHistory(JSON.parse(rawHistory));
      } else {
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

  async function clearHistory() {
    setHistory([]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }

  async function resetDefaultHistory() {
    setHistory(MOCK_INICIAL);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INICIAL));
  }

  const value = useMemo(
    () => ({
      history,
      user,
      draft,
      loginUser,
      logoutUser,
      updateDraft,
      resetDraft,
      saveInspection,
      clearHistory,
      resetDefaultHistory
    }),
    [history, user, draft]
  );

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspection() {
  const context = useContext(InspectionContext);
  if (!context) throw new Error('useInspection deve ser usado com InspectionProvider');
  return context;
}
