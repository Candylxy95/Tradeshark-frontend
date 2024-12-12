import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import UserContext from '../../components/context/UserContext';
import {SERVER} from 'react-native-dotenv';
import CustomBtn from '../../components/CustomBtn';
import {CommonActions} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import {Alert} from 'react-native';

const Payout = ({navigation}) => {
  const [profile, setProfile] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const {accessToken} = useContext(UserContext);
  const [userDataInput, setUserDataInput] = useState({
    bankAcc: '',
    amount: 0,
  });

  const getClaims = () => {
    try {
      const decoded = jwtDecode(accessToken);
      setProfile(decoded);
    } catch (error) {
      console.error('Error retrieving claims', error.message);
    }
  };

  const withdrawMoney = async amountInput => {
    try {
      const res = await axios.post(
        `${SERVER}/transaction/withdraw`,
        {amount: amountInput},
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      Alert.alert(error.response.data.msg);
      console.error(error.message);
    }
  };

  const validateInput = () => {
    const {bankAcc, amount} = userDataInput;
    if (!bankAcc || !amount) {
      Alert.alert('Error, All fields are required.');
      return false;
    }

    const validBankInput = /^[0-9]{8,16}$/;
    if (!validBankInput.test(bankAcc)) {
      Alert.alert('Error, Bank account must be 8-16 digits long.');
      return false;
    }

    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error, Invalid amount.');
      return false;
    }

    return true;
  };

  const handleWithdraw = async () => {
    const isValid = validateInput();
    if (isValid) {
      await withdrawMoney(userDataInput.amount);
    } else {
      console.error('Validation failed');
    }
  };

  useEffect(() => {
    getClaims();
  }, []);

  return (
    <>
      {currentStep === 1 && (
        <View style={styles.container}>
          <Text style={styles.title}>Make a Withdrawal</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bank account no."
            value={userDataInput.bankAcc}
            onChangeText={text =>
              setUserDataInput(prev => ({...prev, bankAcc: text}))
            }
            keyboardType="numeric"
            maxLength={16}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={userDataInput.amount}
            onChangeText={text =>
              setUserDataInput(prev => ({...prev, amount: parseFloat(text)}))
            }
            keyboardType="numeric"
          />
          <CustomBtn
            title="Continue"
            onPress={() => {
              handleWithdraw();
            }}
            style={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.container}>
          <Text style={styles.title}>Your withdrawal is successful.</Text>
          <Text style={styles.subTitle}>
            A Payout Confirmation has been emailed to {profile.email}. Payment
            will be reflected in your bank account within 3 working days.
          </Text>

          <CustomBtn
            title="Back to Home"
            onPress={() => {
              profile.role === 'ts_seller'
                ? navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'BizUserNavigator'}],
                    }),
                  )
                : navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'UserNavigator'}],
                    }),
                  );
              setCurrentStep(1);
            }}
            style={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 8,
  },
  cardContainer: {
    height: 100,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(43, 134, 255, 0.8)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
  },
});

export default Payout;
