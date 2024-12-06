import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashBoard from '../screens/User/DashBoard';
import MarketPlace from '../screens/User/MarketPlace';
import UserProfile from '../screens/User/UserProfile';

const UserNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="UserDashBoard" component={DashBoard} />
      <Tab.Screen name="MarketPlace" component={MarketPlace} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default UserNavigator;
