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
import db from '../config';
import firebase from 'firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input, Icon } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Communications from 'react-native-communications';
import Toast from 'react-native-simple-toast';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
      hours: '',
      minute: '',
      second: '',
      day: '',
      month: '',
      year: '',
      geocode: null,
      errorMessage: '',
      user_id: firebase.auth().currentUser.email,
      doc_id: '',
      isModalVisible: 'false',
    };
  }
  isthekiddander = () => {};
  updatelocation = async () => {
    console.log(this.state.user_id);
    var ref = await db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            doc_id: doc.id,
          });
        });
      });
    console.log(this.state.doc_id);
    await db
      .collection('user')
      .doc(this.state.doc_id)
      .update({
        tracked_location: this.state.geocode,
        tracked_hours: new Date().getHours(),
        tracked_minute: new Date().getMinutes(),
        tracked_second: new Date().getSeconds(),
        tracked_day: new Date().getDate(),
        tracked_month: new Date().getMonth() + 1,
        tracked_year: new Date().getFullYear(),
      });
  };
  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    const { latitude, longitude } = location.coords;
    this.getGeocodeAsync({ latitude, longitude });
    this.setState({ location: { latitude, longitude } });
  };
  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    this.setState({ geocode });
  };
  componentDidMount = async () => {
    setTimeout(() => {
       this.updatelocation(),this.getLocation(),this.getGeocodeAsync();
    }, 20 * 1000);
    var toast = Toast.show('PLEASE WAIT IT CAN TAKE FEW MINUTES TO LOAD THE LOCATION..', Toast.LONG);
    var ref2 = await db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            hours: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          });
        });
      });
  };
  showmodal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <View style={style.modelstyle}>
                <TouchableOpacity
                  style={style.bottonstyle3}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}>
                  <Icon
                    name="x-circle"
                    type="feather"
                    size={RFValue(50)}
                    color="black"
                  />
                </TouchableOpacity>
                <View style={style.iconstyle}>
                  <Icon
                    name="alert-triangle"
                    type="feather"
                    color="black"
                    size={70}
                  />
                </View>
                <Text style={style.alerttextstyle}>
                  NOTE:SOS BUTTON SHOULD BE USED IN EMERGENCY SITUATION ONLY .
                </Text>
                <Text style={style.alerttextstyle}>
                  IF YOU WILL PRESS OK AN ALERT MESSAGE WILL BE SENT TO YOUR
                  PARENT AND A CALL WILL BE MADE TO THE EMERGENCY SERVICES.
                </Text>
                <TouchableOpacity
                  style={style.buttonstyle5}
                  onPress={() => {
                    Communications.phonecall('108', true);
                    var update = db
                      .collection('user')
                      .doc(this.state.doc_id)
                      .update({
                        isthekidindangerdanger: 'true',
                      });
                    var update1 = this.setState({ isModalVisible: false });
                  }}>
                  <Text style={style.buttontextstyle6}>OK</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    if (this.state.geocode) {
      this.updatelocation();
      console.log('LOCATION');
    }
    const { location, geocode, errorMessage } = this.state;
    return (
      <View>
        <ScrollView>
          {this.showmodal()}
          <ImageBackground
            source={require('../assets/BG2.png')}
            style={{ height: RFValue(999), backgroundColor: '#4B4270' }}>
            <MyHeader title="CHILD SCREEN" navigation={this.props.navigation} />
            <View>
              <Text style={style.textstyle2}>YOUR LOCATION</Text>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  margin: RFValue(30),
                }}>
                <Icon
                  raised
                  name="map"
                  type="feather"
                  color="#4B4270"
                  size={55}
                />
              </View>
              <View style={style.timeanddatestyle}>
                <TouchableOpacity
                  onPress={() => {
                    var ref2 = db
                      .collection('user')
                      .where('email_id', '==', this.state.user_id)
                      .get()
                      .then((snapshot) => {
                        snapshot.forEach((doc) => {
                          this.setState({
                            hours: new Date().getHours(),
                            minute: new Date().getMinutes(),
                            second: new Date().getSeconds(),
                            day: new Date().getDate(),
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear(),
                          });
                        });
                      });
                    var message = Toast.show('PLEASE WAIT...', Toast.LONG);
                  }}>
                  <Icon
                    raised
                    name="refresh-cw"
                    type="feather"
                    color="orange"
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={style.timetextstyle}>
                  TIME:{this.state.hours}:{this.state.minute}:
                  {this.state.second}
                </Text>
                <Text style={style.datetextstyle}>
                  DATE:{this.state.day}:{this.state.month}:{this.state.year}
                </Text>
              </View>
              <View style={style.locationstyle}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <Text style={style.textstyle}>
                    {geocode
                      ? `${geocode[0].subregion}, ${geocode[0].region},${geocode[0].postalCode},
                         ${geocode[0].street},${geocode[0].district},${geocode[0].isoCountryCode}, 
                         ${geocode[0].country} `
                      : 'SEARCHING'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={style.buttonstyle}
                onPress={() => {
                  var update = db
                    .collection('user')
                    .where('email_id', '==', this.state.user_id)
                    .get()
                    .then((snapshot) => {
                      snapshot.forEach((doc) => {
                        this.setState({
                          doc_id: doc.id,
                        });
                      });
                    });
                  var sendalertmessage = this.setState({
                    isModalVisible: true,
                  });
                }}>
                <Text style={style.buttontextstyle}>SOS</Text>
              </TouchableOpacity>
              <Text style={style.textstyle3}>
                {' '}
                NOTE:SOS BUTTON SHOULD BE USED IN EMERGENCY SITUATION ONLY{' '}
              </Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  locationstyle: {
    backgroundColor: 'white',
    borderRadius: 14,
    alignSelf: 'center',
    width: RFValue(200),
    opacity: 0.9,
    shadowColor: 'white',
    shadowOffset: {
      width: RFValue(4),
      height: RFValue(8),
    },
    shadowOpacity: RFValue(0.44),
    shadowRadius: RFValue(10.32),
    elevation: RFValue(32),
    marginBottom: RFValue(60),
  },
  textstyle: {
    fontSize: RFValue(18),
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textstyle2: {
    fontSize: RFValue(18),
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(25),
  },
  buttonstyle: {
    backgroundColor: '#FB2725',
    borderRadius: RFValue(40),
    margin: RFValue(30),
    width: RFValue(150),
    height: RFValue(40),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    shadowOpacity: RFValue(0.25),
    shadowRadius: RFValue(3.84),

    elevation: RFValue(5),
  },
  buttontextstyle: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: RFValue(15.3),
    color: 'white',
  },
  textstyle3: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    color: 'orange',
    fontSize: RFValue(8.8),
  },
  timetextstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(10),
    fontFamily: 'monospace',
    fontSize: RFValue(15),
    color: 'orange',
    fontWeight: 'bold',
  },
  timeanddatestyle: {
    backgroundColor: 'white',
    borderRadius: 14,
    width: RFValue(200),
    opacity: 0.9,
    alignSelf: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: RFValue(4),
      height: RFValue(8),
    },
    shadowOpacity: RFValue(0.44),
    shadowRadius: RFValue(10.32),
    elevation: RFValue(32),
    marginBottom: RFValue(60),
  },
  datetextstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(10),
    fontFamily: 'monospace',
    fontSize: RFValue(15),
    color: 'orange',
    fontWeight: 'bold',
  },
  modelstyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    width: RFValue(290),
    opacity: 0.9,
    shadowOffset: {
      width: RFValue(3),
      height: RFValue(5),
    },
    shadowOpacity: RFValue(0.44),
    shadowRadius: RFValue(10.32),
    elevation: RFValue(30),
    margin: RFValue(20),
    marginBottom: RFValue(60),
  },
  bottonstyle3: {
    height: RFValue(50),
    width: RFValue(50),
    margin: RFValue(10),
  },
  iconstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(25),
  },
  alerttextstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(30),
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  buttonstyle5: {
    backgroundColor: '#FF5F58',
    borderRadius: RFValue(40),
    margin: RFValue(60),
    width: RFValue(90),
    height: RFValue(40),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: RFValue(3),
      height: RFValue(5),
    },
    shadowOpacity: RFValue(0.44),
    shadowRadius: RFValue(10.32),
    elevation: RFValue(20),
    marginBottom: RFValue(20),
  },
  buttontextstyle6: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: RFValue(15),
    color: 'white',
  },
});
