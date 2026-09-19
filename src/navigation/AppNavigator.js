// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';

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
import { colors, shadows } from '../utils/theme';

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
        tabBarLabelStyle: { 
          fontSize: 11.5, 
          fontWeight: '700', 
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
          letterSpacing: 0.1
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          ...shadows.md,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Nova Análise') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Histórico') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          return (
            <View style={[styles.tabIconWrapper, focused && styles.tabIconWrapperActive]}>
              <Ionicons name={iconName} size={21} color={focused ? colors.primary : color} />
            </View>
          );
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

  // Se o contexto ainda estiver carregando os dados do AsyncStorage
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {user.name === 'Inspetor' ? (
        // Se o usuário não está logado
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Se o usuário está logado
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
  tabIconWrapper: {
    width: 40,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapperActive: {
    backgroundColor: colors.primaryLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  }
});