// Profile.js

import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import moment from 'moment';

const db = SQLite.openDatabase('my-app.db');

const Profile = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [[], []] });
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT date, COUNT(*) AS total, SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) AS completed FROM tasktodos GROUP BY date',
        [],
        (_, { rows: { _array } }) => {
          const labels = _array.map(item => moment(item.date, 'D.MM').format('D.MM'));
          const data = [_array.map(item => item.total), _array.map(item => item.completed)];
          setChartData({ labels, data });
        },
        (_, error) => console.log('Error fetching data:', error)
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
        Сводка по задачам
        </Text>
      </View>
    
      <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
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
                style={{ color: "white", alignItems: "center" , fontSize: 16, fontWeight: "bold" }}
              >
                Выполненные: {chartData.data[1].reduce((a, b) => a + b, 0)}
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
                style={{ color: "white", alignItems: "center" , fontSize: 16, fontWeight: "bold" }}
              >
                Всего задач: {chartData.data[0].reduce((a, b) => a + b, 0)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: "black", padding: 20, borderRadius: 25}}>
          <BarChart
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.data[0],
                },
                {
                  data: chartData.data[1],
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
              decimalPlaces: 0,
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

export default Profile;

const styles = StyleSheet.create({});
