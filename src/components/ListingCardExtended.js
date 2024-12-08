import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Switch,
} from 'react-native';
import CustomBtn from './CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

const ListingCardExtended = props => {
  const [isChecked, setIsChecked] = useState(props.sold_as_single_listing);
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
    sold_as_single_listing: isChecked,
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
    }, 000);
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
        {showUpdatedAlert && (
          <AwesomeAlert
            show={showUpdatedAlert}
            showProgress={false}
            title="Update Successful"
            message="Listing has been successfully updated"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="Confirm"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setShowUpdatedAlert(false);
            }}
          />
        )}
      </View>

      <View>{props.Img}</View>
      <View style={styles.sellerBanner}>
        <View style={{alignContent: 'space-between'}}>
          <Text style={{color: '#F1F2EB', backgroundColor: 'yellow'}}>
            {props.sellerStatus}
          </Text>
          <Text style={{color: '#F1F2EB', fontSize: 20}}>
            {props.sellerName}
          </Text>
        </View>
        <View style={styles.profImg}></View>
      </View>
      <View style={styles.tickerAndPrice}>
        <View>
          <Text>
            Ticker:{' '}
            {!isUpdating ? (
              input.ticker
            ) : (
              <TextInput
                value={input.ticker}
                onChangeText={text => handleChange('ticker', text)}
              />
            )}
          </Text>
          <Text>{props.assetClass}</Text>
          {!isUpdating ? (
            <Text>{props.position}</Text>
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
          <Text style={styles.label}>
            Entry Price:{' '}
            {!isUpdating ? (
              input.entry_price
            ) : (
              <TextInput
                value={input.entry_price}
                onChangeText={text => handleChange('entry_price', text)}
              />
            )}
          </Text>
        </View>

        <View>
          <View>
            <Text style={styles.label}>Posted On:</Text>
            <Text style={styles.date}>
              {props.postedDate} {props.postedTime}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Expires On:</Text>
            <Text style={styles.date}>
              {props.expiryDate} {props.expiryTime}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Text>Duration: </Text>
        {!isUpdating ? (
          <View style={styles.durationRow}>
            {props.durationDays && <Text>{props.durationDays} Days</Text>}
            {props.durationHours && <Text>{props.durationHours} Hours</Text>}
            {props.durationMinutes && (
              <Text>{props.durationMinutes} Minutes</Text>
            )}
          </View>
        ) : (
          <View style={styles.durationRow}>
            <TextInput
              value={durationInput.days}
              onChangeText={text => handleDurationChange('days', text)}>
              {props.durationDays}
            </TextInput>
            <Text>Days</Text>
            <TextInput
              value={durationInput.hours}
              onChangeText={text => handleDurationChange('hours', text)}>
              {props.durationHours}
            </TextInput>
            <Text>Hours</Text>
            <TextInput
              value={durationInput.minutes}
              onChangeText={text => handleDurationChange('minutes', text)}>
              {props.durationMinutes}
            </TextInput>
            <Text>Minutes</Text>
          </View>
        )}
      </View>
      <View style={styles.row}>
        <Text>Risk Reward Ratio: {props.riskRatio}</Text>
      </View>
      <View style={styles.rating}>
        <View>
          <Text>
            Take Profit:{' '}
            {!isUpdating ? (
              input.take_profit
            ) : (
              <TextInput
                value={input.take_profit}
                onChangeText={text => handleChange('take_profit', text)}
              />
            )}
          </Text>
          <Text>
            Stop Loss:{' '}
            {!isUpdating ? (
              input.stop_loss
            ) : (
              <TextInput
                value={input.stop_loss}
                onChangeText={text => handleChange('stop_loss', text)}
              />
            )}
          </Text>
        </View>
        <Text>
          Ratings: {props.Rating}
          <Icon name="star-outline" size={20} color="rgba(83, 172, 255, 1)" />
        </Text>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.label}>{props.sellerName}'s Notes</Text>
        <Text>
          {!isUpdating ? (
            props.notes
          ) : (
            <TextInput
              value={input.notes}
              onChangeText={text => handleChange('notes', text)}
            />
          )}
        </Text>
      </View>
      <View>
        {!isUpdating ? (
          <Text>
            {isChecked
              ? 'This listing is available for sale individually'
              : 'This listing is unavailable for sale individually'}
          </Text>
        ) : (
          <>
            <Text style={styles.checkboxLabel}>
              {isChecked
                ? 'Sold as a single listing'
                : 'Only available as subscription'}
            </Text>
            <Switch
              value={isChecked}
              onValueChange={() => {
                isChecked ? setIsChecked(false) : setIsChecked(true);
              }}
              thumbColor={isChecked ? '#4CAF50' : '#f4f3f4'}
              trackColor={{false: '#767577', true: '#81b0ff'}}
            />
          </>
        )}
      </View>
      <CustomBtn
        title={!isUpdating ? 'Update' : 'Submit'}
        textStyle={styles.btnText}
        style={styles.btn}
        onPress={() => (!isUpdating ? setIsUpdating(true) : handleSubmit())}
      />
      {isUpdating && (
        <CustomBtn
          title="Cancel"
          textStyle={styles.btnText}
          style={styles.btn}
          onPress={() => setIsUpdating(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#4A90E2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  sellerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profImg: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  tickerAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noteContainer: {
    padding: 20,
    backgroundColor: '#242424',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
  btn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
    shadowColor: '#4A90E2',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 16,
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    flex: 0.5,
  },
  alertContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    top: 0,
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
});

export default ListingCardExtended;
