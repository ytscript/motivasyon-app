const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  }
};

const LightTheme = {
  colors: {
    primary: '#7C3AED',
    accent: '#4F46E5',
    background: '#FDF8F3',
    surface: {
      default: '#FFFAF5',
      light: '#FFF9F2',
      dark: '#F5EDE4',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
      muted: '#94A3B8',
      light: '#FFFFFF',
    },
  },
  ...baseTheme
};

const DarkTheme = {
  colors: {
    primary: '#8B5CF6',
    accent: '#6366F1',
    background: '#0F172A',
    surface: {
      default: '#1E293B',
      light: '#334155',
      dark: '#0F172A',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#E2E8F0',
      muted: '#94A3B8',
      light: '#FFFFFF',
    },
  },
  ...baseTheme
};

// Varsayılan tema olarak light theme'i kullanıyoruz
const defaultTheme = LightTheme;

export const Theme = {
  light: LightTheme,
  dark: DarkTheme,
  ...defaultTheme
}; 