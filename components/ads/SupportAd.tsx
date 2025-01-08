import React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

export function SupportAd() {
  if (Platform.OS === 'web') return null;
  
  return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => {
          console.log('Reklam butonu tıklandı');
        }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]}
      >
        <IconButton 
          icon="heart" 
          size={24}
          iconColor={Theme.colors.primary}
        />
        <ThemedText style={styles.text}>
          Reklam İzle & Destek Ol
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.surface.default,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.surface.light,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginLeft: Theme.spacing.sm,
  }
}); 