import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const RestScreen = () => {
  const navigation = useNavigation();
  let timer = 0;
  const [timeLeft, setTimeLeft] = useState(5);

  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTime();
    //clean up
    return () => clearTimeout(timer);
  });
  return (
    <SafeAreaView
    style={{ backgroundColor: "black", height: "100%"}}>
      <Image
        // resizeMode="contain"
        source={{
          uri: "https://raw.githubusercontent.com/Ivan171777/VKR/main/Rest_Icon.jpg",
        }}
        style={{ width: 400, height: 400, borderRadius: 40, marginLeft: 13}}
      />

      <Text
        style={{
          fontSize: 25,
          fontWeight: "500",
          marginTop: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        Be Ready!
      </Text>

      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          marginTop: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        {timeLeft}
      </Text>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({});
