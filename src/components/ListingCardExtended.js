import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ListingCardExtended = props => {
  return (
    <View style={styles.container}>
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
          <Text>{props.ticker}</Text>
          <Text style={styles.label}>Entry Price: ${props.entryPrice} </Text>
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
        <Text>{props.tradeDuration}</Text>
        <Text>{props.riskRatio}</Text>
      </View>
      <View style={styles.rating}>
        <View>
          <Text>{props.takeProfit}</Text>
          <Text>{props.stopLoss}</Text>
        </View>
        <Text>{props.Rating}</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.label}>{props.sellerName}'s Notes</Text>
        <Text>{props.notes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8DAD3',
    height: 'auto',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sellerBanner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profImg: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: 'pink',
  },
  tickerAndPrice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
    width: 100,
  },
  btnText: {
    color: '#F1F2EB',
  },
  noteContainer: {
    height: '40%',
  },
  date: {
    fontSize: 12,
  },
});

export default ListingCardExtended;
