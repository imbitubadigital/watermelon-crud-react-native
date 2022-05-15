import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Home } from './src/screens/Home';
import { StatusBar } from 'expo-status-bar';
import React from 'react';


function App() {
  return (
    <>
    <StatusBar
      style="light"
      translucent
      backgroundColor="transparent"
    />
    <Home />
  </>
  );
}



export default gestureHandlerRootHOC(App);
