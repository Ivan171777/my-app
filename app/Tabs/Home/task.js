import React, { useState } from "react";
import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my-app.db');

const suggestions = [
  {
    id: "0",
    todo: "Пить воду",
  },
  {
    id: "1",
    todo: "Тренироваться",
  },
  {
    id: "2",
    todo: "Встать в 8:00",
  },
  {
    id: "3",
    todo: "Принять витамины",
  },
  {
    id: "4",
    todo: "Читать",
  },
  {
    id: "5",
    todo: "Завершить задачи",
  },
];

const suggestions2 = [
  {
    id: "0",
    category: "Работа",
  },
  {
    id: "1",
    category: "Личное",
  },
  {
    id: "2",
    category: "Здоровье",
  },
  {
    id: "3",
    category: "Спорт",
  },
  {
    id: "4",
    category: "Другое",
  },
];


const TaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params; // Получаем выбранную дату из параметров навигации
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("");

  const addTodo = () => {
    const selectedDateFormatted = selectedDate ? moment(selectedDate).format("D MMMM") : moment().format("D MMMM");
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tasktodos (title, category, date) VALUES (?, ?, ?)',
        [todo, category, selectedDateFormatted],
        () => {
          setTodo("");
          setCategory("");
          navigation.navigate('index');
        },
        (_, error) => console.log(error)
      );
    });
  };

  return (
    <>
      <View
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
          Новая задача
        </Text>
        <Pressable
          style={{ marginTop: 5, marginHorizontal: 65 }}
          onPress={addTodo} // Исправлено
        >
          <Ionicons name="checkmark-done" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            value={todo}
            onChangeText={(text) => setTodo(text)}
            placeholder="Введите новую задачу"
            style={{
              fontSize: 14,
              padding: 15,
              borderColor: "grey",
              borderWidth: 0.2,
              borderRadius: 25,
              flex: 1,
            }}
          />
        </View>

        <Text style={{ marginLeft: 5, fontWeight: 600 }}>Предложенные задачи</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginVertical: 10,
            marginLeft: 15,
          }}
        >
          {suggestions?.map((item, index) => (
            <Pressable
              onPress={() => setTodo(item?.todo)}
              style={{
                backgroundColor: "black",
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 25,
              }}
              key={index}
            >
              <Text style={{ color: "white", textAlign: "center" }}>{item?.todo}</Text>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            marginVertical: 7,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            value={category}
            onChangeText={(text) => setCategory(text)}
            placeholder="Введите категорию задачи"
            style={{
              fontSize: 14,
              padding: 15,
              borderColor: "grey",
              borderWidth: 0.3,
              borderRadius: 25,
              flex: 1,
            }}
          />
        </View>

        <Text style={{ marginLeft: 5, fontWeight: 600 }}>Предложенные категории</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginVertical: 10,
            marginLeft: 15,
          }}
        >
          {suggestions2?.map((item, index) => (
            <Pressable
              onPress={() => setCategory(item?.category)}
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "black",
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 25,
              }}
              key={index}
            >
              <Text style={{ color: "black", textAlign: "center" }}>{item?.category}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginLeft: 5, flexDirection: "row", alignItems: "center", gap: 7 }}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text>Дата создания</Text>
            </View>
            <Pressable
              style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
            >
              <Text>{selectedDate ? moment(selectedDate).format("D MMMM") : moment().format("D MMMM")}</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 15, marginLeft: 0 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
          </View>
        </View>
      </View>
    </>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({});
