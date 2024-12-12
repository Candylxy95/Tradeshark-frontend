import React, {useState} from 'react';
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
import axios from 'axios';

const BizRegisterScreen = ({navigation}) => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [signUpForm, setSignUpForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'ts_seller',
  });

  const signUp = async inputs => {
    try {
      const res = await axios.post(`${SERVER}/auth/register`, inputs);

      setSignUpForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        role: 'ts_seller',
      });

      setPasswordCheck('');
      setIsPasswordMatch(false);
      navigation.navigate('BizLoginScreen');
    } catch (error) {
      Alert.alert(error.message);
    }
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
              if (isPasswordMatch) {
                signUp(signUpForm);
              } else {
                Alert.alert(
                  'Password Mismatch',
                  'Please ensure your passwords match before signing up.',
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
    backgroundColor: '#white',
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
    color: '#black',
    fontSize: 32,
    textAlign: 'center',
  },

  inputForm: {
    paddingVertical: 20,
  },
  nameInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '50%',
    gap: 30,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D64933',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
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
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF7F50',
    shadowColor: '#D64933',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontFamily: 'Figtree-Regular',
    color: '#3B82F6',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default BizRegisterScreen;
