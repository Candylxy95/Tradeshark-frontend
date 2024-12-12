import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomBtn from '../../components/CustomBtn';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

const UserProfile = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {accessToken, setAccessToken} = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);
  const [isUpdating, setIsUpdating] = useState({
    photo: false,
    firstName: false,
    lastName: false,
    email: false,
    bio: false,
  });
  const [contactInput, setContactInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [profileInput, setProfileInput] = useState({
    bio: '',
    profile_img: '',
  });

  const logout = async () => {
    try {
      const token = await EncryptedStorage.getItem('accessToken');

      setAccessToken('');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'InitScreen',
            },
          ],
        }),
      );

      if (token) {
        await EncryptedStorage.removeItem('accessToken');
      } else {
        console.warn('No token found in storage to remove');
      }
    } catch (error) {
      console.error('Failed to logout: ', error);
    }
  };

  const getProfileData = async () => {
    try {
      const res = await axios.get(`${SERVER}/user/profile`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      setProfileData(res.data.profile);
      setContactInput({
        first_name: res.data.profile.first_name,
        last_name: res.data.profile.last_name,
        email: res.data.profile.email,
      });
      setProfileInput({
        profile_img: res.data.profile.profile_img,
        bio: res.data.profile.bio,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateContact = async () => {
    try {
      const res = await axios.patch(`${SERVER}/user/user`, contactInput, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      await getProfileData();
    } catch (error) {}
  };

  const updateProfile = async () => {
    try {
      const res = await axios.patch(`${SERVER}/user/profile`, profileInput, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      await getProfileData();
    } catch (error) {}
  };

  const toggleUpdateProfile = item => {
    if (!isUpdating[item]) {
      setIsUpdating(prevInput => ({...prevInput, [item]: true}));
    }
    if (isUpdating[item]) {
      updateProfile();
      setIsUpdating(prevInput => ({...prevInput, [item]: false}));
    }
  };

  const toggleUpdateContact = item => {
    if (!isUpdating[item]) {
      setIsUpdating(prevInput => ({...prevInput, [item]: true}));
    }
    if (isUpdating[item]) {
      updateContact();
      setIsUpdating(prevInput => ({...prevInput, [item]: false}));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileData();
    }, []),
  );

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

      <ScrollView>
        <View style={styles.imageHeaderContainer}>
          <View style={styles.imageHeader}>
            <Image
              source={{uri: profileData?.profile_img}}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => toggleUpdateProfile('photo')}>
            <Icon name="camera-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>First Name</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleUpdateContact('firstName')}>
              <Icon name="pencil-sharp" size={20} color="#53ACFF" />
            </TouchableOpacity>
          </View>
          {isUpdating.firstName ? (
            <TextInput
              style={styles.textInput}
              value={contactInput.first_name}
              onChangeText={text =>
                setContactInput(prev => ({...prev, first_name: text}))
              }
            />
          ) : (
            <Text style={styles.text}>{profileData?.first_name}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Last Name</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleUpdateContact('lastName')}>
              <Icon name="pencil-sharp" size={20} color="#53ACFF" />
            </TouchableOpacity>
          </View>
          {isUpdating.lastName ? (
            <TextInput
              style={styles.textInput}
              value={contactInput.last_name}
              onChangeText={text =>
                setContactInput(prev => ({...prev, last_name: text}))
              }
            />
          ) : (
            <Text style={styles.text}>{profileData?.last_name}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Bio</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleUpdateProfile('bio')}>
              <Icon name="pencil-sharp" size={20} color="#53ACFF" />
            </TouchableOpacity>
          </View>
          {isUpdating.bio ? (
            <TextInput
              style={styles.textInput}
              value={profileInput.bio}
              onChangeText={text =>
                setProfileInput(prev => ({...prev, bio: text}))
              }
            />
          ) : (
            <Text style={styles.text}>{profileData?.bio}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleUpdateContact('email')}>
              <Icon name="pencil-sharp" size={20} color="#53ACFF" />
            </TouchableOpacity>
          </View>
          {isUpdating.email ? (
            <TextInput
              style={styles.textInput}
              value={contactInput.email}
              onChangeText={text =>
                setContactInput(prev => ({...prev, email: text}))
              }
            />
          ) : (
            <Text style={styles.text}>{profileData?.email}</Text>
          )}
        </View>
        <CustomBtn
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={logout}
          title="Logout"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131314',
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  imageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageHeader: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#3ABECF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3ABECF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    position: 'absolute',
    top: 90,
    right: 100,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#333',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  iconBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: '#3ABECF',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    marginTop: 15,
  },
  btnText: {
    color: '#F1F2EB',
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
  },
});

export default UserProfile;
