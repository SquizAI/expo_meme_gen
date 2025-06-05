import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { List, Switch, Button, Divider, Text } from 'react-native-paper';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [highQuality, setHighQuality] = useState(true);

  // This would connect to actual API key storage in a real implementation
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  const handleApiKeyPress = () => {
    Alert.alert(
      'OpenAI API Key',
      'Enter your OpenAI API key in the .env file to use this app. Never share your API key.',
      [{ text: 'OK' }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your saved memes and history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Data', 
          style: 'destructive',
          onPress: () => console.log('Data would be cleared here')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <List.Section>
        <List.Subheader>API Configuration</List.Subheader>
        <List.Item
          title="OpenAI API Key"
          description={apiKeyConfigured ? "API key is configured" : "API key is not configured"}
          left={(props) => <List.Icon {...props} icon="key" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleApiKeyPress}
        />
        <Divider />

        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Use dark theme throughout the app"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          )}
        />
        <Divider />

        <List.Subheader>Data & Privacy</List.Subheader>
        <List.Item
          title="Save Meme History"
          description="Keep a record of your created memes"
          left={(props) => <List.Icon {...props} icon="history" />}
          right={() => (
            <Switch
              value={saveHistory}
              onValueChange={setSaveHistory}
            />
          )}
        />
        <List.Item
          title="Enable Notifications"
          description="Get notified about new features"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          )}
        />
        <Divider />

        <List.Subheader>Performance</List.Subheader>
        <List.Item
          title="High Quality Generation"
          description="Generate higher resolution memes (uses more tokens)"
          left={(props) => <List.Icon {...props} icon="image-filter-hdr" />}
          right={() => (
            <Switch
              value={highQuality}
              onValueChange={setHighQuality}
            />
          )}
        />
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          style={styles.button}
          icon="information"
          onPress={() => console.log('About pressed')}
        >
          About
        </Button>
        <Button 
          mode="outlined" 
          style={[styles.button, styles.dangerButton]}
          textColor="#D32F2F"
          icon="delete"
          onPress={handleClearData}
        >
          Clear All Data
        </Button>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  button: {
    marginBottom: 16,
    width: '80%',
  },
  dangerButton: {
    borderColor: '#D32F2F',
  },
  versionText: {
    marginTop: 8,
    opacity: 0.6,
  },
});

export default SettingsScreen;
