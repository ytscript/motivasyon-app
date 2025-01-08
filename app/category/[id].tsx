import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { QuoteSlider } from '@/components/quotes/QuoteSlider';
import { categoryConfigs } from '@/constants/Categories';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const [isSliderVisible, setSliderVisible] = useState(true);

  const handleClose = () => {
    setSliderVisible(false);
  };

  if (!isSliderVisible) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: false,
        animation: 'fade',
      }} />
      <ThemedView style={styles.container}>
        <QuoteSlider 
          category={id as string} 
          onClose={handleClose}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 