import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import CustomBtn from './CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const ListingCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sellerStatus}>{props.sellerStatus}</Text>
          <Text style={styles.sellerName}>
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
              <Icon
                name="star-outline"
                size={20}
                color="rgba(83, 172, 255, 1)"
              />
            </Text>
          </View>
          <View style={{flexDirection: 'column', paddingTop: 10}}>
            <Text style={styles.label}>
              Entry Price: ${props.entryPrice}{' '}
              <Text
                style={{
                  color: props.position === 'Long' ? 'lightgreen' : 'red',
                }}>
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
    backgroundColor: '#1F2124',
    padding: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageBackground: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F1F2EB',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 4,
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(83, 172, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateLabel: {
    fontSize: 12,
    color: '#BBBBBB',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#F1F2EB',
  },
  sellerStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(83, 172, 255, 1)',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default ListingCard;
