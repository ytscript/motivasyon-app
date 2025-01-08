const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.default,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    // 3D efekti için sadece alt ve sağ kenara border
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: theme.colors.surface.dark,
    borderRightColor: theme.colors.surface.dark,
    // Hafif gölge
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // ... diğer stiller aynı kalacak
}); 