import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import CustomBtn from './CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const ListingCardExtended = props => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [positionValue, setPositionValue] = useState(null);
  const [positionItems, setPositionItems] = useState([
    {label: 'Long', value: 'Long'},
    {label: 'Short', value: 'Short'},
  ]);
  const [input, setInput] = useState({
    img_src: props.Img || '',
    ticker: props.ticker || '',
    position: props.position || '',
    entry_price: props.entryPrice || 0,
    take_profit: props.takeProfit || 0,
    stop_loss: props.stopLoss || 0,
    price: props.price || 0,
    notes: props.notes || '',
  });

  const handleChange = (text, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [text]: value,
    }));
  };

  const handleIntervalChange = value => {
    setInput(prevInput => ({
      ...prevInput,
      duration: value === '' ? '1 Day' : value,
    }));
  };

  const handleSubmit = () => {
    props.updateFn(input);
    setIsUpdating(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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

      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text>
          Duration:{' '}
          {!isUpdating ? (
            input.duration
          ) : (
            <TextInput
              value={input.duration}
              onChangeText={handleIntervalChange}
            />
          )}
        </Text>
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
});

export default ListingCardExtended;
