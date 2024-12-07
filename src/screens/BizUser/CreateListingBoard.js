import React, {useState, useContext, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomBtn from '../../components/CustomBtn';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';

const CreateListingBoard = ({navigation}) => {
  const {accessToken} = useContext(UserContext);
  const [isInputValid, setIsInputValid] = useState(
    'Please ensure all fields are filled',
  );
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [openAsset, setOpenAsset] = useState(false);
  const [assetValue, setAssetValue] = useState(null);
  const [assetItems, setAssetItems] = useState([
    {label: 'Stocks', value: 'Stocks'},
    {label: 'Forex', value: 'Forex'},
  ]);
  const [openPosition, setOpenPosition] = useState(false);
  const [positionValue, setPositionValue] = useState(null);
  const [positionItems, setPositionItems] = useState([
    {label: 'Long', value: 'Long'},
    {label: 'Short', value: 'Short'},
  ]);
  const [durationInput, setDurationInput] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [input, setInput] = useState({
    img_src: '',
    ticker: '',
    asset_class: '',
    position: '',
    entry_price: 0,
    take_profit: 0,
    stop_loss: 0,
    price: 0,
    notes: '',
    duration: formattedDuration,
  });

  const formatDuration = durationInput => {
    return `${durationInput.days} days, ${durationInput.hours} hours, ${durationInput.minutes} minutes`;
  };

  const formattedDuration = formatDuration(durationInput);

  const handleChange = (text, value) => {
    setInput(prevInput => ({...prevInput, [text]: value}));
    validateInput();
  };

  const handleDurationChange = (text, value) => {
    setDurationInput(prevInput => ({
      ...prevInput,
      [text]: value === '' ? 0 : Number(value),
    }));
    validateInput();
  };

  const validateInput = () => {
    const {
      ticker,
      asset_class,
      position,
      entry_price,
      take_profit,
      stop_loss,
      duration,
    } = input;

    const {days, hours, minutes} = durationInput;

    if (
      !ticker ||
      !asset_class ||
      !position ||
      days === '' ||
      hours === '' ||
      minutes === ''
    ) {
      setIsInputValid('Please ensure all fields are filled');
      return false;
    }
    if (Number(days) === 0 && Number(hours) === 0 && Number(minutes) === 0) {
      setIsInputValid('Please enter a valid trade duration');
      return false;
    }
    if (
      isNaN(entry_price) ||
      isNaN(take_profit) ||
      isNaN(stop_loss) ||
      isNaN(days) ||
      isNaN(hours) ||
      isNaN(days)
    ) {
      setIsInputValid('Please ensure time and prices are valid numbers');
      return false;
    }
    setIsInputValid('valid');
    return true;
  };

  const createListing = async () => {
    console.log(input.duration);

    if (!validateInput()) {
      setShowInvalidAlert(true);
      return;
    }
    console.log('Input Data:', input);
    console.log(isInputValid);

    try {
      const res = await axios.post(`${SERVER}/listing/`, input, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      console.log('Response:', res.data);
      navigation.navigate('ListingDetail', {listingId: res.data.listing.id});
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      duration: formatDuration(durationInput),
    }));
  }, [durationInput]);

  return (
    <KeyboardAvoidingView styles={styles.container}>
      <View style={{flex: 1}}>
        <AwesomeAlert
          show={showInvalidAlert}
          showProgress={false}
          title="Unable to update"
          message={isInputValid}
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
      </View>
      <View style={styles.uploadPhotoContainer}></View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ticker:</Text>
          <TextInput
            placeholder="Enter Ticker"
            style={styles.input}
            value={input.ticker}
            onChangeText={text => handleChange('ticker', text.toUpperCase())}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Duration:</Text>
            <TextInput
              placeholder="0"
              style={styles.input}
              keyboardType="numeric"
              maxLength={3}
              value={Number(durationInput.days)}
              onChangeText={text => handleDurationChange('days', Number(text))}
            />
            <Text>Day(s)</Text>
            <TextInput
              placeholder="0"
              style={styles.input}
              value={durationInput.hours}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => handleDurationChange('hours', Number(text))}
            />
            <Text>Hour(s)</Text>
            <TextInput
              placeholder="0"
              style={styles.input}
              value={durationInput.minutes}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text =>
                handleDurationChange('minutes', Number(text))
              }
            />
            <Text>Min(s)</Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Asset Class:</Text>
          <DropDownPicker
            open={openAsset}
            value={assetValue}
            items={assetItems}
            setOpen={setOpenAsset}
            setValue={setAssetValue}
            setItems={setAssetItems}
            placeholder="Select an option"
            searchable={false}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            onChangeValue={value => handleChange('asset_class', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Position:</Text>
          <DropDownPicker
            open={openPosition}
            value={positionValue}
            items={positionItems}
            setOpen={setOpenPosition}
            setValue={setPositionValue}
            setItems={setPositionItems}
            placeholder="Select an option"
            searchable={false}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            onChangeValue={value => handleChange('position', value)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Entry Price:</Text>
          <TextInput
            placeholder="Enter entry price"
            style={styles.input}
            value={input.entry_price}
            maxLength={9}
            onChangeText={text => handleChange('entry_price', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Take Profit:</Text>
          <TextInput
            placeholder="Enter take profit price"
            style={styles.input}
            value={input.take_profit}
            maxLength={9}
            onChangeText={text => handleChange('take_profit', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Stop Loss:</Text>
          <TextInput
            placeholder="Enter stop loss"
            style={styles.input}
            value={input.stop_loss}
            maxLength={9}
            onChangeText={text => handleChange('stop_loss', text)}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          placeholder="Enter price"
          style={styles.input}
          value={input.price}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={text => handleChange('price', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes:</Text>
        <TextInput
          placeholder="Enter notes for buyers"
          style={styles.input}
          value={input.notes}
          maxLength={1000}
          onChangeText={text => handleChange('notes', text)}
        />
      </View>

      <CustomBtn
        style={styles.btn}
        onPress={createListing}
        textStyle={styles.textStyle}
        title="Create Listing"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 20,
  },

  uploadPhotoContainer: {
    height: 120,
    backgroundColor: '#333',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#444',
    color: 'white',
    placeholderTextColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
    width: '50%',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#444',
    width: '50%',
  },
  btn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateListingBoard;
