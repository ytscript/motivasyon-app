import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Avatar, Switch, Divider } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';

export default function AccountScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { padding: Theme.spacing.xl }]}>
        <Avatar.Icon 
          size={80} 
          icon="account"
          style={[styles.avatar, { 
            backgroundColor: theme.colors.primary,
            marginBottom: Theme.spacing.md 
          }]}
          color={theme.colors.text.light}
        />
        <ThemedText style={styles.name}>Kullanıcı Adı</ThemedText>
      </View>

      <List.Section>
        <List.Item
          title="Profili Düzenle"
          left={props => <List.Icon {...props} icon="account-edit" color={theme.colors.primary} />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.text.light }]}
        />
        <Divider style={[styles.divider, { backgroundColor: theme.colors.surface.light }]} />
        <List.Item
          title="Bildirim Ayarları"
          left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.text.light }]}
        />
        <Divider style={[styles.divider, { backgroundColor: theme.colors.surface.light }]} />
        <List.Item
          title="Koyu Tema"
          left={props => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.text.light }]}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider style={[styles.divider, { backgroundColor: theme.colors.surface.light }]} />
        <List.Item
          title="Gizlilik"
          left={props => <List.Icon {...props} icon="shield" color={theme.colors.primary} />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.text.light }]}
        />
        <Divider style={[styles.divider, { backgroundColor: theme.colors.surface.light }]} />
        <List.Item
          title="Yardım"
          left={props => <List.Icon {...props} icon="help-circle" color={theme.colors.primary} />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.text.light }]}
        />
        <Divider style={[styles.divider, { backgroundColor: theme.colors.surface.light }]} />
        <List.Item
          title="Çıkış Yap"
          left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
          titleStyle={{ color: theme.colors.error }}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: Theme.spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  listItemTitle: {
    fontSize: 16,
  },
  divider: {
    opacity: 0.5,
  },
}); 