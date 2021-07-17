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
import { Header, Icon, Badge } from 'react-native-elements';
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
  getalertnotifications() {
    db.collection('user')
      .where('isthekidindangerdanger', '==', 'true')
      .onSnapshot((snapshot) => {
        var getalertnotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: getalertnotifications.length,
        });
      });
  }
  componentDidMount() {
    this.getalertnotifications();
  }
  BellIconWithBagde = () => {
    return (
      <View>
        <Icon
          raised
          style={{ margin: RFValue(10) }}
          name="bell"
          type="feather"
          color="#F88662"
          onPress={() => {
            this.props.navigation.navigate('Notification');
          }}
        />
        <Badge
          value={this.state.value}
          containerStyle={{
            position: 'absolute',
            top: RFValue(3),
            right: RFValue(-4),
          }}
          badgeStyle={{
            backgroundColor: 'red',
            borderColor: 'red',
            shadowColor: 'red',
            shadowOffset: {
              width: RFValue(0),
              height: RFValue(2),
            },
            shadowOpacity: RFValue(0.40),
            shadowRadius: RFValue(3.84),

            elevation: RFValue(20),
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <View>
        <Header
          backgroundColor={'#F88662'}
          leftComponent={
            <Icon
              raised
              style={{ margin: 10 }}
              name="menu"
              type="feather"
              color="#F88662"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          rightComponent={<this.BellIconWithBagde {...this.props} />}
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
