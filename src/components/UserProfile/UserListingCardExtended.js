import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import CustomBtn from '../CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const UserListingCardExtended = props => {
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
          <Text>Ticker: {props.ticker}</Text>
          <Text>{props.assetClass}</Text>
          <Text>{props.position}</Text>

          <Text style={styles.label}>Entry Price:{props.entryPrice}</Text>
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

        <View style={styles.durationRow}>
          {props.durationDays && <Text>{props.durationDays} Days</Text>}
          {props.durationHours && <Text>{props.durationHours} Hours</Text>}
          {props.durationMinutes && (
            <Text>{props.durationMinutes} Minutes</Text>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text>Risk Reward Ratio: {props.riskRatio}</Text>
      </View>
      <View style={styles.rating}>
        <View>
          <Text>
            Take Profit:
            {props.take_profit}
          </Text>
          <Text>Stop Loss:{props.stopLoss}</Text>
        </View>
        <Text>
          Ratings: {props.Rating}
          <Pressable
            pointerEvents={props.isSubmitting ? 'none' : 'auto'}
            onPress={() => {
              props.handleSetRate();
            }}>
            <Icon
              name={
                !props.rated || props.rated === '-1' ? 'star-outline' : 'star'
              }
              size={20}
              color="rgba(83, 172, 255, 1)"
            />
          </Pressable>
        </Text>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.label}>{props.sellerName}'s Notes</Text>
        <Text>{props.notes}</Text>
      </View>
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

export default UserListingCardExtended;
