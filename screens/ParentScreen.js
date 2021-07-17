import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextComponent,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import MyHeader2 from '../components/MyHeader2';
import Toast from 'react-native-simple-toast';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';

export default class ParentScreen extends Component {
  constructor() {
    super();
    this.state = {
      hours: '',
      minute: '',
      second: '',
      day: '',
      month: '',
      year: '',
      geocode: null,
      isModalVisible: 'false',
      user_id: firebase.auth().currentUser.email,
    };
  }
  componentDidMount = async () => {
    var ref2 = await db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            hours: doc.data().tracked_hours,
            minute: doc.data().tracked_minute,
            second: doc.data().tracked_second,
            day: doc.data().tracked_day,
            month: doc.data().tracked_month,
            year: doc.data().tracked_year,
          });
        });
        console.log('TIME', this.state.time);
      });
    var ref = await db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            geocode: doc.data().tracked_location,
          });
        });
      });
    console.log(this.state.geocode);
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
                  IF YOU WILL PRESS OK A CALL WILL BE MADE TO THE EMERGENCY
                  SERVICES.
                </Text>
                <TouchableOpacity
                  style={style.buttonstyle5}
                  onPress={() => {
                    Communications.phonecall('108', true);
                    var update = this.setState({ isModalVisible: false });
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
    const geocode = this.state.geocode;
    return (
      <ScrollView>
        {this.showmodal()}
        <ImageBackground
          source={require('../assets/crop.jpg')}
          style={{
            height: RFValue(999),
            backgroundColor: '#F88662',
          }}>
          <MyHeader2
            title="CHILD SECURITY"
            navigation={this.props.navigation}
          />
          <View>
            <Text style={style.textstyle2}>YOUR CHILD LOCATION</Text>
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
                color="#F88662"
                size={55}
              />
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                margin: RFValue(10),
              }}
              onPress={() => {
                var update = db
                  .collection('user')
                  .where('email_id', '==', this.state.user_id)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((doc) => {
                      this.setState({
                        hours: doc.data().tracked_hours,
                        minute: doc.data().tracked_minute,
                        second: doc.data().tracked_second,
                        day: doc.data().tracked_day,
                        month: doc.data().tracked_month,
                        year: doc.data().tracked_year,
                      });
                    });
                    console.log('TIME', this.state.time);
                  });
                var update2 = db
                  .collection('user')
                  .where('email_id', '==', this.state.user_id)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((doc) => {
                      this.setState({
                        geocode: doc.data().tracked_location,
                      });
                    });
                  });
                var update3 = Toast.show('PLEASE WAIT...', Toast.LONG);
              }}>
              <Icon
                raised
                name="refresh-cw"
                type="feather"
                color="orange"
                size={44}
              />
            </TouchableOpacity>
            <View style={style.timeanddatestyle}>
              <Text style={style.timetextstyle}>
                LOCATION AT TIME:{this.state.hours}:{this.state.minute}:
                {this.state.second}
              </Text>
              <Text style={style.datetextstyle}>
                LOCATION AT DATE:{this.state.day}:{this.state.month}:
                {this.state.year}
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
    color: 'white',
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
    color: 'white',
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
