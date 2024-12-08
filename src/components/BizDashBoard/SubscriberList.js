import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import UserContext from '../context/UserContext';
import CustomBtn from '../CustomBtn';
import {SERVER} from 'react-native-dotenv';
import axios from 'axios';

const SubscriberList = () => {
  const [subData, setSubData] = useState([]);

  const getSubscriberList = async () => {
    try {
      const res = await axios.get(`${SERVER}/transaction/subs`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSubData(res.data.subTransaction);
    } catch (error) {
      console.error(error.msg);
    }
  };

  useEffect(() => {
    getSubscriberList();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Total Subscribers: {subData?.length || 0}</Text>
      <View style={styles.row}>
        <Text>Name</Text>
        <Text>Purchased Date</Text>
      </View>
      {subData.map(sub => {
        <View style={styles.row} key={`${sub.seller_id}-${sub.buyer_id}`}>
          <Text>
            {sub.buyer_first_name} {sub.buyer_last_name[0]}
          </Text>
          <Text>{sub.purchased_date}</Text>
        </View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SubscriberList;
