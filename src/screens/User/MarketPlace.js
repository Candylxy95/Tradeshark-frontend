import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import ListingCard from '../../components/ListingCard';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import BottomSheet from '../../components/BottomSheet';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

const MarketPlace = ({navigation}) => {
  const [activeListings, setActiveListings] = useState([]);
  const {accessToken} = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorCtnr, setErrorCtnr] = useState('');
  const [showPurchaseCfm, setShowPurchaseCfm] = useState(null);
  const [showPA, setShowPA] = useState(false);

  const getActiveListings = async () => {
    try {
      const res = await axios.get(`${SERVER}/listing/active`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });

      setActiveListings(res.data.listing);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseListing = async (sellerId, listingId) => {
    const input = {seller_id: sellerId, listing_id: listingId};
    try {
      const res = await axios.post(`${SERVER}/transaction/purchase`, input, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setShowPA(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorCtnr(error.response.data.msg || 'Purchase failed.');
      } else {
        setErrorCtnr(
          error.message ||
            'An unexpected error occurred. Please try again later.',
        );
      }
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getActiveListings();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.filters}></View>
        <View style={{flex: 1}}>
          {showAlert && (
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Purchase failed."
              message={errorCtnr}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="Confirm"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
            />
          )}
        </View>
        {activeListings.map(listing => (
          <View style={styles.listingCard} key={listing.id}>
            <ListingCard
              onPress={() => {
                console.log(`this is listincgcard btn ; ${listing.id}`);
                setShowPurchaseCfm(listing.id);
              }}
              imgSrc="https://cdn.midjourney.com/a7a7b6e6-92fb-4471-9889-8982211def99/0_0.png"
              goSellerProfFn={() => {
                console.log(
                  'Navigating to Seller Profile with ID:',
                  listing.seller_id,
                );
                navigation.navigate('UserViewSellerProfile', {
                  sellerId: listing.seller_id,
                });
              }}
              sellerStatus="Star Seller"
              sellerFirstName={listing.first_name}
              sellerLastName={listing.last_name[0]}
              ticker={listing.ticker}
              entryPrice={listing.entry_price}
              position={listing.position}
              postedDate={listing.posted_date}
              postedTime={listing.posted_time}
              expiryDate={listing.expiry_date}
              expiryTime={listing.expiryTime}
              ratio={listing.rr_ratio}
              type={
                listing.duration.days
                  ? 'Long Term'
                  : listing.duration.hours
                  ? 'Mid Term'
                  : listing.duration.minutes
                  ? 'Short Term'
                  : 'Short Term'
              }
              rating={listing.likes}
              btnTitle={`S$${listing.price}`}
            />
            {showPurchaseCfm === listing.id && (
              <View style={styles.btmSheetContainer}>
                <BottomSheet
                  btnTitle="Buy"
                  btnActn={() => {
                    console.log(`this is id= ${listing.id}`);
                    purchaseListing(listing.seller_id, listing.id);
                  }}
                  onPress={() => {
                    setShowPA(false);
                    setShowPurchaseCfm(null);
                  }}
                  showPurchaseCfm={showPurchaseCfm}
                  listing={listing.id}
                  listingId={listing.id.toString().slice(-4)}
                  title="Payment"
                  listingMsg="Purchase Items to view the full details"
                  listingTitle={listing.ticker}
                  listingPrice={listing.price}
                  listingSellerFN={listing.first_name}
                  listingSellerLN={listing.last_name}
                  showPA={showPA}
                  goToBtn={() => {
                    setShowPA(false);
                    setShowPurchaseCfm(null);
                    navigation.navigate('UserListingDetail', {
                      listingId: listing.id,
                    });
                  }}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 10,
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
  btmSheetContainer: {
    flex: 1,
  },
});

export default MarketPlace;
