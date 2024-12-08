import React, {useContext, useState} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, TextInput} from 'react-native';
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
      console.log('successfully set up subscription');
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
        <>
          <Text style={styles.text}>
            Configure your subscription setup to begin receiving subscriptions
          </Text>
          <CustomBtn
            title="Start"
            textStyle={styles.btnTextStart}
            style={styles.btnStart}
            onPress={next}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          {' '}
          <Text style={styles.text}>
            Let buyers know what you're offering. Describe your subscription.
          </Text>
          <TextInput
            placeholder="I am offering..."
            onChangeText={text => handleChange('description', text)}
            value={subscriptionInput.description}
            style={styles.textInput}
          />
          <View style={styles.row}>
            <CustomBtn
              title={
                <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
              }
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() => prev()}
            />
            <CustomBtn
              title={
                <Icon name="caret-forward-circle" size={25} color="#F1F2EB" />
              }
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() => next()}
            />
          </View>
        </>
      )}
      {currentStep === 3 && (
        <>
          {' '}
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
          />
          <View style={styles.row}>
            <CustomBtn
              title={
                <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
              }
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() => prev()}
            />
            <CustomBtn
              title={
                <Icon name="caret-forward-circle" size={25} color="#F1F2EB" />
              }
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() => next()}
            />
          </View>
        </>
      )}
      {currentStep === 4 && (
        <>
          {' '}
          <Text style={styles.text}>Name your subscription price.</Text>
          <TextInput
            placeholder="Enter your price"
            style={styles.input}
            value={subscriptionInput.price.toString()}
            maxLength={9}
            keyboardType="decimal-pad"
            onChangeText={text => handleChange('price', text)}
            onBlur={() => {
              setSubscriptionInput(prevInput => ({
                ...prevInput,
                price: prevInput.price === '' ? 0 : parseFloat(prevInput.price),
              }));
            }}
            style={styles.textInput}
          />{' '}
          <View style={styles.row}>
            <CustomBtn
              title={
                <Icon name="caret-back-circle" size={25} color="#F1F2EB" />
              }
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() => prev()}
            />
            <CustomBtn
              title="Submit"
              textStyle={styles.btnTextStart}
              style={styles.btnStart}
              onPress={() => handleSubmit()}
            />
          </View>
        </>
      )}
      {currentStep === 5 && (
        <>
          <Text style={styles.text}>All set up!</Text>
          <Text style={styles.text}>
            Your subscriber list will appear here.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  btnStart: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(43, 134, 255, 0.8)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnTextStart: {
    color: '#F1F2EB',
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
  },
  btn: {
    backgroundColor: '#415D43',
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#83ACFF',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: 'pink',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: 'pink',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    backgroundColor: 'white',
    height: 100,
  },
});

export default SubscriptionSetupForm;
