import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';
import SalesTransactionList from '../../components/BizDashBoard/SalesTransactionList';
import WalletCard from '../../components/DashBoard/WalletCard';
import CustomBtn from '../../components/CustomBtn';

const BizDashBoard = ({navigation}) => {
  const [sellerData, setSellerData] = useState([]);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);
  const {accessToken, setAccessToken} = useContext(UserContext);

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

  const logout = async () => {
    try {
      await EncryptedStorage.removeItem('accessToken');
      setAccessToken('');
      navigation.dispatch(
        CommonActions.reset({
          index: 5,
          routes: [
            {
              name: 'AuthNavigator',
              state: {routes: [{name: 'BizLoginScreen'}]},
            },
          ],
        }),
      );
    } catch (error) {
      console.error('Failed to logout: ', error);
    }
  };

  useEffect(() => {
    getSellerData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{height: '10%'}}></View>
      <CustomBtn
        title="Logout"
        onPress={logout}
        style={styles.btn}
        textStyle={styles.btnText}
      />
      <View style={styles.walletContainer}>
        <WalletCard balance={sellerData?.user?.balance} btnTitle="Withdraw" />
      </View>
      <View style={styles.compartment}>
        <Text style={styles.text}>Transactions</Text>

        <CustomBtn
          style={styles.btn}
          textStyle={styles.btnText}
          title={
            !showTransactionList ? (
              <Icon name="caret-down-circle" size={25} color="#F1F2EB" />
            ) : (
              <Icon name="caret-up-circle" size={25} color="#F1F2EB" />
            )
          }
          onPress={() =>
            showTransactionList
              ? setShowTransactionList(false)
              : setShowTransactionList(true)
          }
        />
      </View>
      {showTransactionList && (
        <ScrollView style={{height: '30%'}}>
          <SalesTransactionList />
        </ScrollView>
      )}
      <View style={styles.compartment}>
        <Text style={styles.text}>Subscribers</Text>
        <CustomBtn
          style={styles.btn}
          textStyle={styles.btnText}
          title={
            !showSubscriptionList ? (
              <Icon name="caret-down-circle" size={25} color="#F1F2EB" />
            ) : (
              <Icon name="caret-up-circle" size={25} color="#F1F2EB" />
            )
          }
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
    backgroundColor: '#131314',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  walletContainer: {
    height: '25%',
    marginBottom: 15,
    borderRadius: 10,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: '#1F2124',
    zIndex: 3,
  },

  compartment: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#1F2124',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  text: {
    color: '#F1F2EB',
    fontFamily: 'Figtree-Light',
    fontSize: 18,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'black',
    marginTop: 35,
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(43, 134, 255, 1)',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContainer: {
    maxHeight: 200,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1F2124',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default BizDashBoard;
