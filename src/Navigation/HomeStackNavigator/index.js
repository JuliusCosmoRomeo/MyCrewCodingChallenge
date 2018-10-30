import { StackNavigator } from 'react-navigation';
import React from 'react';
import LoginScreen from "../../Screens/LoginScreen";
import RegistrationScreen from "../../Screens/RegistrationScreen";
import Home from "../../Screens/Home";

const HomeStackNavigator = StackNavigator({

    Login: { screen: LoginScreen },
    Register: {
      screen: RegistrationScreen,
      navigationOptions: ({navigation, login}) => ({
        header: null
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: ({navigation, login}) => ({
        header: null
      }),
    }

  },
  {
    initialRouteName: 'Register'
  }
);
export default HomeStackNavigator;