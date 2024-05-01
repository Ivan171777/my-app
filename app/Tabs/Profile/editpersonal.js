import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user-myapp.db');

const ProfileItem = ({ label, value, onChangeText, secureTextEntry }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, backgroundColor: "black", borderRadius: 150 }}>
    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", padding: 20 }}>{label}:</Text>
    </View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={label}
      secureTextEntry={secureTextEntry}
      style={{ padding: 20, flex: 1, textAlign: "right", color: "white" }}
      selectTextOnFocus={true}
    />
  </View>
);

const EditPersonal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [emotionalState, setEmotionalState] = useState('');
  const [mentalState, setMentalState] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            const { name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity } = _array[0];
            setName(name);
            setEmail(email);
            setPassword(password);
            setWeight(weight);
            setHeight(height);
            setGoal(goal);
            setEmotionalState(emotionalState);
            setMentalState(mentalState);
            setPhysicalActivity(physicalActivity);
          }
        },
        (_, error) => console.log('Error fetching user data:', error)
      );
    });
  };

  const saveUserData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name=?, email=?, password=?, weight=?, height=?, goal=?, emotionalState=?, mentalState=?, physicalActivity=? WHERE id=1',
        [name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity],
        () => {
          Alert.alert('Успешно', 'Данные сохранены');
          navigation.goBack(); // Переход назад
        },
        (_, error) => console.log('Error updating user data:', error)
      );
    });
  };

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", width: "100%", height: "7%" }}>
        <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>Профиль</Text>
        <View style={{ marginLeft: 230 }}>
          <Pressable onPress={saveUserData}>
            <AntDesign name="check" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <ProfileItem label="Имя" value={name} onChangeText={setName} />
          <ProfileItem label="Почта" value={email} onChangeText={setEmail} />
          <ProfileItem label="Пароль" value={password} onChangeText={setPassword} secureTextEntry={true} />
          <ProfileItem label="Вес" value={weight} onChangeText={setWeight} />
          <ProfileItem label="Рост" value={height} onChangeText={setHeight} />
          <ProfileItem label="Цель диеты" value={goal} onChangeText={setGoal} />
          <ProfileItem label="Эмоциональное состояние" value={emotionalState} onChangeText={setEmotionalState} />
          <ProfileItem label="Ментальное состояние" value={mentalState} onChangeText={setMentalState} />
          <ProfileItem label="Физическая активность" value={physicalActivity} onChangeText={setPhysicalActivity} />
        </View>
      </ScrollView>
    </>
  );
};

export default EditPersonal;

const styles = StyleSheet.create({});
