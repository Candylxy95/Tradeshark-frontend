import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BizDashBoard from '../screens/BizUser/BizDashBoard';
import CreateListingBoard from '../screens/BizUser/CreateListingBoard';
import SellerProfile from '../screens/BizUser/SellerProfile';

const BizUserNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="BizDashBoard" component={BizDashBoard} />
      <Tab.Screen name="CreateListing" component={CreateListingBoard} />
      <Tab.Screen name="SellerProfile" component={SellerProfile} />
    </Tab.Navigator>
  );
};

export default BizUserNavigator;
