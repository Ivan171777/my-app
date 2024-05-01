import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import moment from 'moment'; // Импорт библиотеки moment для работы с датами

const db = SQLite.openDatabase('my-app.db'); // Ваша база данных
const userDB = SQLite.openDatabase('user-myapp.db'); // База данных с пользователями

const Profile = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [chartData, setChartData] = useState({
    labels: [],
    data: [[], []],
  });
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

  useEffect(() => {
    const currentDate = moment();
    const startOfWeek = currentDate.clone().startOf('week');
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');
      weekDates.push(date.format('D.MM'));
    }

    const initialChartData = {
      labels: weekDates,
      data: [Array(7).fill(0), Array(7).fill(0)],
    };

    setChartData(initialChartData);
  }, []);

  useEffect(() => {
    const fetchedData = [{ date: '29.04', completed: 5, total: 10 }, { date: '30', completed: 7, total: 12 }]; // Предположим, что это реальные данные из базы данных

    fetchedData.forEach(data => {
      const index = chartData.labels.indexOf(data.date);
      if (index !== -1) {
        const newData = [...chartData.data];
        newData[0][index] = data.completed;
        newData[1][index] = data.total;
        setChartData({ ...chartData, data: newData });
      }
    });
  }, [chartData.labels]);

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


        <View style={{ marginTop: 15, backgroundColor: "black", padding: 10, width: 410, borderRadius: 25 }}>
          <Pressable onPress={() => navigation.navigate('person')}>
            <MaterialIcons style={{ marginLeft: 10 }} name="account-circle" size={24} color="white" />
            <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "white" }}>
              Личные данные
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 15, backgroundColor: "black", padding: 10, width: 410, borderRadius: 25 }}>
          <Pressable onPress={() => navigation.navigate('goals')}>
            <Entypo style={{ marginLeft: 10 }} name="bar-graph" size={22} color="white" />

            <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "white" }}>
              Характеристика целей
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 15, backgroundColor: "black", padding: 10, width: 410, borderRadius: 25 }}>
          <Pressable onPress={() => navigation.navigate('taskscharts')}>
            <Entypo style={{ marginLeft: 10 }} name="circular-graph" size={24} color="white" />
            <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "white" }}>
              Сводка по задачам
            </Text>
          </Pressable>
        </View>




        {/* 
        <View style={{ marginTop: 15, backgroundColor: "white", padding: 9, width: 410, borderRadius: 25, borderWidth: 1}}>
          <Entypo style={{marginLeft: 10}} name="bar-graph" size={24} color="black" />
          <Text style={{ marginTop: -26, marginLeft: 50, fontSize: 22, color: "black" }}> 
            Статистика
          </Text>
        </View>*/}

      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
