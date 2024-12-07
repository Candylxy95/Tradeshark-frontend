import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BizDashBoard from '../screens/BizUser/BizDashBoard';
import CreateListingBoard from '../screens/BizUser/CreateListingBoard';

const BizUserNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="BizDashBoard" component={BizDashBoard} />
      <Tab.Screen name="CreateListing" component={CreateListingBoard} />
    </Tab.Navigator>
  );
};

export default BizUserNavigator;
