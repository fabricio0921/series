
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginPage from './src/pages/LoginPage';
import SeriesPage from './src/pages/SeriesPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem vindo'
    }
  },
  'Main':{
    screen:SeriesPage

  }
}, {
  //sobrescreve para todas as telas
  defaultNavigationOptions: {
    title: 'Séries !',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    }
  }
});

export default createAppContainer(AppNavigator);
