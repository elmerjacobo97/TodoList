import {useColorScheme} from 'react-native';
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import {ThemeState, themeReducer, lightTheme, darkTheme} from './themeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, dispatch] = useReducer(
    themeReducer,
    colorScheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    colorScheme === 'dark' ? setDarkTheme() : setLightTheme();
  }, [colorScheme]);

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
    console.log('Set dark theme');
  };

  const setLightTheme = () => {
    dispatch({type: 'set_light_theme'});
    console.log('Set light theme');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
