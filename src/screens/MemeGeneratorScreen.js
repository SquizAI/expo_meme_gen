/**
 * MemeGeneratorScreen.js
 * Main screen for generating memes using OpenAI's image generation capabilities
 */

import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  ActivityIndicator,
  Card,
  Chip,
  Portal,
  Dialog,
  Paragraph, 
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { generateMemeImage } from '../services/openaiService';

const MemeGeneratorScreen = () => {
  const navigation = useNavigation();
  
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Handle meme generation
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your meme');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Call the OpenAI service to generate the image
      const imageData = await generateMemeImage(prompt);
      
      setGeneratedImage(`data:image/png;base64,${imageData}`);
    } catch (err) {
      setError('Failed to generate meme. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  // Navigate to editor screen with the generated image
  const handleEdit = useCallback(() => {
    if (generatedImage) {
      navigation.navigate('MemeEditor', { imageUri: generatedImage });
    }
  }, [generatedImage, navigation]);

  // Handle saving the generated meme
  const handleSave = useCallback(() => {
    // Here you would implement saving to local storage or cloud
    setDialogVisible(true);
  }, [generatedImage]);

  // Hide dialog
  const hideDialog = useCallback(() => {
    setDialogVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create a Meme</Text>
          <Text style={styles.subtitle}>
            Describe the meme you want to create and our AI will generate it
          </Text>
        </View>

        <Card style={styles.inputCard}>
          <Card.Content>
            <TextInput
              label="Meme Description"
              placeholder="e.g., 'A cat wearing sunglasses and riding a skateboard'"
              value={prompt}
              onChangeText={setPrompt}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={handleGenerate}
              disabled={loading}
              loading={loading}
              icon="image-plus"
              style={styles.generateButton}
            >
              Generate Meme
            </Button>
          </Card.Actions>
        </Card>

        {error && (
          <Card style={styles.errorCard}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.errorText}>{error}</Text>
            </Card.Content>
          </Card>
        )}

        {generatedImage && (
          <Card style={styles.resultCard}>
            <Card.Cover
              source={{ uri: generatedImage }}
              style={styles.generatedImage}
              resizeMode="contain"
            />
            
            <Card.Actions style={styles.actionButtons}>
              <Button mode="outlined" icon="content-save" onPress={handleSave}>
                Save
              </Button>
              
              <Button mode="contained" icon="pencil" onPress={handleEdit}>
                Edit
              </Button>
            </Card.Actions>
          </Card>
        )}

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.tipsTitle}>Tips for Great Memes:</Text>
            <Text variant="bodyMedium" style={styles.tipText}>• Be specific about what you want</Text>
            <Text variant="bodyMedium" style={styles.tipText}>• Include details about emotions or expressions</Text>
            <Text variant="bodyMedium" style={styles.tipText}>• Mention any text you want included</Text>
            <Text variant="bodyMedium" style={styles.tipText}>• Specify the style (e.g., cartoon, realistic)</Text>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Success!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Your meme has been saved to your library.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputCard: {
    marginBottom: 24,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
  },
  generateButton: {
    marginLeft: 'auto',
  },
  errorCard: {
    marginBottom: 24,
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#d32f2f',
  },
  resultCard: {
    marginBottom: 24,
    elevation: 3,
  },
  generatedImage: {
    height: 300,
    marginBottom: 16,
  },
  actionButtons: {
    justifyContent: 'space-around',
  },
  tipsCard: {
    marginBottom: 24,
    backgroundColor: '#e3f2fd',
  },
  tipsTitle: {
    marginBottom: 12,
    color: '#1565c0',
  },
  tipText: {
    marginBottom: 8,
  },
});

export default MemeGeneratorScreen;
