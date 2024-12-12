import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashBoard from '../screens/User/DashBoard';
import MarketPlace from '../screens/User/MarketPlace';
import UserProfile from '../screens/User/UserProfile';
import SignalFilterNavigators from './SignalFilterNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const UserNavigator = () => {
  const Tab = createBottomTabNavigator();

  const styles = {
    headerStyle: {
      backgroundColor: '#1F2124',
      shadowColor: 'rgba(43, 134, 255, 0.7)',
      shadowOpacity: 1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
    },
    headerTitleStyle: {
      fontFamily: 'Figtree-Regular',
      fontSize: 16,
      color: '#F1F2EB',
    },
    headerTitleAlign: 'center',
  };

  return (
    <Tab.Navigator
      initialRouteName="UserDashBoard"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1F2124',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#3ABECF',
        tabBarInactiveTintColor: '#F1F2EB',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Figtree-Regular',
        },
      }}>
      <Tab.Screen
        name="UserDashBoard"
        component={DashBoard}
        options={{
          title: 'Home',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MarketPlace"
        component={MarketPlace}
        options={{
          title: 'Listings',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="list-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="person-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Listings"
        component={SignalFilterNavigators}
        options={{
          title: 'My List',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="bookmark-outline" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigator;
