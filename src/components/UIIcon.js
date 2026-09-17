import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Componente de Ícones Vetoriais puros em React Native (sem emojis)
 * Tipos disponíveis: 'home', 'scan', 'history', 'camera', 'check', 'alert', 'chevron', 'user', 'share'
 */
export default function UIIcon({ name, color = '#4338CA', size = 20, focused = false }) {
  const activeColor = focused ? '#4338CA' : color;

  switch (name) {
    case 'home':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          {/* Teto */}
          <View style={[styles.homeRoof, { borderBottomColor: activeColor }]} />
          {/* Base */}
          <View style={[styles.homeBase, { borderColor: activeColor }]} />
        </View>
      );

    case 'scan':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          {/* Retículo de Scanner */}
          <View style={[styles.scanBox, { borderColor: activeColor }]}>
            <View style={[styles.scanCenterDot, { backgroundColor: activeColor }]} />
          </View>
        </View>
      );

    case 'history':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          {/* Linhas de Documento / Relatório */}
          <View style={[styles.historyDoc, { borderColor: activeColor }]}>
            <View style={[styles.historyLine, { backgroundColor: activeColor, width: 9 }]} />
            <View style={[styles.historyLine, { backgroundColor: activeColor, width: 7, marginTop: 2 }]} />
          </View>
        </View>
      );

    case 'camera':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View style={[styles.camBody, { borderColor: activeColor }]}>
            <View style={[styles.camLens, { borderColor: activeColor }]} />
          </View>
        </View>
      );

    case 'alert':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View style={[styles.alertTriangle, { borderBottomColor: activeColor }]}>
            <View style={styles.alertExclamation} />
          </View>
        </View>
      );

    case 'check':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View style={[styles.checkCircle, { backgroundColor: activeColor }]}>
            <View style={styles.checkMarkStem} />
            <View style={styles.checkMarkKick} />
          </View>
        </View>
      );

    case 'chevron':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View style={[styles.chevronRight, { borderColor: activeColor }]} />
        </View>
      );

    default:
      return <View style={{ width: size, height: size, backgroundColor: activeColor, borderRadius: size / 2 }} />;
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBase: {
    width: 12,
    height: 9,
    borderWidth: 1.8,
    borderTopWidth: 0,
  },
  scanBox: {
    width: 17,
    height: 17,
    borderWidth: 1.8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanCenterDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  historyDoc: {
    width: 15,
    height: 18,
    borderWidth: 1.8,
    borderRadius: 3,
    paddingTop: 3,
    paddingLeft: 2,
  },
  historyLine: {
    height: 1.8,
    borderRadius: 1,
  },
  camBody: {
    width: 18,
    height: 14,
    borderWidth: 1.8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camLens: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
  },
  alertTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignItems: 'center',
  },
  alertExclamation: {
    position: 'absolute',
    top: 5,
    width: 1.8,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMarkStem: {
    position: 'absolute',
    width: 2,
    height: 7,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    left: 8,
    top: 4,
  },
  checkMarkKick: {
    position: 'absolute',
    width: 4,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    left: 5,
    top: 8,
  },
  chevronRight: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
});
