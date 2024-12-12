import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import {SERVER} from 'react-native-dotenv';
import CustomBtn from '../../components/CustomBtn';
import UserContext from '../../components/context/UserContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const userContext = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({
    email: '' || null,
    phone_number: '' || null,
    password: '',
    role: 'ts_buyer',
  });

  const login = async () => {
    try {
      const res = await fetch(`${SERVER}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Login failed');
      }
      const data = await res.json();

      await EncryptedStorage.setItem('accessToken', data.access);
      userContext.setAccessToken(data.access);

      setLoginForm({
        email: '',
        phone_number: '',
        password: '',
        role: 'ts_buyer',
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'UserNavigator'}],
        }),
      );
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleChange = (text, value) => {
    setLoginForm(prevInput => ({...prevInput, [text]: value}));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/sharkbanner.png')}
          resizeMode="cover"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Login</Text>
        </View>
        <View style={styles.inputForm}>
          <View>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              placeholder="Phone"
              style={styles.input}
              value={loginForm.phone_number}
              onChangeText={text => {
                handleChange('phone_number', text);
              }}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              text="password"
              placeholder="Password"
              style={styles.input}
              value={loginForm.password}
              secureTextEntry={true}
              onChangeText={text => {
                handleChange('password', text);
              }}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <CustomBtn
            style={styles.btn}
            textStyle={styles.textStyle}
            title="Login"
            onPress={() => {
              login(loginForm);
            }}
          />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131314',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontFamily: 'Figtree-Bold',
    color: '#F1F2EB',
    fontSize: 32,
    textAlign: 'center',
  },
  inputForm: {
    paddingVertical: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#1F2124',
    borderWidth: 1,
    borderColor: '#3ABECF',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#F1F2EB',
  },
  inputLabel: {
    fontFamily: 'Figtree-Regular',
    color: '#F1F2EB',
    fontSize: 14,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 4,
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 80,
  },
  btn: {
    backgroundColor: '#131314',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: '#3ABECF',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
  },
});

export default LoginScreen;
