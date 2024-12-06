import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from '@env';
import UserContext from '../../components/context/UserContext';
import BottomSheet from '../../components/BottomSheet';

const MarketPlace = ({navigation}) => {
  const [activeListings, setActiveListings] = useState([]);
  const [UserData, setUserData] = useState([]);
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

  const deductBalance = async price => {
    try {
      const res = await fetch(`${SERVER}/userbalance`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(price),
      });

      if (!res.ok) {
        throw new Error("Can't update balance");
      }
      const data = await res.json();
      console.log(`successfully updated balance`);
      console.log(`this is data: ${data.listing}`);
      setActiveListings(data.listing);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActiveListings();
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
              btnTitle="Buy"
              btnActn={() => deductBalance(-listing.price)}
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
    backgroundColor: '#F1F2EB',
  },
  filters: {
    height: '10%',
  },
  listingCard: {
    height: '28%',
  },
});

export default MarketPlace;
