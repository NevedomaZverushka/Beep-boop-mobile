import React from 'react';
import { AsyncStorage } from 'react-native'
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
import Result from './components/Result';

async function getDataFromStorage() {
  const storage = JSON.parse(await AsyncStorage.getItem('attempts'));
  return storage;
}

const initState = {
  file: null,
  text: "",
  possibleSong: null,
  userWon: false,
  computerWon: false,
  attempts: getDataFromStorage() ? [] : getDataFromStorage(),
  spinner: false
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
      case 'UPDATE_SONG': {
        return {
            ...state,
            possibleSong: action.song
        }
      }
      case 'WRONG_ANSWER': {
        let temp = [...state.attempts]
        temp.push(action.song);
        return {
            ...state,
            attempts: temp,
            possibleSong: null,
            userWon: temp.length >= 4 ? true : false
        }
    }
    case 'RIGHT_ANSWER': {
        let temp = [...state.attempts]
        temp.push(action.song);
        return {
            ...state,
            game: false,
            attempts: temp,
            possibleSong: null,
            computerWon: true
        }
    }
    case 'TOGGLE_SPINNER': {
        return {
            ...state,
            spinner: !state.spinner
        }
    }
    case 'FINISH_GAME': {
      return {
          ...state,
          attempts: [],
          computerWon: false,
          userWon: false
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
  },
  result: {
    screen: Result,
    navigationOptions: {
      header: (props) => <AppHeader {...{ title: 'Результати гри', navigation: props.navigation, btnBack: 'home', cards: false }} />,
    }
  }
});

const App = createAppContainer(RootStack);

export default () =>
    <Provider store={store}>
        <App />
    </Provider>