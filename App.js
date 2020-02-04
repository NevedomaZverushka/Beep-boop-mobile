import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainPage from './components/MainPage'
import AppHeader from './components/AppHeader'
import Introduction from './components/Introduction';
import History from './components/History';
import AudioSearch from './components/AudioSearch';
import TextSearch from './components/TextSearch';

const initState = {
  file: null,
  text: ""
}

const reducer = (state = initState, action) => {
  switch (action.type) {
      case 'UPDATE_FILE': {
          return {
              ...state,
              file: action.file
          }
      }
      case 'UPDATE_TEXT': {
          return {
              ...state,
              text: action.text
          }
      }
      default: {
          return state
      }
  }
}
const store = createStore(reducer);

const RootStack = createStackNavigator({
  home: {
    screen: MainPage,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Beep-Boop', navigation: props.navigation, cards: false }} />,
    }
  },
  introduction: {
    screen: Introduction,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Про гру', navigation: props.navigation, btnBack: 'home', cards: false }} />,
    }
  },
  history: {
    screen: History,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Історія гри', navigation: props.navigation, btnBack: 'home', cards: false }} />,
    }
  },
  audioSearch: {
    screen: AudioSearch,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Пошук за аудіо', navigation: props.navigation, btnBack: 'home', cards: true }} />,
    }
  },
  textSearch: {
    screen: TextSearch,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Пошук за текстом', navigation: props.navigation, btnBack: 'home', cards: true }} />,
    }
  }
});

const App = createAppContainer(RootStack);

export default () =>
    <Provider store={store}>
        <App />
    </Provider>