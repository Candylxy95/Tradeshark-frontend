import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import UserData from '../../components/UserProfile/UserData';

const UserProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <UserData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2EB',
  },
});

export default UserProfile;
