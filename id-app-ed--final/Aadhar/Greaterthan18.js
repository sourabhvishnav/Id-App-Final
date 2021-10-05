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
import { Input, Icon, Header, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class AdultAadhar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      havePassport: false,
      dontHavePassport: false,
      userId: firebase.auth().currentUser.email,
      frontSide: '#',
      backSide: '#',
      applicationId: '',
      ssmid: '#',
      voterId: '#',
      marksheet: '#',
      licence: '#',
    };
  }

  getUserDetails = async () => {
    var email = firebase.auth().currentUser.email;
    console.log(email);
    const query = await db
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(data);
          this.setState({
            name: data.name,
            contact: data.contact,
          });
        });
      });
  };

  applicationId = () => {
    const id = Math.random().toString(30).substring(2);
    this.setState({
      applicationId: id,
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
      case 'frontSide':
        this.setState({
          frontSide: uri,
        });
        this.uploadImage(this.state.frontSide, 'passportfrontside');
        break;
      case 'backSide':
        this.setState({
          backSide: uri,
        });
        this.uploadImage(this.state.backSide, 'passportBackSide');
        break;
      case 'ssmid':
        this.setState({
          ssmid: uri,
        });
        this.uploadImage(this.state.ssmid, 'ssmid');
        break;
      case 'voterId':
        this.setState({
          voterId: uri,
        });
        this.uploadImage(this.state.voterId, 'voterId');
        break;
      case 'marksheet':
        this.setState({
          marksheet: uri,
        });
        this.uploadImage(this.state.marksheet, 'marksheet');
        break;
      case 'licence':
        this.setState({
          licence: uri,
        });
        this.uploadImage(this.state.licence, 'licence');
        break;
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
          'Aadhar/' +
          '18+/' +
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
          'Aadhar/' +
          '18+/' +
          this.state.applicationId +
          '/' +
          imageName
      );
    storageRef.getDownloadURL().then((url) => {
      this.setState({ aadharimage: url });
    });
  };

  componentDidMount() {
    this.getUserDetails();
    this.applicationId();
    console.log('Application id : ' + this.state.applicationId);
  }
  // componentDidUpdate() {
  //   this.fetchImage('ssmid');
  //   this.fetchImage('marksheet');
  //   this.fetchImage('voterId');
  //   this.fetchImage('licence');
  //   this.fetchImage('passportfrontside');
  //   this.fetchImage('passportBackSide');
  // }

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView>
          <LinearGradient colors={['#2193b0', '#6dd5ed']}>
            <Header
              centerComponent={{
                text: 'Greater Than 18',
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
                    this.props.navigation.navigate('Aadhar');
                  }}
                />
              }
              containerStyle={{ backgroundColor: '#' }}
            />
          </LinearGradient>

          <View>
            <Text
              style={{
                textAlign: 'center',
                margin: 5,
                padding: 5,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Do You have Passport
            </Text>
            <LinearGradient
              colors={['#2193b0', '#6dd5ed']}
              style={{
                marginTop: 15,
                alignSelf: 'center',
                backgroundColor: '#DF5E5E',
                alignItems: 'center',
                borderRadius: 25,
                marginBottom: 15,
                width: 95,
                height: 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    havePassport: true,
                    dontHavePassport: false,
                  });
                }}
                style={{
                  alignSelf: 'center',
                  marginTop: 6,
                  color: '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#2193b0', '#6dd5ed']}
              style={{
                marginTop: 10,
                alignSelf: 'center',
                backgroundColor: '#DF5E5E',
                alignItems: 'center',
                borderRadius: 25,
                marginBottom: 15,
                width: 95,
                height: 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    dontHavePassport: true,
                    havePassport: false,
                  });
                }}
                style={{
                  alignSelf: 'center',
                  marginTop: 6,
                  color: '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {this.state.havePassport === true ? (
            <View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 20,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Passport Front Side *
                </Text>
                <Avatar
                  onPress={() => this.selectPicture('frontSide')}
                  source={{ uri: this.state.frontSide }}
                  size={200}
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
                  marginTop: 20,
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Passport Back Side *
                </Text>
                <Avatar
                  size={200}
                  onPress={() => this.selectPicture('backSide')}
                  source={{ uri: this.state.backSide }}
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
                    this.props.navigation.navigate('PassportPreviewScreen', {
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
            </View>
          ) : null}
          {this.state.dontHavePassport == true ? (
            <View>
              <View
                style={{
                  margin: 5,
                  padding: 0,
                  marginTop: 20,
                  alignSelf: 'cetner',
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  School Markssheet*
                </Text>
                <Avatar
                  size={200}
                  onPress={() => this.selectPicture('marksheet')}
                  source={{ uri: this.state.marksheet }}
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
                  marginTop: 20,
                  alignSelf: 'cetner',
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Ration Card ( Samagra Id ) *
                </Text>
                <Avatar
                  size={200}
                  onPress={() => this.selectPicture('ssmid')}
                  source={{ uri: this.state.ssmid }}
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
                  marginTop: 20,
                  alignSelf: 'cetner',
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  VoterId*
                </Text>
                <Avatar
                  size={200}
                  onPress={() => this.selectPicture('voterId')}
                  source={{ uri: this.state.voterId }}
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
                  marginTop: 20,
                  alignSelf: 'cetner',
                }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  Driving Licence
                </Text>
                <Avatar
                  size={200}
                  onPress={() => this.selectPicture('licence')}
                  source={{ uri: this.state.licence }}
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
                    this.props.navigation.navigate('AdultPreviewScreen', {
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
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
