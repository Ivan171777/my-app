import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const db = SQLite.openDatabase('my-app.db'); // Ваша база данных
const userDB = SQLite.openDatabase('myapp.db'); // База данных с пользователями

const Index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTaskData();
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchTaskData();
    fetchUserData();
  }, []);

  const fetchTaskData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) AS totalCompletedTodos FROM tasktodos WHERE status = ?',
        ['completed'],
        (_, { rows: { _array } }) => {
          setCompletedTasks(_array[0]?.totalCompletedTodos || 0);
        },
        (_, error) => console.log('Error fetching completed tasks:', error)
      );
      
      tx.executeSql(
        'SELECT COUNT(*) AS totalTodos FROM tasktodos',
        [],
        (_, { rows: { _array } }) => {
          setTotalTasks(_array[0]?.totalTodos || 0);
        },
        (_, error) => console.log('Error fetching total tasks:', error)
      );
    });
  };

  const fetchUserData = () => {
    userDB.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            const { name, email } = _array[0];
            setUserData({ name, email });
          }
        },
        (_, error) => console.log('Error fetching user data:', error)
      );
    });
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          height: "7%",
        }}
      >
        <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>
          Профиль
        </Text>
      </View>
      <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons name="account-circle" size={60} color="black" />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {userData.name}
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            {userData.email}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 15, backgroundColor: "black", padding: 10, width: 410, borderRadius: 25}}>
          <Pressable onPress={() => navigation.navigate('person')}>
                <MaterialIcons style={{marginLeft: 10}} name="switch-account" size={24} color="white" />
                <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "white" }}>
                  Персональные цели
                </Text>
              </Pressable>
        </View>

        <View style={{ marginTop: 15, backgroundColor: "white", padding: 8, width: 410, borderRadius: 25, borderWidth: 1}}>
          <Entypo style={{marginLeft: 10}} name="circular-graph" size={24} color="black" />
          <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "black" }}> 
            Сводка по задачам
          </Text>
        </View>
                
        <View style={{ marginVertical: 12}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginVertical: 8,
              
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                padding: 12,
                borderRadius: 25,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text
                style={{color: "white", alignItems: "center" , fontSize: 16, fontWeight: "bold" }}
              >
                Выполненные: {completedTasks} 
              </Text>
            </View>
            
                
              

            <View
              style={{
                backgroundColor: "black",
                padding: 12,
                borderRadius: 25,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text
                style={{color: "white", alignItems: "center" , fontSize: 16, fontWeight: "bold" }}
              >
                Всего задач: {totalTasks} 
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 0, backgroundColor: "white", padding: 8, width: 410, borderRadius: 25, borderWidth: 1}}>
          
                <Entypo style={{marginLeft: 10}} name="bar-graph" size={24} color="black" />
                <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "black" }}> 
                Сводная статистика
                </Text>

        </View>
        
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
        </View>
        <View style={{backgroundColor: "black", padding: 20, borderRadius: 25}}>
        <BarChart
          data={{
            labels: ["0 Задач","Всего задач", "Выполненные"],
            datasets: [
              {
                data: [0, totalTasks, completedTasks],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          yAxisInterval={2} // optional
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "#000000",
            backgroundGradientTo: "#000000",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "black",
            },
          }}
          bezier
          style={{
            borderRadius: 16
          }}
        />   
        </View>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
