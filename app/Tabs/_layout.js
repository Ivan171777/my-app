import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import StackNavigator from "C:/Users/Ivan/build/my-app/app/Tabs/Fitness/StackNavigator";

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Tasks",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <FontAwesome name="tasks" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            )
          }}
        />
        
        <Tabs.Screen
          name="Fitness"
          options={{
            tabBarLabel: "Fitness",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <Ionicons name="fitness" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="fitness" size={24} color="black" />
            )
          }}
        ></Tabs.Screen>
          <Tabs.Group>
          {/* Внутри каждой вкладки используйте StackNavigator */}
          {() => <StackNavigator />}
        </Tabs.Group>
        <Tabs.Screen
          name="Planner"
          options={{
            tabBarLabel: "Planner",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            )
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <MaterialCommunityIcons name="account-details" size={24} color="#7CB9E8" />
            ) : (
              <MaterialCommunityIcons name="account-details" size={24} color="black" />
            )
          }}
        />
    </Tabs>
  );
}
