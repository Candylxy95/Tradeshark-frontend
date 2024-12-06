import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import WalletCard from '../../components/DashBoard/WalletCard';
import {SERVER} from '@env';
import CustomBtn from '../../components/CustomBtn';
import TransactionList from '../../components/DashBoard/TransactionList';
import SubscriptionList from '../../components/DashBoard/SubscriptionList';

const BizDashBoard = ({navigation}) => {
  const [sellerData, setSellerData] = useState([]);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);
  const {accessToken} = useContext(UserContext);

  const getSellerData = async () => {
    try {
      console.log('Getting Seller data');
      const res = await fetch(`${SERVER}/user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to login');
      }
      console.log(`successfully retrieved user data`);

      const data = await res.json();
      setSellerData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSellerData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{height: '10%'}}></View>
      <View style={{height: '30%', marginBottom: '2%'}}>
        <WalletCard balance="200" />
      </View>
      <View style={styles.compartment}>
        <Text style={styles.text}>Transactions</Text>

        <CustomBtn
          style={styles.btn}
          textStyle={styles.btnText}
          title={!showTransactionList ? 'View' : 'Hide'}
          onPress={() =>
            showTransactionList
              ? setShowTransactionList(false)
              : setShowTransactionList(true)
          }
        />
      </View>
      {showTransactionList && (
        <ScrollView style={{height: '30%'}}>
          <TransactionList />
        </ScrollView>
      )}
      <View style={styles.compartment}>
        <Text style={styles.text}>Subscriptions</Text>
        <CustomBtn
          style={styles.btn}
          textStyle={styles.btnText}
          title={!showSubscriptionList ? 'View' : 'Hide'}
          onPress={() =>
            showSubscriptionList
              ? setShowSubscriptionList(false)
              : setShowSubscriptionList(true)
          }
        />
      </View>
      {showSubscriptionList && (
        <ScrollView style={{height: '30%'}}>
          <SubscriptionList />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
  },
  compartment: {
    marginBottom: '2%',
    height: '20%',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8DAD3',
  },
  text: {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 20,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: '#415D43',
    width: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
  },
  btnText: {
    color: '#F1F2EB',
  },
});

export default BizDashBoard;
