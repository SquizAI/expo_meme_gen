/**
 * MemeGeneratorScreen.js
 * Main screen for generating memes using OpenAI's image generation capabilities
 */

import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { generateMemeImage } from '../services/openaiService';

const MemeGeneratorScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle saving the generated meme
  const handleSave = useCallback(() => {
    // Here you would implement saving to local storage or cloud
    alert('Meme saved to your library!');
  }, [generatedImage]);

  // Handle sharing the meme
  const handleShare = useCallback(() => {
    // Here you would implement the sharing functionality
    alert('Sharing functionality to be implemented');
  }, [generatedImage]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create a Meme</Text>
          <Text style={styles.subtitle}>
            Describe the meme you want to create and our AI will generate it
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Describe your meme (e.g., 'A cat wearing sunglasses and riding a skateboard')"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity 
            style={styles.generateButton}
            onPress={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Meme</Text>
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {generatedImage && (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: generatedImage }}
              style={styles.generatedImage}
              resizeMode="contain"
            />
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for Great Memes:</Text>
          <Text style={styles.tipText}>• Be specific about what you want</Text>
          <Text style={styles.tipText}>• Include details about emotions or expressions</Text>
          <Text style={styles.tipText}>• Mention any text you want included</Text>
          <Text style={styles.tipText}>• Specify the style (e.g., cartoon, realistic)</Text>
        </View>
      </ScrollView>
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
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    minHeight: 100,
  },
  generateButton: {
    backgroundColor: '#4c6ef5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  generatedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1565c0',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});

export default MemeGeneratorScreen;
