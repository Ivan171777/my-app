import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './index';
import info from './info';
import task from './task';

const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={index}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Menu"
        component={info}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Task"
        component={task}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorHome;

const styles = StyleSheet.create({});
