import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import UserListingCardExtended from '../../components/UserProfile/UserListingCardExtended';
import ListingHistoryCard from '../../components/ListingHistoryCard';
import {ScrollView} from 'react-native-gesture-handler';

const UserListingDetailBoard = ({route}) => {
  const {accessToken} = useContext(UserContext);
  const [listingDetails, setListingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyDetails, setHistoryDetails] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingRatedData, setListingRatedData] = useState([]);

  const getListingById = async () => {
    setIsLoading(true);
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

  const rateListing = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.get(
        `${SERVER}/transaction/rated/${route.params.listingId}`,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setListingRatedData(res.data.rated);
      getListingById();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
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
      <ScrollView contentContainerStyle={styles.ScrollView}>
        {isLoading && <ActivityIndicator size="large" color="#00ff00" />}

        <UserListingCardExtended
          sellerStatus="Beginner"
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
          hasHistory={historyDetails.length > 0}
          expiryTime={listingDetails.expiry_time}
          expiryDate={listingDetails.expiry_date}
          durationDays={listingDetails.duration?.days}
          durationHours={listingDetails.duration?.hours}
          durationMins={listingDetails.duration?.minutes}
          riskRatio={listingDetails.rr_ratio}
          takeProfit={listingDetails.take_profit}
          stopLoss={listingDetails.stop_loss}
          Rating={listingDetails.likes}
          notes={listingDetails.notes}
          sold_as_single_listing={listingDetails.sold_as_single_listing}
          handleSetRate={rateListing}
          rated={listingRatedData.rated}
          isSubmitting={isSubmitting}
        />

        {historyDetails.length > 0 && (
          <View>
            <Text style={styles.historyLabel}>History</Text>
            <ListingHistoryCard
              sellerName={listingDetails.first_name}
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
            />
          </View>
        )}
      </ScrollView>
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
});

export default UserListingDetailBoard;
