import * as React from 'react';
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
import { Input, Icon, Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { EvilIcons } from '@expo/vector-icons';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <View>
        <Header
          backgroundColor={'#C0E5FF'}
          leftComponent={
            <Icon
              raised
              style={{ margin: 10 }}
              name="menu"
              type="feather"
              color="#C0E5FF"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={{
            text: this.props.title,
            style: {
              color: 'white',
              fontSize: RFValue(12),
              fontWeight: 'bold',
              fontFamily: 'monospace',
            },
          }}
        />
      </View>
    );
  }
}
