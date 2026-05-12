import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { InspectionProvider } from './src/contexts/InspectionContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <InspectionProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </InspectionProvider>
    </SafeAreaProvider>
  );
}
