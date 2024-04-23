import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomModal } from "react-native-modals";
import { ModalTitle, ModalContent } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import 'moment/locale/ru';

const db = SQLite.openDatabase('my-app.db');

const Index = () => {
  const navigation = useNavigation();
  const [tasktodos, setTodos] = useState([]);
  const today = moment().locale('ru').format("D MMMM");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
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

  useEffect(() => {
      console.log("Уведомления успешно подключены"); 
    const unsubscribe = navigation.addListener('focus', () => {
      getUserTodos();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasktodos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, status TEXT, date TEXT)',
        [],
        () => console.log('Table "tasktodos" created successfully'),
        (_, error) => console.log('Error creating table "tasktodos":', error)
      );
    });

    getUserTodos();
  }, []);

  const getUserTodos = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasktodos',
        [],
        (_, { rows: { _array } }) => {
          setTodos(_array);

          const pending = _array.filter(todo => todo.status !== "completed");
          const completed = _array.filter(todo => todo.status === "completed");
          setPendingTodos(pending);
          setCompletedTodos(completed);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const addTodo = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tasktodos (title, category, date) VALUES (?, ?, ?)',
        [todo, category, moment().format("D MMMM")],
        () => {
          setTodo("");
          setModalVisible(false);
          getUserTodos();
        },
        (_, error) => console.log(error)
      );
    });
  };

  const markTodoAsCompleted = (todoId) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasktodos SET status = "completed" WHERE id = ?',
        [todoId],
        () => {
          getUserTodos();
        },
        (_, error) => console.log(error)
      );
    });
  };

  const deleteTodo = (todoId) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tasktodos WHERE id = ?',
        [todoId],
        () => {
          getUserTodos();
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
          Задачи
        </Text>
        
        
        <Pressable 
        style={{marginTop: 5, marginHorizontal: 140}} onPress={() => setModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={35} color="black" />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {tasktodos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Дата: {today}</Text>}

              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => navigation.navigate('info', {
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    createdAt: item.createdAt,
                    dueDate: item.dueDate,
                  })}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  key={index}
                >
                  <Entypo
                    onPress={() => markTodoAsCompleted(item.id)}
                    name="circle"
                    size={18}
                    color="black"
                  />
                  <Text style={{ flex: 1 }}>{item.title}</Text>
                  <Pressable onPress={() => deleteTodo(item.id)}>
                    <FontAwesome name="trash-o" size={20} color="black" />
                  </Pressable>
                </Pressable>
              ))}

              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Ionicons name="checkmark-done" size={50} color="black" />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Выполненные задачи</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={15}
                      color="black"
                    />
                  </View>

                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                      key={index}
                    >
                      <FontAwesome name="circle" size={18} color="gray" />
                      <Text
                        style={{
                          flex: 1,
                          textDecorationLine: "line-through",
                          color: "gray",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Pressable onPress={() => deleteTodo(item.id)}>
                        <FontAwesome name="trash-o" size={20} color="gray" />
                      </Pressable>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <FontAwesome name="tasks" size={200} color="black" />
              
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Нет задач... Добавьте новую задачу! 
              </Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={40} color="black" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Новая задача" style={{ backgroundColor: "white" }}/>}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280, backgroundColor: "white" }}>
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
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons onPress={addTodo} name="send" size={24} color="black" />
          </View>
          <Text>Предложенные задачи</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
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
                <Text style={{color: "white", textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
