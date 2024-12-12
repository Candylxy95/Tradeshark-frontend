import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import CustomBtn from '../../components/CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import Reviews from '../../components/UserProfile/Reviews';
import {ActivityIndicator} from 'react-native';

const SellerProfile = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {accessToken} = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);
  const [subCount, setSubCount] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const getProfileData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${SERVER}/user/profile`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setProfileData(res.data.profile);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getReviews = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVER}/review/biz`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setReviewData(res.data.review);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSubCount = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${SERVER}/transaction/count`, {
        headers: {
          authorisation: 'Bearer ' + accessToken,
        },
      });
      setSubCount(res.data.count);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
    getReviews();
    getSubCount();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
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
            backgroundColor: 'black',
          }}>
          <ActivityIndicator size="large" color="#FB8B24" />
        </View>
      )}

      <View style={styles.profileContainer}>
        <Image
          source={{uri: profileData?.profile_img}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {profileData.first_name} {profileData.last_name}
        </Text>
        <Text style={styles.bio}>{profileData?.bio}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Subscribers</Text>
          <Text style={styles.statValue}>{subCount ? 0 : subCount}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Win Rate</Text>
          <Text style={styles.statValue}>-%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Trades</Text>
          <Text style={styles.statValue}>Stocks</Text>
        </View>
      </View>

      <CustomBtn
        style={styles.editProfileBtn}
        textStyle={styles.editProfileBtnText}
        title={
          <Text>
            <Icon name="pencil-sharp" size={18} color="#fff" />
            Edit Profile
          </Text>
        }
        onPress={() => navigation.navigate('EditProfile')}
      />

      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
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
          <Text>You do not have any reviews yet.</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131314',
    padding: 20,
    justifyContent: 'center',
  },
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
    borderColor: 'orangered',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: 'white',
  },
  bio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    opacity: 0.8,
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
    color: 'orangered',
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
    opacity: 0.8,
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
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF8C00',
    shadowColor: '#FF4500',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 15,
    marginBottom: 20,
  },
  editProfileBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SellerProfile;
