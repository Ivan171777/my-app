import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React ,{useContext} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from '@expo/vector-icons';
import FitnessCards from "../components/FitnessCards";



const WorkOutScreen = () => {
  const route = useRoute();
//   console.log(route.params);
  const navigation = useNavigation();
  const {
    completed,
    setCompleted,
  } = useContext(FitnessItems);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "black", marginTop: 0 }}
      >
        <Image
        
          style={{ width: "80%", height: 140, marginLeft: 45, borderRadius: 30, marginTop: 50}}
          source={{ uri: route.params.image }}
        />
        
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 10, left: 10 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
        
        <Pressable
      onPress={() =>  {
        navigation.navigate("Fit",{
          excersises:route.params.excersises,
      })
      setCompleted([]);
      }}
        style={{
          backgroundColor: "white",
          padding: 10,
          marginTop: 40,
          marginBottom: 40,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          width:120,
          height: 40,
          borderRadius:6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          START
        </Text>
      </Pressable>

        {route.params.excersises.map((item, index) => (
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Image
              style={{ width: 90, height: 90, borderRadius: 7, marginLeft: 45 }}
              source={{ uri: item.image }}
            />

            <View style={{ marginLeft: 10, marginTop: -35 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", width:200, color: "white"}}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                x{item.sets}
              </Text>
            </View>

            {completed.includes(item.name) ? (
              <AntDesign style={{marginLeft:0, marginTop: -55}} name="checkcircle" size={24} color="green" />
            ) : (
              null
            )}
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({});
