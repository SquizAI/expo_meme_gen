import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Text, Card, IconButton, Chip, Searchbar } from 'react-native-paper';

const placeholderMemes = [
  { id: '1', image: 'https://picsum.photos/700/500', prompt: 'Example meme 1', date: '2025-06-01' },
  { id: '2', image: 'https://picsum.photos/701/500', prompt: 'Example meme 2', date: '2025-06-02' },
  { id: '3', image: 'https://picsum.photos/702/500', prompt: 'Example meme 3', date: '2025-06-03' },
];

const LibraryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);

  const filterCategories = ['Recent', 'Favorites', 'Shared'];

  const renderMemeItem = ({ item }) => (
    <Card style={styles.memeCard}>
      <Card.Cover source={{ uri: item.image }} style={styles.memeImage} />
      <Card.Title
        title={item.prompt}
        subtitle={item.date}
        right={(props) => (
          <View style={styles.cardActions}>
            <IconButton
              {...props}
              icon="heart-outline"
              onPress={() => console.log('Favorite')}
            />
            <IconButton
              {...props}
              icon="share-variant"
              onPress={() => console.log('Share')}
            />
            <IconButton
              {...props}
              icon="pencil"
              onPress={() => console.log('Edit')}
            />
          </View>
        )}
      />
    </Card>
  );

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search memes"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterCategories.map((category) => (
            <Chip
              key={category}
              selected={category === filterCategory}
              onPress={() => setFilterCategory(category === filterCategory ? null : category)}
              style={styles.filterChip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {placeholderMemes.length > 0 ? (
        <FlatList
          data={placeholderMemes}
          renderItem={renderMemeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.memeList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text variant="headlineSmall">No memes yet</Text>
          <Text variant="bodyMedium" style={styles.emptyStateText}>
            Create your first meme to see it here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  memeList: {
    padding: 8,
  },
  memeCard: {
    margin: 8,
    elevation: 2,
  },
  memeImage: {
    height: 200,
  },
  cardActions: {
    flexDirection: 'row',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.6,
  },
});

export default LibraryScreen;
