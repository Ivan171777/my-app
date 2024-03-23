import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';


const db = SQLite.openDatabase('my-app.db');

const Index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTaskData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchTaskData();
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
          Profile
        </Text>
      </View>
      <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons name="account-circle" size={60} color="black" />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Name Lastname
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
              Profile
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text>Tasks Overview</Text>
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
                backgroundColor: "#D3D3D3",
                padding: 10,
                borderRadius: 8,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
              >
                {completedTasks}
              </Text>
              <Text style={{ marginTop: 4 }}>Completed Tasks</Text>
            </View>

            <View
              style={{
                backgroundColor: "#D3D3D3",
                padding: 10,
                borderRadius: 8,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
              >
                {totalTasks}
              </Text>
              <Text style={{ marginTop: 4 }}>Total Tasks</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 16,
            marginTop: 15,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Tasks for the past 7 days
          </Text>
        </View>
        
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
        </View>
        <BarChart
          data={{
            labels: ["0","Total Tasks", "Completed Tasks"],
            datasets: [
              {
                data: [0, totalTasks, completedTasks],
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisInterval={2} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#D3D3D3",
            backgroundGradientFrom: "#D3D3D3",
            backgroundGradientTo: "grey",
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
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
