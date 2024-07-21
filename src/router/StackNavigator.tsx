import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CalendarScreen} from '../screens/CalendarScreen';
import {CreateScreen} from '../screens/CreateScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={CalendarScreen}
      />
      <Stack.Screen
        name="Create"
        options={{headerShown: false}}
        component={CreateScreen}
      />
    </Stack.Navigator>
  );
};
