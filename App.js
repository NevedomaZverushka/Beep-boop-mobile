import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainPage from './components/MainPage'
import AppHeader from './components/AppHeader'
import Introduction from './components/Introduction';

const RootStack = createStackNavigator({
  home: {
    screen: MainPage,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Beep-Boop', navigation: props.navigation }} />,
    }
  },
  introduction: {
    screen: Introduction,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Про гру', navigation: props.navigation, btnBack: 'home' }} />,
    }
  }
});

const App = createAppContainer(RootStack);

export default App;