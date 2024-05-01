import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../Context";

const FitScreen = () => {
  const route = useRoute();
  // console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  // console.log(current, "first excersise");

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);
  console.log(completed, "completed excersise");
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        style={{ width: "80%", height: 200, marginTop: 100, marginLeft: 40, borderRadius: 15, borderColor: "black", borderWidth: 2 }}

        source={{ uri: current.image }}
      />

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 30,
          fontWeight: "bold",
          color: "black",
        }}
      >
        {current.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 22,
          fontWeight: "bold",
          color: "grey",
        }}
      >
        x{current.sets} раз
      </Text>


      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 150,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center", backgroundColor: "black" }}
          >
            ПРЕДЫДУЩЕЕ
          </Text>
        </Pressable>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 150,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ПРОПУСТИТЬ
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");

              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 150,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ПРОПУСТИТЬ
            </Text>
          </Pressable>
        )}
      </Pressable>

      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 170,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            ГОТОВО
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate("Rest");
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 170,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "black",
              fontSize: 20,
              color: "white",
            }}
          >
            ГОТОВО
          </Text>
        </Pressable>
      )}

    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
