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
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Menu de Abas Inferiores (Bottom Tab Navigator)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700', marginBottom: 6 },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
          elevation: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Nova Análise') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Histórico') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Nova Análise" component={NewInspectionScreen} />
      <Tab.Screen name="Histórico" component={HistoryScreen} />
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
        <ActivityIndicator size="large" color={colors.primary} />
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