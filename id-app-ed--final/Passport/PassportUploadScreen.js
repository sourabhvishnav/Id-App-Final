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

export default class PassportUploadScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      aadhar: '#',
      voterId: '#',
      userId: firebase.auth().currentUser.email,
      applicationId: '',
      marksheet: '#',
      drivingLicence: '#',
      specialGovtId: '#',
      disabilityCertificate: '#',
      panCard: '#',
      requestStatus:"",
      appliedDate:"",
      request_id:""
    };
  }

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

  getDetails = async () => {
    var email = firebase.auth().currentUser.email;
    console.log(email);
    const query = await db
      .collection('all_applications')
      .where('type', '==', 'Passport')
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

  selectPicture = async (imageName) => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    switch (imageName) {
      case 'marksheet':
        this.setState({
          marksheet: uri,
        });
        this.uploadImage(this.state.marksheet, 'marksheet');
        break;
      case 'aadhar':
        this.setState({
          aadhar: uri,
        });
        this.uploadImage(this.state.aadhar, 'aadhar');
        break;
      case 'drivingLicence':
        this.setState({
          drivingLicence: uri,
        });
        this.uploadImage(this.state.drivingLicence, 'drivingLicence');
        break;
      case 'specialGovtId':
        this.setState({
          specialGovtId: uri,
        });
        this.uploadImage(this.state.specialGovtId, 'specialGovtId');
        break;
      case 'voterId':
        this.setState({
          voterId: uri,
        });
        this.uploadImage(this.state.voterId, 'voterId');
        break;
      case 'panCard':
        this.setState({
          panCard: uri,
        });
        this.uploadImage(this.state.panCard, 'panCard');
        break;
      case 'disabilityCertificate':
        this.setState({
          disabilityCertificate: uri,
        });
        this.uploadImage(
          this.state.disabilityCertificate,
          'disabilityCertificate'
        );
    }
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
          'Passport/' +
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
          'Passport' +
          this.state.applicationId +
          '/' +
          imageName
      );
    storageRef.getDownloadURL().then((url) => {
      switch (imageName) {
        case 'aadhar':
          this.setState({
            aadhar: url,
          });
          break;
        case 'marksheet':
          this.setState({
            marksheet: url,
          });
          break;
        case 'drivingLicence':
          this.setState({
            drivingLicence: url,
          });
          break;
        case 'specialGovtId':
          this.setState({
            specialGovtId: url,
          });

          break;
        case 'voterId':
          this.setState({
            voterId: url,
          });

          break;
        case 'panCard':
          this.setState({
            panCard: url,
          });
          break;
        case 'disabilityCertificate':
          this.setState({
            disabilityCertificate: url,
          });
      }
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
                  text: 'Passport',
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
                  text: 'Passport',
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
              PLease Upload the documents in proper way
            </Text>
            <ScrollView>
              <View
                style={{
                  margin: 5,
                  padding: 0,
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
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Marksheet *
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.marksheet }}
                  onPress={() => this.selectPicture('marksheet')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Pan Card*
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.panCard }}
                  onPress={() => this.selectPicture('panCard')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Voter Id*
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.voterId }}
                  onPress={() => this.selectPicture('voterId')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>

              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Driving Licence
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.drivingLicence }}
                  onPress={() => this.selectPicture('drivingLicence')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Disability Certificate
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.disabilityCertificate }}
                  onPress={() => this.selectPicture('disabilityCertificate')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
                    marginTop: 10,
                  }}
                />
              </View>

              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 25,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Special Goverment Id
                </Text>
                <Avatar
                  size={200}
                  source={{ uri: this.state.specialGovtId }}
                  onPress={() => this.selectPicture('specialGovtId')}
                  title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                  titleStyle={{ fontSize: 52, color: '#536162' }}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    alignSelf: 'center',
                    width: '99%',
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
                    this.props.navigation.navigate('PassportPreview', {
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
