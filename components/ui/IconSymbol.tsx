// This file is a fallback for using MaterialIcons on Android and web.

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
}

export function IconSymbol({ name, size = 24, color = '#000' }: IconSymbolProps) {
  // SF Symbols isimlerini Material Icons isimlerine dönüştür
  const iconMap: Record<string, string> = {
    'heart.fill': 'heart',
    'star.fill': 'star',
    'book.fill': 'book-open-variant',
    'chart.line': 'chart-line',
    'figure.walk': 'walk',
  };

  const materialIconName = iconMap[name] || 'star';

  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons 
        name={materialIconName}
        size={size}
        color={color}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    alignSelf: 'center',
  }
});
