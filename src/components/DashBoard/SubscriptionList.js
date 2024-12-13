import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import UserContext from '../context/UserContext';
import {SERVER} from 'react-native-dotenv';

const SubscriptionList = () => {
  const {accessToken} = useContext(UserContext);
  const [subTransactionList, setSubTransactionList] = useState([]);

  //get subscriptions
  const getSubTransactions = async () => {
    try {
      const res = await axios.get(`${SERVER}/transaction/subs/user`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSubTransactionList(res.data.subTransaction);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSubTransactions();
  }, []);

  return subTransactionList.length !== 0 ? (
    <ScrollView contentContainerStyle={styles.transactionList}>
      <View style={styles.transactionRow}>
        <Text style={styles.columnName}>Trader</Text>
        <Text style={styles.columnName}>Price</Text>
        <Text style={styles.columnName}>D.O.P</Text>
        <Text style={styles.columnName}>Expiry Date</Text>
      </View>
      {subTransactionList.map((row, index) => (
        <View style={styles.transactionRow} key={index}>
          <Text style={styles.columnItem}>
            {row.first_name} {row.last_name[0]}
          </Text>
          <Text style={styles.columnItem}>S${row.price}</Text>
          <Text style={styles.columnItem}>{row.purchased_date}</Text>
          <Text style={styles.columnItem}>{row.expiry_date}</Text>
        </View>
      ))}
    </ScrollView>
  ) : (
    <ScrollView contentContainerStyle={styles.noTransactionContainer}>
      <Text style={styles.noTransactionText}>No subscriptions yet.</Text>
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
    color: 'rgba(83, 172, 255, 1)',
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
  noTransactionText: {
    color: 'white',
  },
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubscriptionList;
