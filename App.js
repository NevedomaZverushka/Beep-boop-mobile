import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainPage from './components/MainPage'
import AppHeader from './components/AppHeader'

const RootStack = createStackNavigator({
  Home: {
    screen: MainPage,
    navigationOptions: {
      header: <AppHeader />,
    }
  },
});

const App = createAppContainer(RootStack);

export default App;