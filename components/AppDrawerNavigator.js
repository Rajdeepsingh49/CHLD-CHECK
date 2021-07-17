import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import Notification from '../screens/Notification';
import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    HOME: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="feather" color="orange" />,
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        drawerLabel: 'NOTIFICATION',
        drawerIcon: <Icon name="bell" type="feather" color="orange" />,
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: 'HOME',
  }
);
