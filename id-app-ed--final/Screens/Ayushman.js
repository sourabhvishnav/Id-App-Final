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
import { Input, Icon, Header } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class Ayushman extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
      <ScrollView>
        <Header
          centerComponent={{
            text: 'Ayushman card',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
            },
          }}
          containerStyle={{ backgroundColor: '#DF5E5E' }}
        />
        <Image
          source={require('../assets/ayushman.jpg')}
          style={{
            height: 225,
            width: 330,
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 2,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            margin: 5,
            padding: 5,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Documents
        </Text>
        <Text
          style={{ fontSize: 18, margin: 3, padding: 3, textAlign: 'center' }}>
          1.) AadharCrad
        </Text>
        <Text
          style={{ fontSize: 18, margin: 3, padding: 3, textAlign: 'center' }}>
          2.)Samagra
        </Text>

        <Text
          style={{ fontSize: 18, margin: 3, padding: 3, textAlign: 'center' }}>
          *All documents should be orignal
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
          style={{
            marginTop: 15,
            alignSelf: 'center',
            backgroundColor: '#DF5E5E',
            width: '35%',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              margin: 7,
              padding: 7,
              textAlign: 'center',
              color: 'white',
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaProvider>
    );
  }
}
