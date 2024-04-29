import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="person" options={{ headerShown: false }} />
      <Stack.Screen name="editpersonal" options={{ headerShown: false }} />
      <Stack.Screen name="goals" options={{ headerShown: false }} />
      <Stack.Screen name="taskscharts" options={{ headerShown: false }} />
    </Stack>
  );
}