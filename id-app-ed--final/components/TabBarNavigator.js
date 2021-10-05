import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../Screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import SettingScreen from '../Screens/Settings';
import NotificationScreen from '../Screens/Notifications';
import TrackScreen from '../Screens/TrackScreen';

export const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: () => {
        return null;
      },
      tabBarIcon: ({ tintColor }) => (
        <View>
          <AntDesign name="home" size={25} color={tintColor} />
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2193b0', inactiveTintColor: 'gray' },
    },
  },

  Track: {
    screen: TrackScreen,
    navigationOptions: {
      tabBarLabel: () => {
        return null;
      },
      tabBarIcon: ({ tintColor }) => (
        <View>
          <MaterialIcons name="track-changes" size={24} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#2193b0',
        inactiveTintColor: 'gray',
      },
    },
  },

  Notification: {
    screen: NotificationScreen,
    navigationOptions: {
      tabBarLabel: () => {
        return null;
      },
      tabBarIcon: ({ tintColor }) => (
        <View>
          <MaterialIcons name="notifications" size={24} color={tintColor} />
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2193b0', inactiveTintColor: 'gray' },
    },
  },
  Settings: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarLabel: () => {
        return null;
      },
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="user" size={24} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#2193b0',
        inactiveTintColor: 'gray',
      },
    },
  },
});
