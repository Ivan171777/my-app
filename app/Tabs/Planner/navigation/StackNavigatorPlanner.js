import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorPlanner = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Menu"
        component={MenuScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorPlanner;

const styles = StyleSheet.create({});
