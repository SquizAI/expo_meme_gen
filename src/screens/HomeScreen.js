import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meme Generator</Text>
        <Text style={styles.subtitle}>Create AI-powered memes in seconds</Text>
      </View>

      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: 'https://picsum.photos/700' }} 
          style={styles.cardImage}
        />
        <Card.Content>
          <Text variant="titleLarge">Create New Meme</Text>
          <Text variant="bodyMedium">Generate custom memes with AI using simple text prompts</Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="contained"
            onPress={() => navigation.navigate('Create')}
          >
            Start Creating
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Recent Creations</Text>
          <Text variant="bodyMedium">Your meme journey starts here!</Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="outlined"
            onPress={() => navigation.navigate('Library')}
          >
            View Library
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">AI Chat Assistant</Text>
          <Text variant="bodyMedium">Get help and suggestions from our AI assistant</Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="outlined"
            // Chat feature will be implemented later
            onPress={() => console.log('Chat feature coming soon')}
          >
            Coming Soon
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#E1BEE7',
    marginTop: 8,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  cardImage: {
    height: 180,
  },
});

export default HomeScreen;
