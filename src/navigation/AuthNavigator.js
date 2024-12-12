import React from 'react';
import InitScreen from '../screens/Auth/InitScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import BizInitScreen from '../screens/Auth/BizInitScreen';
import BizRegisterScreen from '../screens/Auth/BizRegisterScreen';
import BizLoginScreen from '../screens/Auth/BizLoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BizUserNavigator from './BizUserNavigator';
import ListingDetailBoard from '../screens/BizUser/ListingDetailBoard';
import UserListingDetailBoard from '../screens/User/UserListingDetailBoard';
import UserViewSellerProfile from '../screens/User/UserViewSellerProfile';
import FilterNavigators from './SignalFilterNavigator';
import ProfileEditScreen from '../screens/User/UserProfile';
import UserNavigator from './UserNavigator';
import Payment from '../screens/User/Payment';
import Payout from '../screens/BizUser/Payout';

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
          name="Register"
          component={RegisterScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Login"
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
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BizUserNavigator"
          component={BizUserNavigator}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="FilterNavigators"
          component={FilterNavigators}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={ProfileEditScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Payout"
          component={Payout}
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
