import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Workout" component={WorkoutScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
