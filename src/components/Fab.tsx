import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';
export const Fab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {width} = useWindowDimensions();
  return (
    <>
      <Button
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Create'}],
          });
        }}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          bottom: 10,
          position: 'absolute',
          zIndex: 9,
          left: width * 0.87,
        }}>
        +
      </Button>
    </>
  );
};
