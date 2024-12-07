import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import BottomSheet from '../../components/BottomSheet';

const PurchasedSignals = ({navigation}) => {
  const [activeListings, setActiveListings] = useState([]);
  const {accessToken} = useContext(UserContext);
  const [showPurchaseCfm, setShowPurchaseCfm] = useState(null);

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
      console.log(`Successfully retrieved active listing list`);
      console.log(`this is data: ${data.listing}`);
      setActiveListings(data.listing);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivePurchasedListings();
  }, []);

  return (
    <View style={styles.container}>
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
              btnTitle="View"
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
    </View>
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

export default PurchasedSignals;
