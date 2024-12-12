import React, {useState, useContext, useEffect, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomBtn from '../../components/CustomBtn';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedGradient from 'react-native-animated-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

const CreateListingBoard = ({navigation}) => {
  ``;
  const [currentStep, setCurrentStep] = useState(1);
  const {accessToken} = useContext(UserContext);
  const [showCreateCfm, setShowCreateCfm] = useState(false);
  const [soldAsSingleListing, setSoldAsSingleListing] = useState(true);
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
    sold_as_single_listing: soldAsSingleListing ? true : false,
  });

  const formatDuration = durationInput => {
    return `${durationInput.days} days, ${durationInput.hours} hours, ${durationInput.minutes} minutes`;
  };

  const handleChange = (text, value) => {
    setInput(prevInput => ({...prevInput, [text]: value}));
    validateInput();
  };

  const toggleSingleListing = () => {
    setSoldAsSingleListing(false);
    setInput(prevInput => ({...prevInput, price: 0}));
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
    if (!validateInput()) {
      setShowInvalidAlert(true);
      return;
    }

    try {
      const res = await axios.post(`${SERVER}/listing/`, input, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      reset();
      navigation.navigate('ListingDetail', {listingId: res.data.listing.id});
    } catch (error) {
      Alert.alert(error.response.message);
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
    setSoldAsSingleListing(true);
  };

  const handleConfirm = () => {
    setShowCreateCfm(false);
    createListing();
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
      sold_as_single_listing: soldAsSingleListing,
    }));
  }, [soldAsSingleListing]);

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(1);
    }, []),
  );

  return (
    <AnimatedGradient
      customColors={['black', '#343A46', 'black']}
      speed={4000}
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

        {currentStep === 1 && (
          <View style={styles.bigSquare}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ticker:</Text>
              <TextInput
                placeholder="Enter Ticker"
                style={styles.input}
                value={input.ticker}
                onChangeText={text =>
                  handleChange('ticker', text.toUpperCase())
                }
              />
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
                  textStyle={{color: 'white'}}
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
                  textStyle={{color: 'white'}}
                />
              </View>
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
        )}
        {currentStep === 2 && (
          <View style={styles.bigSquare}>
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

            {soldAsSingleListing && (
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
                        prevInput.price === ''
                          ? 0
                          : parseFloat(prevInput.price),
                    }));
                  }}
                />
              </View>
            )}
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.bigSquare}>
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
          </View>
        )}
        <View style={styles.btnPodsCtnr}>
          <CustomBtn
            style={[styles.btnPod, currentStep === 1 && styles.btnPodActive]}
            onPress={() => setCurrentStep(1)}
          />
          <CustomBtn
            style={[styles.btnPod, currentStep === 2 && styles.btnPodActive]}
            onPress={() => setCurrentStep(2)}
          />
          <CustomBtn
            style={[styles.btnPod, currentStep === 3 && styles.btnPodActive]}
            onPress={() => setCurrentStep(3)}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>
            {soldAsSingleListing
              ? 'Sold as a single listing'
              : 'Only available in subscription'}
          </Text>
          <Switch
            value={soldAsSingleListing}
            onValueChange={() =>
              soldAsSingleListing
                ? toggleSingleListing()
                : setSoldAsSingleListing(true)
            }
            thumbColor={soldAsSingleListing ? 'orangered' : 'white'}
            trackColor={{false: 'grey', true: 'grey'}}
          />
        </View>
        <CustomBtn
          style={styles.btn}
          onPress={() => setShowCreateCfm(true)}
          textStyle={styles.textStyle}
          title="Create Listing"
        />
      </KeyboardAvoidingView>
    </AnimatedGradient>
  );
};

const styles = StyleSheet.create({
  btnPodsCtnr: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnPod: {
    width: 15,
    height: 15,
    borderRadius: 25 / 2,
    backgroundColor: 'white',
    marginTop: -30,
  },
  btnPodActive: {
    backgroundColor: 'orangered',
  },
  bigSquare: {
    height: '300',
    width: '80%',
    backgroundColor: 'rgba(245,245,245,0.4)',
    borderRadius: 40,
    marginHorizontal: '10%',
    marginVertical: '15%',
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 4,
    paddingHorizontal: 10,
  },
  label: {
    color: '#FFD580',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
    fontFamily: 'Figtree-Regular',
    textShadowColor: 'rgba(255, 165, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Figtree-Regular',
    borderWidth: 1,
    borderColor: 'rgba(255, 111, 0, 0.5)',
    color: '#FFD580',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 111, 0, 0.5)',
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderColor: 'rgba(255, 111, 0, 0.5)',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF8C00',
    shadowColor: '#FF4500',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 15,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 111, 0, 0.5)',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFD580',
    fontWeight: '500',
    fontFamily: 'Figtree-Regular',
    textShadowColor: 'rgba(255, 165, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  notes: {
    height: 220,
    textAlign: 'center',
  },
});

export default CreateListingBoard;
