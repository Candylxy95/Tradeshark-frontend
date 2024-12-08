import React, {useState, useContext, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomBtn from '../../components/CustomBtn';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';

const CreateListingBoard = ({navigation}) => {
  const {accessToken} = useContext(UserContext);
  const [showCreateCfm, setShowCreateCfm] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
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
    duration: '',
    sold_as_single_listing: isChecked ? true : false,
  });

  const formatDuration = durationInput => {
    return `${durationInput.days} days, ${durationInput.hours} hours, ${durationInput.minutes} minutes`;
  };

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
    const {ticker, asset_class, position, entry_price, take_profit, stop_loss} =
      input;

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
      reset();
      navigation.navigate('ListingDetail', {listingId: res.data.listing.id});
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const reset = () => {
    setIsInputValid('Please ensure all fields are filled');
    setShowInvalidAlert(false);
    setDurationInput({days: 0, hours: 0, minutes: 0});
    setInput({
      img_src: '',
      ticker: '',
      asset_class: '',
      position: '',
      entry_price: 0,
      take_profit: 0,
      stop_loss: 0,
      price: 0,
      notes: '',
      duration: '',
    });
    setOpenPosition(false);
    setPositionValue(null);
    setOpenAsset(false);
    setAssetValue(null);
    setIsChecked(true);
  };

  const handleConfirm = () => {
    setShowCreateCfm(false);
    createListing;
  };

  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      duration: formatDuration(durationInput),
    }));
  }, [durationInput]);

  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      sold_as_single_listing: isChecked,
    }));
  }, [isChecked]);

  return (
    <LinearGradient
      colors={['#131314', '#53ACFF']}
      style={styles.backgroundGradient}>
      <KeyboardAvoidingView styles={styles.container}>
        <View style={{flex: 1}}>
          {showInvalidAlert && (
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
          )}
          {showCreateCfm && (
            <AwesomeAlert
              show={showCreateCfm}
              showProgress={false}
              title="Review your listing"
              message={`Please review the details before proceed. You will not be able to delete your listing.\n
          Ticker: ${input.ticker}
          Asset Class: ${input.asset_class}
          Position: ${input.position}
          Entry price: ${input.entry_price}
          Take Profit: ${input.take_profit}
          Stop Loss: ${input.stop_loss}
          Price: S$ ${input.price}
          `}
              messageStyle={{
                marginHorizontal: 30,
              }}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Confirm"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={handleConfirm}
              onCancelPressed={() => {
                setShowCreateCfm(false);
              }}
            />
          )}
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
            <View style={styles.column}>
              <Text style={styles.label}>Duration:</Text>
              <View style={styles.row}>
                <View>
                  <TextInput
                    placeholder="0"
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={3}
                    value={durationInput.days.toString()}
                    onChangeText={text =>
                      handleDurationChange('days', Number(text))
                    }
                  />
                  <Text style={styles.label}>Day(s)</Text>
                </View>
                <View>
                  <TextInput
                    placeholder="0"
                    style={styles.input}
                    value={durationInput.hours.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={text =>
                      handleDurationChange('hours', Number(text))
                    }
                  />
                  <Text style={styles.label}>Hour(s)</Text>
                </View>
                <View>
                  <TextInput
                    placeholder="0"
                    style={styles.input}
                    value={durationInput.minutes.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={text =>
                      handleDurationChange('minutes', Number(text))
                    }
                  />
                  <Text style={styles.label}>Min(s)</Text>
                </View>
              </View>
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Entry Price:</Text>
              <TextInput
                placeholder="Enter entry price"
                style={styles.input}
                value={input.entry_price.toString()}
                maxLength={9}
                keyboardType="decimal-pad"
                onChangeText={text => handleChange('entry_price', text)}
                onBlur={() => {
                  setInput(prevInput => ({
                    ...prevInput,
                    entry_price:
                      prevInput.entry_price === ''
                        ? 0
                        : parseFloat(prevInput.entry_price),
                  }));
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Take Profit:</Text>
              <TextInput
                placeholder="Enter take profit price"
                style={styles.input}
                value={input.take_profit.toString()}
                maxLength={9}
                keyboardType="decimal-pad"
                onChangeText={text => handleChange('take_profit', text)}
                onBlur={() => {
                  setInput(prevInput => ({
                    ...prevInput,
                    take_profit:
                      prevInput.take_profit === ''
                        ? 0
                        : parseFloat(prevInput.take_profit),
                  }));
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Stop Loss:</Text>
              <TextInput
                placeholder="Enter stop loss"
                style={styles.input}
                value={input.stop_loss.toString()}
                maxLength={9}
                keyboardType="decimal-pad"
                onChangeText={text => handleChange('stop_loss', text)}
                onBlur={() => {
                  setInput(prevInput => ({
                    ...prevInput,
                    stop_loss:
                      prevInput.stop_loss === ''
                        ? 0
                        : parseFloat(prevInput.stop_loss),
                  }));
                }}
              />
            </View>
          </View>

          <View style={[styles.inputContainer, styles.price]}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              placeholder="Enter price"
              style={styles.input}
              value={input.price.toString()}
              maxLength={5}
              keyboardType="decimal-pad"
              onChangeText={text => handleChange('price', text)}
              onBlur={() => {
                setInput(prevInput => ({
                  ...prevInput,
                  price:
                    prevInput.price === '' ? 0 : parseFloat(prevInput.price),
                }));
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Notes:</Text>
            <TextInput
              placeholder="Enter notes for buyers"
              style={[styles.input, styles.notes]}
              value={input.notes}
              maxLength={1000}
              onChangeText={text => handleChange('notes', text)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              {isChecked
                ? 'Sold as a single listing'
                : 'Only available in subscription'}
            </Text>
            <Switch
              value={isChecked}
              onValueChange={() =>
                isChecked ? setIsChecked(false) : setIsChecked(true)
              }
              thumbColor={isChecked ? '#4CAF50' : '#f4f3f4'}
              trackColor={{false: '#767577', true: '#81b0ff'}}
            />
          </View>
          <CustomBtn
            style={styles.btn}
            onPress={() => setShowCreateCfm(true)}
            textStyle={styles.textStyle}
            title="Create Listing"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 4,
    paddingHorizontal: 10,
  },
  uploadPhotoContainer: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    placeholderTextColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  btn: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    marginBottom: 100,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 10,
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  notes: {
    height: 50,
  },
});

export default CreateListingBoard;
