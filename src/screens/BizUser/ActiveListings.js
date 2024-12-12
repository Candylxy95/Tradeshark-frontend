import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const ActiveListings = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeListings, setActiveListings] = useState([]);
  const {accessToken} = useContext(UserContext);

  const getActiveListings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVER}/listing/active/seller`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setActiveListings(res.data.listing);
      setIsLoading(false);
    } catch (error) {
      console.error(
        'API Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getActiveListings();
    }, []),
  );

  return (
    <KeyboardAvoidingView styles={styles.container}>
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.5,
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size="large" color="#FB8B24" />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listingLayout}>
          {activeListings &&
            activeListings.map(listing => (
              <View style={styles.listingCard} key={listing.id}>
                <ListingCard
                  onPress={() =>
                    navigation.navigate('ListingDetail', {
                      listingId: listing.id,
                    })
                  }
                  imgSrc="https://cdn.midjourney.com/972aec0b-b06d-4967-8437-aef445e5b90b/0_1.png"
                  sellerStatus="Beginner"
                  sellerFirstName={listing.first_name}
                  sellerLastName={listing.last_name[0]}
                  position={listing.position}
                  ticker={listing.ticker}
                  entryPrice={listing.entry_price}
                  postedDate={listing.posted_date}
                  postedTime={listing.posted_time}
                  expiryDate={listing.expiry_date}
                  expiryTime={listing.expiry_time}
                  duration={listing.duration.hours}
                  ratio={listing.rr_ratio}
                  rating={listing.likes}
                  btnTitle="View"
                  type={listing.asset_class}
                />
              </View>
            ))}
        </View>
      </ScrollView>
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
  scrollView: {
    paddingBottom: 20,
  },
  listingCard: {
    marginBottom: 2,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  listingLayout: {
    paddingHorizontal: 20,
  },
});

export default ActiveListings;
