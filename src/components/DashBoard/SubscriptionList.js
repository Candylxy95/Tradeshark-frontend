import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const SubscriptionList = props => {
  const [showTransactionList, setShowTransactionList] = useState(false);

  return (
    <ScrollView style={styles.transactionList}>
      <View style={styles.transactionRow}>
        <Text style={styles.columnName}>Item</Text>
        <Text style={styles.columnName}>Trader</Text>
        <Text style={styles.columnName}>Price</Text>
        <Text style={styles.columnName}>Purchased Date</Text>
      </View>
      {transactionData.map((row, index) => (
        <View style={styles.transactionRow} key={index}>
          <Text style={styles.columnItem}>{row.ticker}</Text>
          <Text style={styles.columnItem}>{row.seller_id}</Text>
          <Text style={styles.columnItem}>S${row.price}</Text>
          <Text style={styles.columnItem}>{row.purchased_on}</Text>
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

export default SubscriptionList;
