import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase("myappgoals.db");

const EditPersonal = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [emotionalState, setEmotionalState] = useState("");
  const [mentalState, setMentalState] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");

  const navigation = useNavigation();

  const saveData = () => {
    const userData = [weight, height, goal, emotionalState, mentalState, physicalActivity];

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, weight TEXT, height TEXT, goal TEXT, emotionalState TEXT, mentalState TEXT, physicalActivity TEXT);`
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (weight, height, goal, emotionalState, mentalState, physicalActivity) VALUES (?, ?, ?, ?, ?, ?)',
        userData,
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Data saved", "Your data has been saved successfully");
            navigation.goBack(); // Возвращаемся на предыдущий экран после сохранения
          } else {
            Alert.alert("Data save failed", "An error occurred while saving your data");
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  };

return (
    <><View
        style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 120,
            backgroundColor: "white",
            width: "100%",
            height: "7%",
        }}
    >


        <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>
            Personal Goals
        </Text>

        <Pressable onPress={saveData}>
            <AntDesign style={{ marginLeft: 45 }} name="edit" size={30} color="black" />
        </Pressable>
    </View>
    
    <View style={styles.userDataContainer}>
            <View style={styles.header}>
            </View>
            <MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Weight"
                value={weight}
                onChangeText={text => setWeight(text)}
                keyboardType="numeric" />
            <MaterialCommunityIcons name="human-male-height" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Height"
                value={height}
                onChangeText={text => setHeight(text)}
                keyboardType="numeric" />
            <MaterialIcons name="food-bank" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Goal (Cut/Bulk)"
                value={goal}
                onChangeText={text => setGoal(text)} />
            <MaterialIcons name="emoji-emotions" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Emotional State (1-10)"
                value={emotionalState}
                onChangeText={text => setEmotionalState(text)}
                keyboardType="numeric" />
            <FontAwesome6 name="brain" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Mental State (1-10)"
                value={mentalState}
                onChangeText={text => setMentalState(text)}
                keyboardType="numeric" />
            <FontAwesome5 name="running" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder="Physical Activity (1-10)"
                value={physicalActivity}
                onChangeText={text => setPhysicalActivity(text)}
                keyboardType="numeric" />
                

        </View></>
  );
}
const styles = StyleSheet.create({
    userDataContainer: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "black",
    },
    input: {
      borderWidth: 0,
      borderColor: "gray",
      borderRadius: 5,
      padding: 5,
      width: 340,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      marginTop: -25,
      marginLeft: 35
    },
    button: {
      backgroundColor: "blue",
      paddingVertical: 12,
      paddingHorizontal: 50,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
    },
  });

export default EditPersonal;
