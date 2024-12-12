import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import {useFocusEffect} from '@react-navigation/native';

const SingleListings = ({navigation}) => {
  const [activeListings, setActiveListings] = useState([]);
  const {accessToken} = useContext(UserContext);

  const getActivePurchasedListings = async () => {
    try {
      const res = await fetch(`${SERVER}/listing/purchased`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get purchased listing list");
      }
      const data = await res.json();
      setActiveListings(data.listing);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getActivePurchasedListings();
    }, []),
  );

  return (
    <KeyboardAvoidingView styles={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        {activeListings &&
          activeListings.map(listing => (
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
                type={listing.asset_class}
              />
            </View>
          ))}
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
  listingCard: {
    marginBottom: 2,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: 20,
  },
});

export default SingleListings;
