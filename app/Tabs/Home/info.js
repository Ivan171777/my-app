import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native"; // Импортируем useNavigation
import { AntDesign, Feather } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from "expo-router";
import { SimpleLineIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('my-app.db');

const Info = () => {
  const navigation = useNavigation(); // Используем useNavigation для доступа к объекту navigation
  const route = useRoute();
  const { id, title, category, dueDate } = route.params; // Извлекаем параметры маршрута
  const [newTitle, setNewTitle] = useState(title); // Используем title из параметров маршрута
  const params = useLocalSearchParams();

  const updateTitle = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasktodos SET title = ? WHERE id = ?',
        [newTitle, id], // Используем id из параметров маршрута
        () => {
          navigation.navigate('index', { updatedTitle: newTitle });
        },
        (_, error) => console.log(error)
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Category - {category} {/* Используем category из параметров маршрута */}
        </Text>
      </View>

      <TextInput
        style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}
        value={newTitle}
        onChangeText={setNewTitle}
      />

      <View style={{ marginTop: 50 }} />

      <Pressable
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        onPress={updateTitle}
      >
        <AntDesign name="plus" size={24} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Add a subtask
        </Text>
      </Pressable>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Task</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>Not Added</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({});