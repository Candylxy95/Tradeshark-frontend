import React, {useContext, useState} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import UserContext from '../context/UserContext';
import CustomBtn from '../CustomBtn';
import {SERVER} from 'react-native-dotenv';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

const SubscriptionSetupForm = () => {
  const {accessToken} = useContext(UserContext);
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [openType, setOpenType] = useState(false);
  const [typeValue, setTypeValue] = useState('');
  const [typeItems, setTypeItems] = useState([
    {label: 'Both', value: 'Both'},
    {label: 'Forex', value: 'Forex'},
    {label: 'Stocks', value: 'Stocks'},
  ]);

  const [subscriptionInput, setSubscriptionInput] = useState({
    description: '',
    type: '',
    price: '',
  });

  const handleChange = (text, value) => {
    setSubscriptionInput(prevInput => ({
      ...prevInput,
      [text]: value,
    }));
  };

  const prev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const next = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const setUpSubscription = async () => {
    try {
      const res = await axios.post(
        `${SERVER}/subscription/`,
        subscriptionInput,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSubmit = () => {
    validateInput();
    setUpSubscription();
    next();
  };

  const validateInput = () => {
    const {description, type, price} = subscriptionInput;

    if (description === '' || type === '' || isNaN(price)) {
      setShowInvalidAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      {showInvalidAlert && (
        <AwesomeAlert
          show={showInvalidAlert}
          showProgress={false}
          title="Unable to update"
          message="Please make sure all fields are filled correctly"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Confirm"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowInvalidAlert(false);
          }}
        />
      )}
      {currentStep === 1 && (
        <View styles={styles.inputBox}>
          <Text style={styles.text}>
            Configure your subscription setup to begin receiving subscriptions
          </Text>
          <CustomBtn
            title="Start"
            textStyle={styles.btnTextStart}
            style={styles.btnStart}
            onPress={next}
          />
        </View>
      )}
      {currentStep === 2 && (
        <View styles={styles.inputBox}>
          <Text style={styles.text}>
            Let buyers know what you're offering. Describe your subscription.
          </Text>
          <TextInput
            placeholder="I am offering..."
            onChangeText={text => handleChange('description', text)}
            value={subscriptionInput.description}
            style={styles.textInput}
            placeholderTextColor="#ADADAD"
          />
          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={() => prev()}>
              <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => next()}>
              <Icon name="caret-forward-circle" size={25} color="#F1F2EB" />
            </Pressable>
          </View>
        </View>
      )}
      {currentStep === 3 && (
        <View styles={styles.inputBox}>
          <Text style={styles.text}>Categorise your subscription.</Text>
          <DropDownPicker
            open={openType}
            value={typeValue}
            items={typeItems}
            setOpen={setOpenType}
            setValue={setTypeValue}
            setItems={setTypeItems}
            placeholder="Select an option"
            searchable={false}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            onChangeValue={value => handleChange('type', value)}
            textStyle={{color: '#ADADAD'}}
            placeholderStyle={{
              color: '#ADADAD',
              fontStyle: 'italic',
            }}
          />
          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={() => prev()}>
              <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => next()}>
              <Icon name="caret-forward-circle" size={25} color="#F1F2EB" />
            </Pressable>
          </View>
        </View>
      )}
      {currentStep === 4 && (
        <View styles={styles.inputBox}>
          <Text style={styles.text}>Name your subscription price.</Text>
          <View style={styles.row}>
            <Text style={styles.text}>S$</Text>
            <TextInput
              placeholder="Enter your price"
              style={[styles.textInput, styles.priceInput]}
              value={subscriptionInput.price.toString()}
              maxLength={9}
              keyboardType="decimal-pad"
              onChangeText={text => handleChange('price', text)}
              onBlur={() => {
                setSubscriptionInput(prevInput => ({
                  ...prevInput,
                  price:
                    prevInput.price === '' ? 0 : parseFloat(prevInput.price),
                }));
              }}
              placeholderTextColor="#ADADAD"
            />
          </View>
          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={() => prev()}>
              <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
            </Pressable>

            <CustomBtn
              title="Submit"
              textStyle={styles.btnTextStart}
              style={styles.btnStart}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      )}
      {currentStep === 5 && (
        <View styles={styles.inputBox}>
          <Text style={styles.text}>All set up!</Text>
          <Text style={styles.text}>
            Your subscriber list will appear here.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2124',
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    color: '#F1F2EB',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Figtree-Regular',
    marginBottom: 20,
  },
  btnStart: {
    backgroundColor: '#3ABECF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(58, 190, 207, 0.8)',
    shadowColor: 'rgba(58, 190, 207, 0.7)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  btnTextStart: {
    color: '#F1F2EB',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
  },
  btn: {
    backgroundColor: '#3ABECF',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(58, 190, 207, 0.8)',
    shadowOpacity: 0.9,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#252634',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(83, 172, 255, 0.5)',
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    backgroundColor: '#252634',
    borderColor: 'rgba(83, 172, 255, 0.5)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#252634',
    borderColor: '#3ABECF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    color: '#F1F2EB',
    fontSize: 16,
    fontFamily: 'Figtree-Regular',
    marginBottom: 20,
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#252634',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  priceInput: {
    width: 210,
  },
});

export default SubscriptionSetupForm;
