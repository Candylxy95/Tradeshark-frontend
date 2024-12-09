import React from 'react';
import InitScreen from '../screens/Auth/InitScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import BizInitScreen from '../screens/Auth/BizInitScreen';
import BizRegisterScreen from '../screens/Auth/BizRegisterScreen';
import BizLoginScreen from '../screens/Auth/BizLoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserNavigator from './UserNavigator';
import ListingScreen from '../screens/User/ListingScreen';
import BizUserNavigator from './BizUserNavigator';
import ListingDetailBoard from '../screens/BizUser/ListingDetailBoard';
import UserListingDetailBoard from '../screens/User/UserListingDetailBoard';
import UserViewSellerProfile from '../screens/User/UserViewSellerProfile';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BizInitScreen"
          component={BizInitScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BizRegisterScreen"
          component={BizRegisterScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BizLoginScreen"
          component={BizLoginScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="UserNavigator"
          component={UserNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BizUserNavigator"
          component={BizUserNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListingScreen"
          component={ListingScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ListingDetail"
          component={ListingDetailBoard}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="UserListingDetail"
          component={UserListingDetailBoard}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="UserViewSellerProfile"
          component={UserViewSellerProfile}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
