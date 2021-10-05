import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import SignupScreeen from './Screens/signUp';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import PassportScreen from './Passport/PassportUploadScreen';
import AadharScreeen from './Screens/Aadhar';
import PanCardScreen from './PanCard/UploadScreen';
import VoterId from './VoterID/voterId';
import { AppTabNavigator } from './components/TabBarNavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MinorAadhar from './Aadhar/LessThan18';
import AdultAadhar from './Aadhar/Greaterthan18';
import MinorPreviewScreen from './Aadhar/MinorPreviewScreen';
import PassportPreviewScreen from './Aadhar/PassportPreviewScreen';
import AdultPreviewScreen from './Aadhar/AdultPreviewScreen';
import SettingsScreen from './Screens/Settings';
import PanCardApplyScreen from './PanCard/UploadScreen';
import PanPreviewScreen from './PanCard/preview';
import LicenceUploadScreen from './Licence/LUploadScreen';
import LicencePreview from './Licence/LPreview';
import UpdateProfileScreen from './Screens/UpdateProfile';
import VoterPreviewScreen from './VoterID/voterPreview';
import TrackDetails from './Screens/TrackDetails';
import AyushmanUploadScreen from './Ayushman/AyushmanUploadScreen';
import AyushmanPreviewScreen from './Ayushman/AyushmanPreviewScreen';
import PassportPreview from './Passport/PassportPreviewScreen';
import HelpScreen from './Screens/Help'

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const container = createSwitchNavigator({
  Login: { screen: LoginScreen },
  UpdateProfile: { screen: UpdateProfileScreen },
  MinorAadharPreview: { screen: MinorPreviewScreen },
  SignUp: { screen: SignupScreeen },
  HomeScreen: { screen: HomeScreen },
  PanCardApplyScreen: { screen: PanCardApplyScreen },
  SettingsScreen: { screen: SettingsScreen },
  PassportPreviewScreen: { screen: PassportPreviewScreen },
  AdultAadhar: { screen: AdultAadhar },
  TabNavigation: { screen: AppTabNavigator },
  MinorAadhar: { screen: MinorAadhar },
  Aadhar: { screen: AadharScreeen },
  Passport: { screen: PassportScreen },
  VoterId: { screen: VoterId },
  VoterPreview: { screen: VoterPreviewScreen },
  PanPreviewScreen: { screen: PanPreviewScreen },
  Licence: { screen: LicenceUploadScreen },
  LicencePreview: { screen: LicencePreview },
  AdultPreviewScreen: { screen: AdultPreviewScreen },
  TrackDetails: { screen: TrackDetails },
  AyushmanUploadScreen: { screen: AyushmanUploadScreen },
  AyushmanPreviewScreen: { screen: AyushmanPreviewScreen },
  PassportPreview: { screen: PassportPreview },
  AyushmanPreview: { screen: AyushmanPreviewScreen },
  Help: { screen: HelpScreen },
});
const AppContainer = createAppContainer(container);
