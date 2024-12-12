import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import WalletCard from '../../components/DashBoard/WalletCard';
import CustomBtn from '../../components/CustomBtn';
import TransactionList from '../../components/DashBoard/TransactionList';
import SubscriptionList from '../../components/DashBoard/SubscriptionList';
import {useFocusEffect} from '@react-navigation/native';

const DashBoard = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);
  const {accessToken} = useContext(UserContext);

  const getUserData = async () => {
    try {
      const res = await fetch(`${SERVER}/user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get user data");
      }
      const data = await res.json();

      setUserData(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.walletContainer}>
        <WalletCard
          balance={userData.balance}
          btnTitle="Deposit"
          onPress={() => navigation.navigate('Payment')}
          walletBtn={styles.walletBtn}
          walletBtnText={styles.walletBtnText}
        />
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
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <TransactionList />
        </ScrollView>
      )}
      <View style={styles.compartment}>
        <Text style={styles.text}>Subscriptions</Text>
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
        <ScrollView contentContainerStyle={{height: '100%'}}>
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
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: '#3ABECF',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
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
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: '#3ABECF',
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
});

export default DashBoard;
