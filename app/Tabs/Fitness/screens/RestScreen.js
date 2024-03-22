import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

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
    style={{ backgroundColor: "white", height: "100%"}}>
      <View style={{ width: "80%", height: "50%", marginLeft: 45, borderRadius: 30, marginTop: 50, backgroundColor: "black", alignContent: "center" }}>
          <MaterialIcons style={{marginHorizontal: 70, marginVertical: 90}} name="restore" size={190} color="white" />
        </View>

      <Text
        style={{
          fontSize: 25,
          fontWeight: "500",
          marginTop: 20,
          textAlign: "center",
          color: "black",
        }}
      >
        Time for rest!
      </Text>

      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          marginTop: 20,
          textAlign: "center",
          color: "black",
        }}
      >
        {timeLeft} s
      </Text>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({});
