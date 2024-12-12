import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BizDashBoard from '../screens/BizUser/BizDashBoard';
import CreateListingBoard from '../screens/BizUser/CreateListingBoard';
import SellerProfile from '../screens/BizUser/SellerProfile';
import BizFilterNavigators from './BizFilterListings';
import Icon from 'react-native-vector-icons/Ionicons';

const BizUserNavigator = () => {
  const Tab = createBottomTabNavigator();

  const styles = {
    headerStyle: {
      backgroundColor: '#1F2124',
      shadowColor: '#D64933',
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
      initialRouteName="BizDashBoard"
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
        name="BizDashBoard"
        component={BizDashBoard}
        options={{
          title: 'Dashboard',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="grid-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateListingBoard}
        options={{
          title: 'Create Listing',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: styles.headerTitleAlign,
          tabBarIcon: ({color, size}) => (
            <Icon name="add-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SellerProfile"
        component={SellerProfile}
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
        name="My Listings"
        component={BizFilterNavigators}
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
    </Tab.Navigator>
  );
};

export default BizUserNavigator;
