import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import {SERVER} from 'react-native-dotenv';

const SalesTransactionList = ({navigation}) => {
  const {accessToken} = useContext(UserContext);
  const [inTransactionData, setInTransactionData] = useState([]);

  const getSoldListingData = async () => {
    try {
      const res = await fetch(`${SERVER}/transaction/sales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get sold listing data");
      }
      const data = await res.json();
      setInTransactionData(data.inTransaction);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSoldListingData();
  }, []);

  return (
    <ScrollView style={styles.transactionList}>
      <View style={styles.transactionRow}>
        <Text style={styles.columnName}>Listing</Text>
        <Text style={styles.columnName}>Bought By</Text>
        <Text style={styles.columnName}>Price</Text>
        <Text style={styles.columnName}>D.O.P</Text>
      </View>
      {inTransactionData.map((row, index) => (
        <View style={styles.transactionRow} key={index}>
          <Text
            style={styles.columnItem}
            onPress={() => navigation.navigate('ListingScreen')}>
            {row.ticker}
          </Text>
          <Text style={styles.columnItem}>
            {row.buyer_first_name} {row.buyer_last_name[0]}
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
    backgroundColor: '#121212',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  transactionList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  columnName: {
    flex: 1,
    fontFamily: 'Figtree-Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF7F50',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  columnItem: {
    flex: 1,
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    paddingVertical: 4,
  },
  btn: {
    backgroundColor: '#3ABECF',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#60A5FA',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Figtree-Bold',
  },
  text: {
    color: '#F9FAFB',
    fontSize: 20,
    fontFamily: 'Figtree-Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default SalesTransactionList;
