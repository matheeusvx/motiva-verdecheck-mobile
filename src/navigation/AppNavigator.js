import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewInspectionScreen from '../screens/NewInspectionScreen';
import CameraMockScreen from '../screens/CameraMockScreen';
import ProcessingScreen from '../screens/ProcessingScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';
import { colors } from '../utils/theme';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const InspectionStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();

function InspectionFlow() {
  return (
    <InspectionStack.Navigator>
      <InspectionStack.Screen name="NewInspection" component={NewInspectionScreen} options={{ title: 'Nova análise' }} />
      <InspectionStack.Screen name="CameraMock" component={CameraMockScreen} options={{ title: 'Captura de imagem' }} />
      <InspectionStack.Screen name="Processing" component={ProcessingScreen} options={{ title: 'Processando' }} />
      <InspectionStack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultado' }} />
    </InspectionStack.Navigator>
  );
}

function HistoryFlow() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="HistoryList" component={HistoryScreen} options={{ title: 'Histórico' }} />
      <HistoryStack.Screen name="InspectionDetail" component={InspectionDetailScreen} options={{ title: 'Detalhe da inspeção' }} />
    </HistoryStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { height: 68, paddingBottom: 8 }
      }}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Análise" component={InspectionFlow} />
      <Tab.Screen name="Histórico" component={HistoryFlow} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Main" component={AppTabs} />
    </RootStack.Navigator>
  );
}
