import React, {useContext, useState, useEffect} from 'react';
import {StripeProvider, CardForm, useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import UserContext from '../../components/context/UserContext';
import {SERVER} from 'react-native-dotenv';
import CustomBtn from '../../components/CustomBtn';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Payment = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [publishableKey, setPublishableKey] = useState('');
  const {confirmPayment} = useStripe();
  const {accessToken} = useContext(UserContext);
  const [stripeClientSecret, setStripeClientSecret] = useState('');
  const [cardDetails, setCardDetails] = useState(null);
  const [userDataInput, setUserDataInput] = useState({
    email: '',
    amount: 0,
  });

  const depositMoney = async amountInput => {
    try {
      const res = await axios.post(
        `${SERVER}/transaction/deposit`,
        {amount: amountInput},
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchPublishableKey = async () => {
    try {
      const res = await axios.get(`${SERVER}/transaction/stripe`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setPublishableKey(res.data.publishableKey);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createPaymentIntent = async amount => {
    try {
      const res = await axios.post(
        `${SERVER}/transaction/payment`,
        {amount},
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setStripeClientSecret(res.data.clientSecret);
      setCurrentStep(prevInput => prevInput + 1);
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'Unable to create payment intent.');
    }
  };

  const payNow = async () => {
    if (!stripeClientSecret) {
      Alert.alert('Error', 'Payment');
      return;
    }

    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Card details are incomplete.');
      return;
    }

    try {
      const {error, paymentIntent} = await confirmPayment(stripeClientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: userDataInput.email,
          },
        },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        setUserDataInput({email: '', amount: ''});
        depositMoney(userDataInput.amount);
        setCurrentStep(prevInput => prevInput + 1);
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="Tradeshark Inc">
      {currentStep === 1 && (
        <View style={styles.container}>
          <Text style={styles.title}>Make a Deposit</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userDataInput.email}
            onChangeText={text =>
              setUserDataInput(prev => ({...prev, email: text}))
            }
            keyboardType="email-address"
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
              createPaymentIntent(userDataInput.amount);
            }}
            style={styles.btn}
            textStyle={styles.btnText}
          />
          <Pressable
            onPress={() => {
              navigation.navigate('Payout');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text>Make a withdrawal </Text>
              <Text>
                <Icon
                  name="cash-outline"
                  size={24}
                  color="#000"
                  style={styles.icon}
                />
              </Text>
            </View>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.container}>
          <Text style={styles.title}>Billing Details</Text>

          <CardForm
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onFormComplete={cardDetails => setCardDetails(cardDetails)}
          />

          <CustomBtn
            title="Pay Now"
            onPress={() => payNow()}
            style={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      )}

      {currentStep === 3 && (
        <View style={styles.container}>
          <Text style={styles.title}>Your payment is successful.</Text>
          <CustomBtn
            title="Back to Home"
            onPress={() => {
              navigation.dispatch(
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
    </StripeProvider>
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
    borderRadius: 40,
  },
  cardContainer: {
    height: 150,
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

export default Payment;
