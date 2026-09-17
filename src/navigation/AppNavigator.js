// src/navigation/AppNavigator.js
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

// Importação do Contexto para proteger as rotas
import { useInspection } from '../contexts/InspectionContext';

// Importação das Telas
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewInspectionScreen from '../screens/NewInspectionScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CameraMockScreen from '../screens/CameraMockScreen';
import ProcessingScreen from '../screens/ProcessingScreen';
import ResultScreen from '../screens/ResultScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente de Ícone Customizado usando Emojis
function TabIcon({ focused, type }) {
  let emoji = '🏠';
  if (type === 'analise') emoji = '🌱';
  if (type === 'historico') emoji = '📂';

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
    </View>
  );
}

// Menu de Abas Inferiores (Bottom Tab Navigator)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4C1D95',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          height: 64,
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} type="home" />
        }}
      />
      <Tab.Screen 
        name="Nova Análise" 
        component={NewInspectionScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} type="analise" />
        }}
      />
      <Tab.Screen 
        name="Histórico" 
        component={HistoryScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} type="historico" />
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador Principal Dinâmico
export default function AppNavigator() {
  const { user } = useInspection();

  // Se o contexto ainda estiver carregando os dados do AsyncStorage (user inicial é indefinido ou nulo)
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C1D95" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.name === 'Inspetor' ? (
        // Se o usuário não está logado (nome padrão), essa fila fica ativa
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Se o usuário está logado (ex: Lucas), essa fila assume o controle
        <>
          <Stack.Screen name="Home" component={MainTabs} />
          <Stack.Screen name="CameraMock" component={CameraMockScreen} />
          <Stack.Screen name="Processing" component={ProcessingScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="InspectionDetail" component={InspectionDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: '#EEF2FF', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC'
  }
});