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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class MinorPreviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardianAadharimage: '#',
      birthCertificate: '#',
      ssmid: '#',
      marksheet: '#',
      gardianVoterId: '#',
      userId: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      applicationId: this.props.navigation.getParam('applicationId'),
      applicationCount: 0,
      docId: '',
    };
  }

  updateApplicationCount = () => {
    var updatedCount = parseInt(this.state.applicationCount) + 1;
    db.collection('users').doc(this.state.docId).update({
      applicationCount: updatedCount,
    });
  };

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
            applicationCount: data.applicationCount,
            docId: doc.id,
          });
        });
      });
  };

  addAplication = () => {
    if(this.state.gardianAadharimage == '' || this.state.ssmid == '' || this.state.birthCertificate == ''){
      alert('Please Upload Documents Correctly')
    }else{
     var userId = this.state.userId;
    var randomRequestId = this.state.applicationId;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDate = date + '/' + month + '/' + year;
    this.updateApplicationCount();
    db.collection('all_applications')
      .add({
        user_id: userId,
        name: this.state.name,
        request_id: randomRequestId,
        date: currentDate,
        contact: this.state.contact,
        type: 'MinorAadhar',
        status: 'Pending',
        targetDate: '',
        additionalComment: '',
        paymentStatus: 'Awaiting-Confirmation',
      })
      .then(() => {
        alert('Request Added Succesfully');
        this.props.navigation.navigate('Aadhar');
      });
    }
    
  };

  fetchImages = async (imageName) => {
    console.log(imageName);
    var storageRef = await firebase
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
    storageRef.getDownloadURL().then((url) => {
      switch (imageName) {
        case 'birth':
          this.setState({ birthCertificate: url });
          break;
        case 'gardianAadhar':
          this.setState({ gardianAadharimage: url });
          break;
        case 'ssmid':
          this.setState({ ssmid: url });
          break;
        case 'marksheet':
          this.setState({ marksheet: url });
          break;
        case 'gardianVoterId':
          this.setState({ gardianVoterId: url });
          break;
      }
    });
  };

  componentDidMount() {

       this.getUserDetails();
    this.fetchImages('birth');
    this.fetchImages('gardianAadhar');
    this.fetchImages('ssmid');
    this.fetchImages('marksheet');
    this.fetchImages('gardianVoterId');
   
  }

  render() {
    return (
      <SafeAreaProvider>
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
                    this.props.navigation.navigate('Aadhar');
                  }}
                />
              }
              containerStyle={{ backgroundColor: '#' }}
            />
          </LinearGradient>
          <Text
            style={{
              margin: 5,
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Please Preview Your Details before Submiting
          </Text>
          <View style={{ marginTop: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text>Gardian Aadhar </Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.gardianAadharimage }}
                  titleStyle={{ fontSize: 25 }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    margin: 4,
                    padding: 4,
                  }}
                />
              </View>
              <View>
                <Text>Birth Certificate </Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.birthCertificate }}
                  titleStyle={{ fontSize: 25 }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    margin: 4,
                    padding: 4,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
              }}>
              <View>
                <Text>Ration Card ( SSMID )</Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.ssmid }}
                  titleStyle={{ fontSize: 25 }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    margin: 4,
                    padding: 4,
                  }}
                />
              </View>
              <View>
                <Text>School Marksheet </Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.marksheet }}
                  titleStyle={{ fontSize: 25 }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    margin: 4,
                    padding: 4,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
              }}>
              <View>
                <Text>Gardian Voter Id</Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.gardianVoterId }}
                  titleStyle={{ fontSize: 25 }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: '#bbb',
                    margin: 4,
                    padding: 4,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 15,
              borderColor: '#BBB',
              borderWidth: 1,
            }}>
            <View style={{ margin: 5, padding: 5 }}>
              <Text style={{ textAlign: 'center' }}>Details</Text>
              <Text style={{ marginTop: 10 }}>Govt Charge : 50</Text>
              <Text style={{ marginTop: 2 }}>Commision Charge : 0</Text>
              <Text style={{ marginTop: 2, alignSelf: 'center' }}>
                Total : 50
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={['#2193b0', '#6dd5ed']}
            style={{
              marginTop: 25,
              alignSelf: 'center',
              backgroundColor: '#DF5E5E',
              alignItems: 'center',
              borderRadius: 25,
              marginBottom: 15,
              width: 140,
              height: 47,
            }}>
            <TouchableOpacity onPress={()=>{this.addAplication()}}>
              <Text
                style={{
                  fontSize: 18,
                  margin: 7,
                  padding: 7,
                  textAlign: 'center',
                  color: '#fff',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#2193b0', '#6dd5ed']}
            style={{
              marginTop: 25,
              alignSelf: 'center',
              backgroundColor: '#DF5E5E',
              alignItems: 'center',
              borderRadius: 25,
              marginBottom: 15,
              width: 140,
              height: 47,
            }}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
              <Text
                style={{
                  fontSize: 18,
                  margin: 7,
                  padding: 7,
                  textAlign: 'center',
                  color: '#fff',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
