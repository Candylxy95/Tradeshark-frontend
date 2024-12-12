import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import UserContext from '../../components/context/UserContext';
import CustomBtn from '../../components/CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import {SERVER} from 'react-native-dotenv';
import Reviews from '../../components/UserProfile/Reviews';
import ReviewForm from '../../components/UserProfile/ReviewForm';
import AwesomeAlert from 'react-native-awesome-alerts';
import BottomSheetSub from '../../components/BottomSheetSub';
import {useFocusEffect} from '@react-navigation/native';

const UserViewSellerProfile = ({route, navigation}) => {
  const {accessToken} = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [userReviewed, setUserReviewed] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userSubscriptionToSeller, setUserSubscriptionToSeller] = useState([]);
  const [sellerSubscription, setSellerSubscription] = useState([]);
  const [showReviewBtn, setShowReviewBtn] = useState(true);
  const [sellerSubCount, setSellerSubCount] = useState([]);
  const [showPurchaseCfm, setShowPurchaseCfm] = useState(false);
  const [showPA, setShowPA] = useState(false);
  const [errorCtnr, setErrorCtnr] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSellerProfile = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVER}/user/${route.params.sellerId}`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      if (res.data.profile) {
        setProfileData(res.data.profile);
      } else {
        console.warn('No profile data received');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // has seller set up? with params id
  const getSellerSubscription = async () => {
    try {
      const res = await axios.get(
        `${SERVER}/subscription/${route.params.sellerId}`,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setSellerSubscription(res.data.subscription);
    } catch (error) {
      console.error(error.message);
    }
  };
  //is user subscribed?
  const getUserSubscription = async () => {
    try {
      const res = await axios.get(
        `${SERVER}/transaction/subs/${route.params.sellerId}`,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setUserSubscriptionToSeller([res.data.subTransaction]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const purchaseSubscription = async () => {
    try {
      const res = await axios.put(
        `${SERVER}/subscription/${route.params.sellerId}`,
        {},
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setShowPA(true);
      getUserSubscription();
    } catch (error) {
      console.error(error.message);
      setErrorCtnr(error.message);
      setShowAlert(true);
    }
  };

  const getReviews = async () => {
    try {
      const res = await axios.get(`${SERVER}/review/${route.params.sellerId}`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setReviewData(res.data.review);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSellerSubCount = async () => {
    try {
      const res = await axios.get(`${SERVER}/subscription/count`, {
        header: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setSellerSubCount(res.data.count);
    } catch (error) {
      console.error(error.message);
    }
  };

  //has user reviewed?
  const getReviewsByUserId = async () => {
    try {
      const res = await axios.get(`${SERVER}/review/${route.params.sellerId}`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setUserReviewed(res.data.review);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSellerProfile();
      await getReviews();
      await getUserSubscription();
      await getSellerSubscription();
      await getReviewsByUserId();
      await getSellerSubCount();
    };

    fetchData();
  }, [route.params.sellerId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isLoading && <ActivityIndicator size="large" color="#00ff00" />}

        <View style={{flex: 1}}>
          {showAlert && (
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Unable to subscribe"
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
        <View style={styles.profileContainer}>
          <Image
            source={{uri: profileData?.profile_img}}
            style={styles.profileImage}
          />
          {profileData ? (
            <Text style={styles.name}>{profileData.first_name}</Text>
          ) : (
            <Text style={styles.name}></Text>
          )}
          <Text style={styles.bio}>{profileData?.bio}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Subscribers</Text>
            <Text style={styles.statValue}>
              {sellerSubCount ? 0 : sellerSubCount}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Win Rate</Text>
            <Text style={styles.statValue}>-%</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Trades</Text>
            <Text style={styles.statValue}>Stock</Text>
          </View>
        </View>

        {userSubscriptionToSeller.length === 0 && sellerSubscription ? (
          <CustomBtn
            style={styles.editProfileBtn}
            textStyle={styles.editProfileBtnText}
            title={
              <Text>
                <Icon name="person-add-outline" size={18} color="#fff" />{' '}
                Subscribe{' '}
              </Text>
            }
            onPress={() => setShowPurchaseCfm(true)}
          />
        ) : userSubscriptionToSeller.length > 0 && sellerSubscription ? (
          userReviewed.length === 0 &&
          showReviewBtn && (
            <CustomBtn
              style={styles.editProfileBtn}
              textStyle={styles.editProfileBtnText}
              title={
                <Text>
                  <Icon name="pencil-sharp" size={18} color="#fff" />
                  Leave a review
                </Text>
              }
              onPress={() => {
                setShowReviewBtn(false);
                setShowReviewForm(prevInput => !prevInput);
              }}
            />
          )
        ) : (
          <Text>User has yet to offer subscription.</Text>
        )}

        {showReviewForm && (
          <ReviewForm
            paramsId={route.params.sellerId}
            userReviewed={userReviewed}
            setShowReviewForm={setShowReviewForm}
            setShowReviewBtn={setShowReviewBtn}
            getReviewsByUserId={getReviewsByUserId}
          />
        )}

        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>

          {userReviewed.length > 0 && (
            <Reviews
              rating={userReviewed[0].rating}
              comment={userReviewed[0].comment}
              firstName={userReviewed[0].first_name}
              lastName={userReviewed[0].last_name}
              title={userReviewed[0].title}
              showIcons={true}
              paramsId={route.params.sellerId}
              getReviewsByUserId={getReviewsByUserId}
              getReviews={getReviews}
            />
          )}

          {reviewData.length > 0 ? (
            reviewData.map(rev => (
              <Reviews
                key={`${rev.buyer_id}-${rev.seller_id}`}
                rating={rev.rating}
                comment={rev.comment}
                firstName={rev.first_name}
                lastName={rev.last_name[0]}
                title={rev.title}
              />
            ))
          ) : (
            <Text>This user does not have any reviews.</Text>
          )}
        </View>

        {showPurchaseCfm && (
          <View style={styles.btmSheetContainer}>
            <BottomSheetSub
              btnTitle="Buy"
              btnActn={() => {
                purchaseSubscription();
              }}
              onPress={() => {
                setShowPurchaseCfm(false);
              }}
              showPurchaseCfm={showPurchaseCfm}
              listing={true}
              title="Subscription Payment"
              listingMsg={`Subscribe to ${sellerSubscription.first_name}'s Trading Signals`}
              listingPrice={`${sellerSubscription.price} / Month`}
              listingSellerFN={sellerSubscription.first_name}
              listingSellerLN={sellerSubscription.last_name}
              startDate={sellerSubscription.purchase_date}
              endDate={sellerSubscription.expiry_Date}
              showPA={showPA}
              goToBtn={() => {
                setShowPA(false);
                setShowPurchaseCfm(false);
              }}
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
    padding: 20,
  },
  scrollContainer: {},
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#53ACFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#53ACFF',
  },
  reviewsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  editProfileBtn: {
    backgroundColor: '#53ACFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editProfileBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  reviewRow: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  reviewsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  btmSheetContainer: {
    flex: 1,
  },
});

export default UserViewSellerProfile;
