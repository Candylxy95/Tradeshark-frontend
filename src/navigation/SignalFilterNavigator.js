import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import SubListings from '../screens/User/SubListings';
import SingleListings from '../screens/User/SingleListings';

const SignalFilterNavigators = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SingleListings"
        component={SingleListings}
        options={{title: 'Single'}}
      />
      <Tab.Screen
        name="SubListings"
        component={SubListings}
        options={{title: 'Subscribed'}}
      />
    </Tab.Navigator>
  );
};

export default SignalFilterNavigators;
