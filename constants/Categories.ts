import { QuoteCategory } from './Quotes';

interface CategoryConfig {
  title: string;
  description: string;
  icon: string;
}

export const categoryConfigs = {
  business: {
    title: 'İş Hayatı',
    description: 'Kariyer ve profesyonel gelişim',
    icon: 'chart.line'
  },
  love: {
    title: 'Aşk & İlişkiler',
    description: 'İlişkiler ve duygusal gelişim',
    icon: 'heart.fill'
  },
  sports: {
    title: 'Spor & Sağlık',
    description: 'Fiziksel ve zihinsel sağlık',
    icon: 'figure.walk'
  },
  education: {
    title: 'Eğitim & Gelişim',
    description: 'Kişisel gelişim ve öğrenme',
    icon: 'book.fill'
  },
  general: {
    title: 'Genel',
    description: 'Genel motivasyon sözleri',
    icon: 'star.fill'
  }
} as const;

export type CategoryType = keyof typeof categoryConfigs; 