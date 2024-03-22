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
import { Entypo } from '@expo/vector-icons';

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
        style={{ backgroundColor: "white", marginTop: 0 }}
      >
        <View style={{ width: "80%", height: 140, marginLeft: 45, borderRadius: 30, marginTop: 50, backgroundColor: "black", alignContent: "center" }}>
          <AntDesign style={{marginHorizontal: 120, marginVertical: 20}} name="Trophy" size={90} color="white" />
        </View>
        
        
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 10, left: 10 }}
          name="arrow-back-outline"
          size={28}
          color="black"
        />
        
        <Pressable
      onPress={() =>  {
        navigation.navigate("Fit",{
          excersises:route.params.excersises,
      })
      setCompleted([]);
      }}
        style={{
          backgroundColor: "black",
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
            color: "white",
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
              style={{ width: 120, height: 90, borderRadius: 15, borderColor: "black", borderWidth: 2, marginLeft: 15 }}
              source={{ uri: item.image }}
            />

            <View style={{ marginLeft: 10, marginTop: -5 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", width:200, color: "black"}}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                x{item.sets}
              </Text>
              <Entypo style={{ marginTop: 10 }} name="sports-club" size={20} color="black" />
            </View>

            {completed.includes(item.name) ? (
              <AntDesign style={{marginLeft:0, marginTop: -55}} name="checksquare" size={24} color="green" />
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
