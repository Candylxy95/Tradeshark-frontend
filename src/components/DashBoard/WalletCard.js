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
        style={styles.btn}
        textStyle={styles.btnText}
        title={props.btnTitle}
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
    color: '#2B86FF',
    fontFamily: 'Anton',
    fontSize: 35,
    paddingBottom: 25,
    textShadowColor: 'rgba(43, 134, 255, 0.5)',
    paddingTop: 10,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(43, 134, 255, 0.8)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnText: {
    color: '#F1F2EB', // Matches the overall theme
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
  },
});

export default WalletCard;
