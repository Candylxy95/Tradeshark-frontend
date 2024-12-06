import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ListingCardExtended from '../../components/ListingCardExtended';
import {SERVER} from 'react-native-dotenv';

const ListingScreen = () => {
  const [listingData, setListingData] = useState([]);

  const getActiveData = async () => {
    try {
      const res = await fetch(`${SERVER}/listing/active`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to login');
      }
      console.log(`successfully retrieved listings`);

      const data = await res.json();
      setListingData(data);
    } catch (error) {
      console.error(error);
    }

    useEffect(() => {
      getActiveData();
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.filters}></View>
        <View style={styles.listingCard}>
          <ListingCardExtended
            sellerStatus="Star Seller"
            sellerName="Gingham"
            ticker="TSM"
            entryPrice="20.00"
            postedDate="20/04/24"
            expiryDate="20/04/24"
            tradeDuration="Short Term"
            riskRatio="1:3"
            takeProfit="21.00"
            stopLoss="19.80"
            Rating="5"
            notes="Hello Halll"
          />
          <Text>{listingData}</Text>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
  },
  filters: {
    height: '10%',
  },
});

export default ListingScreen;
