type ThemeAction = {type: 'set_light_theme'} | {type: 'set_dark_theme'};

export interface ThemeState {
  currentTheme: 'light' | 'dark';
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#008080',
    background: '#FFFFFF',
    card: '#008000',
    text: '#000000',
    border: '#FFA500',
    notification: '#007BFF',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  colors: {
    primary: '#008080',
    background: '#1E1E1E',
    card: '#006400',
    text: '#FFFFFF',
    border: '#FFA500',
    notification: '#007BFF',
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightTheme};
    case 'set_dark_theme':
      return {...darkTheme};
    default:
      return state;
  }
};
