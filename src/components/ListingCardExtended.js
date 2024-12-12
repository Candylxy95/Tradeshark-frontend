import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Switch,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';
import CustomBtn from './CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import {ScrollView} from 'react-native-gesture-handler';

const ListingCardExtended = props => {
  const [soldAsSingleListing, setSoldAsSingleListing] = useState(
    props.sold_as_single_listing,
  );
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
  const [showUpdateCfmAlert, setShowUpdateCfmAlert] = useState(false);
  const [isInputValid, setIsInputValid] = useState(
    'Please ensure all fields are filled',
  );
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [positionValue, setPositionValue] = useState(props.position);
  const [positionItems, setPositionItems] = useState([
    {label: 'Long', value: 'Long'},
    {label: 'Short', value: 'Short'},
  ]);

  const [durationInput, setDurationInput] = useState({
    days: props.durationDays || 0,
    hours: props.durationHours || 0,
    minutes: props.durationMinutes || 0,
  });

  const [input, setInput] = useState({
    img_src: props.Img || '',
    ticker: props.ticker || '',
    position: positionValue,
    entry_price: props.entryPrice || 0,
    take_profit: props.takeProfit || 0,
    stop_loss: props.stopLoss || 0,
    price: props.price || 0,
    notes: props.notes || '',
    duration: '',
    asset_class: props.assetClass,
    sold_as_single_listing: soldAsSingleListing,
  });

  const formatDuration = durationInput => {
    return `${durationInput.days} days, ${durationInput.hours} hours, ${durationInput.minutes} minutes`;
  };

  const handleChange = (text, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [text]: value,
    }));
    validateInput();
  };

  const handleDurationChange = (text, value) => {
    setDurationInput(prevInput => ({
      ...prevInput,
      [text]: value === '' ? 0 : Number(value),
    }));
    validateInput();
  };

  const handleSubmit = () => {
    if (!validateInput()) {
      setShowInvalidAlert(true);
      return;
    }
    setShowUpdateCfmAlert(true);
  };

  const handleSubmitCfm = () => {
    setShowUpdateCfmAlert(false);
    setIsUpdating(false);
    props.updateFn(input);
    setTimeout(() => {
      setShowUpdatedAlert(true);
    }, 1000);
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

  const validateInput = () => {
    const {
      ticker,
      price,
      asset_class,
      position,
      entry_price,
      take_profit,
      stop_loss,
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
      isNaN(price) ||
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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.alertContainer}>
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
        {showUpdateCfmAlert && (
          <AwesomeAlert
            show={showUpdateCfmAlert}
            showProgress={false}
            title="Update Confirmation"
            message="Are you sure you want to update? You may only update any listing once."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            confirmText="Confirm"
            cancelText="Cancel"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={handleSubmitCfm}
            onCancelPressed={() => {
              setShowUpdateCfmAlert(false);
            }}
          />
        )}
      </View>

      <View style={styles.sellerBanner}>
        <View style={{alignContent: 'space-between'}}>
          <Text style={{color: '#3ABECF'}}>{props.sellerStatus}</Text>
          <Text style={{color: '#F1F2EB', fontSize: 20}}>
            {props.sellerName}
          </Text>
        </View>
        <View style={styles.profImg}>
          <ImageBackground
            source={{
              uri: 'https://cdn.midjourney.com/972aec0b-b06d-4967-8437-aef445e5b90b/0_1.png',
            }}
            style={styles.profImg}
          />
        </View>
      </View>
      <View style={styles.tickerAndPrice}>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Ticker: </Text>
            {!isUpdating ? (
              <Text style={styles.formText}>{input.ticker}</Text>
            ) : (
              <TextInput
                value={input.ticker}
                onChangeText={text => handleChange('ticker', text)}
                style={styles.input}
              />
            )}
          </View>

          {soldAsSingleListing && (
            <View style={styles.row}>
              <Text style={styles.label}>Listing Price: </Text>

              {!isUpdating ? (
                <Text style={styles.formText}> {input.price}</Text>
              ) : (
                <TextInput
                  value={input.price}
                  onChangeText={text => handleChange('price', text)}
                  style={styles.input}
                />
              )}
            </View>
          )}
          <Text style={styles.label}>{props.assetClass}</Text>
          {!isUpdating ? (
            <Text style={styles.label}>
              Position:{' '}
              <Text style={styles.formText}>{props.position || ''}</Text>
            </Text>
          ) : (
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
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Entry Price: </Text>
            {!isUpdating ? (
              <Text style={styles.formText}>{input.entry_price}</Text>
            ) : (
              <TextInput
                value={input.entry_price}
                onChangeText={text => handleChange('entry_price', text)}
                style={styles.input}
              />
            )}
          </View>
        </View>

        <View>
          <Text style={styles.label}>
            {props.showUpdateBtn ? 'Edited On' : 'Posted On'}
          </Text>
          <Text style={styles.date}>
            {props.postedDate} {props.postedTime}
          </Text>

          <View>
            <Text style={styles.label}>Expires On:</Text>
            <Text style={styles.date}>
              {props.expiryDate} {props.expiryTime}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={styles.row}>
          <Text style={styles.label}>Duration: </Text>
          {!isUpdating ? (
            <View style={styles.durationRow}>
              {props.durationDays && (
                <Text style={styles.formText}>{props.durationDays} Days</Text>
              )}
              {props.durationHours && (
                <Text style={styles.formText}>{props.durationHours} Hours</Text>
              )}
              {props.durationMinutes && (
                <Text style={styles.formText}>
                  {props.durationMinutes} Minutes
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.durationRow}>
              <TextInput
                value={String(durationInput.days)}
                onChangeText={text => handleDurationChange('days', text)}
                style={styles.input}
              />

              <Text style={styles.formText}>Days</Text>
              <TextInput
                value={String(durationInput.hours)}
                onChangeText={text => handleDurationChange('hours', text)}
                style={styles.input}
              />

              <Text style={styles.formText}>Hours</Text>
              <TextInput
                value={String(durationInput.minutes)}
                onChangeText={text => handleDurationChange('minutes', text)}
                style={styles.input}
              />

              <Text style={styles.formText}>Minutes</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Risk Reward Ratio:{' '}
            <Text style={styles.formText}>{props.riskRatio}</Text>
          </Text>
        </View>

        <View style={styles.rating}>
          <View style={styles.row}>
            <Text style={styles.label}>Take Profit: </Text>
            {!isUpdating ? (
              <Text style={styles.formText}>{input.take_profit}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={input.take_profit}
                onChangeText={text => handleChange('take_profit', text)}
              />
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Stop Loss: </Text>
            {!isUpdating ? (
              <Text style={styles.formText}>{input.stop_loss}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={input.stop_loss}
                onChangeText={text => handleChange('stop_loss', text)}
              />
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.label}>
              Ratings: <Text style={styles.formText}>{props.Rating} </Text>
              <Icon
                name="star-outline"
                size={20}
                color="rgba(83, 172, 255, 1)"
              />
            </Text>
          </View>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.label}>{props.sellerName}'s Notes</Text>

          {!isUpdating ? (
            <Text style={styles.formText}>{props.notes}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={input.notes}
              onChangeText={text => handleChange('notes', text)}
            />
          )}
        </View>
        <View style={styles.listingStatus}>
          {!isUpdating ? (
            <Text style={styles.listingStatusText}>
              {soldAsSingleListing
                ? 'This listing is available for sale individually'
                : 'This listing is unavailable for sale individually'}
            </Text>
          ) : (
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>
                {soldAsSingleListing
                  ? 'Sold as a single listing'
                  : 'Only available as subscription'}
              </Text>
              <Switch
                value={soldAsSingleListing}
                onValueChange={() => {
                  soldAsSingleListing
                    ? setSoldAsSingleListing(false)
                    : setSoldAsSingleListing(true);
                }}
                thumbColor={soldAsSingleListing ? 'orangered' : 'white'}
                trackColor={{false: 'grey', true: 'grey'}}
              />
            </View>
          )}
        </View>
        {props.showUpdateBtn && (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            ({' '}
            <CustomBtn
              title={!isUpdating ? 'Update' : 'Submit'}
              textStyle={styles.btnText}
              style={styles.btn}
              onPress={() =>
                !isUpdating ? setIsUpdating(true) : handleSubmit()
              }
            />
            {isUpdating && (
              <CustomBtn
                title="Cancel"
                textStyle={styles.btnText}
                style={styles.btn}
                onPress={() => setIsUpdating(false)}
              />
            )}
            )
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  sellerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  profImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  sellerStatus: {
    fontSize: 12,
    color: '#FF6347',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  tickerAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#3ABECF',
    paddingVertical: 5,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  durationLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  rating: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
  },
  noteContainer: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 8,
  },
  notesText: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnSecondary: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  alertContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    top: 0,
  },
  formText: {
    color: 'white',
  },
  date: {
    color: 'white',
    fontSize: 12,
  },
  listingStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  listingStatusText: {
    fontSize: 12,
    color: 'white',
  },
  dropdown: {
    width: 120,
  },
  input: {
    color: 'white',
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingHorizontal: 5,
    flex: 1,
    minWidth: 30,
    height: 20,
  },
  labelInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ListingCardExtended;
