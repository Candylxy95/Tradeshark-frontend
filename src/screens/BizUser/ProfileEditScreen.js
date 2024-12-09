import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../../components/context/UserContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileEditScreen = () => {
  const {accessToken} = useContext(UserContext);
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
    phone_number: '',
  });

  const [profileInput, setProfileInput] = useState({
    bio: '',
    profile_img: '',
  });

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
      console.log('Update successful', res.data);
    } catch (error) {
      console.error('Update failed', error.message);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axios.patch(`${SERVER}/user/profile`, profileInput, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      console.log('Update photo and bio successful', res.data);
    } catch (error) {
      console.error('Update photo and bio failed', error.message);
    }
  };

  const toggleUpdateProfile = item => {
    if (!isUpdating.item) {
      setIsUpdating(prevInput => ({...prevInput, [item]: true}));
    }
    if (isUpdating.item) {
      updateProfile();
      setIsUpdating(prevInput => ({...prevInput, [item]: false}));
    }
  };

  const toggleUpdateContact = item => {
    if (!isUpdating.item) {
      setIsUpdating(prevInput => ({...prevInput, [item]: true}));
    }
    if (isUpdating.item) {
      updateContact();
      setIsUpdating(prevInput => ({...prevInput, [item]: false}));
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
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
              onPress={() => toggleIsUpdatingNameContacts('lastName')}>
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
              onPress={() => toggleIsUpdatingPhotoBio('bio')}>
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
              onPress={() => toggle('email')}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 20,
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
    borderColor: '#53ACFF',
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
    backgroundColor: '#53ACFF',
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
});

export default ProfileEditScreen;
