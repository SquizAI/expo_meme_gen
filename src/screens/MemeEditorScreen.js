import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, Chip, IconButton } from 'react-native-paper';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MemeEditorScreen = ({ route, navigation }) => {
  // The image URI would be passed from MemeGeneratorScreen
  const { imageUri } = route.params || { 
    imageUri: 'https://picsum.photos/700/500' // Placeholder for testing
  };
  
  const [memeImage, setMemeImage] = useState(imageUri);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Impact');
  const [textColor, setTextColor] = useState('#FFFFFF');
  
  const availableFonts = ['Impact', 'Arial', 'Comic Sans', 'Helvetica'];
  const availableColors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

  const applyFilter = async (filterType) => {
    try {
      // This is a placeholder for where we would apply image filters
      // In a real implementation, we would use ImageManipulator to apply actual filters
      console.log(`Applying ${filterType} filter`);
      
      // Example of image manipulation (just a brightness adjustment as demo)
      const manipResult = await ImageManipulator.manipulateAsync(
        memeImage,
        [{ brightness: filterType === 'Bright' ? 0.5 : -0.5 }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      setMemeImage(manipResult.uri);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const saveMeme = async () => {
    // Here we would save the meme to the device gallery
    // This is a placeholder for the actual implementation
    console.log('Saving meme...');
    navigation.goBack();
  };

  const shareMeme = async () => {
    try {
      // In a real implementation, we would first generate the final meme with text overlay
      // Then share the image using Expo Sharing
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(memeImage);
      } else {
        alert("Sharing is not available on your platform");
      }
    } catch (error) {
      console.error('Error sharing meme:', error);
      alert('Failed to share meme');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: memeImage }} style={styles.memeImage} />
        
        {/* Text overlays - in a real app we would render these on the image */}
        <View style={styles.topTextContainer}>
          <Text style={[styles.memeText, { color: textColor }]}>{topText}</Text>
        </View>
        
        <View style={styles.bottomTextContainer}>
          <Text style={[styles.memeText, { color: textColor }]}>{bottomText}</Text>
        </View>
      </View>
      
      <View style={styles.editorContainer}>
        <TextInput
          label="Top Text"
          value={topText}
          onChangeText={setTopText}
          style={styles.textInput}
        />
        
        <TextInput
          label="Bottom Text"
          value={bottomText}
          onChangeText={setBottomText}
          style={styles.textInput}
        />
        
        <Text style={styles.sectionTitle}>Font Style</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
          {availableFonts.map((font) => (
            <Chip
              key={font}
              selected={selectedFont === font}
              onPress={() => setSelectedFont(font)}
              style={styles.chip}
            >
              {font}
            </Chip>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Text Color</Text>
        <View style={styles.colorContainer}>
          {availableColors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                textColor === color && styles.selectedColor,
              ]}
              onPress={() => setTextColor(color)}
            />
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Filters</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
          {['Normal', 'Bright', 'Dark', 'Sepia', 'Vintage'].map((filter) => (
            <Chip
              key={filter}
              onPress={() => applyFilter(filter)}
              style={styles.chip}
            >
              {filter}
            </Chip>
          ))}
        </ScrollView>
        
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            icon="content-save"
            style={styles.actionButton}
            onPress={saveMeme}
          >
            Save
          </Button>
          
          <Button
            mode="contained"
            icon="share-variant"
            style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
            onPress={shareMeme}
          >
            Share
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  memeImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  topTextContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  memeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    padding: 8,
  },
  editorContainer: {
    padding: 16,
  },
  textInput: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  optionsScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default MemeEditorScreen;
