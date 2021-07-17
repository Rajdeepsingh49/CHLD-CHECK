import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Icon } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';

export default class Notification extends React.Component {
  render() {
    return (
      <View>
        <Text style={style.text2}>CHILD SECURITY</Text>
        <Image source={require('../assets/DLO.png')} style={style.imagestyle} />
        <DrawerItems {...this.props} />
        <View>
          <TouchableOpacity
            style={style.logOutContainer}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <Text style={style.logOutButton}>
              LOG OUT <Icon name="log-out" type="feather" color="orange" />{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  logOutContainer: {
    marginTop: RFValue(290),
    marginLeft: RFValue(20),
    width: RFValue(100),
    height: RFValue(35),
  },
  logOutButton: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: RFValue(12.1),
    color: 'orange',
  },
  text2: {
    fontSize: RFValue(16),
    margin: RFValue(20),
    marginLeft: 20,
    color: 'orange',
    fontFamily: 'monospace',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  imagestyle: {
    height: RFValue(200),
    width: RFValue(200),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
