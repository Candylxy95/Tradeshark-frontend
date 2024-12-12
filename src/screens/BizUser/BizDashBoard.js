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
import Icon from 'react-native-vector-icons/Ionicons';
import SalesTransactionList from '../../components/BizDashBoard/SalesTransactionList';
import WalletCard from '../../components/DashBoard/WalletCard';
import CustomBtn from '../../components/CustomBtn';
import axios from 'axios';
import SubscriptionSetupForm from '../../components/BizDashBoard/SubscriptionSetupForm';
import SubscriberList from '../../components/BizDashBoard/SubscriberList';

const BizDashBoard = ({navigation}) => {
  const [sellerData, setSellerData] = useState([]);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);
  const [subData, setSubData] = useState([]);
  const {accessToken} = useContext(UserContext);

  const getSellerData = async () => {
    try {
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

      const data = await res.json();
      setSellerData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscriptionDataById = async () => {
    try {
      const res = await axios.get(`${SERVER}/subscription/`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSubData([res.data.subscription]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getSellerData();
    getSubscriptionDataById();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.walletContainer}>
        <WalletCard
          balance={sellerData?.user?.balance}
          btnTitle="Withdraw"
          onPress={() => navigation.navigate('Payout')}
          walletBtn={styles.walletBtn}
          walletBtnText={styles.walletBtnText}
        />
      </View>
      <View style={styles.compartment}>
        <Text style={styles.text}>Listing Transactions</Text>

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
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <SalesTransactionList />
        </ScrollView>
      )}

      {subData.length > 0 ? (
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
      ) : (
        <View style={[styles.subCompartment, styles.subForm]}>
          <SubscriptionSetupForm />
        </View>
      )}

      {showSubscriptionList && (
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <SubscriberList />
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
    paddingHorizontal: 20,
    backgroundColor: '#1F2124',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  subCompartment: {
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1F2124',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  text: {
    color: '#F1F2EB',
    fontFamily: 'Figtree-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'black',
    marginTop: 28,
    marginBottom: -45,
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF7F50',
    shadowColor: '#D64933',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
  },
  btnStart: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF7F50',
    shadowColor: '#D64933',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  btnTextStart: {
    color: '#F1F2EB',
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
  },
  walletBtn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF7F50',
    shadowColor: '#D64933',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  walletBtnText: {
    color: '#F1F2EB',
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
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
