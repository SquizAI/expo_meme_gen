/**
 * theme.js
 * Application theme constants including colors, spacing, and typography
 */

export const COLORS = {
  primary: '#6200ee',
  primaryDark: '#3700b3',
  primaryLight: '#bb86fc',
  secondary: '#03dac6',
  secondaryDark: '#018786',
  background: '#f5f5f5',
  surface: '#ffffff',
  error: '#b00020',
  success: '#4caf50',
  warning: '#ff9800',
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#9e9e9e',
    inverse: '#ffffff',
  },
  statusBar: {
    light: '#ffffff',
    dark: '#000000',
  }
};

export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: 'bold' },
  h4: { fontSize: 18, fontWeight: '600' },
  body1: { fontSize: 16 },
  body2: { fontSize: 14 },
  caption: { fontSize: 12 },
  button: { fontSize: 16, fontWeight: '600' },
};

export const LAYOUT = {
  radius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  shadow: {
    light: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.8,
      elevation: 3,
    },
    heavy: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.5,
      elevation: 5,
    },
  },
};

export const createTheme = (isDarkMode = false) => {
  if (isDarkMode) {
    // Dark theme colors would go here
    return {
      colors: {
        ...COLORS,
        background: '#121212',
        surface: '#1e1e1e',
        text: {
          primary: '#ffffff',
          secondary: '#e0e0e0',
          disabled: '#9e9e9e',
          inverse: '#000000',
        },
      },
      spacing: SPACING,
      typography: TYPOGRAPHY,
      layout: LAYOUT,
    };
  }

  // Light theme (default)
  return {
    colors: COLORS,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    layout: LAYOUT,
  };
};

export default createTheme;
