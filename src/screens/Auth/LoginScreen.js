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
      console.log('Login function called with inputs:');
      const res = await fetch(`${SERVER}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error('Failed to login: ', errorMsg);
      }
      const data = await res.json();
      console.log('login response:', data);

      await EncryptedStorage.setItem('accessToken', data.access);
      userContext.setAccessToken(data.access);
      console.log(`Access Data = ${data.access}`);

      setLoginForm({
        email: '',
        phone_number: '',
        password: '',
        role: 'ts_buyer',
      });

      console.log('Login form emptied.');

      navigation.navigate('UserNavigator');
    } catch (error) {
      console.error('Login error:', error.message);
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
              console.log('Button pressed');
              console.log('SERVER:', SERVER);
              console.log('form data,', loginForm);
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
  },
  textContainer: {
    flex: 1,
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 40,
  },
  text: {
    fontFamily: 'Figtree-Regular',
    color: '#F1F2EB',
    fontSize: 38,
    textAlign: 'left',
  },
  inputForm: {
    flex: 3,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  nameInput: {
    flexDirection: 'row',
    width: '50%',
    gap: '20%',
  },
  input: {
    color: '#F1F2EB',
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#F1F2EB',
    marginBottom: 15,
    fontFamily: 'Figtree-LightItalic',
    placeholderTextColor: '#D8DAD3',
  },
  inputLabel: {
    fontFamily: 'Figtree-Regular',
    color: '#F1F2EB',
  },
  btnContainer: {
    flex: 4,
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 80,
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(83, 172, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  textStyle: {
    fontFamily: 'Figtree-Regular',
    color: '#F1F2EB',
    fontSize: 16,
  },
});

export default LoginScreen;
