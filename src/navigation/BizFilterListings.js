import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import SubListings from '../screens/User/SubListings';
import SingleListings from '../screens/User/SingleListings';
import ActiveListings from '../screens/BizUser/ActiveListings';
import ExpiredListings from '../screens/BizUser/ExpiredListings';

const BizFilterNavigators = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Active" component={ActiveListings} />
      <Tab.Screen name="Expired" component={ExpiredListings} />
    </Tab.Navigator>
  );
};

export default BizFilterNavigators;
