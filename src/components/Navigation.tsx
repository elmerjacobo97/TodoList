// @flow
import * as React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {StyledComponent} from 'nativewind';
import {buttons} from '../helpers';
import {Dispatch, SetStateAction} from 'react';

interface Props {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export const Navigation = ({setSelectedCategory}: Props) => {
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <StyledComponent
      component={View}
      className="flex-row justify-between items-center my-3">
      {buttons.map(button => (
        <StyledComponent
          component={TouchableOpacity}
          activeOpacity={0.5}
          onPress={() => handleCategoryChange(button.value)}
          key={button.label}
          className={`${button.color} rounded-full p-2`}>
          <StyledComponent
            component={Text}
            className="text-white text-lg font-medium">
            {button.label}
          </StyledComponent>
        </StyledComponent>
      ))}
    </StyledComponent>
  );
};
