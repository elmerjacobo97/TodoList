import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {styled, useColorScheme} from 'nativewind';
import {HomeScreen} from './src/screens';

const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const backgroundStyle: string = 'bg-neutral-200 dark:bg-slate-900';

  return (
    <StyledSafeAreaView className={`flex-1 ${backgroundStyle}`}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <HomeScreen
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      />
    </StyledSafeAreaView>
  );
}
