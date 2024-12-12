import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const SubListings = ({navigation}) => {
  const [subListings, setSubListings] = useState([]);
  const {accessToken} = useContext(UserContext);

  const getSubListings = async () => {
    try {
      const res = await axios.get(`${SERVER}/subscription/subs`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSubListings(res.data.sublisting);
      console.log(`thisis ${JSON.stringify(res.data.sublisting)}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSubListings();
    }, []),
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        {subListings.length > 0 &&
          subListings.map(listing => (
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
  },
});

export default SubListings;
