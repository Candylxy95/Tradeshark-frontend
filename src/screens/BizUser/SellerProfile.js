import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import CustomBtn from '../../components/CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const SellerProfile = () => {
  const {accessToken} = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);

  const getProfileData = async () => {
    try {
      const res = await axios.get(`${SERVER}/user/profile`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setProfileData(res.data.profile);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: profileData?.profile_img}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {/* {profileData?.first_name} {profileData?.last_name[0]} */}
        </Text>
        <Text style={styles.bio}>{profileData?.bio}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Subscribers</Text>
          <Text style={styles.statValue}>123</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Win Rate</Text>
          <Text style={styles.statValue}>75%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Trades</Text>
          <Text style={styles.statValue}>Forex</Text>
        </View>
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <Text style={styles.reviewText}>"Great trader, highly recommend!"</Text>
        <Text style={styles.reviewText}>"Very reliable and professional."</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
    padding: 20,
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
  },
  editProfileBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SellerProfile;
