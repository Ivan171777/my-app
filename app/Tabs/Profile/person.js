import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase("myappgoals.db");

const Person = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users ORDER BY id DESC LIMIT 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            const { weight, height, goal, emotionalState, mentalState, physicalActivity } = _array[0];
            setUserData({ weight, height, goal, emotionalState, mentalState, physicalActivity });
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Вызываем функцию fetchData каждый раз при фокусировке на экране
    }, [])
  );

  const goToEditScreen = () => {
    navigation.navigate('EditPersonal');
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
    
    <Pressable onPress={() => navigation.navigate('editpersonal')}>
      <AntDesign style={{marginLeft: 45}} name="edit" size={30} color="black" />
    </Pressable>
    </View>

    


<View style={styles.userDataContainer}>
  {userData && (
    <View style={styles.userDataContent}>
      <View style={styles.userDataItem}>
      <MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />
        <Text> Weight: {userData.weight}</Text>
      </View>
      <View style={styles.userDataItem}>
      <MaterialCommunityIcons name="human-male-height" size={24} color="black" />
        <Text> Height: {userData.height}</Text>
      </View>
      <View style={styles.userDataItem}>
      <MaterialIcons name="food-bank" size={24} color="black" />
        <Text> Goal: {userData.goal}</Text>
      </View>
      <View style={styles.userDataItem}>
      <MaterialIcons name="emoji-emotions" size={24} color="black" />
        <Text> Emotional State: {userData.emotionalState}</Text>
      </View>
      <View style={styles.userDataItem}>
      <FontAwesome6 name="brain" size={24} color="black" />
        <Text> Mental State: {userData.mentalState}</Text>
      </View>
      <View style={styles.userDataItem}>
      <FontAwesome5 name="running" size={24} color="black" />
        <Text> Physical Activity: {userData.physicalActivity}</Text>
      </View>
    </View>
  )}
</View>



</>
  );
};
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
  userDataContent: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  userDataItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});


export default Person;
