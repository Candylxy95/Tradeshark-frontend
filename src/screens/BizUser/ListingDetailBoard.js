import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import ListingCardExtended from '../../components/ListingCardExtended';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';

const ListingDetailBoard = ({route}) => {
  const {accessToken} = useContext(UserContext);
  const [listingDetails, setListingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getListingById = async () => {
    try {
      const res = await axios.get(
        `${SERVER}/listing/${route.params.listingId}`,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      console.log('Response:', res.data);
      setListingDetails(res.data.listing[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const updateListing = async updatedInput => {
    try {
      const res = await axios.patch(
        `${SERVER}/listing/${route.params.listingId}`,
        updatedInput,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      console.log('Response:', res.data);
      getListingById();
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  useEffect(() => {
    getListingById();
  }, [route.params.listingId]);

  return (
    <View style={styles.listingCard}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ListingCardExtended
          sellerStatus="Star Seller"
          sellerName={listingDetails.first_name}
          ticker={listingDetails.ticker}
          assetClass={listingDetails.asset_class}
          position={listingDetails.position}
          entryPrice={listingDetails.entry_price}
          postedDate={listingDetails.posted_date}
          expiryDate={listingDetails.expiry_date}
          durationDays={listingDetails.duration.days}
          durationHours={listingDetails.duration.hours}
          durationMins={listingDetails.duration.minutes}
          riskRatio={listingDetails.rr_ratio}
          takeProfit={listingDetails.take_profit}
          stopLoss={listingDetails.stop_loss}
          Rating={listingDetails.likes}
          notes={listingDetails.notes}
          sold_as_single_listing={listingDetails.sold_as_single_listing}
          updateFn={updateListing}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
  },

  filters: {
    height: '10%',
  },
  listingCard: {
    flex: 1,
  },
});

export default ListingDetailBoard;
