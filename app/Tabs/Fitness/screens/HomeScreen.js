import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView } from "react-native";
import React ,{useContext} from "react";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "C:/Users/Ivan/build/my-app/app/Tabs/Fitness/Context";
import { LineChart } from "react-native-chart-kit";
import { BarChart } from "react-native-chart-kit";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const {
   
    minutes,
  
    calories,

    workout,
  } = useContext(FitnessItems);

  // Пример данных для графика
  const data = {
    labels: ["Workouts", "Minutes"],
    datasets: [
      {
        data: [workout, minutes],
      },
      
    ],
  };
  const data2 = {
    labels: ["Calories", "Minutes"],
    datasets: [
      {
        data: [calories, minutes],
      },
      
    ],
  };
  

  return (
    
    <><View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "7%",
      }}>
      <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>
        Fitness
      </Text>
    </View>

    

    <ScrollView style={{ marginTop: 0, backgroundColor: "white" }}>
    <View style={{
          marginTop: 10,
        }}>
          <Text style={{ marginHorizontal: 30, color: "black", fontWeight: "regular", fontSize: 14 }}>
          Exercise statistics summary
        </Text>
        <Entypo style={{ marginHorizontal: 10, color: "black", marginTop: -15}}
        name="bar-graph" size={14} color="black" />
        
          </View> 
        
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            height: "100%",
            width: "100%",
          }}
        >
          <View style={{marginTop: 10, flex: 1, justifyContent: "center", alignItems: "center"}}>
        <BarChart
          data={data}
          width={300}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />
      </View>
      <View style={{marginTop: 10, flex: 1, justifyContent: "center", alignItems: "center"}}>
        <BarChart
          data={data2}
          width={300}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />
      </View>
        <View
          style={{
             justifyContent: "center",
              alignItems: "center"  ,
              margin: 10,}}>         
              <MaterialCommunityIcons name="archive-star-outline" size={50} color="black" />
              <Text>Sets</Text>
        </View>
          <FitnessCards />
        </View>
      </ScrollView></>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
