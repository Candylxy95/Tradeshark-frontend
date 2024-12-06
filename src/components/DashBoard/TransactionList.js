import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import {SERVER} from 'react-native-dotenv';

const TransactionList = ({navigation}) => {
  const {accessToken} = useContext(UserContext);
  const [inTransactionData, setInTransactionData] = useState([]);

  const getInTransactionData = async () => {
    try {
      console.log('Getting internal transactions data');
      console.log('Access: ', accessToken);
      const res = await fetch(`${SERVER}/transaction/view`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get internal transactions data");
      }
      const data = await res.json();
      console.log(`successfully retrieved intransactions data`);
      console.log(`this is data: ${data.inTransaction}`);
      setInTransactionData(data.inTransaction);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInTransactionData();
  }, []);

  return (
    <ScrollView style={styles.transactionList}>
      <View style={styles.transactionRow}>
        <Text style={styles.columnName}>Listing</Text>
        <Text style={styles.columnName}>Trader</Text>
        <Text style={styles.columnName}>Price</Text>
        <Text style={styles.columnName}>Purchased Date</Text>
      </View>
      {inTransactionData.map((row, index) => (
        <View style={styles.transactionRow} key={index}>
          <Text
            style={styles.columnItem}
            onPress={() => navigation.navigate('ListingScreen')}>
            {row.ticker}
          </Text>
          <Text style={styles.columnItem}>
            {row.seller_first_name} {row.seller_last_name[0]}
          </Text>
          <Text style={styles.columnItem}>S${row.price}</Text>
          <Text style={styles.columnItem}>{row.purchased_date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    position: 'relative',
  },
  text: {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 20,
    position: 'fixed',
    top: 0,
  },
  transactionList: {
    paddingTop: 20,
    backgroundColor: '#D8DAD3',
    paddingHorizontal: 20,
  },
  columnName: {
    fontFamily: 'Anton',
    width: '25%',
  },
  columnItem: {
    width: '25%',
    fontWeight: 'black',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btn: {
    backgroundColor: '#415D43',
    width: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
    position: 'absolute',
    zIndex: 1,
    top: 10,
  },
  btnText: {
    color: '#F1F2EB',
  },
});

export default TransactionList;
