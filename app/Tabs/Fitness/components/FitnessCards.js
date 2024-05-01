import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "C:/Users/Ivan/build/my-app/app/Tabs/Fitness/data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  return (
    <View>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() => navigation.navigate("Workout", {
            excersises: item.excersises,
            id: item.id,
          })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >

          <View
            style={{ width: "95%", height: 140, borderRadius: 10, backgroundColor: "black" }} />

          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 25,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 9,
              fontWeight: "bold",
              left: 25,
              top: 40,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
              left: 25,
              top: 50,
            }}
          >
            {item.description2}
          </Text>

          <MaterialCommunityIcons
            style={{ position: "absolute", color: "white", bottom: 15, left: 20 }}
            name="lightning-bolt"
            size={24}
            color="white"
          />
          <AntDesign
            style={{ position: "absolute", color: "white", bottom: 30, right: 20 }}
            name="Trophy"
            size={80}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
