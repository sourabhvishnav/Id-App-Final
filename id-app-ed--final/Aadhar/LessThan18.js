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
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import db from '../config';

export default class MinorAadhar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardianAadharimage: '#',
      birthCertificate: '#',
      userId: firebase.auth().currentUser.email,
      ssmid: '#',
      marksheet: '#',
      gardianVoterId: '#',
      applicationId: '',
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
    console.log(id + '   id');
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
      case 'Birth':
        this.setState({
          birthCertificate: uri,
        });
        this.uploadImage(this.state.birthCertificate, 'birth');
        break;
      case 'gardianAadhar':
        this.setState({
          gardianAadharimage: uri,
        });
        this.uploadImage(this.state.gardianAadharimage, 'gardianAadhar');

        break;
      case 'ssmid':
        this.setState({
          ssmid: uri,
        });
        this.uploadImage(this.state.ssmid, 'ssmid');
        break;
      case 'marksheet':
        this.setState({
          marksheet: uri,
        });
        this.uploadImage(this.state.marksheet, 'marksheet');
        break;
      case 'gardianVoterId':
        this.setState({
          gardianVoterId: uri,
        });
        this.uploadImage(this.state.gardianVoterId, 'gardianVoterId');
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
          +this.state.applicationId +
          '/' +
          imageName
      );
    storageRef.getDownloadURL().then((url) => {
      switch (imageName) {
        case 'Birth':
          this.setState({
            birthCertificate: url,
          });
          break;
        case 'gardianAadhar':
          this.setState({
            gardianAadharimage: url,
          });

          break;
        case 'ssmid':
          this.setState({
            ssmid: url,
          });

          break;
        case 'marksheet':
          this.setState({
            marksheet: url,
          });

          break;
        case 'gardianVoterId':
          this.setState({
            gardianVoterId: url,
          });
      }
    });
  };

  componentDidMount() {
      this.getUserDetails();
      this.applicationId();
  }
  componentDidUpdate() {
    this.fetchImage('gardianAadhar');
    this.fetchImage('Birth');
    this.fetchImage('ssmid');
    this.fetchImage('marksheet');
    this.fetchImage('gardianVoterId');
  }

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView>
          <LinearGradient colors={['#2193b0', '#6dd5ed']}>
            <Header
              centerComponent={{
                text: 'Minor Aadhar',
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

          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              margin: 5,
              padding: 5,
            }}>
            PLease Upload the given documents in proper way
          </Text>
          <ScrollView>
            <View
              style={{
                margin: 5,
                padding: 0,
                marginTop: 25,
                alignSelf: 'center',
              }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                Father's / Mother's Aadhar *
              </Text>
              <Avatar
                size={200}
                source={{ uri: this.state.gardianAadharimage }}
                onPress={() => this.selectPicture('gardianAadhar')}
                title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                containerStyle={{
                  backgroundColor: '#bbb',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                margin: 5,
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                Birth Certificate *
              </Text>
              <Avatar
                onPress={() => this.selectPicture('Birth')}
                source={{ uri: this.state.birthCertificate }}
                size={200}
                icon={<Entypo name="upload" size={40} color="#F8F5F1" />} 
                containerStyle={{
                  backgroundColor: '#bbb',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                margin: 5,
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                Ration Card ( Samagra Id ) *
              </Text>
              <Avatar
                size={200}
                source={{ uri: this.state.ssmid }}
                onPress={() => this.selectPicture('ssmid')}
                title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                containerStyle={{
                  backgroundColor: '#bbb',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                margin: 5,
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                School Marksheet *
              </Text>
              <Avatar
                size={200}
                source={{ uri: this.state.marksheet }}
                onPress={() => this.selectPicture('marksheet')}
                title={<Entypo name="upload" size={40} color="#F8F5F1" />}
                containerStyle={{
                  backgroundColor: '#bbb',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                margin: 5,
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                Father's / Mother's Voter Id
              </Text>
              <Avatar
                size={200}
                onPress={() => this.selectPicture('gardianVoterId')}
                source={{ uri: this.state.gardianVoterId }}
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
                  this.props.navigation.navigate('MinorAadharPreview', {
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
      </SafeAreaProvider>
    );
  }
}
