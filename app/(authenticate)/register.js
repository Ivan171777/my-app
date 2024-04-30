import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { useRouter, } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const db = SQLite.openDatabase("user-myapp.db");

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("")
  const [height, setheight] = useState("")
  const [goal, setgoal] = useState("")
  const [emotionalState, setemotionalState] = useState("")
  const [mentalState, setmentalState] = useState("")
  const [physicalActivity, setphysicalActivity] = useState("")
  const navigation = useNavigation();
  const router = useRouter();

  const handleRegister = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, weight REAL, height REAL, goal TEXT, emotionalState TEXT, mentalState TEXT, physicalActivity TEXT);',
      );
    });
  
    const userData = [name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity];
  
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        userData,
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Регистрация успешна", "Вы успешно зарегистрированы");
            setEmail("");
            setPassword("");
            setName("");
            setWeight("");
            setHeight("");
            setgoal("");
            setemotionalState("");
            setmentalState("");
            setphysicalActivity("");
          } else {
            Alert.alert("Ошибка регистрации", "Произошла ошибка во время регистрации");
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  };
  

  return (
    <><View style={{ backgroundColor: "white" }}>
      <View style={{ marginTop: 40, backgroundColor: "white", alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "600", color: "black" }}>
        Добро пожаловать в приложение Grind!
        </Text>
        <Entypo style={{ marginTop: 40 }} name="sports-club" size={200} color="black" />
      </View>

    </View><SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 70 }}>
            Зарегистрироваться
            </Text>
          </View>

          <View style={{ marginTop: 10, padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 25,
                marginTop: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 15 }}
                name="account-circle"
                size={22}
                color="gray" />
              <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 17,
                }}
              placeholder="Введите имя" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 25,
                marginTop: 25,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 15 }}
                name="email"
                size={22}
                color="gray" />
              <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 17,
                }}
              placeholder="Введите почту" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 25,
                marginTop: 25,
              }}
            >
              <AntDesign
                style={{ marginLeft: 15 }}
                name="lock1"
                size={22}
                color="gray" />
              <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 17 : 17,
                }}
              secureTextEntry={true}
              placeholder="Введите пароль" />
            </View>

            <View style={{ marginTop: 30 }} />

            <Pressable
              onPress={handleRegister}
              style={{
                width: 200,
                backgroundColor: "black",
                padding: 15,
                borderRadius: 25,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Зарегистрироваться
              </Text>
            </Pressable>

            <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 15 }}>
              <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
                Уже есть аккаунт? Войти в аккаунт
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView></>
  );
};

export default register;

const styles = StyleSheet.create({});
