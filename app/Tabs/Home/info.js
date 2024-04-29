import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my-app.db');

const Info = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title, category } = route.params;
  const [newTitle, setNewTitle] = useState(title);
  const [createdAt, setCreatedAt] = useState(""); // Добавляем состояние для даты создания

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasktodos WHERE id = ?',
        [id],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            const task = _array[0];
            setCreatedAt(task.date); // Устанавливаем дату создания из базы данных
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const updateTitle = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasktodos SET title = ? WHERE id = ?',
        [newTitle, id],
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
        <AntDesign style={{ marginRight: 5 }} name="save" size={24} color="black" onPress={updateTitle}/>
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
            <Text>Дата создания</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{createdAt}</Text>
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
