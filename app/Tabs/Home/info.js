import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native"; // Импортируем useNavigation
import { AntDesign, Feather } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('my-app.db');

const Info = () => {
  const navigation = useNavigation(); // Используем useNavigation для доступа к объекту navigation
  const route = useRoute();
  const { id, title, category, DueDate } = route.params; // Извлекаем параметры маршрута
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
        <FontAwesome style={{ marginRight: 5 }} name="save" size={24} color="black" onPress={updateTitle}/>
        
      </View>

      <TextInput
        style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}
        value={newTitle}
        onChangeText={setNewTitle}
      />

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
            <Text>Дата</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15, marginLeft: 0  }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <MaterialCommunityIcons name="table-of-contents" size={24} color="black" />
            <Text>Категория</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{category}</Text>
          </Pressable>
        </View>
      </View>
      </View>
  );
};

export default Info;

const styles = StyleSheet.create({});