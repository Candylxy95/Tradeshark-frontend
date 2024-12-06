import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import CustomBtn from '../../components/CustomBtn';
import {SERVER} from 'react-native-dotenv';

const RegisterScreen = ({navigation}) => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [signUpForm, setSignUpForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'ts_buyer',
  });

  const signUp = async inputs => {
    console.log('SignUp function called with inputs:', inputs);
    const res = await fetch(`${SERVER}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });

    if (!res.ok) {
      throw new Error('Failed to register');
    }

    setSignUpForm({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      role: 'ts_buyer',
    }),
      setPasswordCheck(''),
      setIsPasswordMatch(false),
      console
        .log(`password check: ${passwordCheck}, pass match: ${isPasswordMatch}`)

        .catch(error => {
          console.error(error);
        });
  };

  const handleChange = (text, value) => {
    setSignUpForm(prevInput => ({...prevInput, [text]: value}));
  };

  const handleConfirmPassword = value => {
    setPasswordCheck(value);
    if (signUpForm.password === value) {
      setIsPasswordMatch(true);
    } else setIsPasswordMatch(false);
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
          <Text style={styles.text}>Create your</Text>
          <Text style={styles.text}>free account</Text>
        </View>
        <View style={styles.inputForm}>
          <View style={styles.nameInput}>
            <View style={{width: '90%'}}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                placeholder="First Name"
                style={styles.input}
                value={signUpForm.first_name}
                onChangeText={text => {
                  handleChange('first_name', text);
                }}
              />
            </View>
            <View style={{width: '90%'}}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                value={signUpForm.last_name}
                onChangeText={text => {
                  handleChange('last_name', text);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={signUpForm.email}
              onChangeText={text => {
                handleChange('email', text);
              }}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              placeholder="Phone"
              style={styles.input}
              value={signUpForm.phone_number}
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
              value={signUpForm.password}
              secureTextEntry={true}
              onChangeText={text => {
                handleChange('password', text);
              }}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={passwordCheck}
              secureTextEntry={true}
              onChangeText={text => handleConfirmPassword(text)}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <CustomBtn
            style={styles.btn}
            textStyle={styles.textStyle}
            title="Sign up"
            onPress={() => {
              console.log('Button pressed');
              console.log('SERVER:', SERVER);

              if (isPasswordMatch) {
                signUp(signUpForm);
              } else {
                Alert.alert(
                  'Password Mismatch',
                  'Please ensure your passwords match before signing up.',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                );
              }
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
    backgroundColor: '#F1F2EB',
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
    fontFamily: 'Arial',
    color: 'black',
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
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
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
    backgroundColor: '#D8DAD3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
  },
});

export default RegisterScreen;
