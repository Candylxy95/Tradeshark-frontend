import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const ExpiredListings = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expiredListings, setExpiredListings] = useState([]);
  const {accessToken} = useContext(UserContext);

  const getExpiredListings = async () => {
    try {
      const res = await fetch(`${SERVER}/listing/expired/seller`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get expired listing list");
      }
      const data = await res.json();

      setExpiredListings(data.listing);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getExpiredListings();
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
            opacity: 0.7,
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size="large" color="#FB8B24" />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listingLayout}>
          {expiredListings &&
            expiredListings.map(listing => (
              <View style={styles.listingCard} key={listing.id}>
                <ListingCard
                  onPress={() =>
                    navigation.navigate('UserListingDetail', {
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

export default ExpiredListings;
