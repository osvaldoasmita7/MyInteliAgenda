import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigator} from './StackNavigator';

export const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
