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
import MyHeader from '../components/MYHeader3';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import db from '../config';
import firebase from 'firebase';

export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = {
      isthekidindanger: '',
      user_id: firebase.auth().currentUser.email,
      doc_id: '',
      notificationpass: '',
      notificationpass1: '',
      isModalVisible: 'false',
    };
    this.notificationRef = null;
  }
  updatestatus = () => {
    this.notificationRef = db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            isthekidindanger: doc.data().isthekidindangerdanger,
          });
        });
      });
  };

  updatedocid = async () => {
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
  };

  componentDidMount = async () => {
    this.updatestatus();
    this.updatedocid();
    var ref2 = await db
      .collection('user')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            notificationpass: doc.data().notificationpass,
          });
        });
      });
  };

  componentWillUnmount() {
    this.notificationRef();
  }

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
                    color="lightblue"
                  />
                </TouchableOpacity>
                <View style={style.iconstyle3}>
                  <Icon
                    raised
                    name="alert-triangle"
                    type="feather"
                    color="lightblue"
                    size={70}
                  />
                </View>
                <Text style={style.alerttextstyle}>
                  HELLO PARENT PLEASE CONFIRM YOUR IDENTITY TO MAKE THE MESSAGE
                  AS READ.
                </Text>
                <Input
                  onChangeText={(text) => {
                    this.setState({
                      notificationpass1: text,
                    });
                  }}
                  containerStyle={style.inputstyle}
                  style={style.inputboxstyle}
                  secureTextEntry={true}
                  placeholder="PASSWORD"
                  placeholderTextColor="lightblue"
                  label="ALERT NOTIFICATION PASS"
                  labelStyle={{
                    color: 'lightblue',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}
                  leftIcon={
                    <Icon
                      name="key"
                      type="feather"
                      color="lightblue"
                      size={25}
                    />
                  }
                />
                <TouchableOpacity
                  style={style.buttonstyle5}
                  onPress={() => {
                    if (
                      this.state.notificationpass ===
                      this.state.notificationpass1
                    ) {
                      var update = db
                        .collection('user')
                        .doc(this.state.doc_id)
                        .update({
                          isthekidindangerdanger: 'false',
                        });
                      this.setState({ isModalVisible: false });
                      Alert.alert(
                        'THANK YOU DEAR PARENT FOR READING THE NOTIFICATION NOW YOU CAN CLICK ON RELOAD TO UPDATE THE NOTIFICATION'
                      );
                    } else {
                      Alert.alert(
                        'PLEASE ENTER A VALID ALERT NOTIFICATION PASSWORD'
                      );
                    }
                  }}>
                  <Text style={style.buttontextstyle6}>CONFIRM</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    if (this.state.isthekidindanger === 'true') {
      return (
        <View>
          <ScrollView>
            {this.showmodal()}
            <ImageBackground
              source={require('../assets/BG4.jpg')}
              style={{ height: RFValue(990), backgroundColor: '#C0E5FF' }}>
              <MyHeader
                title="NOTIFICATION"
                navigation={this.props.navigation}
              />
              <View style={style.boxstyle}>
                <TouchableOpacity
                  onPress={() => {
                    var updatestatus = (this.notificationRef = db
                      .collection('user')
                      .where('email_id', '==', this.state.user_id)
                      .get()
                      .then((snapshot) => {
                        snapshot.forEach((doc) => {
                          this.setState({
                            isthekidindanger: doc.data().isthekidindangerdanger,
                          });
                        });
                      }));
                  }}>
                  <Icon
                    raised
                    name="refresh-cw"
                    type="feather"
                    color="lightblue"
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={style.textstyle2}>
                  YOUR CHILD IS IN DANGER.BECAUSE HE/SHE HAS PRESSED THE SOS
                  BUTTON.PLEASE CALL THE EMERGENCY SERVICES ON HIS/HER LOCATION
                  WITH SOS ON THE PARNET SCREEN OR BY DIALING 108
                </Text>
                <TouchableOpacity
                  style={style.buttonstyle}
                  onPress={() => {
                    var sendalertmessage = this.setState({
                      isModalVisible: true,
                    });
                  }}>
                  <Text style={style.buttontextstyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require('../assets/BG4.jpg')}
          style={{ height: RFValue(750), backgroundColor: '#C0E5FF' }}>
          <MyHeader title="NOTIFICATION" navigation={this.props.navigation} />
          <View style={style.boxstyle2}>
            <TouchableOpacity
              style={style.iconstyle}
              onPress={() => {
                var updatestatus = (this.notificationRef = db
                  .collection('user')
                  .where('email_id', '==', this.state.user_id)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((doc) => {
                      this.setState({
                        isthekidindanger: doc.data().isthekidindangerdanger,
                      });
                    });
                    if (this.state.isthekidindanger === true) {
                      Toast.show(
                        'IF THERE ARE SOME NOTIFICATIONS IT WILL UPDATE. PLEASE WAIT...',
                        Toast.LONG
                      );
                    }
                  }));
              }}>
              <Icon
                raised
                name="refresh-cw"
                type="feather"
                color="lightblue"
                size={30}
              />
            </TouchableOpacity>
            <Text style={style.textstyle2}>
              YOUR KID HAS NOT YET PRESSED THE SOS BUTTON . THIS MEANS THAT
              HE/SHE IS SAFE
            </Text>
          </View>
        </ImageBackground>
      );
    }
  }
}

const style = StyleSheet.create({
  boxstyle: {
    margin: RFValue(110),
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
  textstyle2: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    fontSize: RFValue(18),
    color: 'lightblue',
    fontWeight: 'bold',
    margin: RFValue(10),
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
  iconstyle: {
    alignSelf: 'center',
    margin: 50,
  },
  boxstyle2: {
    margin: RFValue(110),
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
  inputstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: RFValue(30),
    width: RFValue(250),
    margin: RFValue(30), 
  },
  inputboxstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modelstyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    width: RFValue(290),
    opacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'white',
    shadowOpacity: 1,
    elevation: 3,
  },
  bottonstyle3: {
    height: RFValue(50),
    width: RFValue(50),
    margin: RFValue(10),
  },
  iconstyle3: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(25),
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
  alerttextstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(30),
    fontSize: 17,
    color: 'lightblue',
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
