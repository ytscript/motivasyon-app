import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Share, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface QuoteCardProps {
  quote: {
    id: string;
    text: string;
    author: string;
    category: string;
    views?: number;
    likes?: number;
    comments?: number;
  };
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export function QuoteCard({ quote, isFavorite, onFavorite }: QuoteCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(
        isLiked 
          ? Haptics.ImpactFeedbackStyle.Light 
          : Haptics.ImpactFeedbackStyle.Heavy
      );
    }
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      await Share.share({
        message: `"${quote.text}"\n\n- ${quote.author}`,
        title: 'Motivasyon Sözü Paylaş'
      });
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  const handleSpeak = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      await Speech.speak(quote.text + ' ' + quote.author, {
        language: 'tr-TR',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('Ses hatası:', error);
      setIsSpeaking(false);
    }
  };

  return (
    <Animated.View entering={FadeIn}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.category}>
            <IconButton icon="bookmark" size={20} iconColor={Theme.colors.primary} />
            <ThemedText style={styles.categoryText}>{quote.category}</ThemedText>
          </View>
          <IconButton 
            icon={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            iconColor={isFavorite ? Theme.colors.secondary : Theme.colors.text.muted}
            onPress={onFavorite}
          />
        </View>

        <ThemedText style={styles.quote}>"{quote.text}"</ThemedText>
        <ThemedText style={styles.author}>- {quote.author}</ThemedText>

        <View style={styles.footer}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <IconButton icon="eye" size={16} iconColor={Theme.colors.text.muted} />
              <ThemedText style={styles.statText}>{quote.views || 0}</ThemedText>
            </View>
            <View style={styles.stat}>
              <IconButton 
                icon={isLiked ? "heart" : "heart-outline"}
                size={16} 
                iconColor={isLiked ? Theme.colors.secondary : Theme.colors.text.muted}
                onPress={handleLike}
              />
              <ThemedText style={styles.statText}>{(quote.likes || 0) + (isLiked ? 1 : 0)}</ThemedText>
            </View>
          </View>
          
          <View style={styles.actions}>
            <IconButton 
              icon={isSpeaking ? "volume-off" : "volume-high"}
              size={20}
              iconColor={isSpeaking ? Theme.colors.primary : Theme.colors.text.muted}
              onPress={handleSpeak}
            />
            <IconButton 
              icon="share-variant-outline" 
              size={20} 
              iconColor={Theme.colors.text.muted}
              onPress={handleShare}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface.default,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: Theme.colors.text.muted,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quote: {
    fontSize: 18,
    lineHeight: 28,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.md,
    fontWeight: '500',
  },
  author: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.lg,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.surface.light,
  },
  stats: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Theme.colors.text.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
});