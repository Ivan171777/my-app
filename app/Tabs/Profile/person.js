import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import { ScrollView } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const db = SQLite.openDatabase("user-myapp.db");

const ProfileItem = ({ label, value, secureTextEntry, icon }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, backgroundColor: "black", borderRadius: 150 }}>
    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
      {icon && icon}
      <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", padding: 20 }}>{label}:</Text>
    </View>
    {secureTextEntry ? (
      <TextInput
        value={value}
        placeholder="********"
        secureTextEntry={true}
        style={{ padding: 20, flex: 1, textAlign: "right", color: "white" }}
        editable={false}
        selectTextOnFocus={false}
      />
    ) : (
      <Text style={{ padding: 20, color: "white", flexDirection: "row", justifyContent: "space-between" }}>{value}</Text>
    )}
  </View>
);

const Person = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const fetchUserData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            const { name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity } = _array[0];
            setUserData({ name, email, password, weight, height, goal, emotionalState, mentalState, physicalActivity });
          }
        },
        (_, error) => console.log('Error fetching user data:', error)
      );
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", width: "100%", height: "7%" }}>
        <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>
          Профиль
        </Text>
        <View style={{ marginLeft: 230 }}>
          <Pressable onPress={() => navigation.navigate('editpersonal')}>
            <AntDesign name="edit" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="account-circle" size={100} color="black" />
          </View>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <ProfileItem label="Имя" value={userData && userData.name} icon={<MaterialIcons name="account-circle" size={24} color="white" />} />
            <ProfileItem label="Почта" value={userData && userData.email} icon={<MaterialIcons name="email" size={24} color="white" />} />
            <ProfileItem label="Пароль" value={userData && userData.password} secureTextEntry icon={<AntDesign name="lock1" size={24} color="white" />} />
            <ProfileItem label="Вес" value={userData && userData.weight} icon={<MaterialCommunityIcons name="weight-kilogram" size={24} color="white" />} />
            <ProfileItem label="Рост" value={userData && userData.height} icon={<MaterialCommunityIcons name="human-male-height" size={24} color="white" />} />
            <ProfileItem label="Цель диеты" value={userData && userData.goal} icon={<MaterialIcons name="food-bank" size={24} color="white" />} />
            <ProfileItem label="Эмоциональное состояние" value={userData && userData.emotionalState} icon={<MaterialIcons name="emoji-emotions" size={24} color="white" />} />
            <ProfileItem label="Ментальное состояние" value={userData && userData.mentalState} icon={<FontAwesome6 name="brain" size={24} color="white" />} />
            <ProfileItem label="Физическая активность" value={userData && userData.physicalActivity} icon={<FontAwesome5 name="running" size={24} color="white" />} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Person;

const styles = StyleSheet.create({});
