import React from 'react';
import {  StyleSheet,  useColorScheme,} from 'react-native';
import { ModalPortal } from 'react-native-modals';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StackNavigatorPlanner from './navigation/StackNavigatorPlanner';


function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StackNavigatorPlanner/>
      <ModalPortal/>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;