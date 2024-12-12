import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import ListingCardExtended from '../../components/ListingCardExtended';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import ListingHistoryCard from '../../components/ListingHistoryCard';

const ListingDetailBoard = ({route}) => {
  const {accessToken} = useContext(UserContext);
  const [listingDetails, setListingDetails] = useState([]);
  const [historyDetails, setHistoryDetails] = useState([]);
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
      setListingDetails(res.data.listing[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const updateListing = async updatedInput => {
    setIsLoading(true);
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
      await getListingById();
      await getListingHistoryById();
      setIsLoading(false);
      Alert.alert('Successfully updated.');
    } catch (error) {
      console.error('Error: ', error.message);
      Alert.alert(error.message);
    }
  };

  const getListingHistoryById = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER}/listing/history/${route.params.listingId}`,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setHistoryDetails([res.data.history]);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getListingById();
    getListingHistoryById();
  }, [route.params.listingId]);

  useEffect(() => {
    getListingById();
    getListingHistoryById();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.listingCard}>
      <View style={styles.ScrollView}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <ListingCardExtended
            profImg={listingDetails.imgSrc}
            sellerStatus="Star Seller"
            sellerName={listingDetails.first_name}
            ticker={listingDetails.ticker}
            assetClass={listingDetails.asset_class}
            position={listingDetails.position}
            entryPrice={listingDetails.entry_price}
            postedDate={
              historyDetails.length
                ? historyDetails[0].updated_date
                : listingDetails.posted_date
            }
            postedTime={
              historyDetails.length
                ? historyDetails[0].updated_time
                : listingDetails.posted_time
            }
            price={listingDetails.price}
            expiryDate={listingDetails.expiry_date}
            expiryTime={listingDetails.expiry_time}
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
            showUpdateBtn={historyDetails.length === 0}
          />
        )}

        {historyDetails.length > 0 && (
          <ListingHistoryCard
            ticker={historyDetails[0].ticker}
            assetClass={historyDetails[0].asset_class}
            position={historyDetails[0].position}
            entryPrice={historyDetails[0].entry_price}
            postedDate={historyDetails[0].posted_date}
            postedTime={historyDetails[0].posted_time}
            durationDays={historyDetails[0].duration?.days}
            durationHours={historyDetails[0].duration?.hours}
            durationMins={historyDetails[0].duration?.minutes}
            riskRatio={historyDetails[0].rr_ratio}
            takeProfit={historyDetails[0].take_profit}
            stopLoss={historyDetails[0].stop_loss}
            notes={historyDetails[0].notes}
            sellerName={listingDetails.first_name}
          />
        )}
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ListingDetailBoard;
