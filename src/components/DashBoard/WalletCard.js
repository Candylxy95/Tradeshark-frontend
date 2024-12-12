import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomBtn from '../CustomBtn';
import {format} from 'date-fns';

const WalletCard = props => {
  const date = format(new Date(), 'dd MMM yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.text}>Balance</Text>
      <Text style={styles.subText}>S$ {props.balance}</Text>
      <CustomBtn
        style={props.walletBtn}
        textStyle={props.walletBtnText}
        title={props.btnTitle}
        onPress={props.onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#F1F2EB',
    fontFamily: 'Figtree-Medium',
    fontSize: 12,
    paddingTop: 35,
  },
  text: {
    color: '#F1F2EB',
    fontFamily: 'Figtree-Medium',
    fontSize: 14,
  },
  subText: {
    color: '#3ABECF',
    fontFamily: 'Anton',
    fontSize: 35,
    paddingBottom: 25,
    textShadowColor: 'rgba(43, 134, 255, 0.5)',
    paddingTop: 10,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});

export default WalletCard;
