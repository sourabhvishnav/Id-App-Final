import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Input, Icon, Header, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class Aadhar extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestStatus: '',
      message: '',
      appliedDate: '',
      request_id: '',
    };
  }

  getDetails = async () => {
    var email = firebase.auth().currentUser.email;
    console.log(email);
    const query = await db
      .collection('all_applications')
      .where('user_id', '==', email)
      .where('type', 'in',[ 'MinorAadhar', 'AdultAadhar'])
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(data);
          this.setState({
            requestStatus: data.status,
            appliedDate: data.date,
            request_id: data.request_id,
          });
        });
      });
  };

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return (
      <SafeAreaProvider>
        {this.state.requestStatus == 'Pending' ? (
          <View>
            <LinearGradient colors={['#2193b0', '#6dd5ed']}>
              <Header
                centerComponent={{
                  text: 'Aadhar',
                  style: {
                    margin: 2,
                    padding: 2,
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                  },
                }}
                leftComponent={
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff"
                    style={{ alignSelf: 'flex-start', marginTop: 5 }}
                    onPress={() => {
                      this.props.navigation.navigate('Home');
                    }}
                  />
                }
                containerStyle={{ backgroundColor: '#' }}
              />
            </LinearGradient>
            <Text
              style={{
                textAlign: 'center',
                margin: 5,
                padding: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Sorry you can not apply your request is already under process
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 15,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Your Request Id : {this.state.request_id}
            </Text>
            <View>
              <Card title="Item Information">
                <Card.Title style={{ fontSize: 15 }}>Information</Card.Title>
                <Card.Divider />
                <Card>
                  <Text style={{ fontSize: 17, fontWeight: 'weight' }}>
                    Status : {this.state.requestStatus}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontSize: 17 }}>
                    Application Date : {this.state.appliedDate}
                  </Text>
                </Card>
              </Card>
            </View>
          </View>
        ) : (
          <ScrollView>
            <LinearGradient colors={['#2193b0', '#6dd5ed']}>
              <Header
                centerComponent={{
                  text: 'Preview',
                  style: {
                    margin: 2,
                    padding: 2,
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                  },
                }}
                leftComponent={
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff"
                    style={{ alignSelf: 'flex-start', marginTop: 5 }}
                    onPress={() => {
                      this.props.navigation.navigate('Home');
                    }}
                  />
                }
                containerStyle={{ backgroundColor: '#' }}
              />
            </LinearGradient>

            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  margin: 5,
                  padding: 5,
                  textAlign: 'center',
                  marginTop: 40,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Select Age
              </Text>
              <LinearGradient
                colors={['#2193b0', '#6dd5ed']}
                style={{
                  marginTop: 35,
                  alignSelf: 'center',
                  backgroundColor: '#DF5E5E',

                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('MinorAadhar');
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      margin: 7,
                      padding: 7,
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Age Less than 18
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#2193b0', '#6dd5ed']}
                style={{
                  marginTop: 55,
                  alignSelf: 'center',
                  backgroundColor: '#DF5E5E',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('AdultAadhar');
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      margin: 7,
                      padding: 7,
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Greater than 18
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        )}
      </SafeAreaProvider>
    );
  }
}
