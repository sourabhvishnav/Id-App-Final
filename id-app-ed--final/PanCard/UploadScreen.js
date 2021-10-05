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
import { Input, Icon, Header, Avatar, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import db from '../config';

export default class PanCard extends React.Component {
  constructor() {
    super();
    this.state = {
      aadhar: '#',
      userId: firebase.auth().currentUser.email,
      applicationId: '',
      requestStatus: '',
      appliedDate: '',
      request_id: '',
    };
  }

  getDetails = async () => {
    var email = firebase.auth().currentUser.email;
    console.log(email);
    const query = await db
      .collection('all_applications')
      .where('type', '==', 'Pan')
      .where('user_id', '==', email)
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

  applicationId = () => {
    const id = Math.random().toString(30).substring(2);
    console.log(id + '   id');
    this.setState({
      applicationId: id,
    });
  };

  componentDidMount() {
    this.applicationId();
    this.getDetails();
  }

  selectPicture = async (imageName) => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      aadhar: uri,
    });
    this.uploadImage(this.state.aadhar, 'aadhar');
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child(
        this.state.userId +
          '/' +
          'PanCard/' +
          this.state.applicationId +
          '/' +
          imageName
      );
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(
        this.state.userId +
          '/' +
          'PanCard' +
          this.state.applicationId +
          '/' +
          imageName
      );
    storageRef.getDownloadURL().then((url) => {
      this.setState({ aadhar: url });
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        {this.state.requestStatus == 'Pending' ? (
          <View>
            <LinearGradient colors={['#2193b0', '#6dd5ed']}>
              <Header
                centerComponent={{
                  text: 'Pan Card',
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
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                    Status : {this.state.requestStatus}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
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
                  text: 'Pan Card',
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
                fontWeight: 'bold',
                fontSize: 17,
                margin: 5,
                padding: 5,
              }}>
              PLease Upload the addhar with phone number updated in it
            </Text>
            <ScrollView>
              <View
                style={{
                  margin: 5,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Aadhar *
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.aadhar }}
                  onPress={() => this.selectPicture('aadhar')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                />
              </View>

              <LinearGradient
                colors={['#2193b0', '#6dd5ed']}
                style={{
                  marginTop: 35,
                  alignSelf: 'center',
                  backgroundColor: '#DF5E5E',
                  alignItems: 'center',
                  borderRadius: 25,
                  marginBottom: 15,
                  width: 150,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PanPreviewScreen', {
                      applicationId: this.state.applicationId,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      margin: 7,
                      padding: 7,
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </ScrollView>
        )}
      </SafeAreaProvider>
    );
  }
}
