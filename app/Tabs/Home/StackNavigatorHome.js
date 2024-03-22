import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import index from './index';
import info from './info';

const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={index}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Menu"
        component={info}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorHome;

const styles = StyleSheet.create({});
