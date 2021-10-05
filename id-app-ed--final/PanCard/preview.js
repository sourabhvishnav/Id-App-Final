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

export default class PanPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aadhar: '#',
      userId: firebase.auth().currentUser.email,
      applicationId: this.props.navigation.getParam('applicationId'),
      contact: '',
      name: '',
      applicationCount: 0,
      docId: '',
    };
  }

  updateApplicationCount = () => {
    var updatedCount = this.state.applicationCount + 1;
    db.collection('users').doc(this.state.docId).update({
      applicationCount: updatedCount,
    });
  };

  fetchImage = async () => {
    var storageRef = await firebase
      .storage()
      .ref()
      .child(
        this.state.userId +
          '/' +
          'PanCard/' +
          this.state.applicationId +
          '/' +
          'aadhar'
      );
    storageRef.getDownloadURL().then((url) => {
      this.setState({ aadhar: url });
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

  componentDidMount() {
    this.fetchImage();
    this.getUserDetails();
  }

  addAplication = () => {
    if (this.state.aadhar == '') {
      alert('Please Upload Documents Correctly');
    }else{
      var userId = this.state.userId;
    var randomRequestId = this.state.applicationId;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDate = date + '/' + month + '/' + year;
    this.updateApplicationCount();
    console.log(currentDate);
    db.collection('all_applications')
      .add({
        user_id: userId,
        name: this.state.name,
        request_id: randomRequestId,
        date: currentDate,
        contact: this.state.contact,
        type: 'Pan',
        status: 'Pending',
        targetDate: '',
        additionalComment: '',
        paymentStatus: '',
      })
      .then(() => {
        alert('Request Added Succesfully');
        this.props.navigation.navigate('PanCardApplyScreen');
      });
    }
   
  };

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView>
          <LinearGradient colors={['#2193b0', '#6dd5ed']}>
            <Header
              centerComponent={{
                text: ' Pan Preview',
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
                    this.props.navigation.navigate('PanCardApplyScreen');
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
                <Text>Aadhar </Text>
                <Avatar
                  size={140}
                  title="Doc"
                  source={{ uri: this.state.aadhar }}
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
                alignSelf: 'center',
                marginTop: 15,
                borderColor: '#BBB',
                borderWidth: 1,
              }}>
              <View style={{ margin: 5, padding: 5 }}>
                <Text style={{ textAlign: 'center' }}>Details</Text>
                <Text style={{ marginTop: 10 }}>Govt Charge : 125</Text>
                <Text style={{ marginTop: 2 }}>Commision Charge : 75</Text>
                <Text style={{ marginTop: 2, alignSelf: 'center' }}>
                  Total : 200
                </Text>
              </View>
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
            <TouchableOpacity>
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
