import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  AsyncStorage,
  Alert
} from "react-native";
import * as SQLite from 'expo-sqlite';
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const db = SQLite.openDatabase("myapp.db");

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            router.replace("/Tabs/Profile");
          } else {
            Alert.alert("Login failed", "Invalid email or password");
          }
        },
        error => {
          console.log(error);
          Alert.alert("Login failed", "An error occurred during login");
        }
      );
    });
  };

  return (
    <>
    <View style={{ backgroundColor: "white"}}>
        <View style={{ marginTop: 40 , backgroundColor: "white", alignItems: "center"}}>
          <Text style={{ fontSize: 30, fontWeight: "600", color: "black" }}>
          Добро пожаловать в приложение Grind!
          </Text>
          <Entypo style={{ marginTop: 40 }} name="sports-club" size={200} color="black" />
        </View>
        
    </View>
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
        
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 70}}>
            Войдите в свой аккаунт
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
                  fontSize: email ? 17 : 17,
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
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 17 : 17,
                }}
                placeholder="Введите пароль" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <Text></Text>
              <Text style={{ color: "grey", fontWeight: "500" }}>
                Забыли пароль?
              </Text>
            </View>

            <View style={{ marginTop: 70 }} />

            <Pressable
              onPress={handleLogin}
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
                Логин
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/register")}
              style={{ marginTop: 15,}}
            >
              <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
                У вас нет аккаунта? Зарегистрироваться
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView></>
  );
};

export default login;

const styles = StyleSheet.create({});