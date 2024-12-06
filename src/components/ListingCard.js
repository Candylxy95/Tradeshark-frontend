import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import CustomBtn from './CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const ListingCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{color: '#F1F2EB', backgroundColor: 'yellow'}}>
            {props.sellerStatus}
          </Text>
          <Text style={{color: '#black', fontSize: 14}}>
            {props.sellerName} {props.sellerLastName}
          </Text>
        </View>
        <ImageBackground
          source={{uri: props.imgSrc}}
          style={styles.imageBackground}
          imageStyle={{borderRadius: 100}}
        />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.tickerDetails}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.ticker}>
              {props.ticker}
              {'    '} <Text style={{fontSize: 14}}>{props.rating} </Text>
            </Text>
            <Text>
              <Icon name="star-outline" size={20} color="black" />
            </Text>
          </View>
          <View style={{flexDirection: 'column', paddingTop: 10}}>
            <Text style={styles.label}>
              Entry Price: ${props.entryPrice}{' '}
              <Text
                style={{color: props.position === 'Long' ? 'green' : 'red'}}>
                {props.position}
              </Text>
            </Text>
            <Text style={styles.label}>Type: {props.duration}</Text>
            <Text style={styles.label}>Ratio: {props.ratio}</Text>
          </View>
        </View>

        <View style={{justifyContent: 'space-between', height: 'auto'}}>
          <View>
            <Text style={styles.dateLabel}>Posted On:</Text>
            <Text style={styles.date}>
              {props.postedDate} {props.postedTime}
            </Text>
          </View>

          <View>
            <Text style={styles.dateLabel}>Expires On:</Text>
            <Text style={styles.date}>
              {props.expiryDate} {props.expiryTime}
            </Text>
          </View>
          <CustomBtn
            style={styles.btn}
            textStyle={styles.btnText}
            title="Buy +"
            onPress={props.onPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#F5F6F4',
    padding: 10,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tickerDetails: {
    flexDirection: 'column',
    marginRight: 15,
  },
  ticker: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    fontWeight: '500',
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 35,
    width: 100,
  },
  btnText: {
    color: '#F1F2EB',
  },
  imageBackground: {
    width: 35,
    height: 35,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  date: {
    fontSize: 10,
  },
});

export default ListingCard;
