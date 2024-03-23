import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import StackNavigator from "C:/Users/Ivan/build/my-app/app/Tabs/Fitness/StackNavigator";
import StackNavigatorPlanner from 'C:/Users/Ivan/build/my-app/app/Tabs/Planner/navigation/StackNavigatorPlanner';
import StackNavigatorHome from 'C:/Users/Ivan/build/my-app/app/Tabs/Home/StackNavigatorHome';

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Tasks",
            tabBarLabelStyle: { color: "grey" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <FontAwesome name="tasks" size={24} color="grey" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            )
          }}
        />
        {() => <StackNavigatorHome />}
        <Tabs.Screen
          name="Fitness"
          options={{
            tabBarLabel: "Activities",
            tabBarLabelStyle: { color: "grey" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <Ionicons name="fitness" size={24} color="grey" />
            ) : (
              <Ionicons name="fitness" size={24} color="black" />
            )
          }}
        >

        </Tabs.Screen>
          
          {() => <StackNavigator />}

        <Tabs.Screen
          name="Planner"
          options={{
            tabBarLabel: "Planner",
            tabBarLabelStyle: { color: "grey" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <AntDesign name="calendar" size={24} color="grey" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            )
          }}
          />
          
          {() => <StackNavigatorPlanner />}
        
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "grey" },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused? (
              <MaterialCommunityIcons name="account-details" size={24} color="grey" />
            ) : (
              <MaterialCommunityIcons name="account-details" size={24} color="black" />
            )
          }}
        />
    </Tabs>
  );
}
