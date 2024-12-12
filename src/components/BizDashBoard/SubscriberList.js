import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import CustomBtn from '../CustomBtn';
import {SERVER} from 'react-native-dotenv';
import axios from 'axios';

const SubscriberList = () => {
  const {accessToken} = useContext(UserContext);
  const [subData, setSubData] = useState([]);

  const getSubscriberList = async () => {
    try {
      const res = await axios.get(`${SERVER}/transaction/subs`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSubData(res.data.subTransaction || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSubscriberList();
  }, []);

  return subData.length > 0 ? (
    <ScrollView contentContainerStyle={styles.transactionList}>
      <Text style={styles.columnName}>
        Total Subscribers: {subData?.length || 0}
      </Text>
      <View style={styles.transactionRow}>
        <Text style={styles.columnName}>Name</Text>
        <Text style={styles.columnName}>D.O.P</Text>
      </View>
      {subData.map(sub => (
        <View
          style={styles.transactionRow}
          key={`${sub.seller_id}-${sub.buyer_id}`}>
          <Text style={styles.columnItem}>
            {sub.buyer_first_name} {sub.buyer_last_name[0]}
          </Text>
          <Text style={styles.columnItem}>{sub.purchased_date}</Text>
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  columnName: {
    flex: 1,
    fontFamily: 'Figtree-Bold',
    color: '#FF7F50',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  columnItem: {
    flex: 1,
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    paddingVertical: 4,
  },
  noTransactionText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  btn: {
    backgroundColor: '#3B82F6',
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
});

export default SubscriberList;
