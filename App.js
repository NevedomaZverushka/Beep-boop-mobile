import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import MainPage from './components/MainPage'
import AppHeader from './components/AppHeader'

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppHeader />
      <MainPage />
    </View>
  );
}

