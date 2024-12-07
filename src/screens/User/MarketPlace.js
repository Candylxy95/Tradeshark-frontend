import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import BottomSheet from '../../components/BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';

const MarketPlace = ({navigation}) => {
  const [activeListings, setActiveListings] = useState([]);
  const {accessToken} = useContext(UserContext);
  const [showPurchaseCfm, setShowPurchaseCfm] = useState(null);

  const getActiveListings = async () => {
    try {
      const res = await fetch(`${SERVER}/listing/active`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      });

      if (!res.ok) {
        throw new Error("Can't get active listing data");
      }
      const data = await res.json();
      console.log(`successfully retrieved active listing data`);
      console.log(`this is data: ${data.listing}`);
      setActiveListings(data.listing);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseListing = async (sellerId, listingId, price) => {
    try {
      const res = await fetch(`${SERVER}/transaction/purchase`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          seller_id: sellerId,
          listing_id: listingId,
          price: price,
        }),
      });

      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to purchase listing');
      }
      if (res.ok) {
        setActiveListings(data.listing);
      } else {
        console.error('No listings returned in response');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActiveListings();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.filters}></View>
        {activeListings.map(listing => (
          <View style={styles.listingCard} key={listing.id}>
            <ListingCard
              onPress={() => setShowPurchaseCfm(listing.id)}
              imgSrc="https://cdn.midjourney.com/a7a7b6e6-92fb-4471-9889-8982211def99/0_0.png"
              sellerStatus="Star Seller"
              sellerName={listing.first_name}
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
            />

            {showPurchaseCfm === listing.id && (
              <BottomSheet
                btnTitle="Buy"
                btnActn={() =>
                  purchaseListing(listing.seller_id, listing.id, listing.price)
                }
                onPress={() => setShowPurchaseCfm(null)}
                showPurchaseCfm={showPurchaseCfm}
                listing={listing.id}
              />
            )}
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
  filters: {
    height: '10%',
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

export default MarketPlace;
