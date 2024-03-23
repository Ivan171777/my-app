import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlannerScreen from '../screens/PlannerScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorPlanner = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Planner"
        component={PlannerScreen}/>
    </Stack.Navigator>
  );
};

export default StackNavigatorPlanner;

const styles = StyleSheet.create({});
