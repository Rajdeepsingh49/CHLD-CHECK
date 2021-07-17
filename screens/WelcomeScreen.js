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
import { Input, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { EvilIcons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      name: '',
      address: '',
      contact: '',
      confirmPassword: '',
      notificationpass: '',
      isModalVisible: 'false',
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('user').add({
            name: this.state.name,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            password: this.state.password,
            notificationpass: this.state.notificationpass,
            tracked_location: '',
            tracked_hours: '',
            tracked_minute: '',
            tracked_second: '',
            tracked_day: '',
            tracked_month: '',
            tracked_year: '',
            isthekidindangerdanger: 'false',
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('HOME');
        Toast.show('LOG IN SUCCESSFULL...', Toast.LONG);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showmodal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView>
              <View style={style.modelViewstyle}>
                <TouchableOpacity
                  style={style.bottonstyle3}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}>
                  <EvilIcons name="arrow-left" size={60} color="black" />
                </TouchableOpacity>
                <View>
                  <Image
                    source={require('../assets/SIGNUP1.png')}
                    style={style.imageStyle3}
                  />
                  <Text style={style.signuptextstyle}>SIGN UP</Text>
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        emailId: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    placeholder="EMAIL"
                    keyboardType="email-address"
                    placeholderTextColor="black"
                    label="EMAIL"
                    labelStyle={{
                      color: 'black',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                    }}
                    leftIcon={<Icon name="mail" type="feather" size={25} />}
                  />
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    placeholder="PHONENUMBER"
                    placeholderTextColor="black"
                    label="PHONENUMBER"
                    keyboardType="numeric"
                    labelStyle={{
                      color: 'black',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                    }}
                    leftIcon={<Icon name="phone" type="feather" size={25} />}
                  />
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    placeholder="ADDRESS"
                    placeholderTextColor="black"
                    label="ADDRESS"
                    labelStyle={{
                      color: 'black',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                    }}
                    leftIcon={<Icon name="map" type="feather" size={25} />}
                  />
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        name: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    placeholder="CHILD NAME"
                    placeholderTextColor="black"
                    label="NAME"
                    labelStyle={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}
                    leftIcon={<Icon name="user" type="feather" size={25} />}
                  />

                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    secureTextEntry={true}
                    placeholder="PASSWORD"
                    placeholderTextColor="black"
                    label="PASSWORD"
                    labelStyle={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}
                    leftIcon={<Icon name="lock" type="feather" size={25} />}
                  />
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    secureTextEntry={true}
                    placeholder="CONFIRMPASSWORD"
                    placeholderTextColor="black"
                    label="CONFIRMPASSWORD"
                    labelStyle={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}
                    leftIcon={<Icon name="unlock" type="feather" size={25} />}
                  />
                  <Input
                    onChangeText={(text) => {
                      this.setState({
                        notificationpass: text,
                      });
                    }}
                    containerStyle={style.inputstyle}
                    style={style.inputboxstyle}
                    secureTextEntry={true}
                    placeholder="PASSWORD"
                    placeholderTextColor="black"
                    label="ALERT NOTIFICATION PASS"
                    labelStyle={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}
                    leftIcon={<Icon name="key" type="feather" size={25} />}
                  />
                  <TouchableOpacity
                    style={style.buttonstyle4}
                    onPress={() => {
                      this.userSignUp(
                        this.state.emailId,
                        this.state.password,
                        this.state.confirmPassword
                      );
                    }}>
                    <Text style={style.buttontextstyle3}>CREATE ACCOUNT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <ScrollView>
        {this.showmodal()}
        <ImageBackground
          source={require('../assets/BG.png')}
          style={style.image}>
          <Image
            style={style.imageStyle}
            source={require('../assets/usi.png')}
          />
          <Text style={style.textstyle}>LOGIN</Text>
          <Input
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
            containerStyle={style.inputstyle}
            style={style.inputboxstyle}
            placeholder="EMAIL"
            leftIcon={
              <Icon name="mail" type="feather" color="white" size={25} />
            }
            keyboardType="email-address"
            placeholderTextColor="white"
            label="EMAIL"
            labelStyle={{
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 'bold',
            }}
          />
          <Input
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            containerStyle={style.inputstyle}
            style={style.inputboxstyle}
            secureTextEntry={true}
            placeholder="PASSWORD"
            placeholderTextColor="white"
            label="PASSWORD"
            labelStyle={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}
            leftIcon={
              <Icon name="lock" type="feather" color="white" size={25} />
            }
          />
          <TouchableOpacity
            style={style.buttonstyle}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text style={style.buttontextstyle}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.textbackground}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}>
            <Text style={style.textStyle}>
              DON'T HAVE A ACCOUNT? : CREATE ACCOUNT{' '}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  image: {
    flex: RFValue(1),
    height: RFValue(777),
  },
  imageStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: RFValue(140),
    width: RFValue(140),
    marginTop: RFValue(50),
  },
  textstyle: {
    fontFamily: 'monospace',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: RFValue(15),
    margin: RFValue(5),
    color: 'white',
    fontWeight: 'bold',
    shadowColor: 'white',
  },
  inputboxstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonstyle: {
    backgroundColor: '#FF5F58',
    borderRadius: RFValue(40),
    margin: RFValue(80),
    width: RFValue(150),
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
  buttontextstyle: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: RFValue(15),
    color: 'white',
  },
  textStyle: {
    fontSize: RFValue(9.5),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  textbackground: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: RFValue(45),
  },
  modelViewstyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    width: RFValue(300),
    opacity: 0.9,
    shadowColor: 'white',
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
  imageStyle3: {
    width: RFValue(100),
    height: RFValue(120),
    alignSelf: 'center',
  },
  signuptextstyle: {
    alignSelf: 'center',
    margin: RFValue(10),
    fontSize: RFValue(16),
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  inputstyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: RFValue(30),
    width: RFValue(250),
    margin: RFValue(30),
  },
  buttonstyle4: {
    backgroundColor: '#FF5F58',
    borderRadius: RFValue(40),
    margin: RFValue(40),
    width: RFValue(180),
    height: RFValue(45),
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
    marginTop: RFValue(20),
  },
  buttontextstyle3: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: RFValue(15),
    color: 'white',
  },
});
