import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView } from "react-native";
import React ,{useContext} from "react";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "C:/Users/Ivan/build/my-app/app/Tabs/Fitness/Context";
import { LineChart } from "react-native-chart-kit";
import { BarChart } from "react-native-chart-kit";


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
    <ScrollView style={{marginTop:0, backgroundColor: "black"}}>
      <View
        style={{
          backgroundColor: "#000000",
          padding: 20,
          height: 1200,
          width: "100%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 26 }}>
          Fitness Block
        </Text>
        
        <View style={{
          marginTop: 18
        }}>
          <Text style={{ color: "white", fontWeight: "normal", fontSize: 16 }}>
          Exercise statistics summary
        </Text>
          </View> 
        

        <View 
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20,}}>
          <BarChart
            data={data}
            width={220}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              barPercentage: 1, // Устанавливаем ширину столбцов
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={{
              marginLeft: -30,
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <BarChart
            data={data2}
            width={220}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              barPercentage: 1, // Устанавливаем ширину столбцов
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={{
              marginLeft: -20,
              marginVertical: 20,
              borderRadius: 20,
            }}
          />
        </View>

        <FitnessCards/>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
