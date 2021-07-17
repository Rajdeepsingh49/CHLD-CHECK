import React from 'react';
import { Image, Text } from 'react-native';
import {Icon} from "react-native-elements";
import ParentScreen from '../screens/ParentScreen';
import ChildScreen from '../screens/ChildScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';

export const AppTabNavigator = createMaterialBottomTabNavigator(
  {
    Parent: {
      screen: ParentScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ color: 'white' }}>PARENT</Text>,
        tabBarColor: '#F88662',
        tabBarIcon: (<Icon name="user" type="feather" color="white"/>),
        barStyle: { backgroundColor: '#F88662' },
      },
    },
    Child: {
      screen: ChildScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ color: 'white' }}>CHILD</Text>,
        barStyle: { backgroundColor: '#463E6D' },
        tabBarColor: '#463E6D',
        tabBarIcon: (
          <EvilIcons name="sc-odnoklassniki" color="white" size={29} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Parent',
    shifting: true,
    tabBarAccessibilityLabel: true,
  }
);
