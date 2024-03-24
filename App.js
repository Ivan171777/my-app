import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import registerNNPushToken from 'native-notify';

export default function App() {
  useEffect(() => {
    registerNNPushToken(20366, 'MoDTvdCGtbtTkqo5T37xTg', (success) => {
      if (success) {
        console.log("Уведомления успешно подключены");
      } else {
        console.error("Не удалось подключить уведомления");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar backgroundColor="black" barStyle="default"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
