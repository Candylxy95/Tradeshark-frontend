import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import UserListingCardExtended from '../../components/UserProfile/UserListingCardExtended';

const ListingDetailBoard = ({route}) => {
  const {accessToken} = useContext(UserContext);
  const [listingDetails, setListingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rated, setRated] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const rateListing = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${SERVER}/listing/${route.params.listingId}`,
        {likes: rated},
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      console.log('Response Likes: ', res.data.listing.likes);
      getListingById();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetRate = () => {
    if (!rated || rated === '-1') {
      setRated('1');
    } else if (rated === '1') {
      setRated('-1');
    }
    rateListing();
  };

  useEffect(() => {
    getListingById();
  }, [route.params.listingId]);

  return (
    <View style={styles.listingCard}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <UserListingCardExtended
          sellerStatus="Beginner"
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
          updateFn={() => console.log('happy')}
          handleSetRate={handleSetRate}
          rated={rated}
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
